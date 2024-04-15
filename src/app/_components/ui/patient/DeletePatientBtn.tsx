"use client";
import { deletePatient } from "@/app/_actions/refferral-case";
import { Button, useToast } from "@chakra-ui/react";

interface DeletePatientProp {
  id: number;
}

export function DeletePatientButton({ id }: DeletePatientProp) {
  const toast = useToast();
  const actionDelete = async () => {
    const res = await deletePatient(id);
    if (res.success) {
      toast({
        title: "Patient Deleted",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Error",
        description: res.message.error,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Button onClick={actionDelete} bg={"blue"}>
      DELETE
    </Button>
  );
}
