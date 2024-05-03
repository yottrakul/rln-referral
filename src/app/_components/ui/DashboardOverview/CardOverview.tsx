import { Divider, Flex, Spacer, SystemStyleObject } from "@chakra-ui/react";
import { Card, CardHeader, CardBody, CardFooter, Text } from "@chakra-ui/react";
import { PiNumberCircleOneLight } from "react-icons/pi";
import { Box } from "@chakra-ui/react";
import style from "./Dashboard.module.css";

interface CardOverviewProps {
  //icon: IconType;
  title: string;
  body: string;
  date: string;
  bgcolor: string;
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
          <Text className={style.custom1}>{body} รายการ</Text>
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
