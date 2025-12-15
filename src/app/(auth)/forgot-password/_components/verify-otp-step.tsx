import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { verifyOTPSchema } from "@/lib/schemes/forgot-password.schema";
import { VerifyOTPField } from "@/lib/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { MoveLeft, MoveRight } from "lucide-react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import useVerifyOTP from "../_hooks/use-verify-otp";
import FormError from "../../_components/form-error";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

type VerifyOTPStepProps = {
  onNext: () => void;
  onPrev: () => void;
};

export default function VerifyOTPStep({ onNext, onPrev }: VerifyOTPStepProps) {
  const { isPending, error, verifyOTP } = useVerifyOTP();
  const queryClient = useQueryClient();

  const email = queryClient.getQueryData<string>(["forgot-password-email"]);

  const [timeLeft, setTimeLeft] = useState(60);
  const [timerExpired, setTimerExpired] = useState(false);

  useEffect(() => {
    const expairyTime = new Date(Date.now() + 60000);
    const interval = setInterval(() => {
      const diff = Math.floor((expairyTime.getTime() - Date.now()) / 1000);

      if (diff <= 0) {
        setTimeLeft(0);
        setTimerExpired(true);
        clearInterval(interval);
      } else {
        setTimeLeft(diff);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [timerExpired]);

  const form = useForm({
    defaultValues: {
      resetCode: "",
    },
    resolver: zodResolver(verifyOTPSchema),
  });

  const onSubmit: SubmitHandler<VerifyOTPField> = (values) => {
    verifyOTP(values, {
      onSuccess: () => onNext(),
    });
  };

  const onResend = () => {
    if (!email) return;
    onPrev();
  };

  return (
    <div>
      <MoveLeft className="border mb-5 p-1 cursor-pointer" onClick={onPrev} />

      <h2 className="font-bold text-3xl mb-4 font-inter">Verify OTP</h2>

      <p className="text-gray-500 w-full text-base mb-8">
        Please enter the 6-digit code we sent to: {email}{" "}
        <span
          className="cursor-pointer underline text-blue-600 font-semibold ml-2"
          onClick={onPrev}
        >
          Edit
        </span>
      </p>

      <form
        className=" flex flex-col items-center gap-6 w-full"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <Controller
          name="resetCode"
          control={form.control}
          render={({ field }) => (
            <InputOTP
              maxLength={6}
              className="w-full"
              value={field.value}
              onChange={field.onChange}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          )}
        />

        {/* TIMER */}
        {!timerExpired ? (
          <p className="text-gray-500 text-sm">
            You can request another code in: <span>{timeLeft}s</span>
          </p>
        ) : (
          <p className="text-gray-500 text-sm">
            Didn’t receive the code?{" "}
            <span
              className="text-blue-600 cursor-pointer font-semibold underline"
              onClick={onResend}
            >
              Resend
            </span>
          </p>
        )}

        {/* Error */}
        {error && <FormError message={error?.message || "Invalid form"} />}

        <Button
          className="mt-3 w-full"
          disabled={
            isPending || (!form.formState.isValid && form.formState.isSubmitted)
          }
        >
          Verify Code <MoveRight />
        </Button>
      </form>
    </div>
  );
}
