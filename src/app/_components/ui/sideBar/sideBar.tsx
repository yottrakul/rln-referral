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
  const [navSize, changenavSize] = useState("small");

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
      link: "/backoffice_role",
    },
  ];

  return (
    <>
      <Flex
        display={{ base: "none", lg: "flex" }}
        pos="sticky"
        left="0"
        minH="100vh"
        boxShadow="lg"
        w={navSize == "small" ? "75px" : "250px"}
        transition={`width 0.25s ease-in-out, border-radius 0.25s ease-in-out`}
        flexDir="column"
        justifyContent="space-between"
      >
        <Flex p="5" flexDir="column" alignItems={navSize == "small" ? "center" : "flex-start"} as="nav">
          <IconButton
            aria-label={"hamburger"}
            bg="none"
            _hover={{ bg: "none" }}
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
            mt={30}
            flexDir={"column"}
            w="100%"
            alignItems={navSize == "small" ? "center" : "flex-start"}
            alignContent="center"
          >
            <Menu>
              <MenuButton bg="none" _hover={{ bg: "#f3f4f7" }} as={Button} rightIcon={<ChevronDownIcon />}>
                <Flex alignItems={navSize == "small" ? "center" : "flex-start"}>
                  <Icon fontSize="xl" as={HiOutlineOfficeBuilding} color="black" />
                  <Text ml={5} display={navSize == "small" ? "none" : "flex"} fontWeight="medium">
                    Back Office
                  </Text>
                </Flex>
              </MenuButton>
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
        <Flex
          p="5%"
          w="100%"
          flexDir="column"
          alignItems={navSize == "small" ? "center" : "flex-start"}
          mb={4}
          transition={`width 0.5s ease-in-out, display 0.5s ease-in-out`}
        >
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
