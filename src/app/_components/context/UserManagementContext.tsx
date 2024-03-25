"use client";
import { type UserWithOutPassword } from "@/app/_lib/definition";
import { error } from "console";
import type React from "react";
import { createContext, useContext, useState } from "react";

interface UserManagementContext {
  user: UserWithOutPassword[];
  deleteUser: (id: string) => void;
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
  //   const userContextValue = useUserContext();
  const [user, setUser] = useState<UserWithOutPassword[]>([]);

  const deleteUser = (id: string[]) => {
    setUser((userData) => userData.filter((user) => user.id != id));
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

// 'use client';
// import React, {
//   createContext,
//   useContext,
//   useState,
//   type ReactNode,
// } from 'react';

// interface NavbarColorContextType {
//   navbarColor: ColorVariant;
//   changeNavbarColor: (newColor: ColorVariant) => void;
// }
// interface NavbarColorProviderProps {
//   children: ReactNode;
// }

// // For tailwind className ONLY!
// export type ColorVariant = 'bg-primary' | 'bg-black';

// const NavbarColorContext = createContext<NavbarColorContextType | undefined>(
//   undefined
// );

// export const useNavbarColor = (): NavbarColorContextType => {
//   const context = useContext(NavbarColorContext);
//   if (!context) {
//     // ถ้าไม่มีการ wrap ด้วย NavbarColorProvider จะไม่สามารถใช้ Context นี้ได้
//     throw new Error('useNavbarColor must be used within a NavbarColorProvider');
//   }
//   return context;
// };

// export const NavbarColorProvider: React.FC<NavbarColorProviderProps> = ({
//   children,
// }) => {
//   const [navbarColor, setNavbarColor] = useState<ColorVariant>('bg-black'); // เริ่มต้นด้วยสีเริ่มต้น

//   const changeNavbarColor = (newColor: ColorVariant) => {
//     // Prevent useless update state
//     if (newColor === navbarColor) return;

//     setNavbarColor(newColor);
//   };

//   return (
//     <NavbarColorContext.Provider value={{ navbarColor, changeNavbarColor }}>
//       {children}
//     </NavbarColorContext.Provider>
//   );
// };
