import React from "react";
import styles from "./Footer.module.css";
export default function Footer() {
  return (
    <div className={styles.footer}>
      <h5>STATE URBAN DEVELOPMENT AGENCY (SUDA)</h5>
      <h6>URBAN DEVELOPMENT AND MUNICIPAL AFFAIRS DEPARTMENT</h6>
      <p>GOVT OF WEST BENGAL</p>
      <img src="images/prevent_img_icon.png" className={styles.prevent}></img>
      <img src="images/spalsh_scree_bottom_design.png"></img>
    </div>
  );
}
