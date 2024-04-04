"use client";

import { useEffect, useState } from "react";
import styles from "./home.module.css";
import Buttongroup from "@/components/role-lang/Buttongroup";
import Checkbutton from "@/components/role-lang/Checkbutton";
import Footer from "@/components/prelogin/Footer";
import { useRouter } from "next/navigation";
import Header from "@/components/Header/Header";

export default function page() {
  const [language, setLanguage] = useState("en");
  const [roleValue, setRoleValue] = useState("");
  const [rolenName, setRolenName] = useState("");

  const route = useRouter();

  const data = {
    language: language,
    role_id: roleValue,
    role_name: rolenName,
  };

  const handleRadioChange = (event) => {
    setLanguage(event.target.value);
  };

  const handleBtnChange = (event) => {
    setRoleValue(event.target.id);
    setRolenName(event.target.name);
    route.push("/home/login");
  };

  useEffect(() => {
    window.localStorage.setItem("data", JSON.stringify(data));
    window.localStorage.setItem("role_name", rolenName);
    window.localStorage.setItem("role_id", roleValue);
  }, [data, roleValue, rolenName]);

  return (
    <div className={styles.pageContainer}>
      <Header defaultHeader={true} />
      <span className={styles.languageContainer}>
        <h2>SELECT LANGUAGE</h2>
        <Checkbutton
          handleRadioChange={handleRadioChange}
          radioValue={language}
        />
      </span>
      <span className={styles.roleContainer}>
        <h2>SELECT USER ROLE</h2>
        <Buttongroup handleBtnChange={handleBtnChange} />
      </span>
      <Footer />
    </div>
  );
}
