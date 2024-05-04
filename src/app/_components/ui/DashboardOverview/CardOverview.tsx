import { Divider, Flex, Spacer, SystemStyleObject } from "@chakra-ui/react";
import { Card, CardHeader, CardBody, CardFooter, Text } from "@chakra-ui/react";
import { PiNumberCircleOneLight } from "react-icons/pi";
import { Box } from "@chakra-ui/react";
import style from "./Dashboard.module.css";
import { type Status } from "@prisma/client";
import CardProcess from "../dashboard/CardProcess";

interface CardOverviewProps {
  //icon: IconType;
  title: string;
  body: Status;
  date: string;
  bgcolor: string;
}

const cardStyle : SystemStyleObject = {
  borderRadius: "lg",
  overflow: "hidden"
}

export default function CardOverview({ title, body, date, bgcolor }: CardOverviewProps) {


  return (
    <Box w={"full"}>
      <Card size="md">
        <CardHeader bg={bgcolor}>
          <Flex>
            <PiNumberCircleOneLight size={40} />
            <Text whiteSpace={"nowrap"} overflow={"hidden"} textOverflow={"ellipsis"} className={style.customHeading} ml={1}>
              {title}
            </Text>
          </Flex>
        </CardHeader>
        <CardBody>
          <Text className={style.custom1}><CardProcess status={body}/> รายการ</Text>
        </CardBody>
        <Divider></Divider>
        <CardFooter>
          <Text>อัพเดทล่าสุด</Text>
          <Spacer></Spacer>
          <Text>{date}</Text>
        </CardFooter>
      </Card>
    </Box>
  );
}
