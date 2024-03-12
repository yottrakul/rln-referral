import { Avatar, Flex, Tooltip, Heading, Text, Menu, MenuList, MenuButton, MenuItem } from "@chakra-ui/react";
import { IoIosLogOut } from "react-icons/io";
import { signOut } from "next-auth/react";
import { getServerAuthSession } from "@/server/auth";
import { getToken } from "next-auth/jwt";
import MenuItemLogout from "../Logout/MenuItemLogout";

export default async function Userprofile() {
  const session = await getServerAuthSession();
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
          <MenuItemLogout />
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
