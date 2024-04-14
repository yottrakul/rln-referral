import { Grid, GridItem, Button } from "@chakra-ui/react";
import PatientSummary from "@/app/_components/ui/create-request/PatientSummary";
import MedRecordSummary from "@/app/_components/ui/create-request/MedRecordSummary";

interface CreateRefferalFormProps {
  citizenID: string;
}

export default function CreateRefferalForm({ citizenID }: CreateRefferalFormProps) {
  return (
    <Grid gridTemplateColumns={`minmax(0,1fr) minmax(0,1fr)`} gap={4}>
      <GridItem>
        <PatientSummary citizenID={citizenID} />
      </GridItem>
      <GridItem>
        <Grid minH={"100%"} gridTemplateRows={"1fr auto"} gap={4}>
          <GridItem>
            <MedRecordSummary />
          </GridItem>
          <GridItem>
            <Button>สร้างคำขอ</Button>
          </GridItem>
        </Grid>
      </GridItem>
    </Grid>
  );
}
