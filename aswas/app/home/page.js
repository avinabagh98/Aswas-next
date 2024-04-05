"use client";

import { useEffect, useState } from "react";
import styles from "./home.module.css";
import Buttongroup from "@/components/role-lang/Buttongroup";
import Checkbutton from "@/components/role-lang/Checkbutton";
import Footer from "@/components/prelogin/Footer";
import { useRouter } from "next/navigation";
import Header from "@/components/Header/Header";

// //Context API
import { useContext } from "react";
import LanguageContext from "@/contexts/LanguageContext";
import RoleContext from "@/contexts/RoleContext/RoleContext";

export default function page() {
  const [language, setLanguage] = useState("en");
  const [roleValue, setRoleValue] = useState("");
  const [rolenName, setRolenName] = useState("");

  const route = useRouter();
  const { setLanguageVal } = useContext(LanguageContext);
  const { setRole, setRoleId } = useContext(RoleContext);

  const handleRadioChange = (event) => {

    setLanguage(event.target.value);
    setLanguageVal(event.target.value);
  };

  const handleBtnChange = (event) => {
    setRole(event.target.name);
    setRoleId(event.target.id);
    route.push("/home/login");
  };


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
