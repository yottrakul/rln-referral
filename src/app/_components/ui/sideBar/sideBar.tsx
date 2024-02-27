"use client";
import { ChevronDownIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Flex,
  Text,
  Avatar,
  Button,
  IconButton,
  Icon,
  MenuButton,
  MenuList,
  MenuItem,
  Menu,
  Divider,
  Heading,
  useMediaQuery,
  Tooltip,
  Link,
} from "@chakra-ui/react";
import nextLink from "next/link";
import { IoHomeOutline } from "react-icons/io5";
import { LuFolderInput } from "react-icons/lu";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { FaUserFriends } from "react-icons/fa";
import { useEffect, useState } from "react";
import Navitem from "../navitem/Navitem";

export default function Navbar() {
  const [navSize, changenavSize] = useState("large");

  const [isMobile] = useMediaQuery("(max-width: 480px)", {
    ssr: true,
    fallback: false,
  });

  useEffect(() => {
    if (isMobile) {
      changenavSize("small");
    } else {
      changenavSize("large");
    }
  }, [isMobile]);

  const navItem = [
    {
      title: "Dashboard",
      icon: IoHomeOutline,
      navSize: navSize,
      link: "/dashboard",
    },
    {
      title: "Refferal",
      icon: LuFolderInput,
      navSize: navSize,
      link: "/dashboard",
    },
    {
      title: "Consult",
      icon: FaUserFriends,
      navSize: navSize,
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
      link: "/test/dashboard",
    },
  ];

  return (
    <>
      <Flex
        display={{ base: "none", sm: "none", md: "flex", lg: "flex" }}
        bg={""}
        pos="sticky"
        left="0"
        minH="100vh"
        boxShadow="lg"
        w={navSize == "small" ? "75px" : "250px"}
        flexDir="column"
        justifyContent="space-between"
      >
        <Flex px={4} flexDir="column" alignItems={"flex-start"} as="nav">
          <IconButton
            mt={5}
            px={3}
            aria-label={"hamburger"}
            bg="none"
            _hover={{ bg: "#F3f4f7" }}
            icon={<HamburgerIcon />}
            color="black"
            onClick={() => {
              if (navSize == "small") {
                changenavSize("large");
              } else {
                changenavSize("small");
              }
            }}
          />
          {navItem.map((e) => {
            return <Navitem key={e.title} navSize={e.navSize} icon={e.icon} title={e.title} link={e.link} active />;
          })}
          <Flex
            mt={5}
            flexDir={"column"}
            w="100%"
            alignItems={navSize == "small" ? "center" : "flex-start"}
            alignContent="center"
          >
            <Menu>
              <Flex>
                <MenuButton px={3} bg="none" _hover={{ bg: "#f3f4f7" }} as={Button} w={"full"}>
                  <Flex alignItems={"center"}>
                    <Icon
                      my={2}
                      mr={navSize == "small" ? 0 : 5}
                      fontSize="xl"
                      as={HiOutlineOfficeBuilding}
                      color="black"
                    />
                    <Text display={navSize == "small" ? "none" : "flex"} fontWeight="medium">
                      Back Office
                    </Text>
                    <Icon my={2} ml={navSize == "small" ? 0 : 2} fontSize="xl" as={ChevronDownIcon} color="black" />
                  </Flex>
                </MenuButton>
              </Flex>
              <MenuList>
                {backOfficeItem.map((e) => {
                  return (
                    <Link key={e.title} as={nextLink} href={e.link}>
                      <MenuItem>
                        <Text>{e.title}</Text>
                      </MenuItem>
                    </Link>
                  );
                })}
              </MenuList>
            </Menu>
          </Flex>
        </Flex>
        <Flex p="5%" w="100%" flexDir="column" alignItems={navSize == "small" ? "center" : "flex-start"} mb={4}>
          <Divider display={navSize == "small" ? "none" : "flex"} />
          <Flex mt={4} align={"center"}>
            <Avatar size={"sm"} />
            <Flex flexDir={"column"} m={4} display={navSize == "small" ? "none" : "flex"}>
              <Tooltip label="กรกฎ กิ่งแก้วกรกฎ กิ่งแก้วกรกฎ กิ่งแก้วกรกฎ กิ่งแก้ว" aria-label="A tooltip">
                <Heading fontSize={"lg"} noOfLines={1}>
                  กรกฎ กิ่งแก้วกรกฎ กิ่งแก้วกรกฎ กิ่งแก้วกรกฎ กิ่งแก้ว
                </Heading>
              </Tooltip>
              <Text fontSize={"md"}>แพทย์</Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
