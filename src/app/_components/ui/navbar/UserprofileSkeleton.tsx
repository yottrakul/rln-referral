import { SkeletonCircle, SkeletonText } from "@chakra-ui/react";

export default function UserprofileSkeleton() {
  return (
    <>
      <SkeletonCircle size="10" />
      <SkeletonText flex={1} noOfLines={2} spacing="4" skeletonHeight="3" />
    </>
  );
}
