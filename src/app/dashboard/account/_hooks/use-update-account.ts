"use client";

import { useMutation } from "@tanstack/react-query";
import { updateAccountService } from "../_services/update-accout.service";
import { toast } from "@/hooks/use-toast";
import { useSession } from "next-auth/react";

export function useUpdateAccount() {
  const { update } = useSession();

  return useMutation({
    mutationFn: updateAccountService,

    onSuccess: async (data) => {
      await update({
        user: data.user,
      });

      toast({
        title: "Profile Updated",
        description: "Your profile was updated successfully",
      });
    },
  });
}
