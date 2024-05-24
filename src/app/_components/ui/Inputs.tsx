"use client";
import { Button, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";

export default function Inputs() {
  const [number, setNumber] = useState(0);

  console.log("Render");

  const incressNumber = () => {
    setNumber(number + 1);
  };

  const logNumber = () => {
    console.log(number);
  };

  return (
    <VStack>
      <Button onClick={incressNumber}>+</Button>
      <Button onClick={logNumber}>Console log number</Button>
      {/* <Input onChange={(e) => setInput(e.target.value)} value={input} placeholder='Basic usage' /> */}
      <Text>{number}</Text>
      <Button>Submit</Button>
    </VStack>
  );
}
