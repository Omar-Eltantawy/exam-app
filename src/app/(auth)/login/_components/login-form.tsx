"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import Link from "next/link";
import { LoginField } from "@/lib/types/auth";
import { loginSchema } from "@/lib/schemes/auth.schema";
import useLogin from "../_hooks/use-login";
import InputField from "../../_components/input-field";
import FormError from "../../_components/form-error";

export default function LoginForm() {
  // Mutation
  const { isPending, error, login } = useLogin();

  //Form
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginField> = (values) => {
    login(values);
  };

  console.log(error);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        <InputField<LoginField>
          name="email"
          label="Email"
          type="email"
          placeholder="user@example.com"
          control={form.control} // pass control from useForm
          error={error?.message}
        />

        <InputField<LoginField>
          name="password"
          label="Password"
          type="password"
          placeholder="*********"
          control={form.control}
          error={error?.message}
        />
        <Link
          href="/forgot-password"
          className="text-blue-600 font-semibold text-sm float-right mt-1"
        >
          Forgot your password?
        </Link>

        {/* Error */}
        {error && <FormError message={error?.message || "Invalid form"} />}

        <Button
          type="submit"
          className="mt-3"
          disabled={
            isPending || (!form.formState.isValid && form.formState.isSubmitted)
          }
        >
          Login
        </Button>

        <div className="m-auto text-gray-500">
          Don’t have an account?{" "}
          <Link
            href="/register"
            className="text-blue-600 font-semibold text-sm"
          >
            Create yours
          </Link>
        </div>
      </form>
    </Form>
  );
}
