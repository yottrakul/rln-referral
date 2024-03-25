import { Card, CardHeader, CardBody, CardFooter ,Heading ,Text ,Flex ,Center ,Circle } from "@chakra-ui/react";

type TypeInfo = {
  id: number;
  label: string;
  count: number;
  color: string;
};

export default function MainCard() {
  const info: TypeInfo[] = [
    {
      id: 0,
      label: "ส่งต่อผู้ป่วย",
      count: 10,
      color: "#9e57da"
    },
    {
      id: 1,
      label: "รับผู้ป่วยใหม่",
      count: 7,
      color: "#56bec9"
    },
    {
      id: 2,
      label: "คำขอถูกปฏิเสธ",
      count: 10,
      color: "#e5483e"
    },
    {
      id: 3,
      label: "คำขอผ่านการอนุมัติ",
      count: 8,
      color: "#09b006"
    },
  ];

  function FormDate() {
    let Currentdate: Date = new Date();
    let m = Currentdate.getMonth().toString();
    let d = Currentdate.toString().split(" ", 5);
    console.log(m,d)
    return (
      <Text as={"sup"}>
        {d[2]}/{m}/{d[3]}
      </Text>
    );
  }

  function CreateCard({ id ,label ,count ,color }: TypeInfo) {
    return (
      <Card w={"200px"}>
        <CardHeader bg={color} roundedTop={"lg"}>
          <Heading fontSize={"1xl"} size={"md"} color={"white"}>
            <Flex>
              <Circle bg="white" size="25px" mr={1} color={color}>
                {id + 1}
              </Circle>
              <Center>{label}</Center>
            </Flex>
          </Heading>
        </CardHeader>

        <CardBody>
          <Text as={"b"}>{count} รายการ</Text>
        </CardBody>

        <CardFooter>
          <FormDate />
        </CardFooter>
      </Card>
    );
  }

  function RenderCard() {
    const listCard = info.map((info) => (
      <CreateCard key={info.id} id={info.id} label={info.label} count={info.count} color={info.color} />
    ));

    return (
      <Flex gap={4} mx={5}>
        {listCard}
      </Flex>
    );
  }

  return <RenderCard />;
}
