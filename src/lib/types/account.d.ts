import z from "zod";
import { accountSchema, changePasswordSchema } from "../schemes/account.schema";
import { User } from "next-auth";

type AccoutFormValues = z.infer<typeof accountSchema>;

type AccountResponse = {
  message: "success";
  user: User["user"];
};

export type ChangePasswordValues = z.infer<typeof changePasswordSchema>;

export type ChangePasswordResponse = {
  message: string;
};
