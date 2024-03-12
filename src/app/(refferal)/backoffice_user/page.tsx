import UserManagement from "@/app/_components/ui/user/UserManagement";
import { Suspense } from "react";

export default async function backoffice_user() {
  return (
    <main>
      {/* <SearchUser/> */}
      <Suspense fallback={<div>Loading...</div>}>
        <UserManagement />
      </Suspense>
      {/* <Pagination/> */}
    </main>
  );
}
