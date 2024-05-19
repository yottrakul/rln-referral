"use client";
import { Modal, ModalOverlay, ModalContent, ModalBody, Box, VStack, Heading, Text } from "@chakra-ui/react";
import type { FC } from "react";
import referDeleted from "@/app/_components/lottie/refer_delete.json";
import Lottie from "lottie-react";

interface ModalDeleteSuccessProps {
  isOpen: boolean;
}

const ModalDeleteSuccess: FC<ModalDeleteSuccessProps> = ({ isOpen }) => {
  return (
    <Modal isCentered isOpen={isOpen} onClose={() => console.log("deleted referral case...")}>
      <ModalOverlay />
      <ModalContent>
        <ModalBody p={8} display={"grid"} placeItems={"center"}>
          <VStack>
            <Box boxSize={"20rem"}>
              <Lottie animationData={referDeleted} loop={true} />
            </Box>
            <Heading>ลบรายการคำขอเสร็จสิ้น</Heading>
            <Text>กรุณารอสักครู่ กำลังกลับไปหน้าหลัก...</Text>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ModalDeleteSuccess;
