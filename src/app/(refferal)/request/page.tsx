import InputSearch from "@/app/_components/ui/request/InputSearch";
import BtnSearch from "@/app/_components/ui/request/BtnSearch";
import AllCard from "@/app/_components/ui/request/AllCard";
import { Container, Heading, Flex, Grid } from "@chakra-ui/react";

export default async function page() {
  return (
    <div id="scroll">
      <Container maxW="100%" my={2}>
        <Heading as="h4" size="lg" mb={8} pl={4}>
          รายการคำขอปัจจุบัน
        </Heading>
        <Flex flexWrap={"wrap"} mb={6} gap={5}>
          <BtnSearch />
          <InputSearch />
        </Flex>

        <Grid
          className="scroll"
          // minChildWidth="350px"
          gridTemplateColumns={`repeat(auto-fill, minmax(350px, 1fr))`}
          // spacing="20px"
          mb={4}
          gap={6}
        >
          <AllCard />
        </Grid>
      </Container>
    </div>
  );
}
