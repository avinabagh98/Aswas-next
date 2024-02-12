"use client";
import React from "react";
import Surveyques from "@/components/home/Surveyques";
import Surveyoption from "@/components/home/Surveyoption";
import styles from "./survey.module.css";
import Textparser from "@/components/home/Textparser";
import { Button } from "react-bootstrap";

export default function page() {
  return (
    <div className={styles.container}>
      <div className={styles.titlebar}>
        <span>
          <Textparser text={"Form-No-2"} />
        </span>
        <span>
          <Textparser text={"Round-2"} />
        </span>
      </div>

      <span className={styles.name}>
        <Textparser text={"Kamal Debnath - House-No.-2"} />
      </span>

      <div className={styles.content}>
        <span>
          <Surveyques labelText="this is a label you can change through props dynamically" />
          <Surveyoption
            optionText={"This is dynamically passed optionText gdgdgdrgdr"}
          />
          <Surveyoption
            optionText={"This is dynamically passed optionText gdgdgdrgdr"}
          />
          <Surveyoption
            optionText={"This is dynamically passed optionText gdgdgdrgdr"}
          />
          <Surveyques labelText="this is a label you can change through props dynamically" />
          <Surveyques labelText="this is a label you can change through props dynamically" />
          <Surveyques labelText="this is a label you can change through props dynamically" />
          <Surveyques labelText="this is a label you can change through props dynamically" />
        </span>
        <div className={styles.imgContainer}>
          <Textparser text={"Take Picture of the waste"} />
          <img src="/images/camera_icon_to_upload.png"></img>
        </div>
        <Button variant="success"> Submit</Button>
      </div>
    </div>
  );
}
