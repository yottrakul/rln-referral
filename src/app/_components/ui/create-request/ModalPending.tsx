import { Modal, ModalOverlay, ModalContent, ModalBody, Box, VStack, Heading, Text } from "@chakra-ui/react";
import type { FC } from "react";
import referLoading from "@/app/_components/lottie/refer_loading.json";
import Lottie from "lottie-react";

interface ModalPendingProps {
  isOpen: boolean;
}

const ModalPending: FC<ModalPendingProps> = ({ isOpen }) => {
  return (
    <Modal isCentered isOpen={isOpen} onClose={() => console.log("creating referral case...")}>
      <ModalOverlay />
      <ModalContent>
        <ModalBody p={8} display={"grid"} placeItems={"center"}>
          <VStack>
            <Box boxSize={"20rem"}>
              <Lottie animationData={referLoading} loop={true} />
            </Box>
            <Heading>กำลังสร้างคำขอ...</Heading>
            <Text>กรุณารอสักครู่</Text>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ModalPending;
