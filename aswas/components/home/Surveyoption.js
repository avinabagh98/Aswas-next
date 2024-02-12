import styles from "./Surveyoption.module.css";
import { useState } from "react";

export default function Surveyoption({ labelText }) {
  const [radioValue, setRadioValue] = useState("");
  const handleRadioChange = (event) => {
    setRadioValue(event.target.value);
  };
  return (
    <>
      <div className={styles.container}>
        <label>{labelText}</label>
        <input type="radio" className={styles.surveyInput}>
          Yes
        </input>
      </div>
    </>
  );
}
