import { Center, Container } from "@chakra-ui/react";
import LoginForm from "./ui/Login/LoginForm";

export default function Home() {
  return (
    <main>
      <Container sx={{ minHeight: "100vh" }}>
        <LoginForm />
      </Container>
    </main>
  );
}
