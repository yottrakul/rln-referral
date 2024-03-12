"use client";
import { LoginSchema } from "@/app/_schemas";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  FormErrorMessage,
  Alert,
  AlertIcon,
  Spinner,
  VStack,
  Card,
  CardBody,
  Divider,
  AbsoluteCenter,
  Box,
  Text,
  HStack,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type * as z from "zod";
import GoogleIcon from "../../icons/GoogleIcon";
import { useState, useTransition } from "react";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [isPending, startTransition] = useTransition();
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

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
    setErrorMsg("");
    startTransition(async () => {
      const res = await signIn("credentials", { email: value.email, password: value.password, redirect: false });
      if (res?.error) {
        setErrorMsg(res.error);
      } else {
        router.push(DEFAULT_LOGIN_REDIRECT);
      }
    });
  };

  const onGoogleLogin = async () => {
    startTransition(async () => {
      await signIn("google", { callbackUrl: DEFAULT_LOGIN_REDIRECT });
    });
  };

  return (
    <Card borderRadius={"28px"} p={5}>
      <CardBody>
        <Text fontSize={"4xl"} fontWeight={"400"}>
          RLN Login
        </Text>
        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack spacing={4}>
            <FormControl isInvalid={Boolean(errors.email)}>
              <FormLabel>Email address</FormLabel>
              <Input {...register("email")} type="email" />
              {errors.email && <FormErrorMessage>{errors.email.message}</FormErrorMessage>}
            </FormControl>
            <FormControl isInvalid={Boolean(errors.password)}>
              <FormLabel>Password</FormLabel>
              <Input {...register("password")} type="password" />
              {errors.password && <FormErrorMessage>{errors.password.message}</FormErrorMessage>}
            </FormControl>
            {errorMsg && (
              <Alert status="error">
                <AlertIcon />
                {errorMsg}
              </Alert>
            )}
            <Button isDisabled={isPending} w={"100%"} type="submit" colorScheme="blue">
              {isPending ? <Spinner size="sm" /> : "Login"}
            </Button>
            <Box position="relative" py={4} w="100%">
              <Divider />
              <AbsoluteCenter bg="white" px="4" color="#959595">
                Or
              </AbsoluteCenter>
            </Box>

            <Button onClick={() => onGoogleLogin()} isDisabled={isPending} variant="outline" w={"100%"}>
              {isPending ? (
                <Spinner size="sm" />
              ) : (
                <HStack>
                  <GoogleIcon boxSize={6} />
                  <Text fontWeight={"400"} color={"gray"}>
                    Sign in with google
                  </Text>
                </HStack>
              )}
            </Button>
          </VStack>
        </form>
      </CardBody>
    </Card>
  );
}
