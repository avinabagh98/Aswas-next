"use client";

import React from 'react';
import { useState } from 'react';
import styles from './Checkbutton.module.css';

export default function Checkbutton() {
  // const [checked, setChecked] = useState(false);
  const [radioValue, setRadioValue] = useState('');

  const handleRadioChange = (event) => {
    setRadioValue(event.target.value);
  };
  return (
    <>
      <div className={styles.checkbuttonContainer}>
        <div className={styles.checkbutton}>

          <form>
            <div>
              <input
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault1"
                value="english"
                className={styles.radio}
                checked={radioValue === 'english'}
                onChange={handleRadioChange}
              />
              <label htmlFor="flexRadioDefault1"
                className={`${styles.label} ${radioValue === 'english' ? styles.checked : styles.unchecked}`}>
                English
              </label>
            </div>



            <div className={styles.btn}>
              <input
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault2"
                value="bengali"
                className={styles.radio}
                checked={radioValue === 'bengali'}
                onChange={handleRadioChange}
              />
              <label htmlFor="flexRadioDefault2" className={`${styles.label} ${radioValue === 'bengali' ? styles.checked : styles.unchecked}`}>
                Bengali
              </label>
            </div>


            <div>
              <input
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault3"
                value="hindi"
                className={styles.radio}
                checked={radioValue === 'hindi'}
                onChange={handleRadioChange}
              />
              <label htmlFor="flexRadioDefault3" className={`${styles.label} ${radioValue === 'hindi' ? styles.checked : styles.unchecked}`}>
                Hindi
              </label>
            </div>

            <div>
              <input
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault4"
                value="nepali"
                className={styles.radio}
                checked={radioValue === 'nepali'}
                onChange={handleRadioChange}
              />
              <label htmlFor="flexRadioDefault4" className={`${styles.label} ${radioValue === 'nepali' ? styles.checked : styles.unchecked}`}>
                Nepali
              </label>
            </div>










          </form>

        </div>

      </div>
    </>
  );
}
