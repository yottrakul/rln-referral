"use client";
import React from "react";
import {
  Flex,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Box,
  Text,
  Stack,
  Spacer,
  InputGroup,
  Input,
  InputRightElement,
  Select,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

export default function UserManagement() {
  const user = [
    { user_id: 1, username: "nuttanon_u", name: "Nuttanon Ungkachan", create_date: "01/01/1991", role: "Doctor" },
    { user_id: 1, username: "nuttanon_u", name: "Nuttanon Ungkachan", create_date: "01/01/1991", role: "Doctor" },
    { user_id: 1, username: "nuttanon_u", name: "Nuttanon Ungkachan", create_date: "01/01/1991", role: "Doctor" },
    { user_id: 1, username: "nuttanon_u", name: "Nuttanon Ungkachan", create_date: "01/01/1991", role: "Doctor" },
    { user_id: 1, username: "nuttanon_u", name: "Nuttanon Ungkachan", create_date: "01/01/1991", role: "Doctor" },
    { user_id: 1, username: "nuttanon_u", name: "Nuttanon Ungkachan", create_date: "01/01/1991", role: "Doctor" },
    { user_id: 1, username: "nuttanon_u", name: "Nuttanon Ungkachan", create_date: "01/01/1991", role: "Doctor" },
    { user_id: 1, username: "nuttanon_u", name: "Nuttanon Ungkachan", create_date: "01/01/1991", role: "Doctor" },
    { user_id: 1, username: "nuttanon_u", name: "Nuttanon Ungkachan", create_date: "01/01/1991", role: "Doctor" },
    { user_id: 1, username: "nuttanon_u", name: "Nuttanon Ungkachan", create_date: "01/01/1991", role: "Doctor" },
  ];

  return (
    <Box position="relative" px="6" pt={20} overflow="auto">
      <Box boxShadow="lg" rounded="md" bg="white">
        <Flex direction="row" justify="between" my="10" mx="20">
          <Box>
            <Text as="b" fontSize="2xl">
              User
            </Text>
          </Box>
          <Spacer />
          {/* filter */}
          <Stack direction="row">
            <Select placeholder="Select option">
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </Select>
            <InputGroup>
              <Input variant="outline" placeholder="Username/Name" />
              <InputRightElement color={"gray.500"}>
                <SearchIcon />
              </InputRightElement>
            </InputGroup>
          </Stack>
        </Flex>
        <Flex direction="row" mt={4} px={20}>
          <Box boxShadow="lg" w="100%">
            <TableContainer w={"100%"} overflow={"auto"}>
              <Table variant="simple" border="4px solid" borderColor="gray.200">
                <TableCaption>User Account</TableCaption>
                <Thead bg={"#EDF2F7"} fontSize={"xl"}>
                  <Tr>
                    <Th>Username</Th>
                    <Th>Name - Surname</Th>
                    <Th>Create Date</Th>
                    <Th>Role</Th>
                  </Tr>
                </Thead>
                <Tbody fontSize={"lg"}>
                  {user.map((u) => (
                    <Tr key={u.user_id}>
                      <Td>{u.username}</Td>
                      <Td>{u.name}</Td>
                      <Td>{u.create_date}</Td>
                      <Td>{u.role}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}
