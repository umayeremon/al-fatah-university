import { z } from "zod";

const zCreateName = z.object({
  firstName: z.string().trim().min(1, "First name is required"),
  middleName: z.string().trim().optional(),
  lastName: z.string().trim().min(1, "Last name is required"),
});

const zCreateAdmin = z.object({
  body: z.object({
    password: z.string().max(25).optional(),
    admin: z.object({
      designation: z.string().trim().min(1, "Designation is required"),
      name: zCreateName,
      gender: z.enum(["male", "female", "other"]),
      dateOfBirth: z.string().refine(date => !isNaN(Date.parse(date)), {
        message: "Invalid date format",
      }),
      email: z.string().trim().email("Invalid email address"),
      contactNo: z.string().trim().min(1, "Contact number is required"),
      emergencyContactNo: z
        .string()
        .trim()
        .min(1, "Emergency contact number is required"),
      presentAddress: z.string().trim().min(1, "Present address is required"),
      permanentAddress: z
        .string()
        .trim()
        .min(1, "Permanent address is required"),
      profileImage: z.string().trim().url("Profile image must be a valid URL"),
      isDeleted: z.boolean().default(false),
    }),
  }),
});

const zUpdateName = z.object({
  firstName: z.string().trim().optional(),
  middleName: z.string().trim().optional(),
  lastName: z.string().trim().optional(),
});

const zUpdateAdmin = z.object({
  body: z.object({
    admin: z.object({
      designation: z.string().trim().optional(),
      name: zUpdateName.optional(),
      gender: z.enum(["male", "female", "other"]).optional(),
      dateOfBirth: z
        .string()
        .optional()
        .refine(date => date === undefined || !isNaN(Date.parse(date)), {
          message: "Invalid date format",
        }),
      email: z.string().trim().email("Invalid email address").optional(),
      contactNo: z.string().trim().optional(),
      emergencyContactNo: z.string().trim().optional(),
      presentAddress: z.string().trim().optional(),
      permanentAddress: z.string().trim().optional(),
      profileImage: z
        .string()
        .trim()
        .url("Profile image must be a valid URL")
        .optional(),
      isDeleted: z.boolean().default(false).optional(),
    }),
  }),
});

// Export the validation schema
export const zAdminValidations = {
  zCreateAdmin,
  zUpdateAdmin,
};