// DynamicDropdown.js

import React from 'react';
import styles from './DynamicDropdown.module.css'

function DynamicDropdown({ label, options, id }) {
    return (
        <div className={styles.dropdownContainer}>
            <label htmlFor={id} className={styles.dropdownLabel}>{label}</label>
            <select id={id} className={styles.dropdownSelect}>
                {options.map((option, index) => (
                    <option key={index} value={option.value}>{option.label}</option>
                ))}
            </select>
        </div>

    );
}

export default DynamicDropdown;
