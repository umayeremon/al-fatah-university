import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { semesterRegistrationServices } from "./semesterRegistration.service";
import httpStatus from "http-status";

const createSemesterRegistration = catchAsync(async (req, res) => {
  const result =
    await semesterRegistrationServices.createSemesterRegistrationIntoDb(
      req.body,
    );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Semester Registration created successfully",
    data: result,
  });
});
const getAllSemesterRegistration = catchAsync(async (req, res) => {
  const result =
    await semesterRegistrationServices.getAllSemesterRegistrationIntoDb(
      req.query,
    );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Semester Registrations are retrieved successfully !",
    data: result,
  });
});
const getSingleSemesterRegistration = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result =
    await semesterRegistrationServices.getSingleSemesterRegistrationIntoDb(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Semester Registration is retrieved successfully !",
    data: result,
  });
});
const updateSemesterRegistration = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result =
    await semesterRegistrationServices.updateSemesterRegistrationIntoDb(
      id,
      req.body,
    );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Semester Registration is updated successfully !",
    data: result,
  });
});

export const semesterRegistrationControllers = {
  createSemesterRegistration,
  getAllSemesterRegistration,
  getSingleSemesterRegistration,
  updateSemesterRegistration,
};