"use client";
import { Button, type ChakraComponent } from "@chakra-ui/react";
// import isMobile from "ismobilejs";

type ResendBtnProps = ChakraComponent<"button">;

const ResendCaseBtn = (({ ...rest }) => {
  return (
    <Button {...rest} colorScheme="blue">
      ส่งคำขออีกครั้ง
    </Button>
  );
}) as ResendBtnProps;

export default ResendCaseBtn;
