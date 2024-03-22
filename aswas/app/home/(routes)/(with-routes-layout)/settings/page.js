"use client";

import { useState, useEffect } from "react";
import styles from "./settings.module.css";
import Checkbutton from "@/components/role-lang/Checkbutton";
import Header from "@/components/Header/Header";

export default function page() {
  const [name, setName] = useState("");
  const [radioValue, setRadioValue] = useState("");

  const handleRadioChange = (event) => {
    setRadioValue(event.target.value);
  };

  useEffect(() => {
    //logic default language eng
    // if(radioValue === "") {
    //   setRadioValue("english");
    //   console.log(radioValue);
    // }
    setName(localStorage.getItem("phone"));
    if (radioValue) {
      console.log(radioValue);
    }
  }, [radioValue, name]);

  return (
    <>
      <Header isOffCanvasVisible={false} />
      <div className={styles.settingsContainer}>
        <h3 className="text-decoration-none "> NAME: {name}</h3>
        <div>
          <h3>CHANGE LANGUAGE</h3>
          <Checkbutton
            handleRadioChange={handleRadioChange}
            radioValue={radioValue}
          />
        </div>
        <div className={styles.passwordContainer}>
          <h3>CHANGE PASSWORD</h3>
          <span>
            <label htmlFor="oldpassword">OLD PASSWORD</label>
            <input type="password" id="oldpassword"></input>
          </span>

          <span>
            <label htmlFor="newpassword"> NEW PASSWORD</label>
            <input type="password" id="newpassword"></input>
          </span>
        </div>
        <a href="/home/schedule">
          <button>UPDATE</button>
        </a>
      </div>
    </>
  );
}
