"use client";

import { Row, Offcanvas } from "react-bootstrap";
import { useEffect, useState } from "react";
import styles from "./home.module.css";
import { useRouter } from "next/navigation";
import LocalStorageFetcher from "@/components/LocalStorageFetcher";

export default function homelayout({ children }) {
  const [isOffCanvasVisible, setIsOffCanvasVisible] = useState(true);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const route = useRouter();
  const userRole = LocalStorageFetcher({ keyName: "role" });

  const handleLogout = () => {
    console.log("log out clicked");
    setShow(false);
  };

  return (
    <>
      <div className={styles.rowContainer}>
        {/* Mobile Screen Header */}
        <Row className={styles.header}>
          <div
            className={
              isOffCanvasVisible
                ? styles.headerContent
                : styles.offcanvas_false_headerContent
            }
          >
            {userRole === "hth-supervisor" ? (
              <>
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
                      <div
                        className={styles.MenuLink}
                        onClick={(e) => {
                          e.preventDefault();
                          route.push("/home/schedule");
                          setShow(false);
                        }}
                      >
                        <img src="/images/schedule_menu_icon.png"></img>
                        SCHEDULE
                      </div>
                      <div
                        className={styles.MenuLink}
                        onClick={(e) => {
                          e.preventDefault();
                          route.push("/home/dailysurveyreport");
                          setShow(false);
                        }}
                      >
                        <img src="/images/daily_survey_report_icon.png"></img>
                        DAILY SURVEY REPORT
                      </div>
                    </div>

                    <div className={styles.offCanvasBodyMenuFooter}>
                      <div
                        className={styles.MenuLink}
                        onClick={(e) => {
                          e.preventDefault();
                          route.push("#");
                          setShow(false);
                        }}
                      >
                        <img src="/images/settings_menu_icon.png"></img>
                        KNOWLEDGE CENTER
                      </div>
                      <div
                        className={styles.MenuLink}
                        onClick={(e) => {
                          e.preventDefault();
                          route.push("/home/settings");
                          setShow(false);
                        }}
                      >
                        <img src="/images/settings_menu_icon.png"></img>
                        SETTINGS
                      </div>

                      <div className={styles.MenuLink} onClick={handleLogout}>
                        <img src="/images/logout_menu_icon.png"></img>
                        LOG OUT
                      </div>
                    </div>
                  </Offcanvas.Body>
                </Offcanvas>
              </>
            ) : userRole === "hth-member" ? (
              <>
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
                      <div
                        className={styles.MenuLink}
                        onClick={(e) => {
                          e.preventDefault();
                          route.push("/home/schedule");
                          setShow(false);
                        }}
                      >
                        <img src="/images/schedule_menu_icon.png"></img>
                        SCHEDULE
                      </div>
                      <div
                        className={styles.MenuLink}
                        onClick={(e) => {
                          e.preventDefault();
                          route.push("/home/dailysurveyreport");
                          setShow(false);
                        }}
                      >
                        <img src="/images/daily_survey_report_icon.png"></img>
                        PERMENANT RISK/BREEDING
                      </div>

                      <div
                        className={styles.MenuLink}
                        onClick={(e) => {
                          e.preventDefault();
                          route.push("/home/dailysurveyreport");
                          setShow(false);
                        }}
                      >
                        <img src="/images/daily_survey_report_icon.png"></img>
                        RISK/BREEDING SITES LIST
                      </div>
                    </div>

                    <div className={styles.offCanvasBodyMenuFooter}>
                      <div
                        className={styles.MenuLink}
                        onClick={(e) => {
                          e.preventDefault();
                          route.push("#");
                          setShow(false);
                        }}
                      >
                        <img src="/images/settings_menu_icon.png"></img>
                        KNOWLEDGE CENTER
                      </div>
                      <div
                        className={styles.MenuLink}
                        onClick={(e) => {
                          e.preventDefault();
                          route.push("/home/settings");
                          setShow(false);
                        }}
                      >
                        <img src="/images/settings_menu_icon.png"></img>
                        SETTINGS
                      </div>

                      <div className={styles.MenuLink} onClick={handleLogout}>
                        <img src="/images/logout_menu_icon.png"></img>
                        LOG OUT
                      </div>
                    </div>
                  </Offcanvas.Body>
                </Offcanvas>
              </>
            ) : (
              <></>
            )}

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
