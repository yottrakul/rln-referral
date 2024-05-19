"use client";
import { useEffect, useMemo, useRef, type FC } from "react";
import AutoComplete, { type AutoCompleteItem } from "@/app/_components/ui/AutoComplete";
import type { Hospital } from "@prisma/client";
import { useForceUpdate } from "@/app/_lib/hooks/useForceUpdate";
import { HOSPITAL_REFER_DRAWER_ID } from "@/app/_lib/definition";
import { useFormContext } from "react-hook-form";
import { type z } from "zod";
import { type EditReceiverHospitalReferalRequestSchema } from "@/app/_schemas";
import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/react";

interface HospitalReferInputProps {
  hospitals: Hospital[];
}

const HospitalReferInput: FC<HospitalReferInputProps> = ({ hospitals }) => {
  const {
    setValue,
    formState: { errors },
  } = useFormContext<z.infer<typeof EditReceiverHospitalReferalRequestSchema>>();
  const drawerRef = useRef<HTMLElement | null>(null);
  const forceUpdate = useForceUpdate();
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
  const handleOnSelect = (value: AutoCompleteItem) => {
    const hospitalId = parseInt(value.value);
    if (!isNaN(hospitalId)) {
      setValue("receiverHospital", hospitalId, { shouldValidate: true });
    }
  };

  useEffect(() => {
    const drawer = document.getElementById(HOSPITAL_REFER_DRAWER_ID);
    if (drawer) {
      drawerRef.current = drawer;
      forceUpdate();
    }
  }, [forceUpdate]);

  return (
    <>
      <FormControl isRequired isInvalid={Boolean(errors.receiverHospital)}>
        <FormLabel>โรงพยาบาลที่จะส่งต่อ</FormLabel>
        <AutoComplete potalRef={drawerRef} items={hospitalList} onSelect={handleOnSelect} />
        <FormErrorMessage>{errors.receiverHospital && <span>กรุณาเลือกโรงพยาบาล</span>}</FormErrorMessage>
      </FormControl>
    </>
  );
};

export default HospitalReferInput;
