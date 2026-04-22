import { useState } from "react";
import { type User } from "@/services/admin/user-management.service";

export function useUserDetails() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openDetailsModal = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeDetailsModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedUser(null), 200);
  };

  return {
    selectedUser,
    isModalOpen,
    openDetailsModal,
    closeDetailsModal,
    setIsModalOpen,
  };
}
