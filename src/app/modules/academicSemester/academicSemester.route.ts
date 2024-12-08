import { Router } from "express";
import { AcademicSemesterControllers } from "./academicSemester.controller";
import validateRequest from "../../middlewares/validateRequest";
import { AcademicSemesterValidations } from "./academicSemester.validation";

const router = Router();

router.post(
  "/create-academic-semester",
  validateRequest(AcademicSemesterValidations.AcademicSemesterValidation),
  AcademicSemesterControllers.createAcademicSemester,
);

export const AcademicSemesterRouter = router;
