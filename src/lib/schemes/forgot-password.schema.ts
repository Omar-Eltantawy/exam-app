import z from "zod";

//forgotPasswordSchema
export const forgotPasswordSchema = z.object({
  email: z
    .email({
      error: (iss) =>
        iss.code === "invalid_type"
          ? "Please Enter Your Email"
          : "Enter a valid email",
    })
    .nonempty("Email is required"),
});

// OTPSchema

export const verifyOTPSchema = z.object({
  resetCode: z
    .string()
    .length(6, "OTP must be 6 digits")
    .regex(/^\d+$/, "OTP must contain only numbers"),
});

//ChangeNewPasswordSchema
export const changeNewPasswordSchema = z
  .object({
    newPassword: z
      .string("Password is required")
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[@$!%*?&]/,
        "Password must contain at least one special character"
      ),
    confirmNewPassword: z.string().min(8).optional(),
  })
  .refine((values) => values.newPassword === values.confirmNewPassword, {
    message: "Passwords do not match",
    path: ["confirmNewPassword"],
  });
