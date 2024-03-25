"use client";

import { useForm } from "react-hook-form";
import { HospitalSchema } from "@/app/_schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import {
  Button,
  Card,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  CardHeader,
  CardBody,
  Heading,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { useState, useTransition } from "react";
import { createHospital } from "@/app/_actions/back_office";

export const HospitalRegisterSchema = HospitalSchema.pick({ hospitalName: true });

export default function HospitalRegisterCard() {
  return (
    <Card maxW={"md"}>
      <CardHeader>
        <Heading size="md">Add Hospital</Heading>
      </CardHeader>
      <CardBody>
        <HospitalRegisterForm />
      </CardBody>
    </Card>
  );
}

export function HospitalRegisterForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof HospitalRegisterSchema>>({
    resolver: zodResolver(HospitalRegisterSchema),
    defaultValues: {
      hospitalName: "",
    },
  });

  const onSubmit = (value: z.infer<typeof HospitalRegisterSchema>) => {
    setError("");
    setSuccess("");
    startTransition(async () => {
      const res = await createHospital(value);
      if (!res.success) {
        setError(res.message.error);
      } else {
        setSuccess(res.message);
      }
    });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={Boolean(errors.hospitalName)}>
        <FormLabel>Hospital Name</FormLabel>
        <Input {...register("hospitalName")} />
        {errors.hospitalName && <FormErrorMessage>{errors.hospitalName.message}</FormErrorMessage>}
      </FormControl>
      {success ? (
        <Alert mt={4} status="success">
          <AlertIcon />
          {success}
        </Alert>
      ) : null}
      {error ? (
        <Alert mt={4} status="error">
          <AlertIcon />
          {error}
        </Alert>
      ) : null}
      <Button mt={4} isDisabled={isPending} w={"100%"} type="submit" colorScheme="blue">
        Add Hospital
      </Button>
    </form>
  );
}
