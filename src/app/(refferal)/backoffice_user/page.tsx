import UserFilterControl from "@/app/_components/ui/back_office/UserFilterControl";
import UserManagement from "@/app/_components/ui/user/UserManagement";
import { Suspense } from "react";

export default async function backoffice_user({ searchParams }: { searchParams?: { query?: string; role?: string } }) {
  const query = searchParams?.query ?? "";
  const role = searchParams?.role ?? "";
  return (
    <main>
      <UserFilterControl />
      <Suspense key={query + role} fallback={<div>Loading...</div>}>
        <UserManagement query={query} role={role} />
      </Suspense>
      {/* <Pagination/> */}
    </main>
  );
}
