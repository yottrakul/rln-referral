"use client";
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
  Button,
  IconButton,
  FormControl,
} from "@chakra-ui/react";
import { AddIcon, SearchIcon } from "@chakra-ui/icons";
import { MdOutlineEdit } from "react-icons/md";
import Navbar from "../navbar/Navbar";

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
    <>
      <Navbar />
      <Box position="relative" p="6" bg="#f3f4f7">
        <Box boxShadow="lg" rounded="md" bg="white">
          <Flex direction="row" mx="20" pt="6" alignItems="center">
            <Box>
              <Text fontWeight="Bold" fontSize="2xl">
                User Management
              </Text>
            </Box>
            <Spacer />
            {/* filter */}
            <Stack direction="row">
              <FormControl width="30">
                <Select placeholder="ตำแหน่งทั้งหมด">
                  <option value="option1">Doctor</option>
                  <option value="option2">Medic</option>
                </Select>
              </FormControl>
              <FormControl width="22">
                <InputGroup>
                  <Input variant="outline" placeholder="Username/ชื่อ-สกุล" />
                  <InputRightElement color={"gray.500"}>
                    <SearchIcon />
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Button
                width="30"
                rightIcon={<AddIcon />}
                color={"white"}
                _hover={{ bg: "green.500" }}
                bg="#00b300"
                shadow="lg"
              >
                <Text color={"white"} fontSize={"medium"}>
                  เพิ่ม
                </Text>
              </Button>
            </Stack>
          </Flex>
          <Flex direction="row" px={20} pt="4" pb="10">
            <Box w="100%" boxShadow="lg">
              <TableContainer w={"100%"} overflow={"auto"}>
                <Table variant="simple" size="sm">
                  <Thead bg={"#04BFDA"} height="14">
                    <Tr>
                      <Th fontSize={"xl"} minHeight="10vh" fontWeight="semi-bold" color="white">
                        <Text>username</Text>
                      </Th>
                      <Th fontSize={"xl"} fontWeight="semi-bold" color="white">
                        ชื่อ-สกุล
                      </Th>
                      <Th fontSize={"xl"} fontWeight="semi-bold" color="white">
                        วันที่สร้าง
                      </Th>
                      <Th fontSize={"xl"} fontWeight="semi-bold" color="white">
                        ตำแหน่ง
                      </Th>
                      <Th fontSize={"xl"} fontWeight="semi-bold" color="white"></Th>
                    </Tr>
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
        </Box>
      </Box>
    </>
  );
}
