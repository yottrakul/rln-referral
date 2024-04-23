import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Grid,
  GridItem,
  Stack,
  FormControl,
  FormLabel,
  Textarea,
  Input,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  FormErrorMessage,
  Divider,
  AbsoluteCenter,
  SimpleGrid,
  ModalFooter,
  Button,
  Text,
  Box,
  Card,
  CardBody,
  IconButton,
  Flex,
  HStack,
  type ModalProps,
  Avatar,
  Heading,
} from "@chakra-ui/react";
import { SmallCloseIcon } from "@chakra-ui/icons";
import { isUndefined } from "lodash";
import { type FC, useRef, useCallback, useMemo } from "react";
import { FormProvider } from "react-hook-form";
import FileUploadProvider from "../../context/FileUploadContext";
import AutoComplete from "../AutoComplete";
import DropzoneField from "../dropzone/DropzoneField";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateMedicalRecordSchema } from "@/app/_schemas";
import { type z } from "zod";
import { useQuery } from "@tanstack/react-query";
import { getAllDoctors } from "@/app/_actions/create-request/actions";
import { type Hospital } from "@/app/_schemas/generated/zod";
import { type AutoCompleteItem } from "@/app/_components/ui/AutoComplete";
import FilePreview from "@/app/_components/ui/create-request/FilePreview";
import { useMedicalContext } from "@/app/_components/context/MedicalRecordContext";

interface ModalMedRecordCreateProps extends Omit<ModalProps, "children"> {
  hospitals: Hospital[];
}

const ModalMedRecordCreate: FC<ModalMedRecordCreateProps> = ({ hospitals, onClose, isOpen, ...rest }) => {
  const {
    data: doctors,
    isLoading,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ["doctors"],
    queryFn: async () => {
      try {
        const res = await getAllDoctors();
        if (res.success) {
          if (!res.data) return [];
          return res.data;
        } else {
          throw new Error("Cannot fetch doctors");
        }
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
          throw new Error(error.message);
        } else {
          console.error("Cannot fetch doctors");
          throw new Error("Cannot fetch doctors");
        }
      }
    },
    staleTime: 0,
  });
  const { addMedicalRecord } = useMedicalContext();
  const methodsForm = useForm<z.infer<typeof CreateMedicalRecordSchema>>({
    resolver: zodResolver(CreateMedicalRecordSchema),
    defaultValues: {
      detail: "",
    },
  });
  const _modalRef = useRef(null);

  const onSubmit = async (data: z.infer<typeof CreateMedicalRecordSchema>) => {
    console.log(data);
    addMedicalRecord(data);
    onClose();
  };

  // Doctor Preview
  const handleOnSelectedDoctor = (doctor: AutoCompleteItem) => {
    methodsForm.setValue("doctorId", doctor.value, { shouldValidate: true });
  };
  const handleOnClearDoctorForm = useCallback(() => {
    methodsForm.setValue("doctorId", "", { shouldValidate: true });
  }, [methodsForm]);

  const doctorsItems = useMemo(
    () =>
      doctors?.map((doctor) => ({
        label: `${doctor.prefixName ?? ""} ${doctor.firstName ?? "ไม่ระบุชื่อจริง"} ${doctor.lastName ?? "ไม่ระบุนามสกุล"} (${doctor.email})`,
        value: doctor.id,
      })),
    [doctors]
  );
  const targetDoctorId = methodsForm.watch("doctorId");
  const doctorPreview = useMemo(() => {
    if (!targetDoctorId || isUndefined(doctors)) return null;
    const doctor = doctors?.find((doctor) => doctor.id === targetDoctorId);
    if (!doctor) return <Text mt={4}>ไม่พบข้อมูลแพทย์</Text>;
    const hospitalName = hospitals.find((hospital) => hospital.id === doctor.hospitalId)?.hospitalName;
    return (
      <Card
        sx={{
          border: "2px solid var(--chakra-colors-purple-400)",
        }}
        mt={4}
      >
        <CardBody py={2} px={4}>
          <Flex justifyContent={"space-between"} alignItems={"center"}>
            <HStack>
              {doctor.image && <Avatar name={doctor.name ?? "Dr"} size={"md"} src={doctor.image} />}
              <Box>
                <Heading size="sm">{`${doctor.prefixName ?? "-"} ${doctor.firstName ?? "-"} ${doctor.lastName ?? "-"} (${doctor.email})`}</Heading>
                <Text>{hospitalName ?? "ไม่ระบุโรงพยาบาล"}</Text>
              </Box>
            </HStack>
            <IconButton
              isRound
              variant="ghost"
              colorScheme="red"
              aria-label="Clear Doctor Form"
              icon={<SmallCloseIcon boxSize={6} />}
              onClick={handleOnClearDoctorForm}
            />
          </Flex>
        </CardBody>
      </Card>
    );
  }, [targetDoctorId, doctors, hospitals, handleOnClearDoctorForm]);

  return (
    <Modal size={"5xl"} isOpen={isOpen} onClose={onClose} {...rest}>
      <ModalOverlay />
      <ModalContent ref={_modalRef}>
        <ModalHeader>
          เพิ่มประวัติการรักษา
          <Text fontSize={"sm"} fontWeight={"400"}>
            กรอกรายละเอียดของผู้ป่วยเบื้องต้นและอัปโหลดไฟล์รูปภาพที่เกี่ยวข้อง
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FileUploadProvider>
            <FormProvider {...methodsForm}>
              <form onSubmit={methodsForm.handleSubmit(onSubmit)}>
                <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                  <GridItem>
                    <Stack>
                      <FormControl>
                        <FormLabel>ข้อมูลผู้ป่วย</FormLabel>
                        <Textarea {...methodsForm.register("detail")} placeholder="ระบุ" />
                      </FormControl>
                      <FormControl isInvalid={!!methodsForm.formState.errors.doctorId}>
                        <FormLabel>ลงชื่อแพทย์</FormLabel>
                        <Input {...methodsForm.register("doctorId")} hidden />

                        {isError && (
                          <Alert marginBottom={2} status="error">
                            <AlertIcon />
                            <AlertTitle>ระบบขัดข้อง!</AlertTitle>
                            <AlertDescription>กรุณาลองใหม่อีกครั้ง หรือติดต่อผู้ดูแลระบบ.</AlertDescription>
                          </Alert>
                        )}
                        <AutoComplete
                          items={doctorsItems}
                          onSelect={handleOnSelectedDoctor}
                          placeholder={
                            isLoading || isFetching
                              ? "กำลังโหลดข้อมูล..."
                              : isError
                                ? "ไม่สามารถโหลดข้อมูล"
                                : "ค้นหาแพทย์"
                          }
                          potalRef={_modalRef}
                        />
                        {methodsForm.formState.errors.doctorId && (
                          <FormErrorMessage>กรุณาเลือกชื่อแพทย์เจ้าของเคส</FormErrorMessage>
                        )}
                        {doctorPreview}
                      </FormControl>
                    </Stack>
                  </GridItem>
                  <GridItem>
                    <FormControl>
                      <FormLabel>รูปภาพ</FormLabel>
                      <DropzoneField name="images" multiple />
                    </FormControl>
                  </GridItem>
                  <GridItem colSpan={2}></GridItem>
                  <GridItem colSpan={2}>
                    <FilePreview />
                  </GridItem>
                </Grid>
              </form>
            </FormProvider>
          </FileUploadProvider>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            ปิดหน้าต่าง
          </Button>
          <Button onClick={methodsForm.handleSubmit(onSubmit)} colorScheme="purple" variant="ghost">
            เพิ่มประวัติ
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalMedRecordCreate;
