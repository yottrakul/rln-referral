"use client";
import { type FC, useState, useRef } from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Icon,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { FaRegTrashAlt } from "react-icons/fa";
import { cancelCase } from "@/app/_actions/request/actions";
import ModalDeleteSuccess from "./ModalDeleteSuccess";
import { useRouter } from "next/navigation";

interface CancleCaseBtnProps {
  caseId: string;
}

const CancleCaseBtn: FC<CancleCaseBtnProps> = ({ caseId }) => {
  const [isPending, setIsPending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { isOpen: isAlertOpen, onOpen: onAlertOpen, onClose: onAlertClose } = useDisclosure();
  const router = useRouter();
  const toast = useToast();
  const cancelRef = useRef<HTMLButtonElement | null>(null);
  const handleOnClick = async () => {
    // Call API to cancel case
    onAlertClose();
    try {
      setIsPending(true);
      await cancelCase(caseId);
      setIsSuccess(true);
      setTimeout(() => {
        router.push("/request");
      }, 3000);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        toast({
          title: "เกิดข้อผิดพลาด",
          description: error.message,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      } else {
        console.error("Something went wrong!");
        toast({
          title: "เกิดข้อผิดพลาด",
          description: "Something went wrong!",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    } finally {
      setIsPending(false);
    }
  };
  return (
    <>
      <Button
        isLoading={isPending}
        onClick={onAlertOpen}
        minW={"fit-content"}
        colorScheme="red"
        rightIcon={<Icon as={FaRegTrashAlt} />}
      >
        ยกเลิกคำขอ
      </Button>
      <AlertDialog isOpen={isAlertOpen} leastDestructiveRef={cancelRef} onClose={onAlertClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              ยกเลิกคำขอ
            </AlertDialogHeader>

            <AlertDialogBody>คุณแน่ใจหรือไม่ที่จะยกเลิกคำขอนี้</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onAlertClose}>
                ยกเลิก
              </Button>
              <Button colorScheme="red" onClick={handleOnClick} ml={3}>
                ลบคำขอ
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      <ModalDeleteSuccess isOpen={isSuccess} />
    </>
  );
};

export default CancleCaseBtn;
