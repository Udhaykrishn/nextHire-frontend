import { useState } from "react";
import { type Recruiter } from "@/services/admin/recruiter-management.service";

export function useRecruiterDetails() {
  const [selectedRecruiter, setSelectedRecruiter] = useState<Recruiter | null>(
    null,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openDetailsModal = (recruiter: Recruiter) => {
    setSelectedRecruiter(recruiter);
    setIsModalOpen(true);
  };

  const closeDetailsModal = () => {
    setIsModalOpen(false);
    // Delay clearing the recruiter to allow modal close animation
    setTimeout(() => setSelectedRecruiter(null), 200);
  };

  return {
    selectedRecruiter,
    isModalOpen,
    openDetailsModal,
    closeDetailsModal,
    setIsModalOpen,
  };
}
