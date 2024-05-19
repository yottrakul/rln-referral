import ModalLoadingSkeleton from "@/app/_components/ui/back_office/ModalLoadingSkeleton";
import UpdateUserModal from "@/app/_components/ui/back_office/UpdateUserModal";
import UserFilterControl from "@/app/_components/ui/back_office/UserFilterControl";
import UserManagement from "@/app/_components/ui/back_office/user/UserManagement";
import { Suspense } from "react";

export default async function backoffice_user({
  searchParams,
}: {
  searchParams?: { query?: string; role?: string; modal?: string; updateid?: string; page?: string };
}) {
  const query = searchParams?.query ?? "";
  const role = searchParams?.role ?? "";
  const updateid = searchParams?.updateid ?? "";
  const showModal = searchParams?.modal === "true";
  const page = searchParams?.page ?? "1";
  return (
    <main>
      <UserFilterControl />
      <Suspense key={query + role + page} fallback={<div>Loading...</div>}>
        <UserManagement query={query} role={role} page={page} />
      </Suspense>
      {updateid ? (
        <Suspense key={updateid} fallback={<ModalLoadingSkeleton />}>
          <UpdateUserModal isOpen={showModal} id={updateid} />
        </Suspense>
      ) : null}
    </main>
  );
}
