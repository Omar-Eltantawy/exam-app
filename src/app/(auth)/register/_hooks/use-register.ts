import { RegisterField } from "@/lib/types/auth";
import { useMutation } from "@tanstack/react-query";
import { registerSrevice } from "../_services/register.service";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export function useRegister() {
  const router = useRouter();
  const { toast } = useToast();

  const { isPending, error, mutate } = useMutation({
    mutationFn: async (fields: RegisterField) => {
      const payload = await registerSrevice(fields);

      if ("code" in payload) {
        throw new Error(payload.message);
      }

      return payload;
    },
    onSuccess: () => {
      toast({
        title: "Registerd",
        description: "Your Accout is created , please login",
      });
      router.push("/login");
    },
  });

  return { isPending, error, register: mutate };
}
