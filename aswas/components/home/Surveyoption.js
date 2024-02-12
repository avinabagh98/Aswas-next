import styles from "./Surveyoption.module.css";
import { useState } from "react";

export default function Surveyoption({ optionText }) {
  const [radioValue, setRadioValue] = useState("");
  const handleRadioChange = (event) => {
    setRadioValue(event.target.value);
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.text}>{optionText}</div>
        <div className={styles.buttons}>
          <span>
            <label htmlFor="radio1" className={styles.labelYes}>
              Yes
            </label>
            <input
              type="radio"
              name="radio"
              id="radio1"
              value="yes"
              checked={radioValue === "yes"}
              onChange={handleRadioChange}
            />
          </span>
          <span>
            <label htmlFor="radio2" className={styles.labelNo}>
              No
            </label>
            <input
              type="radio"
              name="radio"
              id="radio2"
              value="no"
              checked={radioValue === "no"}
              onChange={handleRadioChange}
            />
          </span>
        </div>
      </div>
    </>
  );
}
