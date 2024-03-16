import styles from "./Surveyoption.module.css";
import { useState } from "react";



export default function Surveyoption({
  id,
  name,
  optionText,
  handleRadioChange_value,
  handleRadioChange_color,
  radioValue,
}) {
  const idYes = `${id}_yes`;
  const idNo = `${id}_no`;

  return (
    <>
      <div className={styles.container}>
        <div className={styles.text}>{optionText}</div>
        <div className={styles.buttons}>
          <span>
            <label
              htmlFor={idYes}
              className={
                radioValue === "yes"
                  ? styles.labelYes
                  : styles.label_not_selected
              }
            >
              Yes
            </label>
            <input
              type="radio"
              name={name}
              id={idYes}
              value="yes"
              checked={radioValue === "yes"}
              onChange={() => {
                handleRadioChange_color(id, "yes");
              }}
              onClick={(event) => {
                handleRadioChange_value(event);
              }}
            />
          </span>
          <span>
            <label
              htmlFor={idNo}
              className={
                radioValue === "no" ? styles.labelNo : styles.label_not_selected
              }
            >
              No
            </label>
            <input
              type="radio"
              name={name}
              id={idNo}
              value="no"
              checked={radioValue === "no"}
              onChange={() => {
                handleRadioChange_color(id, "no");
              }}
              onClick={(event) => {
                handleRadioChange_value(event);
              }}
            />
          </span>
        </div>
      </div>
    </>
  );
}
