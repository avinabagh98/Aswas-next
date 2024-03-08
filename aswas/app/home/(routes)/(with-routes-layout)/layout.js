"use client";

import styles from "./layout.module.css";
import Textparser from "@/components/home/Textparser";
import LocalStorageFetcher from "@/components/LocalStorageFetcher";
export default function layout({ children }) {
  const username = localStorage.getItem("username");
  const userRole = LocalStorageFetcher({ keyName: "role" });

  return (
    <>
      <div className={styles.container}>
        <div className={styles.namebar}>
          <span>
            <Textparser text={`${username}(${userRole})`} />
            <br />
            <Textparser text={"Baruipur-Ward No.12-Team No.2"} />
          </span>
          <span>Round-1</span>
        </div>
        <span className="m-2">{children}</span>
      </div>
    </>
  );
}
