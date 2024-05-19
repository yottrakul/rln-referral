"use client";
import { endCase } from "@/app/_actions/request/actions";
import {
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { type FC, useRef, useState } from "react";

interface ReceiverAcceptedActionProps {
  caseId: string;
}

const ReceiverAcceptedAction: FC<ReceiverAcceptedActionProps> = ({ caseId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isPending, setIsPending] = useState(false);
  const toast = useToast();
  const cancelRef = useRef<HTMLButtonElement | null>(null);
  const handleEndTreatment = async () => {
    // console.log("End treatment", caseId);
    onClose();
    // TODO: Implement end treatment
    setIsPending(true);
    try {
      await endCase(caseId);
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: "เกิดข้อผิดพลาด",
          description: error.message,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      } else {
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
      <Button isLoading={isPending} onClick={onOpen} colorScheme="green">
        สิ้นสุดการรักษา
      </Button>
      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              สิ้นสุดการรักษา
            </AlertDialogHeader>

            <AlertDialogBody>คุณแน่ใจหรือไม่ที่จะสิ้นสุดการรักษาเคสนี้</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                ยกเลิก
              </Button>
              <Button colorScheme="green" onClick={handleEndTreatment} ml={3}>
                ยืนยัน
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default ReceiverAcceptedAction;
