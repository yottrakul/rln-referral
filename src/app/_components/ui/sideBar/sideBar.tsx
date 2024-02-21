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
  Box,
  Hide,
  Image,
} from "@chakra-ui/react";
import * as io5 from "react-icons/io5";
import { LuFolderInput } from "react-icons/lu";
import * as fa6 from "react-icons/fa6";
import * as md from "react-icons/md";
import { TbAmbulance } from "react-icons/tb";
import { MdDriveFileMoveOutline } from "react-icons/md";
import { useEffect, useState } from "react";
import Navitem from "../navitem/Navitem";

export default function Navbar() {
  const [active, changeActive] = useState(location.pathname);
  const [navSize, changenavSize] = useState("large");

  const [isMobile] = useMediaQuery("(max-width: 1000px)", {
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
      icon: io5.IoHomeOutline,
      navSize: navSize,
      link: "/dashboard",
    },
    {
      title: "รายการคำขอ",
      icon: LuFolderInput,
      navSize: navSize,
      link: "/backoffice_user",
    },
    {
      title: "ค้นหารายชื่อ",
      icon: fa6.FaMagnifyingGlass,
      navSize: navSize,
      link: "/consult",
    },
    {
      title: "ประวัติ",
      icon: md.MdAccessTime,
      navSize: navSize,
      link: "/consult",
    },
    {
      title: "คู่มือการใช้งาน",
      icon: io5.IoDocumentTextOutline,
      navSize: navSize,
      link: "/consult",
    },
    {
      title: "จัดการผู้ใช้",
      icon: io5.IoPersonOutline,
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
    <Box
      h="100%"
      pos={{ base: "fixed", md: "sticky" }}
      left={{ base: "-75px", md: "0px" }}
      top="0px"
      transition={`left 0.25s ease-in-out`}
    >
      <Flex
        minH="100vh"
        boxShadow="lg"
        bg="white"
        w={navSize == "small" ? "75px" : "250px"}
        transition={`width 0.25s ease-in-out`}
        flexDir="column"
        justifyContent="space-between"
        overflow="hidden"
        _hover={{ width: "250px" }}
      >
        <Flex p="4" flexDir="column" alignItems="flex-start" as="nav">
          <Flex mb={navSize == "small" ? "2" : "5"} ml={navSize == "small" ? "" : "2"} transition={`margin 0.25s`}>
            <Icon as={TbAmbulance} boxSize={8} mt={4} />
            <Icon as={MdDriveFileMoveOutline} boxSize={4} mt={2} />
            <Box w={"150px"} ml={3} style={{ fontWeight: "500" }}>
              Refferral & <br />
              &nbsp; Consult System +
            </Box>
          </Flex>

          {/* <IconButton
            aria-label={"hamburger"}
            w="43px"
            bg="none"
            _hover={{ bg: "#f3f4f7" }}
            icon={<HamburgerIcon />}
            color="black"
            onClick={() => {
              if (navSize == "small") {
                changenavSize("large");
              } else {
                changenavSize("small");
              }
            }}
          /> */}

          <Box
            w={navSize == "small" ? "0px" : "100%"}
            h={navSize == "small" ? "0px" : "40px"}
            transition={`width 0.25s,height 0.25s 0.25s`}
            overflow={"hidden"}
          >
            <Button mx={2} px={6} bg={"#9E57DA"} color={"white"} rightIcon={<fa6.FaPlus />}>
              สร้างคำขอ
            </Button>
          </Box>

          {navItem.map((e) => {
            return (
              <Box
                key={e.title}
                w="100%"
                onClick={() => {
                  changeActive(e.link);
                }}
              >
                <Navitem
                  key={e.title}
                  navSize={e.navSize}
                  icon={e.icon}
                  title={e.title}
                  link={e.link}
                  active={active}
                />
              </Box>
            );
          })}
        </Flex>

        <Flex
          p="5%"
          w="100%"
          flexDir="column"
          alignItems={navSize == "small" ? "center" : "flex-start"}
          transition={`width 0.5s ease-in-out, display 0.5s ease-in-out`}
        >
          <Divider display={navSize == "small" ? "none" : "flex"} />
          <Flex mt={4} align={"center"}>
            <Avatar size={"sm"} mb={navSize == "small" ? "4" : ""} />
            <Flex flexDir={"column"} mx={4} display={navSize == "small" ? "none" : "flex"}>
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
    </Box>
  );
}
