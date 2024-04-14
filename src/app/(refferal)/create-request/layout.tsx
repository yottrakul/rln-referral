import { Grid } from "@chakra-ui/react";

export const metadata = {
  title: "RCS | สร้างคำขอ",
  description: "RCS BY ...",
};

export default async function CreateRequestLayout({ children }: { children: React.ReactNode }) {
  return (
    <Grid gridTemplateRows={"auto 1fr"} minH={"100%"}>
      {children}
    </Grid>
  );
}
