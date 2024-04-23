import CureHistory from "@/app/_components/ui/case/CureHistory";
import Header from "@/app/_components/ui/case/Header";
import Status from "@/app/_components/ui/status/Status";
import { Flex } from "@chakra-ui/react";
export default async function page() {
  return (
    <>
      <Header />
      <Status />
      <Flex w={"full"}>
        <CureHistory />
        {/* <Spacer />
        <CureHistory /> */}
      </Flex>
    </>
  );
}
