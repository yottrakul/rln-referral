"use client";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Skeleton,
  SkeletonText,
  SkeletonCircle,
  Flex,
  Box,
} from "@chakra-ui/react";

export default function ModalLoadingSkeleton() {
  return (
    <Modal isOpen={true} onClose={() => null}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Skeleton>
            <div>heading</div>
          </Skeleton>
        </ModalHeader>
        <ModalBody>
          <Flex gap={4}>
            <SkeletonCircle size="28" />
            <Box flex={1}>
              <SkeletonText noOfLines={4} spacing="4" skeletonHeight="6" />
            </Box>
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Skeleton>
            <Button>Close</Button>
          </Skeleton>
          <Skeleton ml={4}>
            <Button>Close</Button>
          </Skeleton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
