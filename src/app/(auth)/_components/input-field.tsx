"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Control, FieldValues, Path } from "react-hook-form";
import { cn } from "@/lib/utils/tailwind-merge";

interface InputFieldProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  type?: string;
  placeholder?: string;
  error?: string;
}

export default function InputField<T extends FieldValues>({
  name,
  control,
  label,
  type = "text",
  placeholder,
  error,
}: InputFieldProps<T>) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem className="flex flex-col gap-1">
          <FormLabel className="font-medium text-sm mt-1">{label}</FormLabel>
          <FormControl>
            <div className="relative">
              <Input
                {...field}
                type={isPassword ? (showPassword ? "text" : "password") : type}
                placeholder={placeholder}
                className={cn(
                  "text-sm w-full",
                  (fieldState.invalid || error) &&
                    "border-red-500 focus:border-red-500 focus:ring-red-500"
                )}
              />
              {isPassword && (
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-2 flex items-center"
                >
                  {showPassword ? (
                    <Eye size={20} className="text-gray-400" />
                  ) : (
                    <EyeOff size={20} className="text-gray-400" />
                  )}
                </button>
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
