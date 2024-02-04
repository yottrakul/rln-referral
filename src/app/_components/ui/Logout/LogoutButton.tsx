"use client";
import { Button } from "@chakra-ui/react";
import { logout } from "@/app/_actions/auth/logout";

function LogoutButton() {
  const handleLogout = async () => {
    await logout();
  };

  return (
    <Button colorScheme="red" onClick={handleLogout}>
      Logout
    </Button>
  );
}

export default LogoutButton;
