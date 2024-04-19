"use client";
import { deleteManyUser } from "@/app/_actions/back_office";
import { type UserWithOutPassword } from "@/app/_lib/definition";
import { useSession } from "next-auth/react";
import type React from "react";
import { createContext, useContext, useState } from "react";

interface UserManagementContext {
  user: UserWithOutPassword[];
  deleteUser: () => Promise<string>;
  setUserData: (users: UserWithOutPassword[]) => void;
}

export const useUserContext = (): UserManagementContext => {
  const context = useContext(userManageMentContext);
  if (!context) {
    throw new Error("Undefined");
  }
  return context;
};

const userManageMentContext = createContext<UserManagementContext | undefined>(undefined);

function UserManagementContextProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserWithOutPassword[]>([]);
  const current_user = useSession();
  let status = "";
  const deleteUser = async () => {
    user.forEach((e) => {
      if (e.id === current_user.data?.user.id) {
        status = "error";
      }
    });

    if (status != "error") {
      const user_id = user.map((e) => {
        return e.id;
      });

      await deleteManyUser(user_id);
      status = "success";
    }
    return status;
  };

  const setUserData = (users: UserWithOutPassword[]) => {
    setUser(users);
  };

  return (
    <userManageMentContext.Provider value={{ user, deleteUser, setUserData }}>
      {children}
    </userManageMentContext.Provider>
  );
}

export default UserManagementContextProvider;
