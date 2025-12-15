import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ChangeNewPasswordField } from "@/lib/types/auth";
import { useToast } from "@/hooks/use-toast";
import { changeNewPasswordSrevice } from "../_services/change-password.service";
import { useRouter } from "next/navigation";

export default function useChangeNewPassword() {
  const router = useRouter();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { isPending, error, mutate } = useMutation({
    mutationFn: async (fields: ChangeNewPasswordField) => {
      const email = queryClient.getQueryData<string>(["forgot-password-email"]);
      if (!email) throw new Error("Email not found");
      console.log({ email, fields });

      const payload = await changeNewPasswordSrevice({ email, fields });

      if ("code" in payload) {
        throw new Error(payload.message);
      }
      console.log(payload);

      return payload;
    },
    onSuccess: () => {
      toast({
        title: "Password Changed Successfully",
        // description: "C",
      });
      router.push("/dashboard");
    },
  });

  return { isPending, error, resetPassword: mutate };
}
