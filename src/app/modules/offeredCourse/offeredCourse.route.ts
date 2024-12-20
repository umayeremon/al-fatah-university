import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { zOfferedCourseValidations } from "./offeredCourse.validation";
import { offeredCourseControllers } from "./offeredCourse.controller";

const router = Router();

router.post(
  "/create-offered-course",
  validateRequest(
    zOfferedCourseValidations.zCreateOfferedCourseValidationSchema,
  ),
  offeredCourseControllers.createOfferedCourse,
);
router.get("/", offeredCourseControllers.getAllOfferedCourse);
router.get("/:id", offeredCourseControllers.getSingleOfferedCourse);
router.patch(
  "/:id",
  validateRequest(
    zOfferedCourseValidations.zUpdateOfferedCourseValidationSchema,
  ),
  offeredCourseControllers.updateOfferedCourse,
);
router.delete("/:id", offeredCourseControllers.deleteOfferedCourse);

export const offeredCourseRouter = router;
