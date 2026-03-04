import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import {
  type User,
  UserManagementService,
} from "@/services/admin/user-management.service";

export function useUserActions() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const [confirm, setConfirm] = useState<{ open: boolean; user: User | null }>({
    open: false,
    user: null,
  });

  const openConfirmModal = (user: User) => {
    setConfirm({ open: true, user });
  };

  const closeConfirmModal = () => {
    setConfirm({ open: false, user: null });
  };

  const confirmBlockUnblock = async () => {
    if (!confirm.user) return;

    try {
      setIsLoading(confirm.user.id);
      await UserManagementService.blockUnblockUser(confirm.user.id);
      toast.success(
        `"${confirm.user.name}" has been ${confirm.user.status === "block" ? "unblocked" : "blocked"}`,
      );
      router.refresh();
    } catch {
      toast.error("Failed to update user status");
    } finally {
      setIsLoading(null);
      closeConfirmModal();
    }
  };

  return {
    isLoading,
    confirm,
    openConfirmModal,
    closeConfirmModal,
    confirmBlockUnblock,
  };
}
