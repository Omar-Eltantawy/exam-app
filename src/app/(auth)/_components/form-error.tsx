"use client";

interface FormErrorProps {
  message: string;
}

export default function FormError({ message }: FormErrorProps) {
  return (
    <div className="relative w-full p-3 flex items-center justify-center mx-auto border border-red-500 bg-red-50 text-red-600 ">
      {message}

      {/* Close Button */}
      <span className="absolute -top-2 left-1/2 -translate-x-1/2 text-red-500 bg-white border  border-red-500  rounded-full w-4 h-4 flex items-center justify-center text-md ">
        ×
      </span>
    </div>
  );
}
