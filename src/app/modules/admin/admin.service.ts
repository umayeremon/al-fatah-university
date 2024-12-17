import mongoose from "mongoose";
import { User } from "../user/user.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import QueryBuilder from "../../builder/QueryBuilder";
import { AdminSearchableFields } from "./admin.const";
import { TAdmin } from "./admin.interface";
import { Admin } from "./admin.model";

// get all admins
const getAllAdminsFromDb = async (query: Record<string, unknown>) => {
  const adminQuery = new QueryBuilder(Admin.find(), query)
    .search(AdminSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await adminQuery.queryModel;

  return result;
};

// get single admins

const getSingleAdminFromDb = async (id: string) => {
  const isAdminExists = await Admin.findById(id);
  if (!isAdminExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Admin doesn't exist");
  }
  const result = await Admin.findById(id);
  return result;
};

// update single admin
const updateSingleAdminIntoDb = async (
  id: string,
  payload: Partial<TAdmin>,
) => {
  const { name, ...remainingAdminData } = payload;
  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingAdminData,
  };
  if (name && [name]?.length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  const result = await Admin.findByIdAndUpdate(id, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });
  return result;
};

// delete single admins
const deleteSingleAdminFromDb = async (id: string) => {
  const isAdminExists = await Admin.findById(id);
  if (!isAdminExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Admin doesn't exist");
  }
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    // delete a Admin
    const deletedAdmin = await Admin.findByIdAndUpdate(
      id,
      { isDeleted: true },
      {
        new: true,
        session,
      },
    );

    if (!deletedAdmin) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete admin");
    }
    // delete a user
    const userId = deletedAdmin.user;
    const deletedUser = await User.findByIdAndUpdate(
      userId,
      { isDeleted: true },
      {
        new: true,
        session,
      },
    );
    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete user");
    }
    await session.commitTransaction();
    await session.endSession();
    return [deletedAdmin, deletedUser];
  } catch {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete admin");
  }
};

export const adminServices = {
  getAllAdminsFromDb,
  getSingleAdminFromDb,
  updateSingleAdminIntoDb,
  deleteSingleAdminFromDb,
};
