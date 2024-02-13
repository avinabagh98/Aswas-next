"use client";

import styles from "./Buttongroup.module.css";
import { Row, Col } from "react-bootstrap";

export default function Buttongroup({ handleBtnChange }) {
  return (
    <>
      <div className={styles.container}>
        <Row className={styles.btnContainer}>
          <Col xs={4} className={styles.btnCol}>
            <span className={styles.btnSpan}>
              <a href="">
                <button id="vcmo" onClick={handleBtnChange}>
                  VCMO
                </button>
              </a>
            </span>
          </Col>

          <Col xs={4} className={styles.btnCol}>
            <span className={styles.btnSpan}>
              <button id="hth-supervisor" onClick={handleBtnChange}>
                HTH SUPERVISOR
              </button>
            </span>
          </Col>
          <Col xs={4} className={styles.btnCol}>
            <span className={styles.btnSpan}>
              <button id="hth-member" onClick={handleBtnChange}>
                HTH MEMBER
              </button>
            </span>
          </Col>

          <Row className={styles.btnContainer}>
            <Col xs={6} className={styles.btnCol}>
              <span className={styles.btnSpan}>
                <button id="vct-supervisor" onClick={handleBtnChange}>
                  VCT SUPERVISOR
                </button>
              </span>
            </Col>
            <Col xs={6} className={styles.btnCol}>
              <span className={styles.btnSpan}>
                <button id="vct-member" onClick={handleBtnChange}>
                  VCT MEMBER
                </button>
              </span>
            </Col>
          </Row>
        </Row>
      </div>
    </>
  );
}
