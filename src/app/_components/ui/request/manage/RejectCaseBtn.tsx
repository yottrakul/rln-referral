/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button, type ChakraComponent, Icon } from "@chakra-ui/react";
import { FaUserAltSlash } from "react-icons/fa";

type RejectBtnProps = ChakraComponent<
  "button",
  {
    isLoading?: boolean;
  }
>;

const RejectCaseBtn = (({ isLoading, ...rest }) => {
  return (
    <Button isLoading={isLoading} rightIcon={<Icon as={FaUserAltSlash} />} {...rest} colorScheme="red">
      ปฏิเสธ
    </Button>
  );
}) as RejectBtnProps;

export default RejectCaseBtn;
