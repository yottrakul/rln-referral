"use client";
import { Stack, Skeleton } from "@chakra-ui/react";

export default function SkeletonUserDetail() {
  return (
    <Stack>
      <Skeleton height="40px" />
      <Skeleton height="40px" />
      <Skeleton height="40px" />
    </Stack>
  );
}
