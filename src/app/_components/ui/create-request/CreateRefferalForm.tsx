import { Grid, GridItem, Button, Input, useToast } from "@chakra-ui/react";
import PatientSummary from "@/app/_components/ui/create-request/PatientSummary";
import MedRecordSummary from "@/app/_components/ui/create-request/MedRecordSummary";
import HospitalRefer from "@/app/_components/ui/create-request/HospitalRefer";
import { type Hospital } from "@prisma/client";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateReferalRequestSchema } from "@/app/_schemas";
import { type z } from "zod";
import { type Patient } from "@/app/_schemas/generated/zod";
import { useMedicalContext } from "@/app/_components/context/MedicalRecordContext";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
// import { createCase, getCaseFromPatientId } from "@/app/_actions/create-request/actions";
import { createCase } from "@/app/_actions/create-request/actions";
import ModalPending from "./ModalPending";

interface CreateRefferalFormProps {
  patient: Patient | null;
  hospitals: Hospital[];
  nextStep: () => void;
}

export default function CreateRefferalForm({ patient, hospitals, nextStep }: CreateRefferalFormProps) {
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm<z.infer<typeof CreateReferalRequestSchema>>({
  //   resolver: zodResolver(CreateReferalRequestSchema),
  //   defaultValues: {},
  // });
  const session = useSession();
  const toast = useToast();
  const { preparedMedicalRecords } = useMedicalContext();
  const referForm = useForm<z.infer<typeof CreateReferalRequestSchema>>({
    resolver: zodResolver(CreateReferalRequestSchema),
  });
  // const [refCaseId, setRefCaseId] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  const onSubmit = async (data: z.infer<typeof CreateReferalRequestSchema>) => {
    // Convert Object to FormData
    const medBlob = preparedMedicalRecords();
    try {
      setIsPending(true);
      const res = await createCase(data, medBlob);
      if (res) {
        toast({
          title: "Success | Referral Case",
          description: "Create referal request successfully",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        nextStep();
      } else {
        console.log("Error");
        setIsPending(false);
        toast({
          title: "Error | Referral Case",
          description: "Error to create referal request",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    } catch (error) {
      setIsPending(false);
      toast({
        title: "Error | Referral Case",
        description: "Error to create referal request",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    if (patient) {
      referForm.setValue("patientId", patient.id);
    }
  }, [patient, referForm]);

  // useEffect(() => {
  //   const checkPatientCase = async () => {
  //     if (patient?.id) {
  //       const res = await getCaseFromPatientId(patient.id);
  //       if (res) {
  //         const { id } = res;
  //         setRefCaseId(id);
  //       }
  //     }
  //   };

  //   checkPatientCase().catch((error) => {
  //     console.log(error);
  //     toast({
  //       title: "Error | Referral Case",
  //       description: "Error to get referral case medical records",
  //       status: "error",
  //       duration: 9000,
  //       isClosable: true,
  //     });
  //   });
  // }, [patient, toast]);

  useEffect(() => {
    if (session.data?.user.hospitalId) {
      referForm.setValue("startHospital", session.data?.user.hospitalId);
      referForm.setValue("senderHospital", session.data?.user.hospitalId);
    }
  }, [session, referForm]);

  return (
    <>
      <FormProvider {...referForm}>
        <Grid
          gridTemplateColumns={{ md: `minmax(0,1fr) minmax(0,1fr)` }}
          gridTemplateRows={{ base: `minmax(0,25rem) minmax(0,50rem) auto`, md: `minmax(0,50rem) auto` }}
          gap={4}
        >
          <PatientSummary patient={patient} />
          <Grid gap={4} gridTemplateRows={`1fr auto`}>
            <MedRecordSummary
              hospitals={hospitals}
              referralId={null}
              patientId={patient?.id ?? null}
              mode="PATIENTID"
            />
            <HospitalRefer hospitals={hospitals} />
          </Grid>
          <GridItem textAlign={"right"} colStart={{ md: 2 }}>
            <form onSubmit={referForm.handleSubmit(onSubmit)}>
              <Input {...referForm.register("patientId")} hidden />
              <Input {...referForm.register("startHospital")} hidden />
              <Input {...referForm.register("senderHospital")} hidden />
              <Button type="submit" colorScheme={"purple"}>
                สร้างคำขอส่งต่อ
              </Button>
            </form>
          </GridItem>
        </Grid>
      </FormProvider>
      <ModalPending isOpen={isPending} />
    </>
  );
}
