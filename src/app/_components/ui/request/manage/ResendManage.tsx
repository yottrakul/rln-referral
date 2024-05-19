"use client";
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  DrawerFooter,
  useBreakpointValue,
  useDisclosure,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState, type FC } from "react";
import ResendCaseBtn from "./ResendCaseBtn";
import { HOSPITAL_REFER_DRAWER_ID } from "@/app/_lib/definition";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditReceiverHospitalReferalRequestSchema } from "@/app/_schemas";
import { type z } from "zod";
import { reSendCaseBySender } from "@/app/_actions/request/actions";

type DrawerPlacement = "top" | "right" | "bottom" | "left" | "end" | "start";

interface ResendManageProps {
  children: React.ReactNode;
  caseId: string;
}

const ResendManage: FC<ResendManageProps> = ({ children, caseId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [isPending, setIsPending] = useState(false);
  const method = useForm<z.infer<typeof EditReceiverHospitalReferalRequestSchema>>({
    resolver: zodResolver(EditReceiverHospitalReferalRequestSchema),
  });

  const onSubmit = async (data: z.infer<typeof EditReceiverHospitalReferalRequestSchema>) => {
    try {
      setIsPending(true);
      await reSendCaseBySender(caseId, data.receiverHospital);
      setIsPending(false);
      onClose();
    } catch (error) {
      setIsPending(false);
      if (error instanceof Error) {
        toast({
          title: "เกิดข้อผิดพลาด",
          description: error.message,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    }
  };

  const placement = useBreakpointValue({ base: "bottom", md: "right" }, { fallback: "base" })! as DrawerPlacement;

  useEffect(() => {
    if (!isOpen) {
      method.reset();
    }
  }, [isOpen, method]);

  return (
    <>
      <ResendCaseBtn onClick={onOpen} />
      <Drawer onClose={onClose} isOpen={isOpen} placement={placement}>
        <DrawerOverlay />
        <DrawerContent>
          <FormProvider {...method}>
            <DrawerCloseButton />
            <DrawerHeader>ส่งคำขออีกครั้ง</DrawerHeader>
            <DrawerBody>
              <div id={HOSPITAL_REFER_DRAWER_ID}>{children}</div>
            </DrawerBody>
            <DrawerFooter>
              <Button variant="ghost" colorScheme="red" mr={3} onClick={onClose}>
                ยกเลิก
              </Button>
              <Button isLoading={isPending} onClick={method.handleSubmit(onSubmit)} colorScheme="blue">
                ส่งต่อผู้ป่วย
              </Button>
            </DrawerFooter>
          </FormProvider>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default ResendManage;
