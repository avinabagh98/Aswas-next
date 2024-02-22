"use client";

import { useEffect, useState } from "react";
import styles from "./home.module.css";
import Buttongroup from "@/components/choice/Buttongroup";
import Checkbutton from "@/components/choice/Checkbutton";
import Footer from "@/components/prelogin/Footer";
import { useRouter } from "next/navigation";

export default function page() {
  // const [data, setData] = useState({ "language": "en", "role": "user" });
  const [language, setLanguage] = useState("");
  const [roleValue, setRoleValue] = useState("");
  const route = useRouter();

  const data = {
    "language": language,
    "role": roleValue
  };

  // const setData = (data) => {
  //   localStorage.setItem("data", JSON.stringify(data));
  // };

  const handleRadioChange = (event) => {
    setLanguage(event.target.value);
  };

  const handleBtnChange = (event) => {
    setRoleValue(event.target.id);
    route.push('/home/login');
  };

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(data));
  }, [data]);



  return (
    <div className={styles.pageContainer}>
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
