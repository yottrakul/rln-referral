"use client";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Badge,
  Collapse,
  type SystemStyleObject,
} from "@chakra-ui/react";
import { type Hospital } from "@prisma/client";
import AutoComplete from "../AutoComplete";
import { useCallback, useMemo, useState } from "react";
import { type AutoCompleteItem } from "../AutoComplete";
interface HospitalReferProps {
  containerStyle?: SystemStyleObject;
  hospitals: Hospital[];
}

export default function HospitalRefer({ containerStyle, hospitals }: HospitalReferProps) {
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);
  // null,
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
        <AutoComplete items={hospitalList} onSelect={handleSelectHospital} />
      </CardBody>
    </Card>
  );
}
