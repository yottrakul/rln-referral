import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import type { ModalProps } from "@chakra-ui/react";
import type { FC } from "react";

interface ModalMedRecordDetailProps extends Omit<ModalProps, "children"> {
  patientDetail?: string;
}

const ModalMedRecordDetail: FC<ModalMedRecordDetailProps> = ({ onClose, isOpen, patientDetail, ...rest }) => {
  return (
    <Modal size={"5xl"} isOpen={isOpen} onClose={onClose} {...rest}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          รายละเอียดประวัติการรักษา
          <Text fontSize={"sm"} fontWeight={"400"}>
            รายละเอียดของผู้ป่วยเบื้องต้น
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>รายละเอียดผู้ป่วย</FormLabel>
            <Textarea value={patientDetail} isReadOnly placeholder="รายละเอียดผู้ป่วย" />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            ปิดหน้าต่าง
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalMedRecordDetail;
