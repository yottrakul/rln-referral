import Carddata from "@/app/_components/ui/request/CardData";
import {} from "@chakra-ui/react";
import { getCase } from "@/app/_actions/request";

export default async function CardData() {
  const test = await getCase();
  return (
    <>
      <Carddata fname="asd" lname="นน" sex="asd" age="asd" hospital="asd" status="asd" />
      <Carddata fname="asd" lname="นน" sex="asd" age="asd" hospital="asd" status="asd" />
      <Carddata fname="asd" lname="นน" sex="asd" age="asd" hospital="asd" status="asd" />
      <Carddata fname="asd" lname="นน" sex="asd" age="asd" hospital="asd" status="asd" />
      <Carddata fname="asd" lname="นน" sex="asd" age="asd" hospital="asd" status="asd" />
      <Carddata fname="asd" lname="นน" sex="asd" age="asd" hospital="asd" status="asd" />
      <Carddata fname="asd" lname="นน" sex="asd" age="asd" hospital="asd" status="asd" />
      <Carddata fname="asd" lname="นน" sex="asd" age="asd" hospital="asd" status="asd" />
      <Carddata fname="asd" lname="นน" sex="asd" age="asd" hospital="asd" status="asd" />
      <Carddata fname="asd" lname="นน" sex="asd" age="asd" hospital="asd" status="asd" />
      <Carddata fname="asd" lname="นน" sex="asd" age="asd" hospital="asd" status="asd" />
      <Carddata fname="asd" lname="นน" sex="asd" age="asd" hospital="asd" status="asd" />
      <Carddata fname="asd" lname="นน" sex="asd" age="asd" hospital="asd" status="asd" />
      <Carddata fname="asd" lname="นน" sex="asd" age="asd" hospital="asd" status="asd" />
      <Carddata fname="asd" lname="นน" sex="asd" age="asd" hospital="asd" status="asd" />
    </>
  );
}
