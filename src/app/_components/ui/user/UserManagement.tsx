import { getUserAll } from "@/app/_actions/data/user";
import UserManagementTable from "@/app/_components/ui/user/table/UserManagementTable";

export default async function UserManagement() {
  const users = await getUserAll();

  return (
    <>
      <UserManagementTable data={users} />
    </>
  );
}
