"use client";
import { Card, CardBody, Heading, Box, SimpleGrid, Text, Icon, Button } from "@chakra-ui/react";
import { InfoOutlineIcon } from "@chakra-ui/icons";

interface Props {
  fname: string;
  lname: string;
  sex: string;
  age: string;
  hospital: string;
  status: string;
}

export default function CardData({ fname, lname, sex, age, hospital, status }: Props) {
  window.addEventListener("scroll", function (e) {
    const box = document.getElementById("scroll");
    if (Number(box?.offsetHeight) - Number(window.scrollY) <= 900) {
      console.log(Number(box?.offsetHeight) - Number(window.scrollY));
    }
  });
  return (
    <>
      <Card>
        <CardBody px={6}>
          <Heading as="h6" style={{ fontSize: "25px" }}>
            ข้อมูลผู้ป่วย
          </Heading>

          <Box mt={4}>
            <SimpleGrid columns={2} spacing={2}>
              <Text as="b">ชื่อ</Text>
              <Text as="b">นามสกุล</Text>
              <Text>{fname}</Text>
              <Text>{lname}</Text>
              <Text as="b">เพศ</Text>
              <Text as="b">อายุ</Text>
              <Text>{sex}</Text>
              <Text>{age}</Text>
              <Text as="b">โรงพยาบาลต้นทาง</Text>
              <Text as="b">สถานะ</Text>
              <Text>{hospital}</Text>
              <Text>{status}</Text>
            </SimpleGrid>
          </Box>

          <Button colorScheme={"linkedin"} mt={4} w={"100%"} variant="outline" size={"sm"}>
            <Icon as={InfoOutlineIcon} mr={3} />
            ดูรายละเอียด
          </Button>
        </CardBody>
      </Card>
    </>
  );
}
