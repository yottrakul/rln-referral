import CardOverview from "@/app/_components/ui/DashboardOverview/CardOverview";
import BarChart from "@/app/_components/ui/DashboardOverview/BarChart";
import { Grid, Card, SystemStyleObject } from "@chakra-ui/react";
import { Box, Heading } from "@chakra-ui/react";

const cardBox: SystemStyleObject = {
  display : "grid",
  gap : "1rem",

  gridTemplateColumns:"repeat(4,1fr)"

}

export default function Dashboard() {

  // return (
  //   <Box w={"full"}>
  //     <Heading m={3}>OverView</Heading>
  //     <Grid templateColumns="repeat(4, 1fr)" gap={6}>
  //       <CardOverview title="ส่งต่อผู้ป่วย" body="PENDING" date="3/8/2020" bgcolor="#9E57DA" />
  //       <CardOverview title="รับผู้ป่วยใหม่" body="ACCEPT" date="3/8/2020" bgcolor="#56BEC9" />
  //       <CardOverview title="คำขอถูกปฏิเสธ" body="REJECT" date="3/8/2020" bgcolor="#E5483E" />
  //       <CardOverview title="คำขอผ่านการอนุมัติ" body="COMPLETE" date="3/8/2020" bgcolor="#09B006" />
  //     </Grid>
  //     <Heading mt={10} p={3}>
  //       Today
  //     </Heading>
  //     <Card p={5}>
  //       <BarChart />
  //     </Card>
  //   </Box>
  // );

  

  return(
    <>
      <Heading>Overview</Heading>
      <Box sx={cardBox}>
        <CardOverview title="ส่งต่อผู้ป่วย" body="PENDING" date="3/8/2020" bgcolor="#9E57DA" />
        <CardOverview title="รับผู้ป่วยใหม่" body="ACCEPT" date="3/8/2020" bgcolor="#56BEC9" />
        <CardOverview title="คำขอถูกปฏิเสธ" body="REJECT" date="3/8/2020" bgcolor="#E5483E" />
        <CardOverview title="คำขอผ่านการอนุมัติ" body="COMPLETE" date="3/8/2020" bgcolor="#09B006" />
      </Box>
    </>
  )
}
