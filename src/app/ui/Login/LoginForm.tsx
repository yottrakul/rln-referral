"use client";
import { FormControl, FormLabel, FormHelperText, Input, Button } from "@chakra-ui/react";
import Link from "next/link";

export default function LoginForm() {
  return (
    <FormControl>
      <FormLabel>Email address</FormLabel>
      <Input type="email" />
      <FormHelperText>We ll never share your email.</FormHelperText>
      <FormLabel mt={4}>Password</FormLabel>
      <Input type="password" />
      <FormHelperText>Type your password.</FormHelperText>
      <Link href="/dashboard">
        <Button mt={4} colorScheme="blue">
          Login
        </Button>
      </Link>
    </FormControl>
  );
}
