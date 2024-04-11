import { Grid, GridItem, Button } from "@chakra-ui/react";
import PatientSummary from "@/app/_components/ui/create-request/PatientSummary";
import MedRecordSummary from "@/app/_components/ui/create-request/MedRecordSummary";

interface CreateRefferalFormProps {
  citizenID: string;
}

export default function CreateRefferalForm({ citizenID }: CreateRefferalFormProps) {
  return (
    <>
      <RequestFormLayout>
        <GridItem>
          <PatientSummary citizenID={citizenID} />
        </GridItem>
        <GridItem>
          <MedRecordSummary />
          <Button>สร้างคำขอ</Button>
        </GridItem>
      </RequestFormLayout>
    </>
  );
}

const RequestFormLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Grid gridTemplateColumns={`repeat(2, 50%)`} gap={4}>
      {children}
    </Grid>
  );
};
