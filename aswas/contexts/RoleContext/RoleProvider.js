"use client";
import RoleContext from "./RoleContext";
import { useState } from "react";

export default function RoleProvider({ children }) {
  const [role, setRole] = useState("");
  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  );
}
