"use client";
import { Button } from "@chakra-ui/react";
import { signOut } from "next-auth/react";

// Test

function LogoutButton() {
  return (
    <Button colorScheme="red" onClick={() => signOut()}>
      Logout
    </Button>
  );
}

export default LogoutButton;
