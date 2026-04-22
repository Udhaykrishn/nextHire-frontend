"use client";

import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPopup,
  DialogTitle,
} from "@/components/animate-ui/components/base/dialog";
import { Button } from "@/components/animate-ui/components/buttons/button";
import { type DialogFlipDirection } from "@/components/animate-ui/primitives/base/dialog";

interface ConfirmModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  confirmText?: string;
  onConfirm: () => void;
  from?: DialogFlipDirection;
  showCloseButton?: boolean;
}

export const ConfirmModal = ({
  open,
  onOpenChange,
  title,
  description,
  confirmText = "Confirm",
  onConfirm,
  from,
  showCloseButton = true,
}: ConfirmModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPopup
        from={from}
        showCloseButton={showCloseButton}
        className="sm:max-w-[400px]"
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        <DialogFooter>
          <DialogClose render={<Button variant="outline">Cancel</Button>} />
          <Button
            variant="default"
            onClick={() => {
              onConfirm();
              onOpenChange(false); // close after confirm
            }}
          >
            {confirmText}
          </Button>
        </DialogFooter>
      </DialogPopup>
    </Dialog>
  );
};
