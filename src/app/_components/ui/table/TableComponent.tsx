import { Box, Flex, IconButton, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { IconType } from "react-icons";
import { MdOutlineEdit } from "react-icons/md";

interface tableItem {
  header: Array<{ username: string; name: string; role: string; create_date: string; edit: string }>;
  user: Array<{ user_id: number; username: string; name: string; role: string; create_date: string }>;
}

export default function TableComponent({ header, user }: tableItem) {
  console.log("header", header);

  return (
    <Flex direction="row" px={{ base: 10, lg: 20 }} pt="4" pb="10">
      <Box w="100%" boxShadow="lg">
        <TableContainer w={"100%"}>
          <Table variant="simple" size="sm">
            <Thead bg={"#04BFDA"} height="14">
              {header.map((u) => (
                <Tr key={u.username} style={{ maxHeight: "5vh" }} px="4">
                  <Th fontSize={"xl"} fontWeight="semi-bold" color="white">
                    {u.username}
                  </Th>
                  <Th fontSize={"xl"} fontWeight="semi-bold" color="white">
                    {u.name}
                  </Th>
                  <Th fontSize={"xl"} fontWeight="semi-bold" color="white">
                    {u.role}
                  </Th>
                  <Th fontSize={"xl"} fontWeight="semi-bold" color="white">
                    {u.create_date}
                  </Th>
                  <Th fontSize={"xl"} fontWeight="semi-bold" color="white">
                    {u.edit}
                  </Th>
                </Tr>
              ))}
            </Thead>
            <Tbody>
              {user.map((u) => (
                <Tr key={u.user_id} _hover={{ bg: "gray.50" }} style={{ maxHeight: "5vh" }} px="4">
                  <Td fontSize={"lg"} fontWeight="medium" color="black">
                    {u.username}
                  </Td>
                  <Td fontSize={"lg"} fontWeight="medium" color="black">
                    {u.name}
                  </Td>
                  <Td fontSize={"lg"} fontWeight="medium" color="black">
                    {u.create_date}
                  </Td>
                  <Td fontSize={"lg"} fontWeight="medium" color="black">
                    {u.role}
                  </Td>
                  <Td fontSize={"lg"} fontWeight="medium" color="black">
                    <IconButton aria-label="Edit" isRound={true} icon={<MdOutlineEdit />} />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Flex>
  );
}
