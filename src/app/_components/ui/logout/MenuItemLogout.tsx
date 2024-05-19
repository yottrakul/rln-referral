"use client";
import { MenuItem } from "@chakra-ui/react";
import { signOut } from "next-auth/react";
import { IoIosLogOut } from "react-icons/io";

export default function MenuItemLogout() {
  return (
    <MenuItem onClick={() => signOut()} icon={<IoIosLogOut size={25} color={"#F56565"} />}>
      Logout
    </MenuItem>
  );
}
