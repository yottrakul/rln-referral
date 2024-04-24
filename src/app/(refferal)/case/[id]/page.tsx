import CureHistory from "@/app/_components/ui/case/CureHistory";
import Header from "@/app/_components/ui/case/Header";
import Status from "@/app/_components/ui/status/Status";
import { Flex } from "@chakra-ui/react";
export default function page({ params }: { params: { id: string } }) {
  console.log(params.id);
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
