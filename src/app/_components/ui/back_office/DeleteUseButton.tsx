"use client";
import {
  Button,
  Circle,
  Text,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Center,
} from "@chakra-ui/react";
import { useUserContext } from "../../context/UserManagementContext";
import { useToast } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";

export default function DeleteUseButton() {
  const { deleteUser, user } = useUserContext();
  const [error_msg, setErrorMsg] = useState("");
  useEffect(() => {
    if (error_msg == "พบไอดีของคุณในรายการที่ต้องการลบ") {
      toast({
        title: error_msg,
        status: "error",
        isClosable: true,
      });
    }
  }, [error_msg]);
  const toast = useToast();
  const handleDelete = async () => {
    const status = await deleteUser();
    if (status == "error") {
      setErrorMsg("พบไอดีของคุณในรายการที่ต้องการลบ");
      throw new Error("");
    }
  };
  const { isOpen, onOpen, onClose } = useDisclosure();

  if (user.length != 0) {
    return (
      <Button colorScheme="red" onClick={onOpen}>
        ลบ
        <Modal isCentered size={"sm"} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              <Center>
                <Circle size="60px" bg={"red"}>
                  <CloseIcon color={"white"} />
                </Circle>
              </Center>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text fontSize={"2xl"} textAlign={"center"}>
                คุณต้องการลบผู้ใช้งานที่เลือกทั้งหมดหรือไม่?
              </Text>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="red" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button
                colorScheme="green"
                mr={3}
                onClick={() =>
                  toast.promise(handleDelete(), {
                    success: { title: "ลบผู้ใช้งานเรียบร้อย", description: "Success!!" },
                    error: { title: "เกิดข้อผิดพลาด", description: error_msg },
                    loading: { title: "กำลังลบผู้ใช้งาน", description: "Pending..." },
                  })
                }
              >
                ยืนยัน
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Button>
    );
  }
}
