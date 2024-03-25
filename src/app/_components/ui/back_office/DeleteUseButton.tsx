"use client";
import { Button } from "@chakra-ui/react";
import React from "react";
import { useUserContext } from "../../context/UserManagementContext";

export default function DeleteUseButton() {
  const { deleteUser, user } = useUserContext();
  console.log("🚀 ~ DeleteUseButton ~ user:", user);

  return <Button colorScheme="red">ลบ</Button>;
}
