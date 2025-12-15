import { useMutation, useQueryClient } from "@tanstack/react-query";
import { forgotPassswordSrevice } from "../_services/forgot-password.service";
import { ForgotPasswordField } from "@/lib/types/auth";
import { useToast } from "@/hooks/use-toast";

export default function useForgotPassword() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { isPending, error, mutate } = useMutation({
    mutationFn: async (fields: ForgotPasswordField) => {
      const payload = await forgotPassswordSrevice(fields);

      if ("code" in payload) {
        throw new Error(payload.message);
      }

      return payload;
    },
    onSuccess: (_, variables) => {
      queryClient.setQueryData(["forgot-password-email"], variables.email);
      toast({
        title: "OTP Sended",
        description: "Check Your mail Please",
      });
    },
  });

  return { isPending, error, forgoPassword: mutate };
}
