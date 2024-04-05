"use client";
import RoleContext from "./RoleContext";
import { useState } from "react";

export default function RoleProvider({ children }) {
  const [role, setRole] = useState("");
  const [roleId, setRoleId] = useState("");
  return (
    <RoleContext.Provider value={{ role, setRole, roleId, setRoleId }}>
      {children}
    </RoleContext.Provider>
  );
}
