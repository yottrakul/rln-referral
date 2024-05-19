"use client";
import { type Hospital } from "@prisma/client";
import { type UserWithOutPassword } from "@/app/_lib/definition";
import UserModal from "./UserModal";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { type AccountType } from "./UserModal";

interface UpdateUserModalWrapperProps {
  hospitals: Hospital[];
  user: UserWithOutPassword | null;
  isOpen: boolean;
  account?: string | null;
}
export default function UpdateUserModalWrapper({ hospitals, user, isOpen, account }: UpdateUserModalWrapperProps) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(isOpen);

  const handleOnClose = () => {
    setIsModalOpen(false);
    // router.replace(`/backoffice_user?${createQueryParams()}`);
    router.back();
  };

  return (
    <UserModal
      onClose={handleOnClose}
      hospitals={hospitals}
      isOpen={isModalOpen}
      isEdit
      data={user}
      account={account as AccountType}
    />
  );
}
