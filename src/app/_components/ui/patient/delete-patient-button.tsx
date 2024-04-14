"use client";
import { deletePatient } from "@/app/_actions/refferral-case/delete-patient";
import { Button } from "@chakra-ui/react";

interface DeletePatientProp {
  id: number;
}

export function DeletePatientButton({ id }: DeletePatientProp) {
  const actionDelete = async () => {
    const message = await deletePatient(id);
    console.log(message);
  };

  return (
    <Button onClick={actionDelete} bg={"blue"}>
      DELETE
    </Button>
  );
}
