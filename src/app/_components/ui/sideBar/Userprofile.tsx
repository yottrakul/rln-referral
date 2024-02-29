"use client";
import { Avatar, Flex, Tooltip, Heading, Text, Menu, MenuList, MenuButton, MenuItem } from "@chakra-ui/react";
import { IoIosLogOut } from "react-icons/io";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

export default function Userprofile() {
  const { data: session } = useSession();
  return (
    <>
      <Menu>
        <MenuButton _hover={{ opacity: 0.7 }}>
          <Avatar
            referrerPolicy="no-referrer"
            boxSize={10}
            name={session?.user.name ?? ""}
            src={session?.user.image ?? ""}
          />
        </MenuButton>
        <MenuList>
          <MenuItem onClick={() => signOut()} icon={<IoIosLogOut size={25} color={"#F56565"} />}>
            Logout
          </MenuItem>
        </MenuList>
      </Menu>

      <Flex display={{ base: "none", md: "flex" }} overflow={"hidden"} flexDir={"column"} className="name">
        <Tooltip label={session?.user.name} aria-label="A tooltip">
          <Heading fontSize={"md"} noOfLines={1}>
            {session?.user.name}
          </Heading>
        </Tooltip>
        <Text noOfLines={1} overflow={"hidden"} wordBreak={"keep-all"} fontSize={"sm"}>
          {session?.user.role}
        </Text>
      </Flex>
    </>
  );
}
