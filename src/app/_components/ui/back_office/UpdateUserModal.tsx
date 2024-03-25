import { getHospitalAll, getUserById } from "@/app/_actions/back_office";
import UpdateUserModalWrapper from "@/app/_components/ui/back_office/UpdateUserModalWrapper";

interface UpdateUserModalProps {
  id: string;
  isOpen: boolean;
}

export default async function UpdateUserModal({ id, isOpen }: UpdateUserModalProps) {
  const hospitals = await getHospitalAll();
  const user = await getUserById(id);

  return (
    <>
      <UpdateUserModalWrapper isOpen={isOpen} hospitals={hospitals} user={user} />
    </>
  );
}
