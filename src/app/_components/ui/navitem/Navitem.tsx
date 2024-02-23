import { Flex, Icon, Menu, MenuButton, Text, Link } from "@chakra-ui/react";
import nextLink from "next/link";
import { type IconType } from "react-icons";

interface NavItemProps {
  navSize: string;
  icon: IconType;
  title: string;
  active: boolean;
  link: string;
}

export default function Navitem({ navSize, icon, title, active, link }: NavItemProps) {
  return (
    <Flex mt={5} flexDir={"column"} w="100%" alignItems={navSize == "small" ? "center" : "flex-start"}>
      <Menu placement="right">
        <Link as={nextLink} href={link} w="100%">
          <MenuButton _active={{ bg: "#f3f4f7" }} _hover={{ bg: "#f3f4f7" }} px={3} borderRadius={8} w="100%">
            <Flex flexDirection={"row"} alignItems={"center"}>
              <Icon my={2} mr={5} fontSize="lg" as={icon} color={active ? "black" : "black"} placeItems={"center"} />
              <Text display={navSize == "small" ? "none" : "flex"}>{title}</Text>
            </Flex>
          </MenuButton>
        </Link>
      </Menu>
    </Flex>
  );
}
