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
    <Flex mt={30} flexDir={"column"} w="100%" alignItems={navSize == "small" ? "center" : "flex-start"}>
      <Menu placement="right">
        <Link as={nextLink} href={link} w="100%">
          <MenuButton _active={{ bg: "#f3f4f7" }} _hover={{ bg: "#f3f4f7" }} p={3} borderRadius={8} w="100%">
            <Flex alignItems={navSize == "small" ? "center" : "flex-start"}>
              <Icon fontSize="xl" as={icon} color={active ? "black" : "black"} />
              <Text ml={5} display={navSize == "small" ? "none" : "flex"}>
                {title}
              </Text>
            </Flex>
          </MenuButton>
        </Link>
      </Menu>
    </Flex>
  );
}
