"use client";

import { useEffect, useState } from "react";
import styles from "./home.module.css";
import Buttongroup from "@/components/choice/Buttongroup";
import Checkbutton from "@/components/choice/Checkbutton";
import Footer from "@/components/prelogin/Footer";

export default function page() {
  const [radioValue, setRadioValue] = useState("");
  const [roleValue, setRoleValue] = useState("");

  const handleRadioChange = (event) => {
    setRadioValue(event.target.value);
  };

  const handleBtnChange = (event) => {
    setRoleValue(event.target.id);
  };

  useEffect(() => {
    //logic default language eng
    // if(radioValue === "") {
    //   setRadioValue("english");
    //   console.log(radioValue);
    // }

    if (radioValue) {
      console.log(radioValue);
    }
  }, [radioValue]);

  useEffect(() => {
    if (roleValue) {
      console.log(roleValue);
    }
  }, [roleValue]);

  return (
    <div className={styles.pageContainer}>
      <span className={styles.languageContainer}>
        <h2>SELECT LANGUAGE</h2>
        <Checkbutton
          handleRadioChange={handleRadioChange}
          radioValue={radioValue}
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
