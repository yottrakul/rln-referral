import RegisterForm from "@/app/_components/ui/Register/RegisterForm";
import LogoutButton from "@/app/_components/ui/Logout/LogoutButton";
import { auth } from "@/server/auth";

export default async function Dashboard() {
  const seesion = await auth();
  return (
    <main>
      <RegisterForm />
      <LogoutButton />
      {JSON.stringify(seesion)}
    </main>
  );
}
