import InputSearch from "@/app/_components/ui/request/InputSearch";
import BtnSearch from "@/app/_components/ui/request/BtnSearch";
import AllCard from "@/app/_components/ui/request/AllCard";
import { Container, Heading, Flex, SimpleGrid } from "@chakra-ui/react";

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

        <SimpleGrid
          className="scroll"
          minChildWidth="350px"
          maxW={"1800px"}
          spacing="20px"
          mb={4}
          gap={6}
          marginInline={"auto"}
        >
          <AllCard />
        </SimpleGrid>
      </Container>
    </div>
  );
}
