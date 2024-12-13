import { TAcademicFaculty } from "./academicFaculty.interface";
import { AcademicFaculty } from "./academicFaculty.model";

const createAcademicFacultyIntoDb = async (payload: TAcademicFaculty) => {
  const result = await AcademicFaculty.create(payload);
  return result;
};
// get all academic Faculty
const getAllAcademicFacultyFromDb = async () => {
  const result = await AcademicFaculty.find();
  return result;
};
// get single academic Faculty
const getSingleAcademicFacultyFromDb = async (id: string) => {
  const result = await AcademicFaculty.findById(id);
  return result;
};
// update single academic Faculty
const updateSingleAcademicFacultyFromDb = async (
  id: string,
  payload: Partial<TAcademicFaculty>,
) => {
  const result = await AcademicFaculty.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

export const AcademicFacultyServices = {
  createAcademicFacultyIntoDb,
  getAllAcademicFacultyFromDb,
  getSingleAcademicFacultyFromDb,
  updateSingleAcademicFacultyFromDb,
};
