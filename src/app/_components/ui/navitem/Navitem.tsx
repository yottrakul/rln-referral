import { Flex, Icon, Menu, MenuButton, Link, Box } from "@chakra-ui/react";
import nextLink from "next/link";
import { type IconType } from "react-icons";

interface NavItemProps {
  navSize: string;
  icon: IconType;
  title: string;
  active: string;
  link: string;
}

export default function Navitem({ navSize, icon, title, active, link }: NavItemProps) {
  return (
    <Flex mt={2} flexDir={"column"} w="100%" alignItems={navSize == "small" ? "center" : "flex-start"}>
      <Menu>
        <Link as={nextLink} href={link} w="100%">
          <MenuButton
            _hover={{ bg: "#f3f4f7" }}
            p={3}
            w="100%"
            borderRadius={8}
            style={link == active ? { color: "#6C13B7" } : {}}
            className={link == active ? "NavActive" : ""}
          >
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
