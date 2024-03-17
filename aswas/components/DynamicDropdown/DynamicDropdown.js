// DynamicDropdown.js

import React from "react";
import styles from "./DynamicDropdown.module.css";

function DynamicDropdown({ label, options, id, onChange }) {
  return (
    <div className={styles.dropdownContainer}>
      <label htmlFor={id} className={styles.dropdownLabel}>
        {label}
      </label>
      <select id={id} className={styles.dropdownSelect} onChange={onChange}>
        {options.map((option, index) => (
          <option key={index} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default DynamicDropdown;
