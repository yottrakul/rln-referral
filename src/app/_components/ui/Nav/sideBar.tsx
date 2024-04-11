"use client";
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
import Navitem from "@/app/_components/ui/navitem/Navitem";
import UserProfile from "@/app/_components/ui/Nav/Userprofile";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navItem } from "@/app/_lib/const";
// icon
import { HamburgerIcon } from "@chakra-ui/icons";
import { TbAmbulance } from "react-icons/tb";
import { FaPlus } from "react-icons/fa6";
import { MdDriveFileMoveOutline } from "react-icons/md";

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
      <Drawer placement="left" onClose={onClose} isOpen={isOpen} size={"xs"}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader></DrawerHeader>
          <DrawerBody>
            <Box w={"100%"} h={"40px"}>
              <Button mx={2} px={6} bg={"#9E57DA"} _hover={{ bg: "#7943a5" }} color={"white"} rightIcon={<FaPlus />}>
                สร้างคำขอ
              </Button>
            </Box>

            {navItem.map((e) => {
              return (
                <Box
                  style={{ marginLeft: "-6px" }}
                  key={e.title}
                  w="100%"
                  onClick={() => {
                    changeActive(e.link);
                    onClose();
                  }}
                >
                  <Navitem key={e.title} icon={e.icon} title={e.title} link={e.link} active={active} />
                </Box>
              );
            })}
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
          <Flex>
            <Box
              transition={`width 0.15s ease-in-out, height 0.15s ease-in-out`}
              w={{ md: "0px", lg: "100%" }}
              h="40px"
              className="btn"
              overflow={"hidden"}
            >
              <Button mx={2} px={6} bg={"#9E57DA"} _hover={{ bg: "#7943a5" }} color={"white"} rightIcon={<FaPlus />}>
                สร้างคำขอ
              </Button>
            </Box>
            <Box
              style={{ marginLeft: "-2.5px" }}
              transition={`width 0.15s ease-in-out, height 0.15s ease-in-out`}
              w={{ md: "100%", lg: "0px" }}
              h="40px"
              className="btns"
              overflow={"hidden"}
            >
              <Button bg={"white"} color={"#9E57DA"}>
                <Icon as={FaPlus}></Icon>
              </Button>
            </Box>
          </Flex>

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
