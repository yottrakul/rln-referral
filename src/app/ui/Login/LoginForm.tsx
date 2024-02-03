/* eslint-disable react/prop-types */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Avatar,
  FormControl,
  FormHelperText,
  InputRightElement,
} from "@chakra-ui/react";
import Link from "next/link";

import { FaUserAlt, FaLock } from "react-icons/fa";
import GoogleIcon from "@/app/_components/GoogleIcon";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleShowClick = () => setShowPassword(!showPassword);

  const CFaUserAlt = () => <chakra.div as={FaUserAlt} color="gray.300" />;
  const CFaLock = () => <chakra.div as={FaLock} color="gray.300" />;

  const oAuthHandle = () => {
    event?.preventDefault();
    // router.push()
    router.push("/dashboard");
    // console.log("Oauth Login Success");
  };

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="gray.200"
      justifyContent="center"
      alignItems="center"
    >
      <Stack flexDir="column" mb="2" justifyContent="center" alignItems="center">
        <Avatar bg="teal.500" />
        <Heading color="teal.400">Welcome</Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <form>
            <Stack spacing={4} p="1rem" backgroundColor="whiteAlpha.900" boxShadow="md">
              <FormControl>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <CFaUserAlt />
                  </InputLeftElement>
                  <Input type="email" placeholder="email address" />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement pointerEvents="none" color="gray.300">
                    <CFaLock />
                  </InputLeftElement>
                  <Input type={showPassword ? "text" : "password"} placeholder="Password" />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormHelperText textAlign="right">forgot password?</FormHelperText>
              </FormControl>
              <Link href="/UserBackOffice">
                <Button borderRadius={4} type="submit" variant="solid" colorScheme="teal" width="full">
                  Login
                </Button>
              </Link>
              <Button
                leftIcon={<GoogleIcon />}
                borderRadius={4}
                type="submit"
                variant="outline"
                colorScheme="teal"
                width="full"
                onClick={() => oAuthHandle()}
              >
                Google
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box>
        New to us?{" "}
        <Link color="teal.500" href="#">
          Sign Up
        </Link>
      </Box>
    </Flex>
  );
}
