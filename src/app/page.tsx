import { Center, Container } from "@chakra-ui/react";
import LoginForm from "@/app/_components/ui/Login/LoginForm";

export default function Home() {
  return (
    <main>
      <Center minHeight={"100vh"} bg={"#F0F4F9"}>
        <Container maxW={"lg"}>
          <LoginForm />
        </Container>
      </Center>
    </main>
  );
}
