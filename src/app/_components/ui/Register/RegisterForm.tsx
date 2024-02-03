"use client";
import {
  Card,
  Heading,
  CardHeader,
  CardBody,
  Select,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { RegisterSchema } from "@/app/schemas";
import type * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const roles = Object.values(RegisterSchema.shape.role._def.values);

export default function RegisterFormCard() {
  return (
    <Card maxW={"md"}>
      <CardHeader>
        <Heading size="md">Add User</Heading>
      </CardHeader>
      <CardBody>
        <RegisterForm />
      </CardBody>
    </Card>
  );
}

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const onSubmit = (value: z.infer<typeof RegisterSchema>) => {
    // register(value);
    // console.log();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={Boolean(errors.email)}>
        <FormLabel>Email address</FormLabel>
        <Input {...register("email")} type="email" />
        {errors.email && <FormErrorMessage>{errors.email.message}</FormErrorMessage>}
      </FormControl>
      <FormControl isInvalid={Boolean(errors.password)}>
        <FormLabel mt={4}>Password</FormLabel>
        <Input {...register("password")} type="password" />
        {errors.password && <FormErrorMessage>{errors.password.message}</FormErrorMessage>}
      </FormControl>
      <FormControl isInvalid={Boolean(errors.name)}>
        <FormLabel mt={4}>Name</FormLabel>
        <Input {...register("name")} />
        {errors.name && <FormErrorMessage>{errors.name.message}</FormErrorMessage>}
      </FormControl>
      <FormControl isInvalid={Boolean(errors.role)}>
        <FormLabel mt={4}>Role</FormLabel>
        {/* <Input {...register("role")} /> */}
        <Select {...register("role")} placeholder="Select option">
          {roles.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </Select>
        {/* {errors.role && <div>hello</div>} */}
        {errors.role && <FormErrorMessage>{errors.role.message}</FormErrorMessage>}
      </FormControl>
      <Button w={"100%"} type="submit" mt={4} colorScheme="blue">
        Add User
      </Button>
    </form>
  );
};
