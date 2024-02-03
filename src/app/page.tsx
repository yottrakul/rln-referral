import { Center, Container } from "@chakra-ui/react";
import LoginForm from "@/app/_components/ui/Login/LoginForm";

export default function Home() {
  return (
    <main>
      <Center minHeight={"100vh"}>
        <Container maxW={"md"}>
          <LoginForm />
          Test 2
        </Container>
      </Center>
    </main>
  );
}
