import { Button } from "@/components/ui/button";
import InputField from "../../_components/input-field";
import { MoveRight } from "lucide-react";
import Link from "next/link";
import { ForgotPasswordField } from "@/lib/types/auth";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPasswordSchema } from "@/lib/schemes/forgot-password.schema";
import { Form } from "@/components/ui/form";
import useForgotPassword from "../_hooks/use-forgot-password";
import FormError from "../../_components/form-error";
import { useQueryClient } from "@tanstack/react-query";

type ForgoPasswordStepProps = {
  onNext: () => void;
};

export default function ForgoPasswordStep({ onNext }: ForgoPasswordStepProps) {
  const { isPending, error, forgoPassword } = useForgotPassword();
  const queryClient = useQueryClient();

  const email = queryClient.getQueryData<string>(["forgot-password-email"]);
  const form = useForm({
    defaultValues: {
      email: email || "",
    },
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit: SubmitHandler<ForgotPasswordField> = async (values) => {
    forgoPassword(values, {
      onSuccess: () => onNext(),
    });
  };

  return (
    <div>
      <h2 className="font-bold text-3xl mb-4 font-inter">Forgot Password</h2>
      <p className="text-gray-500 w-full text-base mb-8">
        Don’t worry, we will help you recover your account.
      </p>
      <Form {...form}>
        <form
          className=" flex flex-col gap-6"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <InputField<ForgotPasswordField>
            name="email"
            label="Email"
            type="email"
            placeholder="user@example.com"
            control={form.control} // pass control from useForm
            error={error?.message}
          />

          {/* Error */}
          {error && <FormError message={error?.message || "Invalid form"} />}

          <Button
            type="submit"
            className="mt-3 "
            disabled={
              isPending ||
              (!form.formState.isValid && form.formState.isSubmitted)
            }
          >
            Continue <MoveRight />{" "}
          </Button>
          <div className="m-auto text-gray-500">
            Don’t have an account?{" "}
            <span className="text-blue-600 font-semibold text-sm  mt-2 cursor-pointer">
              <Link href="/register">Create yours</Link>
            </span>
          </div>
        </form>
      </Form>
    </div>
  );
}
