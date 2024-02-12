"use client";

import { Row, Offcanvas, Button } from "react-bootstrap";
import { useState } from "react";
import styles from "./home.module.css";
import bg from "../../public/images/app_background_image.jpg";

export default function homelayout({ children }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div
        style={{
          backgroundImage: `url(${bg.src})`,
          width: "100vw",
          height: "100vh",
        }}
      >
        {/* Mobile Screen Header */}
        <Row className={styles.header}>
          <div className={styles.headerContent}>
            <div className={styles.headerOffcanvaBtn}>
              <a onClick={handleShow}>
                <img src="/images/top_menu_drawer.png" alt="logo1"></img>
              </a>
            </div>

            <Offcanvas
              show={show}
              onHide={handleClose}
              style={{ width: "75%" }}
            >
              <Offcanvas.Header className={styles.offCanvasHeader}>
                <div className={styles.offCanvasHeaderLogo}>
                  <img
                    src="/images/west_bengal_biswa_bangla_logo.png"
                    alt="logo1"
                  ></img>
                  <div className={styles.offCanvasHeaderLogoText}>
                    <p>VCM</p>
                  </div>
                </div>
              </Offcanvas.Header>
              <Offcanvas.Body className={styles.offCanvasBody}>
                <div className={styles.offCanvasBodyMenu}>
                  <div className={styles.MenuLink}>
                    <img src="/images/dashbord_menu_icon.png"></img>
                    DASH BOARD
                  </div>
                  <div className={styles.MenuLink}>
                    <img src="/images/schedule_menu_icon.png"></img>
                    SCHEDULE
                  </div>
                  <div className={styles.MenuLink}>
                    <img src="/images/team_menu_icon.png"></img>
                    TEAM
                  </div>
                  <div className={styles.MenuLink}>
                    <img src="/images/daily_survey_report_icon.png"></img>
                    DAILY SURVEY REPORT
                  </div>
                </div>

                <div className={styles.offCanvasBodyMenuFooter}>
                  <div className={styles.MenuLink}>
                    <img src="/images/settings_menu_icon.png"></img>
                    SETTINGS
                  </div>
                  <div className={styles.MenuLink}>
                    <img src="/images/logout_menu_icon.png"></img>
                    LOG OUT
                  </div>
                </div>
              </Offcanvas.Body>
            </Offcanvas>

            <div className={styles.logo}>
              <img
                src="/images/west_bengal_biswa_bangla_logo.png"
                alt="logo1"
              ></img>
              <div className={styles.logoText}>
                <p>VCM</p>
              </div>
            </div>
          </div>
        </Row>
        <Row className={styles.body}>{children}</Row>
      </div>
    </>
  );
}
