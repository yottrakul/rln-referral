import BarChart from "@/app/_components/ui/dashboard_overview/BarChart";
import { Grid, Card } from "@chakra-ui/react";
import { Box, Heading } from "@chakra-ui/react";
import CardOverviewWrapper from "@/app/_components/ui/dashboard_overview/CardOverviewWrapper";
import { Suspense } from "react";
import CardOverviewSkeleton from "@/app/_components/ui/dashboard_overview/skeleton/CardOverviewSkeleton";

export default function Dashboard() {
  return (
    <Box w={"full"}>
      <Heading m={3}>Overview</Heading>
      <Grid suppressHydrationWarning templateColumns="repeat(auto-fit, minmax(280px,1fr))" gap={6}>
        <Suspense fallback={<CardOverviewSkeleton />}>
          <CardOverviewWrapper />
        </Suspense>
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
