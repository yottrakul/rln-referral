import { getHospitalAll } from "@/app/_actions/request";
import HospitalReferInput from "./HospitalReferInput";

const HospitalReferInputWrapper = async () => {
  const hospitals = await getHospitalAll();
  return <HospitalReferInput hospitals={hospitals} />;
};

export default HospitalReferInputWrapper;
