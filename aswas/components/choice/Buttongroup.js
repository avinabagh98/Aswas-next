"use client";

import styles from "./Buttongroup.module.css";
import { Row, Col } from "react-bootstrap";

export default function Buttongroup() {
  return (
    <>
      {/* <div className={styles.container}>
        <div className={styles.btnContainer}>
          <button className={styles.btn}>button1</button>
        </div>
      </div> */}

      <div className={styles.container}>
        <Row className={styles.btnContainer}>
          <Col xs={4} className={styles.btn}>
            <button>button1</button>
          </Col>

          <Col xs={4} className={styles.btn}>
            <button>button1</button>
          </Col>
          <Col xs={4} className={styles.btn}>
            <button>button1</button>
          </Col>

          <Row className={styles.btnContainer}>
            <Col xs={6} className={styles.btn}>
              <button>button1</button>
            </Col>
            <Col xs={6} className={styles.btn}>
              <button>button1</button>
            </Col>
          </Row>
        </Row>
      </div>
    </>
  );
}
