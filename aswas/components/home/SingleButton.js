import React from "react";
import styles from "./SingleButton.module.css";

export default function SingleButton({ onClick, btnText }) {
  return (
    <div className={styles.btnContainer}>
      <span className={styles.btnSpan}>
        <a href="#">
          <button id={btnText} onClick={onClick}>
            {btnText}
          </button>
        </a>
      </span>
    </div>
  );
}
