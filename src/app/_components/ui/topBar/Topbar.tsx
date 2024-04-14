"use client";
import { ChevronDownIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  useDisclosure,
  Text,
  Button,
  Icon,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { FaUserFriends } from "react-icons/fa";
import { IoHomeOutline } from "react-icons/io5";
import { LuFolderInput } from "react-icons/lu";
import Navitem from "../navbar/Navitem";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import Link from "next/link";

export default function Topbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const [isMobile] = useMediaQuery("(max-width: 480px)", {
  //   ssr: true,
  //   fallback: false,
  // });

  const navItem = [
    {
      title: "Dashboard",
      icon: IoHomeOutline,
      navSize: "large",
      link: "/dashboard",
    },
    {
      title: "Refferal",
      icon: LuFolderInput,
      navSize: "large",
      link: "/refferal",
    },
    {
      title: "Consult",
      icon: FaUserFriends,
      navSize: "large",
      link: "/consult",
    },
  ];

  const backOfficeItem = [
    {
      title: "User Management",
      link: "/backoffice_user",
    },
    {
      title: "role",
      link: "/backoffice_role",
    },
  ];

  return (
    <>
      <Flex p={4} display={{ base: "flex", sm: "flex", md: "none", lg: "none" }}>
        <IconButton
          aria-label={"hamburger"}
          bg="none"
          _hover={{ bg: "none" }}
          icon={<HamburgerIcon />}
          color="black"
          onClick={onOpen}
        />
      </Flex>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen} size={"md"}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader></DrawerHeader>
          <DrawerBody>
            {navItem.map((e) => {
              return <Navitem key={e.title} icon={e.icon} title={e.title} link={e.link} active="test" />;
            })}
            <Flex mt={30} flexDir={"column"} w="100%" alignItems="flex-start" alignContent="center">
              <Menu>
                <MenuButton
                  px={3}
                  bg="none"
                  _hover={{ bg: "#f3f4f7" }}
                  w="100%"
                  as={Button}
                  rightIcon={<ChevronDownIcon />}
                >
                  <Flex alignItems="center">
                    <Icon my={2} mr={5} fontSize="xl" as={HiOutlineOfficeBuilding} color="black" />
                    <Text display={"flex"} fontWeight="medium">
                      Back Office
                    </Text>
                  </Flex>
                </MenuButton>
                <MenuList>
                  {backOfficeItem.map((e) => {
                    return (
                      <MenuItem
                        key={e.title}
                        onClick={() => {
                          onClose();
                        }}
                      >
                        <Link href={e.link}>
                          <Text>{e.title}</Text>
                        </Link>
                      </MenuItem>
                    );
                  })}
                </MenuList>
              </Menu>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
