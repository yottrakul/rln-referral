"use client";
import { Button, Wrap, WrapItem, Icon, useToast } from "@chakra-ui/react";
import { useState, type FC } from "react";
import { FaUserCheck } from "react-icons/fa";
import RejectManage from "./RejectManage";
import { acceptCase } from "@/app/_actions/request/actions";

interface ReceiverActionsWrapperProps {
  caseId: string;
  children: React.ReactNode;
}

const ReceiverActionsWrapper: FC<ReceiverActionsWrapperProps> = ({ caseId, children }) => {
  const [isPending, setIsPending] = useState(false);
  const toast = useToast();
  const handleAcceptCase = async () => {
    setIsPending(true);
    // TODO: Implement accept case
    try {
      await acceptCase(caseId);
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: "เกิดข้อผิดพลาด",
          description: error.message,
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
    <Wrap justify={"end"}>
      <WrapItem>
        {/* ปุ่ม Reject เท่านั้น */}
        <RejectManage isLoading={isPending} caseId={caseId}>
          {children}
        </RejectManage>
      </WrapItem>
      <WrapItem>
        <Button
          isLoading={isPending}
          onClick={handleAcceptCase}
          colorScheme="green"
          rightIcon={<Icon as={FaUserCheck} />}
        >
          ยอมรับ
        </Button>
      </WrapItem>
    </Wrap>
  );
};

export default ReceiverActionsWrapper;
