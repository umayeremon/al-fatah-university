import { model, Schema } from "mongoose";
import { TCourse, TPreRequisiteCourses } from "./course.interface";

const preRequisiteCoursesSchema = new Schema<TPreRequisiteCourses>({
  course: { type: Schema.Types.ObjectId, required: true, ref: "Course" },
  isDeleted: { type: Boolean, default: false },
});

const courseSchema = new Schema<TCourse>({
  title: { type: String, unique: true, required: true, trim: true },
  prefix: { type: String, required: true, trim: true },
  code: { type: Number, required: true, trim: true },
  credits: { type: Number, required: true, trim: true },
  preRequisiteCourses: [preRequisiteCoursesSchema],
  isDeleted: { type: Boolean, default: false },
});

export const Course = model<TCourse>("Course", courseSchema);
