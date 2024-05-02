import CardOverview from "@/app/_components/ui/dashboard_overview/CardOverview";
import BarChart from "@/app/_components/ui/dashboard_overview/BarChart";
import { Grid, Card } from "@chakra-ui/react";
import { Box, Heading } from "@chakra-ui/react";

export default function Dashboard() {
  return (
    <Box w={"full"}>
      <Heading m={3}>OverView</Heading>
      <Grid templateColumns="repeat(4, 1fr)" gap={6}>
        <CardOverview title="ส่งต่อผู้ป่วย" body="7" date="3/8/2020" bgcolor="#9E57DA" />
        <CardOverview title="รับผู้ป่วยใหม่" body="10" date="3/8/2020" bgcolor="#56BEC9" />
        <CardOverview title="คำขอถูกปฏิเสธ" body="10" date="3/8/2020" bgcolor="#E5483E" />
        <CardOverview title="คำขอผ่านการอนุมัติ" body="16" date="3/8/2020" bgcolor="#09B006" />
      </Grid>
      <Heading mt={10} p={3}>
        Today
      </Heading>
      <Card p={5}>
        <BarChart />
      </Card>
    </Box>
  );
}
