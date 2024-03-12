import { getUserAll } from "@/app/_actions/data/user";
import UserManagementTable from "@/app/_components/ui/user/table/UserManagementTable";
import { unstable_noStore as noStore } from "next/cache";

export default async function UserManagement() {
  noStore();
  const users = await getUserAll();

  return (
    <>
      <UserManagementTable data={users} />
    </>
  );
}
