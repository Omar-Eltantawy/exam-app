import { LoginField } from "@/lib/types/auth";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";

export default function useLogin() {
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (fields: LoginField) => {
      const response = await signIn("credentials", {
        email: fields.email,
        password: fields.password,
        redirect: false,
      });

      if (!response?.ok) {
        throw new Error(response?.error || "Login failed, please try again.");
      }
      return response;
    },
    onSuccess: () => {
      const callbackURL =
        new URLSearchParams(location.search).get("callbackUrl") || "/dashboard";

      location.href = callbackURL;
    },
  });

  return { isPending, error, login: mutate };
}
