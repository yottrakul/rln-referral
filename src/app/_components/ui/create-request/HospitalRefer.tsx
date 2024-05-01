"use client";
import {
  Card,
  CardBody,
  CardHeader,
  FormLabel,
  Heading,
  Input,
  Badge,
  Collapse,
  type SystemStyleObject,
} from "@chakra-ui/react";
import { type Hospital } from "@prisma/client";
import AutoComplete from "../AutoComplete";
import { useCallback, useEffect, useMemo, useState } from "react";
import { type AutoCompleteItem } from "../AutoComplete";
import { useFormContext } from "react-hook-form";
import { type z } from "zod";
import { type CreateReferalRequestSchema } from "@/app/_schemas";
interface HospitalReferProps {
  containerStyle?: SystemStyleObject;
  hospitals: Hospital[];
}

export default function HospitalRefer({ containerStyle, hospitals }: HospitalReferProps) {
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext<z.infer<typeof CreateReferalRequestSchema>>();

  useEffect(() => {
    if (selectedHospital) {
      setValue("receiverHospital", selectedHospital.id, { shouldValidate: true });
    }
  }, [selectedHospital, setValue]);

  const hospitalList = useMemo(
    () =>
      hospitals.map((hospital) => {
        return {
          label: hospital.hospitalName,
          value: String(hospital.id),
        };
      }),
    [hospitals]
  );

  const handleSelectHospital = useCallback(
    (item: AutoCompleteItem) => {
      const hospital = hospitals.find((hospital) => String(hospital.id) === item.value);
      if (hospital) {
        setSelectedHospital(hospital);
      }
    },
    [hospitals]
  );
  return (
    <Card sx={{ ...containerStyle }} variant={"solid"}>
      <CardHeader>
        <Heading size="md">สถานพยาบาลที่ต้องการส่งต่อ</Heading>
        <Collapse in={selectedHospital ? true : false}>
          {selectedHospital && (
            <Badge fontSize={"md"} colorScheme="purple">
              {selectedHospital.hospitalName}
            </Badge>
          )}
        </Collapse>
      </CardHeader>
      <CardBody>
        <Input {...register("receiverHospital")} hidden />
        {errors.receiverHospital && <FormLabel color="red.500">{errors.receiverHospital.message}</FormLabel>}
        <AutoComplete items={hospitalList} onSelect={handleSelectHospital} />
      </CardBody>
    </Card>
  );
}
