"use client";
import React from "react";
import Surveyques from "@/components/home/Surveyques";
import Surveyoption from "@/components/home/Surveyoption";
import styles from "./survey.module.css";
import Textparser from "@/components/home/Textparser";
import { Button } from "react-bootstrap";

export default function page() {
  const userRole = localStorage.getItem("role");

  return userRole === "hth" ? (
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
        <Button variant="success" href="/home/layout/team">
          Submit
        </Button>
      </div>
    </div>
  ) : userRole === "hth-supervisor" ? (
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
          <Surveyques labelText="Comments (if have any)" />
        </span>
        <div className={styles.imgContainer}>
          <Textparser text={"Take Picture of the waste"} />
          <img src="/images/camera_icon_to_upload.png"></img>
        </div>
        <Button variant="success" href="/home/layout/team">
          Submit
        </Button>
      </div>
    </div>
  ) : userRole === "vct-member" ? (
    <>
      <div className={styles.container}>
        <span className="text-center text-decoration-underline fs-4 fw-bold">
          <Textparser text={"Form No - 5"} />
        </span>

        <div className={styles.content}>
          <span>
            <Surveyques labelText="this is a label you can change through props dynamically" />
            <Surveyques labelText="this is a label you can change through props dynamically" />
            <Surveyques labelText="this is a label you can change through props dynamically" />
            <Surveyques labelText="this is a label you can change through props dynamically" />
            <Surveyques labelText="this is a label you can change through props dynamically" />
            <Surveyques labelText="this is a label you can change through props dynamically" />
            <Surveyques labelText="this is a label you can change through props dynamically" />
            <Surveyoption
              optionText={"This is dynamically passed optionText gdgdgdrgdr"}
            />
            <div className={styles.dateContainer}>
              <label>Start Date</label>
              <input type="date" className="w-100 p-2" />
            </div>
            <div className={styles.dateContainer}>
              <label>End Date</label>
              <input type="date" className="w-100 p-2" />
            </div>
          </span>
          <div className={styles.imgContainer}>
            <Textparser text={"Take Picture of the waste"} />
            <img src="/images/camera_icon_to_upload.png"></img>
          </div>
          <Button variant="success" href="/home/layout/team">
            Submit
          </Button>
        </div>
      </div>
    </>
  ) : (
    <>userRole === ???</>
  );
}
