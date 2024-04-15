"use client";
import { Button } from "@chakra-ui/react";
import { useUserContext } from "../../context/UserManagementContext";

export default function DeleteUseButton() {
  const { deleteUser, user } = useUserContext();

  const handleDelete = async () => {
    await deleteUser();
  };

  if (user.length != 0) {
    return (
      <Button colorScheme="red" onClick={handleDelete}>
        ลบ
      </Button>
    );
  }
}
