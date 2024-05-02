import InputSearch from "@/app/_components/ui/request/InputSearch";
import AllCard from "@/app/_components/ui/request/AllCard";
import { Container, Button, Heading, Flex, Center, SimpleGrid } from "@chakra-ui/react";

export default async function page() {
  return (
    <div id="scroll">
      <Container maxW="100%" my={2}>
        <Heading as="h4" size="lg" mb={8} pl={4}>
          รายการคำขอปัจจุบัน
        </Heading>
        <Flex flexWrap={"wrap"}>
          <Center>
            <Button px={6} size="sm" bg={"#9E57DA"} _hover={{ bg: "#7943a5" }} color={"white"}>
              ส่งต่อผู้ป่วย
            </Button>
          </Center>

          <Center mx={4}>
            <Button px={6} size="sm" bg={"#888"} _hover={{ bg: "#666" }} color={"white"}>
              รับผู้ป่วยใหม่
            </Button>
          </Center>

          <InputSearch />

          <Center>
            <Button mx={4} px={6} size="sm">
              สร้างคำขอ
            </Button>
          </Center>
        </Flex>

        <SimpleGrid
          className="scroll"
          minChildWidth="350px"
          maxW={"1800px"}
          spacing="20px"
          mt={6}
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
