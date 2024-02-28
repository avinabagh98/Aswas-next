import React from "react";
import styles from "./SingleButton.module.css";

export default function SingleButton({ handleBtnChange, btnText, href }) {
  return (
    <div className={styles.btnContainer}>
      <span className={styles.btnSpan}>
        <a href={href}>
          <button id={btnText} onClick={handleBtnChange}>
            {btnText}
          </button>
        </a>
      </span>
    </div>
  );
}
