"use client";
import { useLottie, type LottieOptions } from "lottie-react";
import referSuccess from "@/app/_components/lottie/refer_success.json";
import { Box, Grid, Heading, Text, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
const CreateReferralSummary = () => {
  const options: LottieOptions = {
    animationData: referSuccess,
    loop: false,
  };

  useEffect(() => {
    const exitPage = setTimeout(() => {
      window.location.href = "/";
    }, 2500);

    return () => {
      clearTimeout(exitPage);
    };
  }, []);

  const { View } = useLottie(options);
  return (
    <Grid minH={"calc(100vh - 30px - 24px - 16px)"} placeItems={"center"}>
      <VStack>
        <Box boxSize={"20rem"}>{View}</Box>
        <Heading>สร้างคำขอสำเร็จ</Heading>
        <Text>กำลังกลับสู่หน้าหลัก...</Text>
      </VStack>
    </Grid>
  );
};

export default CreateReferralSummary;
