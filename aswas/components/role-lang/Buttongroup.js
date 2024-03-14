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
                <button id="6" name="vcmo" onClick={handleBtnChange}>
                  VCMO
                </button>
              </a>
            </span>
          </Col>

          <Col xs={4} className={styles.btnCol}>
            <span className={styles.btnSpan}>
              <button id="7" name="hth-supervisor" onClick={handleBtnChange}>
                HTH SUPERVISOR
              </button>
            </span>
          </Col>
          <Col xs={4} className={styles.btnCol}>
            <span className={styles.btnSpan}>
              <button id="9" name="hth-member" onClick={handleBtnChange}>
                HTH MEMBER
              </button>
            </span>
          </Col>

          <Row className={styles.btnContainer}>
            <Col xs={6} className={styles.btnCol}>
              <span className={styles.btnSpan}>
                <button id="8" name="vct-supervisor" onClick={handleBtnChange}>
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
