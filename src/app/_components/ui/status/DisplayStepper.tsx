"use client";
import {
  Step,
  StepDescription,
  VStack,
  StepIndicator,
  Box,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  Flex,
  Text,
} from "@chakra-ui/react";

type Step = {
  title: string;
  description: string;
  description2: string;
};

interface DisplayStepperProps {
  steps: Step[];
  activeStep: number;
}

export default function DisplayStepper({ steps, activeStep }: DisplayStepperProps) {
  return (
    <Flex bg={"white"} boxShadow={"xl"} rounded={"lg"} p={4}>
      <VStack w="full">
        <Box borderBottomWidth={2} borderColor="gray.200" w="full">
          <Text fontSize={"2xl"} pb={2} as={"b"}>
            สถานะส่งตัวผู้ป่วย
          </Text>
        </Box>
        <Stepper size="lg" colorScheme="purple" index={activeStep} w={"full"}>
          {steps.map((step, index) => (
            <Step key={index}>
              <VStack>
                <StepIndicator>
                  <StepStatus complete={`✅`} incomplete={`😶‍🌫️`} active={`⏳`} />
                </StepIndicator>
                <Flex flexDir={"column"} alignItems={"center"}>
                  <StepTitle>{step.title}</StepTitle>
                  <StepDescription>{step.description}</StepDescription>
                  <StepDescription>{step.description2}</StepDescription>
                </Flex>
              </VStack>
              <StepSeparator />
            </Step>
          ))}
        </Stepper>
      </VStack>
    </Flex>
  );
}
