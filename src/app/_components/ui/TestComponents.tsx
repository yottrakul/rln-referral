import { getProcessListAR } from "@/app/_actions/data/user";

export default async function TestComponents() {
  const users = await getProcessListAR("ACCEPT", 1, 1);
  // console.log(users);
  return <div>
    
  </div>;
}
