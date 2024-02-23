"use client";
import { useSession } from "next-auth/react";
import { Text, Card, Avatar } from "@chakra-ui/react";

export default function ClientComponent() {
  const { data: session } = useSession();
  // can use React Hooks in client components
  // useState, useEffect, useContext, useReducer, useCallback, useMemo, useRef

  // checking if sessions exists
  if (session) {
    // rendering components for logged in users
    return (
      <Card>
        <Avatar size="md" name={session.user.name!} src={session.user.image!} />
        <Text fontSize={"2xl"}>Client Component User Details</Text>
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
