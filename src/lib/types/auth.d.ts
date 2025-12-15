import { User } from "next-auth";
import z from "zod";
import { loginSchema, registerSchema } from "../schemes/auth.schema";
import {
  changeNewPasswordSchema,
  forgotPasswordSchema,
  verifyOTPSchema,
} from "../schemes/forgot-password.schema";

//Login
export type LoginResponse = {
  token: string;
  user: User["user"];
};

export type LoginField = z.infer<typeof loginSchema>;

//Register
export type RegisterResponse = {
  token: string;
  user: User["user"];
};

export type RegisterField = z.infer<typeof registerSchema>;

// ForgotPassword

export type ForgotPasswordResponse = {
  message: string;
  info: string;
};

export type ForgotPasswordField = z.infer<typeof forgotPasswordSchema>;

// OTP
export type VerifyOTPResponse = {
  status?: "success";
  message?: string;
  code?: number;
};

export type VerifyOTPField = z.infer<typeof verifyOTPSchema>;

// ChangeNewPassword
export type ChangeNewPasswordResponse = {
  message: string;
  token: string;
};

export type ChangeNewPasswordField = z.infer<typeof changeNewPasswordSchema>;
