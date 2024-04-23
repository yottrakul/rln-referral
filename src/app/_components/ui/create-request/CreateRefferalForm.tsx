import { Grid, GridItem, Button, Box } from "@chakra-ui/react";
import PatientSummary from "@/app/_components/ui/create-request/PatientSummary";
import MedRecordSummary from "@/app/_components/ui/create-request/MedRecordSummary";
import HospitalRefer from "@/app/_components/ui/create-request/HospitalRefer";
import { type Hospital } from "@prisma/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateReferalRequestSchema } from "@/app/_schemas";
import { type z } from "zod";
import { type Patient } from "@/app/_schemas/generated/zod";
import MedRecordProvider from "@/app/_components/context/MedicalRecordContext";

interface CreateRefferalFormProps {
  patient: Patient | null;
  hospitals: Hospital[];
}

export default function CreateRefferalForm({ patient, hospitals }: CreateRefferalFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof CreateReferalRequestSchema>>({
    resolver: zodResolver(CreateReferalRequestSchema),
    defaultValues: {},
  });
  return (
    <MedRecordProvider>
      <Grid
        gridTemplateColumns={{ md: `minmax(0,1fr) minmax(0,1fr)` }}
        gridTemplateRows={{ base: `minmax(0,25rem) minmax(0,50rem) auto`, md: `minmax(0,50rem) auto` }}
        gap={4}
      >
        <PatientSummary patient={patient} />
        <Grid gap={4} gridTemplateRows={`1fr auto`}>
          <MedRecordSummary hospitals={hospitals} />
          <HospitalRefer hospitals={hospitals} />
        </Grid>
        <GridItem textAlign={"right"} colStart={{ md: 2 }}>
          <Button colorScheme={"purple"}>สร้างคำขอส่งต่อ</Button>
        </GridItem>
      </Grid>
    </MedRecordProvider>
  );
}

// gridTemplateRows={`minmax(0,45rem)`}
