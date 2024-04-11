"use client";
import { useDisclosure, Button } from "@chakra-ui/react";

import { FaPlus } from "react-icons/fa6";

import { type Hospital } from "@prisma/client";
import UserModal from "@/app/_components/ui/back_office/UserModal";

interface AddUserButtonProps {
  hospitals: Hospital[];
}

const AddUserButton = ({ hospitals }: AddUserButtonProps) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <>
      <Button rightIcon={<FaPlus />} onClick={onOpen} colorScheme="teal">
        เพิ่มผู้ใช้งาน
      </Button>
      <UserModal hospitals={hospitals} isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default AddUserButton;
