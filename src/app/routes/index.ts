import { Router } from "express";
import { studentRouter } from "../modules/student/student.route";
import { userRouter } from "../modules/user/user.route";
import { AcademicSemesterRouter } from "../modules/academicSemester/academicSemester.route";
import { AcademicFacultyRouter } from "../modules/academicFaculty/academicFaculty.route";
import { AcademicDepartmentRouter } from "../modules/academicDepartment/academicDepartment.route";
import { facultyRouter } from "../modules/faculty/faculty.route";
import { adminRouter } from "../modules/admin/admin.route";

const router = Router();

const routes = [
  {
    path: "/students",
    route: studentRouter,
  },
  {
    path: "/users",
    route: userRouter,
  },
  {
    path: "/academic-semesters",
    route: AcademicSemesterRouter,
  },
  {
    path: "/academic-faculties",
    route: AcademicFacultyRouter,
  },
  {
    path: "/academic-departments",
    route: AcademicDepartmentRouter,
  },
  {
    path: "/faculties",
    route: facultyRouter,
  },
  {
    path: "/admins",
    route: adminRouter,
  },
];

routes.forEach(route => router.use(route.path, route.route));

export default router;
