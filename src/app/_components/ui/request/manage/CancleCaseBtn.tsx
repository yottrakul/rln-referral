"use client";
import { type FC, useState } from "react";
import { Button, Icon, useToast } from "@chakra-ui/react";
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
  const router = useRouter();
  const toast = useToast();
  const handleOnClick = async () => {
    console.log("Cancel Case");
    // Call API to cancel case
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
        onClick={handleOnClick}
        minW={"fit-content"}
        colorScheme="red"
        rightIcon={<Icon as={FaRegTrashAlt} />}
      >
        ยกเลิกคำขอ
      </Button>
      <ModalDeleteSuccess isOpen={isSuccess} />
    </>
  );
};

export default CancleCaseBtn;
