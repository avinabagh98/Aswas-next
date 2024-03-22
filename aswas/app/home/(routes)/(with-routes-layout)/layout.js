"use client";

import styles from "./layout.module.css";
import Textparser from "@/components/home/Textparser";
import LocalStorageFetcher from "@/components/LocalStorageFetcher";
import { useEffect } from "react";
export default function layout({ children }) {
  const userRole = LocalStorageFetcher({ keyName: "role_name" });
  const name = localStorage.getItem("name");
  const municipality_name = localStorage.getItem("municipality_name");
  const ward_name = localStorage.getItem("ward_name");
  const team_num = localStorage.getItem("team_number");

  return (
    <>
      <div className={styles.container}>
        <div className={styles.namebar}>
          <span>
            <Textparser text={`${name}(${userRole})`} />
            <br />
            <Textparser text={`${municipality_name} Ward-${ward_name}`} />
          </span>
          <span>{`Team-${team_num}`}</span>
        </div>
        <span>{children}</span>
      </div>
    </>
  );
}
