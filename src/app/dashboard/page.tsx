import { Center, Flex, Heading } from "@chakra-ui/react";
import Card from "./Card";
import Chart from "./Chart";

export default function Dashboard() {
  return (
      <Flex padding={5} direction={"column"} w={"full"}>
      <section>
        <Heading>Overview</Heading>
        <Center>
          <Card />
        </Center>
      </section >
      
      <section>
        <Heading>Today</Heading>
        <Center>
          <Chart />
        </Center>
      </section>
      </Flex>
  );
}
