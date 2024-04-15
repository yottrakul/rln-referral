"use client";
import { deleteManyUser } from "@/app/_actions/back_office";
import { type UserWithOutPassword } from "@/app/_lib/definition";
import type React from "react";
import { createContext, useContext, useState } from "react";

interface UserManagementContext {
  user: UserWithOutPassword[];
  deleteUser: () => Promise<void>;
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

  const deleteUser = async () => {
    // setUser((userData) => userData.filter((user) => user.id != id));
    const user_id = user.map((e) => {
      return e.id;
    });

    const res = await deleteManyUser(user_id);
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
