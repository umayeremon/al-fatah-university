import { AcademicSemesterNameCodeMapper } from "./academicSemester.const";
import { TAcademicSemester } from "./academicSemester.interface";
import { AcademicSemester } from "./academicSemester.model";

const createAcademicSemesterIntoDb = async (payload: TAcademicSemester) => {
  // academic semester name code mapper
  if (AcademicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new Error("Invalid semester code");
  }

  const result = await AcademicSemester.create(payload);
  return result;
};
// get all academic semester
const getAllAcademicSemesterIntoDb = async () => {
  const result = await AcademicSemester.find();
  return result;
};

export const AcademicSemesterServices = {
  createAcademicSemesterIntoDb,
  getAllAcademicSemesterIntoDb,
};
