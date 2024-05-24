import { getHospitalAll } from "@/app/_actions/back_office";
import BreadcrumbNav from "@/app/_components/ui/BreadcrumbNav";
import CreateRequest from "@/app/_components/ui/create-request/CreateRequest";

export default async function page() {
  const hospitals = await getHospitalAll();
  return (
    <>
      <BreadcrumbNav />
      <CreateRequest containerStyle={{ mt: "4" }} hospitals={hospitals} />
    </>
  );
}
