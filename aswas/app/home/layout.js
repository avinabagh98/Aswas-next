"use client";
import styles from "./home.module.css";
//Context Api
// import { createContext, useState } from "react";
// export const LanguageContext = createContext();

export default function homelayout({ children }) {
  // const [languageVal, setLanguageVal] = useState("en");
  return (
    <>
      <div className={styles.body}>{children}</div>
    </>
  );
}
