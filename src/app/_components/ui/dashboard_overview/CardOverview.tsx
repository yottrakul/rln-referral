"use client";
import { Card, CardBody, CardFooter, CardHeader, Divider, Spacer, Text } from "@chakra-ui/react";
import style from "./Dashboard.module.css";

interface CardOverviewProps {
  title: string;
  date: string;
  bgcolor: string;
  amount?: number;
}

export default function CardOverview({ title, date, bgcolor, amount }: CardOverviewProps) {
  return (
    <Card size="md" borderRadius="lg" overflow="hidden">
      <CardHeader bg={bgcolor}>
        <Text
          whiteSpace={"nowrap"}
          overflow={"hidden"}
          textOverflow={"ellipsis"}
          className={style.customHeading}
          ml={1}
        >
          {title}
        </Text>
      </CardHeader>
      <CardBody>
        <Text className={style.custom1}>{amount ?? "0"} รายการ</Text>
      </CardBody>
      <Divider />
      <CardFooter>
        <Text>อัพเดทล่าสุด</Text>
        <Spacer></Spacer>
        <Text>{date}</Text>
      </CardFooter>
    </Card>
  );
}
