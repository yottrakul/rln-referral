"use client";
import { LoginSchema } from "@/app/_schemas";
import { FormControl, FormLabel, Input, Button, FormErrorMessage, Box, Alert, AlertIcon } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type * as z from "zod";
import GoogleIcon from "../../icons/GoogleIcon";
import { login } from "@/app/_actions/auth/login";
import { useState, useTransition } from "react";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export default function LoginForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setIsError] = useState<string | undefined>("");
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = (value: z.infer<typeof LoginSchema>) => {
    setIsError("");
    startTransition(async () => {
      const data = await login(value);
      setIsError(data?.error);
    });
  };

  const onGoogleLogin = async () => {
    await signIn("google", { callbackUrl: DEFAULT_LOGIN_REDIRECT });
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
      {error && (
        <Alert mt={4} status="error">
          <AlertIcon />
          {error}
        </Alert>
      )}
      <Button isDisabled={isPending} w={"100%"} type="submit" mt={4} colorScheme="blue">
        Login
      </Button>
      <Button
        onClick={() => onGoogleLogin()}
        isDisabled={isPending}
        variant="outline"
        w={"100%"}
        mt={4}
        colorScheme="blue"
      >
        <GoogleIcon boxSize={6} />
      </Button>
    </form>
  );
}
