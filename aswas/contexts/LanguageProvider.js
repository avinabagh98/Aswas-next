"use client";
import LanguageContext from "@/contexts/LanguageContext";
import { useState } from "react";

export default function LanguageProvider({ children }) {
  const [languageVal, setLanguageVal] = useState("en");

  return (
    <LanguageContext.Provider value={{ languageVal, setLanguageVal }}>
      {children}
    </LanguageContext.Provider>
  );
}
