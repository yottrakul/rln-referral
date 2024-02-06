import { Flex, Icon, Menu, MenuButton, Text } from "@chakra-ui/react";
import Link from "next/link";
import { type IconType } from "react-icons";

interface NavItemProps {
  navSize: string;
  icon: IconType;
  title: string;
  active: boolean;
}

export default function Navitem({ navSize, icon, title, active }: NavItemProps) {
  return (
    <Flex mt={30} flexDir={"column"} w="100%" alignItems={navSize == "small" ? "center" : "flex-start"}>
      <Menu placement="right">
        <MenuButton
          _active={{ bg: "#f3f4f7" }}
          _hover={{ bg: "#f3f4f7" }}
          p={3}
          borderRadius={8}
          w={navSize == "large" ? "100%" : undefined}
        >
          <Link href="/backoffice_user">
            <Flex alignItems={navSize == "small" ? "center" : "flex-start"}>
              <Icon fontSize="xl" as={icon} color={active ? "black" : "black"} />
              <Text ml={5} display={navSize == "small" ? "none" : "flex"}>
                {title}
              </Text>
            </Flex>
          </Link>
        </MenuButton>
      </Menu>
    </Flex>
  );
}
