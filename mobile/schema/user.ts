import { z } from "zod";

export const signUpSchema = z.object({
  firstName: z.string().min(1, "Cannot be empty"),
  lastName: z.string().min(1, "Cannot be empty"),
  username: z.string().min(1, "Cannot be empty"),
  email: z.string().min(1, "Cannot be empty"),
  password: z.string().min(1, "Cannot be empty"),
});
