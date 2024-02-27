import { Center, Container } from "@chakra-ui/react";
import LoginForm from "@/app/_components/ui/Login/LoginForm";
import { createUser } from "./_actions/data/user";

const data = {
  citizenId: "1234567890123",
};

export default async function Home() {
  const result = await createUser(data);
  console.log(result);
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
