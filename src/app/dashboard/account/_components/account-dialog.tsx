import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";

import Alert from "../../../../../public/assets/icons/lucide/triangle-alert.png";
import Image from "next/image";
import { useDeleteAccount } from "../_hooks/use-delete-account";

export function AccountDialog() {
  const { mutate, isPending } = useDeleteAccount();

  return (
    <DialogContent className="sm:max-w-[480px] p-10 ">
      <DialogHeader>
        <div className="mx-auto mb-5">
          <Image src={Alert} width={50} height={50} alt="triangle-alert" />
        </div>
        <DialogDescription className="text-center">
          <p className="text-red-600 font-bold mb-5">
            Are you sure you want to delete your account?
          </p>
          <p className="text-gray-500  mb-10">
            This action is permanent and cannot be undone.{" "}
          </p>
        </DialogDescription>
      </DialogHeader>
      <DialogFooter className="border-t pt-5  ">
        <DialogClose asChild>
          <Button variant="secondary" className="w-1/2">
            Cancel
          </Button>
        </DialogClose>
        <Button
          variant={"destructive"}
          onClick={() => mutate()}
          disabled={isPending}
          className="w-1/2"
        >
          {isPending ? "Deleting..." : "Yes, delete"}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
