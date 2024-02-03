import {
  Box,
  Flex,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Stack,
} from "@chakra-ui/react";
import React from "react";
import UserManagement from "../ui/user/UserManagement";

export default function page() {
  return (
    <Box>
      <UserManagement />
    </Box>
  );
}
