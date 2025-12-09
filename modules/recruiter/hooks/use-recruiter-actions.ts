import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { RecruiterManagementService, type Recruiter } from "@/services/admin/recruiter-management.service";

export function useRecruiterActions() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<string | null>(null);
    const [confirm, setConfirm] = useState<{ open: boolean; recruiter: Recruiter | null }>({
        open: false,
        recruiter: null,
    });

    const openConfirmModal = (recruiter: Recruiter) => {
        setConfirm({ open: true, recruiter });
    };

    const closeConfirmModal = () => {
        setConfirm({ open: false, recruiter: null });
    };

    const confirmBlockUnblock = async () => {
        if (!confirm.recruiter) return;

        try {
            setIsLoading(confirm.recruiter.id);
            await RecruiterManagementService.blockUnblockRecruiter(confirm.recruiter.id);
            toast.success(
                `"${confirm.recruiter.name}" has been ${confirm.recruiter.status === "blocked" ? "unblocked" : "blocked"}`
            );
            router.refresh();
        } catch {
            toast.error("Failed to update recruiter status");
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
