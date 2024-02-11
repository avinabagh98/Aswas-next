"use client";

import styles from "./Buttongroup.module.css";
import { Row, Col } from "react-bootstrap";

export default function Buttongroup() {
  return (
    <>
      <div className={styles.container}>
        <Row className={styles.btnContainer}>
          <Col xs={4} className={styles.btnCol}>
            <span className={styles.btnSpan}>
              <button>VCMO</button>
            </span>
          </Col>

          <Col xs={4} className={styles.btnCol}>
            <span className={styles.btnSpan}>
              <button>HTH SUPERVISOR</button>
            </span>
          </Col>
          <Col xs={4} className={styles.btnCol}>
            <span className={styles.btnSpan}>
              <button>HTH MEMBER</button>
            </span>
          </Col>

          <Row className={styles.btnContainer}>
            <Col xs={6} className={styles.btnCol}>
              <span className={styles.btnSpan}>
                <button>VCT SUPERVISOR</button>
              </span>
            </Col>
            <Col xs={6} className={styles.btnCol}>
              <span className={styles.btnSpan}>
                <button>VCT MEMBER</button>
              </span>
            </Col>
          </Row>
        </Row>
      </div>
    </>
  );
}
