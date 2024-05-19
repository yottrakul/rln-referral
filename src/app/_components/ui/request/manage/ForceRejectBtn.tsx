"use client";
import { type FC, useRef } from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure,
} from "@chakra-ui/react";

interface ForceRejectBtnProps {
  onClick?: () => void;
  isLoading?: boolean;
}

const ForceRejectBtn: FC<ForceRejectBtnProps> = ({ onClick, isLoading }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement | null>(null);

  const handleOnSubmit = () => {
    onClick && onClick();
    onClose();
  };

  return (
    <>
      <Button isLoading={isLoading} onClick={onOpen} colorScheme="red" w="full">
        ปฏิเสธคำขอ
      </Button>
      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              ปฏิเสธคำขอ
            </AlertDialogHeader>

            <AlertDialogBody>แน่ใจหรือไม่ที่จะปฏิเสธคำขอนี้?</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                ยกเลิก
              </Button>
              <Button colorScheme="red" onClick={handleOnSubmit} ml={3}>
                ปฏิเสธคำขอ
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default ForceRejectBtn;
