import RegisterForm from "@/app/_components/ui/Register/RegisterForm";
import LogoutButton from "@/app/_components/ui/Logout/LogoutButton";
import UserDetailsClientComponent from "@/app/_components/ui/Example/UserAuthDetails/ClientComponent";
import UserDetailsServerComponent from "@/app/_components/ui/Example/UserAuthDetails/ServerComponent";
import SkeletonUserDetail from "@/app/_components/ui/Example/Skeleton/UserDetails";
import { Suspense } from "react";
import HopitalForm from "@/app/_components/ui/back_office/HospitalRegister";
// import { auth } from "@/server/auth";

export default function Dashboard() {
  return (
    <main>
      <UserDetailsClientComponent />
      <Suspense fallback={<SkeletonUserDetail />}>
        <UserDetailsServerComponent />
      </Suspense>
      <RegisterForm />
      <HopitalForm />
      <LogoutButton />
    </main>
  );
}
