"use client";
import { ChevronDownIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Flex,
  Text,
  Spacer,
  Stack,
  Center,
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
  Collapse,
} from "@chakra-ui/react";
import Link from "next/link";
import { IoHomeOutline } from "react-icons/io5";
import { LuFolderInput } from "react-icons/lu";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { FaUserFriends } from "react-icons/fa";
import { useState } from "react";
import Navitem from "../navitem/Navitem";

export default function Navbar() {
  const [navSize, changenavSize] = useState("large");
  return (
    <>
      <Flex
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
          <Navitem navSize={navSize} icon={IoHomeOutline} title="Dashboard" active />
          <Navitem navSize={navSize} icon={LuFolderInput} title="Refferal" active />
          <Navitem navSize={navSize} icon={FaUserFriends} title="Consult" active />
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
              <Heading fontSize={"lg"}>กรกฎ กิ่งแก้ว</Heading>
              <Text fontSize={"md"}>แพทย์</Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
