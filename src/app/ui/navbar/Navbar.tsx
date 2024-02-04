"use client";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
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
} from "@chakra-ui/react";
import Link from "next/link";
import { useState } from "react";
import { IoHomeOutline } from "react-icons/io5";
import { LuFolderInput } from "react-icons/lu";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { FaUserFriends } from "react-icons/fa";

export default function Navbar() {
  return (
    <>
      <Flex height="20" bg="#9E57DA" p="4">
        <Text alignSelf="center" fontSize="xl" fontWeight="bold" color="white">
          Refferal & Consult System +
        </Text>
        <Spacer />
        <Menu>
          {({ isOpen }) => (
            <>
              <MenuButton
                bg="none"
                rounded="full"
                isActive={isOpen}
                as={IconButton}
                colorScheme="none"
                icon={<Avatar bg="none" border="1px solid" borderColor="white" />}
              ></MenuButton>
              <MenuList>
                <MenuItem>
                  <Link href={"/UserBackOffice"}>
                    <Text fontSize="md" fontWeight="medium" color="black">
                      Profile
                    </Text>
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link href={"/UserBackOffice"}>
                    <Text fontSize="md" fontWeight="medium" color="black">
                      Sign Out
                    </Text>
                  </Link>
                </MenuItem>
              </MenuList>
            </>
          )}
        </Menu>
      </Flex>
      <Flex height="7vh" bg="#FFFFF" p="4">
        <Center>
          <Stack direction="row" alignSelf="center" spacing="1">
            <Button _hover={{ bg: "gray.100" }} bg="none" rounded="full">
              <Link href={"/Home"}>
                <Stack direction="row" spacing={4}>
                  <Center>
                    <Icon as={IoHomeOutline} color="black" mx={2} />
                    <Text fontSize="lg" fontWeight="semi-bold" color="black">
                      Home
                    </Text>
                  </Center>
                </Stack>
              </Link>
            </Button>
            <Button _hover={{ bg: "gray.100" }} bg="none" rounded="full">
              <Link href={"/Refferal"}>
                <Stack direction="row" spacing={2}>
                  <Center>
                    <Icon as={LuFolderInput} mx="2" />
                    <Text fontSize="md" fontWeight="semi-bold" color="black">
                      Refferal
                    </Text>
                  </Center>
                </Stack>
              </Link>
            </Button>
            <Button _hover={{ bg: "gray.100" }} bg="none" rounded="full">
              <Link href={"/Consult"}>
                <Stack direction="row" spacing={2}>
                  <Center>
                    <Icon as={FaUserFriends} mx="2" />
                    <Text fontSize="md" fontWeight="semi-bold" color="black">
                      Consult
                    </Text>
                  </Center>
                </Stack>
              </Link>
            </Button>
            <Menu>
              {({ isOpen }) => (
                <>
                  <MenuButton bg="none" rounded="full" isActive={isOpen} as={Button} rightIcon={<ChevronDownIcon />}>
                    <Stack direction="row">
                      <Center>
                        <Icon as={HiOutlineOfficeBuilding} mx="2" />
                        {isOpen ? "BackOffice" : "BackOffice"}
                      </Center>
                    </Stack>
                  </MenuButton>
                  <MenuList>
                    <MenuItem>
                      <Link href={"/UserBackOffice"}>
                        <Text fontSize="md" fontWeight="medium" color="black">
                          User Management
                        </Text>
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link href={"/Role"}>
                        <Text fontSize="md" fontWeight="medium" color="black">
                          Role Management
                        </Text>
                      </Link>
                    </MenuItem>
                  </MenuList>
                </>
              )}
            </Menu>
          </Stack>
        </Center>
      </Flex>
    </>
  );
}
