import { getServerAuthSession } from "@/server/auth";
import { Card, Text, Avatar } from "@chakra-ui/react";

export default async function UserDetailsServerComponent() {
  const session = await getServerAuthSession();

  // cant use client side code here
  // ex. useState, useSession, useQuery, useMutation, etc.

  // delay 3 seconds to simulate server response time
  await new Promise((resolve) => setTimeout(resolve, 3000));

  if (session) {
    // rendering components for logged in users
    return (
      <Card>
        <Text fontSize={"2xl"}>Server Component User Details</Text>
        <Avatar size="md" name={session.user.name!} src={session.user.image!} />
        <p>
          Welcome <b>{session.user?.name}</b>. Signed In As
        </p>
        <p>
          <b>{session.user?.email}</b>
        </p>
        <p>
          Role : <b>{session.user.role}</b>
        </p>
      </Card>
    );
  }
}
