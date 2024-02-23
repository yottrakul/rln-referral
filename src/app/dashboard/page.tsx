import RegisterForm from "@/app/_components/ui/Register/RegisterForm";
import LogoutButton from "@/app/_components/ui/Logout/LogoutButton";
import UserDetailsClientComponent from "../_components/ui/Example/UserAuthDetails/ClientComponent";
import UserDetailsServerComponent from "../_components/ui/Example/UserAuthDetails/ServerComponent";
import SkeletonUserDetail from "../_components/ui/Example/Skeleton/UserDetails";
import { Suspense } from "react";
// import { auth } from "@/server/auth";

export default function Dashboard() {
  return (
    <main>
      <UserDetailsClientComponent />
      <Suspense fallback={<SkeletonUserDetail />}>
        <UserDetailsServerComponent />
      </Suspense>
      <RegisterForm />
      <LogoutButton />
    </main>
  );
}
