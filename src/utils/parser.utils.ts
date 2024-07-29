import { ZodError } from "zod";

export const parseZodError = (error: ZodError) => {
  return error?.issues.map((error) => {
    return error?.message.replace("String", error.path[0].toString());
  });
};
