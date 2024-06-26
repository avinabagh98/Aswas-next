import styles from "./Footer.module.css";
import LanguageFetcher from "../LanguageFetcher";
export default function Footer() {
  const translate = LanguageFetcher();
  return (
    <div className={styles.footer}>
      <h5>{translate?.state_urban_development_agency}</h5>
      <h6>{translate?.urban_development_municipal_affairs_department}</h6>
      <p>{translate?.govt_of_west_bengal}</p>
      <img
        src="/images/prevent_img_icon.png"
        alt="footer-prevent"
        className={styles.prevent}
      ></img>
      <img
        src="/images/spalsh_scree_bottom_design.png"
        alt="footer-buttom"
      ></img>
    </div>
  );
}
