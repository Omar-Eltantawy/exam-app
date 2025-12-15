import { VerifyOTPField } from "@/lib/types/auth";
import { useMutation } from "@tanstack/react-query";
import { verifyOTPSrevice } from "../_services/verify-otp.service";
import { useToast } from "@/hooks/use-toast";

export default function useVerifyOTP() {
  const { toast } = useToast();

  const { isPending, error, mutate } = useMutation({
    mutationFn: async (fields: VerifyOTPField) => {
      const payload = await verifyOTPSrevice(fields);

      if ("code" in payload) {
        throw new Error(payload.message || "OTP verification failed");
      }

      return payload;
    },
    onSuccess: () => {
      toast({
        title: "OTP Verified",
        description: "Now Enter Your New Password ",
      });
    },
  });

  return { isPending, error, verifyOTP: mutate };
}
