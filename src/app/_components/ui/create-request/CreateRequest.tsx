"use client";

import { createRequest, getPatientByCitizenId } from "@/app/_actions/create-request/actions";
import { CreatePatientSchema } from "@/app/_schemas";
import {
  Grid,
  GridItem,
  type SystemStyleObject,
  Text,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Select,
  Textarea,
  VStack,
  Button,
  FormErrorMessage,
  useToast,
  ScaleFade,
  SlideFade,
  InputGroup,
  InputRightElement,
  Spinner,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { type Hospital } from "@prisma/client";
import { type ChangeEvent, memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { type z } from "zod";
import { SearchIcon } from "@chakra-ui/icons";
import { useDebouncedCallback } from "use-debounce";
import CreateRefferalForm from "@/app/_components/ui/create-request/CreateRefferalForm";
interface CreateRequestProps {
  hospitals: Hospital[];
  containerStyle?: SystemStyleObject;
}

type Step = "patient" | "request" | "summary";

export default function CreateRequest({ hospitals, containerStyle }: CreateRequestProps) {
  const [step, setStep] = useState<Step>("patient");
  const citizenID = useRef<string | null>(null);

  const nextStep = useCallback(() => {
    // patient -> request -> summary
    switch (step) {
      case "patient":
        setStep("request");
        break;
      case "request":
        setStep("summary");
        break;
      case "summary":
        setStep("patient");
        break;
      default:
        break;
    }
  }, [step]);

  const handleCreateRequestFormNextStep = useCallback(
    (cityzen: unknown) => {
      citizenID.current = cityzen as string;
      nextStep();
    },
    [nextStep]
  );

  // TODO อย่าลืมลบรหัสตัวเอง

  const mainRender = useCallback(() => {
    switch (step) {
      case "patient":
        return <CreateRequestForm nextStep={handleCreateRequestFormNextStep} />;
      case "request":
        return <CreateRefferalForm citizenID={citizenID.current ?? "1929900784421"} />;
      default:
        return null;
    }
  }, [step, handleCreateRequestFormNextStep]);

  return (
    <div>
      <Grid
        templateAreas={`"header"
                       "main"`}
        gridTemplateRows={"auto 1fr"}
        sx={{
          ...containerStyle,
        }}
      >
        <GridItem area={"header"}>
          <Text fontSize={"xl"} fontWeight={"bold"}>
            สร้างคำขอ
          </Text>
        </GridItem>

        <GridItem area={"main"}>
          <SlideFade offsetX={"30px"} offsetY={"0px"} in={true}>
            {mainRender()}
          </SlideFade>
        </GridItem>
      </Grid>
    </div>
  );
}

type CreateRequestFormProps = {
  nextStep: (citizenId?: string) => void;
};

const CreateRequestForm = memo(({ nextStep }: CreateRequestFormProps) => {
  const toast = useToast();
  const cityzenRef = useRef<HTMLInputElement | null>(null);
  const [isFormReady, setIsFormReady] = useState(false);
  const [isCityzenSearching, setIsCityzenSearching] = useState(false);
  const [prepareData, setPrepareData] = useState<z.infer<typeof CreatePatientSchema> | null>(null);
  const {
    handleSubmit,
    register,
    setError,
    setFocus,
    clearErrors,
    setValue,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof CreatePatientSchema>>({
    resolver: zodResolver(CreatePatientSchema),
  });
  const { ref: citizenFormRef, ...otherRegisterCityzenID } = useMemo(() => register("citizenId"), [register]);

  useEffect(() => {
    setFocus("citizenId");
  }, [setFocus]);

  useEffect(() => {
    if (prepareData) {
      Object.keys(prepareData).forEach((key) => {
        if (key === "birthDate") return;
        setValue(key as keyof typeof prepareData, prepareData[key as keyof typeof prepareData]);
      });
      setValue("birthDate", prepareData.birthDate.toJSON().slice(0, 10) as unknown as Date);
    } else {
      const tempCityzenId = cityzenRef.current?.value;
      reset();
      setValue("citizenId", tempCityzenId ?? "");
    }
  }, [prepareData, setValue, reset]);

  const onSubmit = async (data: z.infer<typeof CreatePatientSchema>) => {
    try {
      const patient = await createRequest(data);
      if (patient.success) {
        toast({
          title: "สร้างคำขอสำเร็จ",
          status: "success",
        });
        nextStep(patient.data?.citizenId);
      }
    } catch (error) {}
  };

  const handleSearch = useDebouncedCallback(async (e: ChangeEvent<HTMLInputElement>) => {
    // เช็คว่ามีครบ 13 หลักหรือไม่
    if (e.target.value.length !== 13) {
      if (isFormReady) {
        setIsFormReady(false);
        // Reset form เมื่อกรอกเลขบัตรประชาชนไม่ครบ 13 หลัก
        const tempCityzenId = cityzenRef.current?.value;
        reset();
        setValue("citizenId", tempCityzenId ?? "");
      }
      setError("citizenId", {
        type: "manual",
        message: "กรุณากรอกเลขบัตรประชาชน 13 หลัก",
      });
      return;
    } else {
      clearErrors("citizenId");
      setIsCityzenSearching(true);
      const patientRespone = await getPatientByCitizenId(e.target.value);
      if (patientRespone.success) {
        if (typeof patientRespone.data !== "undefined") {
          setPrepareData({
            ...patientRespone.data,
          });
        } else {
          return;
        }
      } else {
        setPrepareData(null);
      }
      setIsFormReady(true);
    }
    setIsCityzenSearching(false);
  }, 1000);

  return (
    <>
      <Text fontSize={"xl"} fontWeight={"bold"}>
        แบบฟอร์มการประเมินและส่งต่อผู้ป่วย
      </Text>
      <Text fontSize={"lg"} fontWeight={"bold"}>
        ข้อมูลผู้ป่วย
      </Text>
      <form>
        <Grid gridTemplateColumns={`repeat(3, 1fr)`} gap={4}>
          <GridItem>
            <FormControl isRequired isInvalid={!!errors.citizenId}>
              <FormLabel>เลขหมายบัตรประชาชน</FormLabel>
              <InputGroup>
                <Input
                  {...otherRegisterCityzenID}
                  ref={(e) => {
                    citizenFormRef(e);
                    cityzenRef.current = e;
                  }}
                  onChange={(e) => handleSearch(e)}
                />
                <InputRightElement>{isCityzenSearching ? <Spinner size="sm" /> : <SearchIcon />}</InputRightElement>
              </InputGroup>

              {errors.citizenId && <FormErrorMessage>{errors.citizenId?.message}</FormErrorMessage>}
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl isRequired isInvalid={!!errors.patientFirstname} isDisabled={!isFormReady}>
              <FormLabel>ชื่อจริง</FormLabel>
              <Input {...register("patientFirstname")} />
              {errors.patientFirstname && <FormErrorMessage>{errors.patientFirstname?.message}</FormErrorMessage>}
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl isRequired isInvalid={!!errors.patientSurname} isDisabled={!isFormReady}>
              <FormLabel>นามสกุล</FormLabel>
              <Input {...register("patientSurname")} />
              {errors.patientSurname && <FormErrorMessage>{errors.patientSurname?.message}</FormErrorMessage>}
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl isRequired isInvalid={!!errors.gender} isDisabled={!isFormReady}>
              <FormLabel>เพศ</FormLabel>
              <Select {...register("gender")} placeholder="เลือกเพศ">
                <option value={"MALE"}>ชาย</option>
                <option value={"FEMALE"}>หญิง</option>
                <option value={"UNDEFINED"}>ไม่ระบุ</option>
              </Select>
              {errors.gender && <FormErrorMessage>{errors.gender?.message}</FormErrorMessage>}
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl isRequired isInvalid={!!errors.birthDate} isDisabled={!isFormReady}>
              <FormLabel>วันเกิด</FormLabel>
              <Input {...register("birthDate")} type="date" />
              {errors.birthDate && <FormErrorMessage>{errors.birthDate?.message}</FormErrorMessage>}
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl isInvalid={!!errors.phone} isDisabled={!isFormReady}>
              <FormLabel>เบอร์โทรศัพท์</FormLabel>
              <Input {...register("phone")} type="tel" />
              {errors.phone && <FormErrorMessage>{errors.phone?.message}</FormErrorMessage>}
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl isInvalid={!!errors.houseNumber} isDisabled={!isFormReady}>
              <FormLabel>บ้านเลขที่</FormLabel>
              <Input {...register("houseNumber")} />
              {errors.houseNumber && <FormErrorMessage>{errors.houseNumber?.message}</FormErrorMessage>}
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl isInvalid={!!errors.moo} isDisabled={!isFormReady}>
              <FormLabel>หมู่ที่</FormLabel>
              <Input {...register("moo")} />
              {errors.moo && <FormErrorMessage>{errors.moo?.message}</FormErrorMessage>}
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl isInvalid={!!errors.subDistrict} isDisabled={!isFormReady}>
              <FormLabel>แขวง/ตำบล</FormLabel>
              <Input {...register("subDistrict")} />
              {errors.subDistrict && <FormErrorMessage>{errors.subDistrict?.message}</FormErrorMessage>}
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl isInvalid={!!errors.subArea} isDisabled={!isFormReady}>
              <FormLabel>เขต/อำเภอ</FormLabel>
              <Input {...register("subArea")} />
              {errors.subArea && <FormErrorMessage>{errors.subArea?.message}</FormErrorMessage>}
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl isInvalid={!!errors.province} isDisabled={!isFormReady}>
              <FormLabel>จังหวัด</FormLabel>
              <Input {...register("province")} />
              {errors.province && <FormErrorMessage>{errors.province?.message}</FormErrorMessage>}
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl isInvalid={!!errors.postalCode} isDisabled={!isFormReady}>
              <FormLabel>รหัสไปรษณีย์</FormLabel>
              <Input {...register("postalCode")} />
              {errors.postalCode && <FormErrorMessage>{errors.postalCode?.message}</FormErrorMessage>}
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl isRequired isInvalid={!!errors.bloodType} isDisabled={!isFormReady}>
              <FormLabel>กรุ๊ปเลือด</FormLabel>
              <Select {...register("bloodType")} placeholder="เลือกกรุ๊ปเลือด">
                <option value={"A"}>A</option>
                <option value={"B"}>B</option>
                <option value={"AB"}>AB</option>
                <option value={"O"}>O</option>
                <option value={"UNDEFINED"}>ไม่ระบุ</option>
              </Select>
              {errors.bloodType && <FormErrorMessage>{errors.bloodType?.message}</FormErrorMessage>}
            </FormControl>
          </GridItem>
        </Grid>
        <Button isDisabled={!isFormReady} onClick={handleSubmit(onSubmit)} colorScheme="purple">
          ถัดไป
        </Button>
      </form>
    </>
  );
});

// const CreateReferralForm = memo(() => {
//   return (
//     <>
//       <Grid gridTemplateColumns={`repeat(2, 1fr)`} gap={4}>
//         <GridItem>{/* <PatientSummary/> */}</GridItem>
//         <GridItem>
//           <div>ประวัติการรักษา</div>
//           <div>ฟอร์มเลือกโรงบาล</div>
//           <Button>สร้างคำขอ</Button>
//         </GridItem>
//       </Grid>
//     </>
//   );
// });

CreateRequestForm.displayName = "CreateRequestForm";
// CreateReferralForm.displayName = "CreateReferralForm";
