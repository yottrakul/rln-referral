"use client";
import { getPatientByCitizenId } from "@/app/_actions/create-request/actions";
import { useQuery } from "@tanstack/react-query";

interface PatientSummaryProps {
  citizenID: string;
}

export default function PatientSummary({ citizenID }: PatientSummaryProps) {
  const { data, isError, isLoading, isFetching } = useQuery({
    queryKey: ["patient", citizenID],
    queryFn: async () => {
      const res = await getPatientByCitizenId(citizenID);
      if (res.success) {
        return res.data;
      }
      throw new Error(res.message.error);
    },
    staleTime: 0,
  });

  if (isLoading || isFetching) {
    return <div>Loading...</div>;
  }
  // Fetch patient data
  // const patient = await getPatientByCitizenId(citizenID);
  // console.log(patient);
  // if (!patient.success) {
  //   return <div>{patient.message.error}</div>;
  // }
  // return <div>{JSON.stringify(patient.data)}</div>;

  if (isError) {
    return <div>Error</div>;
  }

  console.log(data);

  return <div>{JSON.stringify(data)}</div>;
}
