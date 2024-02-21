"use client";
import {
  Flex,
  Box,
  Text,
  Stack,
  Spacer,
  InputGroup,
  Input,
  InputRightElement,
  Select,
  Button,
  FormControl,
} from "@chakra-ui/react";
import { AddIcon, SearchIcon } from "@chakra-ui/icons";
import TableComponent from "../table/TableComponent";

export default function UserManagement() {
  const header = [
    {
      username: "username",
      name: "ชื่อ-สกุล",
      role: "role",
      create_date: "วันที่สร้าง",
      edit: "",
    },
  ];

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
    <Flex flexDirection={"column"} w={"full"}>
      <Flex
        direction={{ base: "column", lg: "row" }}
        px={{ base: 10, lg: 20 }}
        pt="6"
        alignItems={{ base: "start", lg: "center" }}
      >
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
          <FormControl width="30">
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
      <TableComponent header={header} user={user} />
    </Flex>
  );
}
