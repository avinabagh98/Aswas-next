"use client";

import React from "react";
import styles from "./Checkbutton.module.css";

export default function Checkbutton({ handleRadioChange, radioValue }) {

  return (
    <>
      <div className={styles.checkbuttonContainer}>
        <form>
          <span
            className={`${radioValue === "en" ? styles.btnSpanchecked : styles.btnSpan
              }`}
          >
            <div>
              <input
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault1"
                value="en"
                className={styles.radio}
                checked={radioValue === "en"}
                onChange={handleRadioChange}
              />
              <label
                htmlFor="flexRadioDefault1"
                className={`${radioValue === "en"
                  ? styles.btnSpanLabelchecked
                  : styles.btnSpanLabel
                  }`}
              >
                English
              </label>
            </div>
          </span>

          <span
            className={`${radioValue === "bn" ? styles.btnSpanchecked : styles.btnSpan
              }`}
          >
            <div>
              <input
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault2"
                value="bn"
                className={styles.radio}
                checked={radioValue === "bn"}
                onChange={handleRadioChange}
              />
              <label
                htmlFor="flexRadioDefault2"
                className={`${radioValue === "bn"
                  ? styles.btnSpanLabelchecked
                  : styles.btnSpanLabel
                  }`}
              >
                Bengali
              </label>
            </div>
          </span>

          <span
            className={`${radioValue === "hi" ? styles.btnSpanchecked : styles.btnSpan
              }`}
          >
            <div>
              <input
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault3"
                value="hi"
                className={styles.radio}
                checked={radioValue === "hi"}
                onChange={handleRadioChange}
              />
              <label
                htmlFor="flexRadioDefault3"
                className={`${radioValue === "hi"
                  ? styles.btnSpanLabelchecked
                  : styles.btnSpanLabel
                  }`}
              >
                Hindi
              </label>
            </div>
          </span>

          <span
            className={`${radioValue === "nepali" ? styles.btnSpanchecked : styles.btnSpan
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
                className={`${radioValue === "nepali"
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
