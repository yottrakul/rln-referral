"use client";
import { Flex, Icon, Menu, MenuButton, Link, Box } from "@chakra-ui/react";
import nextLink from "next/link";
import { type IconType } from "react-icons";
import { motion } from "framer-motion";

interface NavItemProps {
  icon: IconType;
  title: string;
  active: string;
  link: string;
  onClick?: () => void;
}

export default function Navitem({ icon, title, active, link, onClick }: NavItemProps) {
  return (
    <Flex mt={2} flexDir={"column"} w="100%">
      <Menu>
        <Link onClick={onClick} as={nextLink} href={link} w="100%">
          <MenuButton
            _hover={{ bg: "#f3f4f7" }}
            p={3}
            w="100%"
            borderRadius={8}
            style={link == active ? { color: "#6C13B7" } : {}}
            position={"relative"}
          >
            {link === active ? (
              <Box
                layoutId="navActive"
                as={motion.div}
                position={"absolute"}
                left={"-28px"}
                top={0}
                width={"19px"}
                height={"100%"}
                borderRadius={"6px"}
                bgColor={"#6C13B7"}
              ></Box>
            ) : null}

            <Flex alignItems="center" w="250px">
              <Icon fontSize="xl" as={icon} color="#6C13B7" />
              <Box ml={7} h="25px" w="100%" display="flex">
                {title}
              </Box>
            </Flex>
          </MenuButton>
        </Link>
      </Menu>
    </Flex>
  );
}
