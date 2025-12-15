import { isValidPhoneNumber } from "react-phone-number-input";
import z from "zod";

//LoginSchema

export const loginSchema = z.object({
  email: z
    .email({
      error: (iss) =>
        iss.code === "invalid_type"
          ? "Please Enter Your Email"
          : "Enter a valid email",
    })
    .nonempty("Email is required"),
  password: z
    .string("Password is required")
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[@$!%*?&]/, "Password must contain at least one special character"),
});

//Register Schema

export const registerSchema = z
  .object({
    username: z
      .string()
      .min(2, "username must me at least 2 characters")
      .max(20, "username must me less than 20 characters"),
    firstName: z
      .string()
      .min(2, "first name must me at least 2 characters")
      .max(20, "first name must me less than 20 characters"),

    lastName: z
      .string()
      .min(2, "last name must me at least 2 characters")
      .max(20, "last name must me less than 20 characters"),

    email: z.email({
      error: (iss) =>
        iss.code === "invalid_type"
          ? "Please Enter Your Email"
          : "Enter a valid email",
    }),
    password: z
      .string("Password is required")
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[@$!%*?&]/,
        "Password must contain at least one special character"
      ),

    rePassword: z.string().min(8),
    phone: z
      .string()
      .refine(
        (value) => isValidPhoneNumber(value, "EG"),
        "Invalid Phone Number"
      ),
  })
  .refine((values) => values.password === values.rePassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
