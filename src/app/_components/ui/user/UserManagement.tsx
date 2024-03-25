import { getUserByQueryAndRole } from "@/app/_actions/back_office";
import UserManagementTable from "@/app/_components/ui/user/table/UserManagementTable";
import Pagination from "../table/Pagination";
import { VStack } from "@chakra-ui/react";
import { getTotalPage, getValidPage } from "@/app/_lib";
import { LIMIT_PER_PAGE } from "@/app/_lib/definition";

interface UserManagementProps {
  query?: string;
  role?: string;
  page?: string;
}

export default async function UserManagement({ query = "", role = "", page }: UserManagementProps) {
  const {
    data: users,
    pegination: { total },
  } = await getUserByQueryAndRole(query, role, page);

  const validPage = getValidPage(page);
  const totalPage = getTotalPage(total, LIMIT_PER_PAGE);

  // if (page && validPage > totalPage) {
  //   return <div>Page not found</div>;
  // }

  return (
    <UserManageLayout>
      <UserManagementTable data={users} />
      <Pagination currentPage={validPage} totalPage={totalPage} />
    </UserManageLayout>
  );
}

const UserManageLayout = ({ children }: { children: React.ReactNode }) => {
  return <VStack align={"end"}>{children}</VStack>;
};
