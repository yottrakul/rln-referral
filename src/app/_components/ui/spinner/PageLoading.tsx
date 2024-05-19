import { Center, Spinner } from "@chakra-ui/react";
export default function PageLoading() {
  // You can add any UI inside Loading, including a Skeleton.
  // Test
  return (
    <Center minH={"100vh"}>
      <Spinner size={"xl"} />
    </Center>
  );
}
