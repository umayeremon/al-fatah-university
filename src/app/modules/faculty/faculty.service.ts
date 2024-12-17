import mongoose from "mongoose";
import { User } from "../user/user.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import QueryBuilder from "../../builder/QueryBuilder";
import { Faculty } from "./faculty.model";
import { TFaculty } from "./faculty.interface";
import { FacultySearchableFields } from "./faculty.const";

// get all students
const getAllFacultiesFromDb = async (query: Record<string, unknown>) => {
  // const queryObj = { ...query }; //copy query

  // let searchTerm = "";
  // if (query?.searchTerm) {
  //   searchTerm = query?.searchTerm as string;
  // }

  // const searchQuery = Student.find({
  //   $or: studentSearchableFields.map(field => ({
  //     [field]: { $regex: searchTerm, $options: "i" },
  //   })),
  // });
  // // exclude fields where delete exact field
  // const excludeFields = ["searchTerm", "sort", "limit", "page", "fields"];
  // excludeFields.forEach(el => delete queryObj[el]);
  // console.log(query, queryObj);

  // // filterQuery
  // const filterQuery = searchQuery
  //   .find(queryObj)
  //   .populate("academicDepartment")
  //   .populate("admissionSemester");

  // // sortQuery
  // let sort = "-createdAt";
  // if (query.sort) {
  //   sort = query.sort as string;
  // }
  // const sortQuery = filterQuery.sort(sort);

  // // limit & paginate query
  // let page = 1;
  // let limit = 1;
  // let skip = 0;
  // if (query.limit) {
  //   limit = Number(query.limit);
  // }
  // if (query.page) {
  //   page = Number(query.page);
  //   skip = (page - 1) * limit;
  // }

  // const paginateQuery = sortQuery.skip(skip);

  // const limitQuery = paginateQuery.limit(limit);

  // // fields limiting

  // let fields = "-__v";
  // if (query.fields) {
  //   fields = (query.fields as string).split(",").join(" ");
  // }

  // const fieldsQuery = await limitQuery.select(fields);

  const studentQuery = new QueryBuilder(Faculty.find(), query)
    .search(FacultySearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await studentQuery.queryModel;

  return result;
};

// get single students

const getSingleFacultyFromDb = async (id: string) => {
  const isStudentExists = await Faculty.findById(id);
  if (!isStudentExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Student doesn't exist");
  }
  const result = await Faculty.findById(id);
  // const result = await Student.aggregate([{ $match: { id } }]);
  return result;
};

// update single student
const updateSingleFacultyIntoDb = async (
  id: string,
  payload: Partial<TFaculty>,
) => {
  const { name, ...remainingFacultyData } = payload;
  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingFacultyData,
  };
  if (name && [name]?.length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  const result = await Faculty.findByIdAndUpdate(id, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });
  return result;
};

// delete single students
const deleteSingleFacultyFromDb = async (id: string) => {
  const isStudentExists = await Faculty.findOne({ id });
  if (!isStudentExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Student doesn't exist");
  }

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    // delete a student
    const deletedStudent = await Faculty.findOneAndUpdate(
      { id },
      { isDeleted: true },
      {
        new: true,
        session,
      },
    );

    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete student");
    }
    // delete a user
    const deletedUser = await User.findOneAndUpdate(
      { id },
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
    return [deletedStudent, deletedUser];
  } catch {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, "Failed delete student");
  }
};

export const facultyServices = {
  getAllFacultiesFromDb,
  getSingleFacultyFromDb,
  updateSingleFacultyIntoDb,
  deleteSingleFacultyFromDb,
};
