import z from "zod";

export const accountSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  username: z.string().min(3, "Username is required"),
  email: z.email("Invalid email"),
  phone: z.string().min(5, "Invalid phone number"),
});

export const changePasswordSchema = z
  .object({
    oldPassword: z.string().min(6, "Current password is required"),
    password: z.string().min(6, "New password must be at least 6 characters"),
    rePassword: z.string().min(6, "Confirm your new password"),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
