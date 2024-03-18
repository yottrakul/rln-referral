import { getUserByQueryAndRole } from "@/app/_actions/back_office";
import UserManagementTable from "@/app/_components/ui/user/table/UserManagementTable";
import { unstable_noStore as noStore } from "next/cache";

interface UserManagementProps {
  query?: string;
  role?: string;
}

export default async function UserManagement({ query = "", role = "" }: UserManagementProps) {
  noStore();
  const users = await getUserByQueryAndRole(query, role);

  return (
    <>
      <UserManagementTable data={users} />
    </>
  );
}
