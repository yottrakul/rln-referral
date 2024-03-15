"use client";
import { ChevronDownIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Flex,
  Text,
  Button,
  IconButton,
  Icon,
  MenuButton,
  MenuList,
  MenuItem,
  Menu,
  Divider,
  useMediaQuery,
  Link,
  Box,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Spacer,
} from "@chakra-ui/react";
import { IoHomeOutline, IoDocumentTextOutline, IoPersonOutline } from "react-icons/io5";
import { LuFolderInput } from "react-icons/lu";
import { TbAmbulance } from "react-icons/tb";
import { FaMagnifyingGlass, FaPlus } from "react-icons/fa6";
import { MdAccessTime, MdDriveFileMoveOutline } from "react-icons/md";
import { useEffect, useState } from "react";
import Navitem from "@/app/_components/ui/navItem/Navitem";
import { usePathname } from "next/navigation";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import UserProfile from "@/app/_components/ui/Nav/Userprofile";

const navItem = [
  {
    title: "Dashboard",
    icon: IoHomeOutline,
    link: "/dashboard",
  },
  {
    title: "รายการคำขอ",
    icon: LuFolderInput,
    link: "/backoffice_user",
  },
  {
    title: "ค้นหารายชื่อ",
    icon: FaMagnifyingGlass,
    link: "/consult",
  },
  {
    title: "ประวัติ",
    icon: MdAccessTime,
    link: "/consult",
  },
  {
    title: "คู่มือการใช้งาน",
    icon: IoDocumentTextOutline,
    link: "/consult",
  },
  {
    title: "จัดการผู้ใช้",
    icon: IoPersonOutline,
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

export default function Navbar() {
  const router = usePathname();
  const [active, changeActive] = useState(router);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [isMdSize] = useMediaQuery("(min-width: 768px)", {
    ssr: true,
    fallback: false,
  });

  useEffect(() => {
    if (isMdSize && isOpen) {
      onClose();
    }
  }, [onClose, isOpen, isMdSize]);

  // // TODO กด Link ใน Drawer แล้วปิดเอง
  // // TODO แก้ md กระพริบ
  // // TODO ทำพื้นหลังให้ Navbar ข้างบนเป็นสีเทา
  // // TODO เพิ่ม Avatar ใน Navbar
  // TODO Schema NavLink

  return (
    <Box h={"100%"} pos={"sticky"} left={0} top={0} zIndex={100} bg={"white"}>
      <Flex boxShadow={"sm"} bg={"#ffffffea"} p={4} display={{ base: "flex", md: "none" }}>
        <IconButton
          aria-label={"hamburger"}
          variant={"ghost"}
          icon={<HamburgerIcon boxSize={5} />}
          color="black"
          onClick={onOpen}
        />
        <Spacer />
        <Flex>{!isMdSize && <UserProfile />}</Flex>
      </Flex>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen} size={"md"}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader></DrawerHeader>
          <DrawerBody>
            {navItem.map((e) => {
              return (
                <Navitem
                  onClick={() => onClose()}
                  key={e.title}
                  icon={e.icon}
                  title={e.title}
                  link={e.link}
                  active="test"
                />
              );
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

      <Flex
        minH="100vh"
        boxShadow="lg"
        w={{ md: "75px", lg: "250px" }}
        transition={`width 0.25s ease-in-out`}
        flexDir="column"
        overflow="hidden"
        className="nav"
        display={{ base: "none", md: "flex" }}
      >
        <Flex pl={4} mt={4} mb={1}>
          <Flex>
            <Icon as={TbAmbulance} boxSize={8} mt={4} />
            <Icon as={MdDriveFileMoveOutline} boxSize={4} mt={2} />
          </Flex>
          <Flex>
            <Box w={"150px"} ml={3} style={{ fontWeight: "500" }}>
              Refferral & <br />
              &nbsp; Consult System +
            </Box>
          </Flex>
        </Flex>
        <Flex p="4" flexDir="column" alignItems="flex-start" as="nav">
          <Box
            opacity={{ md: 0, lg: 1 }}
            transition={`opacity 1s ease-in , width 0.5s ease-in-out 0.5s, height 0.5s ease-in-out`}
            w={{ md: "0px", lg: "100%" }}
            h={{ md: "0px", lg: "40px" }}
            className="btn"
            overflow={"hidden"}
          >
            <Button mx={2} px={6} bg={"#9E57DA"} _hover={{ bg: "#7943a5" }} color={"white"} rightIcon={<FaPlus />}>
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
                <Navitem key={e.title} icon={e.icon} title={e.title} link={e.link} active={active} />
              </Box>
            );
          })}
        </Flex>
        <Spacer />
        <Divider />
        <Flex px={4} h={"73px"} w="auto" flexDir="column">
          <Flex mt={4} gap={4}>
            <UserProfile />
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}
