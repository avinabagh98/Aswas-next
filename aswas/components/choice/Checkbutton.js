"use client";

import React from "react";
import { useState } from "react";
import styles from "./Checkbutton.module.css";

export default function Checkbutton({ handleRadioChange, radioValue }) {
  // const [radioValue, setRadioValue] = useState("");

  // const handleRadioChange = (event) => {
  //   setRadioValue(event.target.value);
  // };
  return (
    <>
      <div className={styles.checkbuttonContainer}>
        <form>
          <span
            className={`${
              radioValue === "english" ? styles.btnSpanchecked : styles.btnSpan
            }`}
          >
            <div>
              <input
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault1"
                value="english"
                className={styles.radio}
                checked={radioValue === "english"}
                onChange={handleRadioChange}
              />
              <label
                htmlFor="flexRadioDefault1"
                className={`${
                  radioValue === "english"
                    ? styles.btnSpanLabelchecked
                    : styles.btnSpanLabel
                }`}
              >
                English
              </label>
            </div>
          </span>

          <span
            className={`${
              radioValue === "bengali" ? styles.btnSpanchecked : styles.btnSpan
            }`}
          >
            <div>
              <input
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault2"
                value="bengali"
                className={styles.radio}
                checked={radioValue === "bengali"}
                onChange={handleRadioChange}
              />
              <label
                htmlFor="flexRadioDefault2"
                className={`${
                  radioValue === "bengali"
                    ? styles.btnSpanLabelchecked
                    : styles.btnSpanLabel
                }`}
              >
                Bengali
              </label>
            </div>
          </span>

          <span
            className={`${
              radioValue === "hindi" ? styles.btnSpanchecked : styles.btnSpan
            }`}
          >
            <div>
              <input
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault3"
                value="hindi"
                className={styles.radio}
                checked={radioValue === "hindi"}
                onChange={handleRadioChange}
              />
              <label
                htmlFor="flexRadioDefault3"
                className={`${
                  radioValue === "hindi"
                    ? styles.btnSpanLabelchecked
                    : styles.btnSpanLabel
                }`}
              >
                Hindi
              </label>
            </div>
          </span>

          <span
            className={`${
              radioValue === "nepali" ? styles.btnSpanchecked : styles.btnSpan
            }`}
          >
            <div>
              <input
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault4"
                value="nepali"
                className={styles.radio}
                checked={radioValue === "nepali"}
                onChange={handleRadioChange}
              />
              <label
                htmlFor="flexRadioDefault4"
                className={`${
                  radioValue === "nepali"
                    ? styles.btnSpanLabelchecked
                    : styles.btnSpanLabel
                }`}
              >
                Nepali
              </label>
            </div>
          </span>
        </form>
      </div>
    </>
  );
}
