import SearchBar from "@/app/_components/ui/SearchBar";
import RoleFilterBar from "@/app/_components/ui/back_office/RoleFilterBar";
import { Flex, Box } from "@chakra-ui/react";
import UserAction from "@/app/_components/ui/back_office/UserAction";
import { memo } from "react";

const SearchAndRoleFilter = memo(() => (
  <Flex flex={"1 1 fit-content"} gap={2} flexWrap={"wrap"}>
    <Flex gap={2} flexBasis={"800px"} flexWrap={"wrap"}>
      <Box flex={5} flexBasis={"250px"}>
        <SearchBar placeholder="ค้นหาชื่อหรืออีเมล์" />
      </Box>
      <Box flexGrow={1} flexBasis={"120px"}>
        <RoleFilterBar />
      </Box>
    </Flex>
  </Flex>
));

SearchAndRoleFilter.displayName = "SearchAndRoleFilter";

export default function UserFilterControl() {
  return (
    <Flex flexWrap={"wrap"} mb={4} gap={2}>
      <SearchAndRoleFilter />
      <UserAction />
    </Flex>
  );
}
