"use client";
import {
  Step,
  StepDescription,
  StepIcon,
  VStack,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
  Flex,
  Icon,
  Text,
} from "@chakra-ui/react";
import { IoCreateOutline } from "react-icons/io5";
const steps = [
  { title: "สร้างคำขอ", description: "02/01/1996", description2: "16:00:00" },
  { title: "ส่งคำขอ", description: "ไม่พบข้อมูล", description2: "ไม่พบข้อมูล" },
  { title: "รับคำขอ", description: "ไม่พบข้อมูล", description2: "ไม่พบข้อมูล" },
  { title: "ปิดคำขอ", description: "ไม่พบข้อมูล", description2: "ไม่พบข้อมูล" },
];

export default function DisplayStepper() {
  const { activeStep } = useSteps({
    index: 1,
    count: steps.length,
  });

  return (
    <Stepper size="lg" colorScheme="purple" index={activeStep}>
      {steps.map((step, index) => (
        <Step key={index}>
          <VStack>
            <StepIndicator>
              {/* <StepStatus complete={<StepIcon />} incomplete={<StepNumber />} active={<StepNumber />} /> */}
              <StepStatus
                complete={<Icon alignItems={"center"} boxSize={6} as={IoCreateOutline} />}
                incomplete={`😅`}
                active={`📍`}
              />
            </StepIndicator>
            <Flex flexDir={"column"} alignItems={"center"}>
              <StepTitle>{step.title}</StepTitle>
              <StepDescription>
                <Text fontSize={"lg"}>วันที่ {step.description}</Text>
              </StepDescription>
              <StepDescription>
                <Text textAlign={"start"} fontSize={"lg"}>
                  เวลา {step.description2}
                </Text>
              </StepDescription>
            </Flex>
          </VStack>
          <StepSeparator />
        </Step>
      ))}
    </Stepper>
  );
}
