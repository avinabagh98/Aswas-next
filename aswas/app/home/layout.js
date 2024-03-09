"use client";

import { Row, Offcanvas } from "react-bootstrap";
import { useEffect, useState } from "react";
import styles from "./home.module.css";
// import {ShowOffCanvas} from "@/components/ShowOffCanvas";

export default function homelayout({ children }) {
  const [show, setShow] = useState(false);
  const [ShowOffCanvas, setShowOffCanvas] = useState(true);
  

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);



  return (
    <>
      <div className={styles.rowContainer}> 
        {/* Mobile Screen Header */}
        <Row className={styles.header}>
          <div className={ShowOffCanvas?styles.headerContent:styles.offcanvas_false_headerContent}>
            {ShowOffCanvas ?<>
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
                  <a href="/home/layout/settings">
                    <div className={styles.MenuLink}>
                      <img src="/images/settings_menu_icon.png"></img>
                      SETTINGS
                    </div>
                  </a>
                  <a>
                    <div className={styles.MenuLink}>
                      <img src="/images/logout_menu_icon.png"></img>
                      LOG OUT
                    </div>
                  </a>
                </div>
              </Offcanvas.Body>
            </Offcanvas></> : <></> }

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
