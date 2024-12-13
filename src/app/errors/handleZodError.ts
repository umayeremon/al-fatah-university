import { ZodError, ZodIssue } from "zod";
import { TErrorSources } from "../interface/error";

const handleZodErr = (err: ZodError) => {
  const errorSources: TErrorSources = err.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue.message,
    };
  });
  const statusCode = 400;
  return {
    statusCode,
    message: "Validation Error",
    errorSources,
  };
};

export default handleZodErr;
