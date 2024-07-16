import { ZodError } from "zod";

export const parseZodError = (error: ZodError) => {
    try {
        return error?.issues.map((error, index) => {
            return error?.message.replace("String", error.path[0].toString())
        })
    } catch (error) {
        throw error;
    }
}