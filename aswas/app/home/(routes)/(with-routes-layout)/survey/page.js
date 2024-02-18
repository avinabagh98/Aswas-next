"use client";
import React, { useState } from "react";
import Surveyques from "@/components/home/Surveyques";
import Surveyoption from "@/components/home/Surveyoption";
import styles from "./survey.module.css";
import Textparser from "@/components/home/Textparser";
import { Button } from "react-bootstrap";


export default function page() {

  const [cameraClicked, setCameraClicked] = useState(false);
  const [captureClicked, setCaptureClicked] = useState(false);


  const userRole = localStorage.getItem("role");
  const camera_button = async () => {
    try {
      setCameraClicked(true);
      let stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
      video.srcObject = stream;
    } catch (error) {
      console.log(error);
    }
  }

  const click_button = () => {
    try {
      setCaptureClicked(true);
      canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
      let image_data_url = canvas.toDataURL('image/jpeg');
      console.log(image_data_url);
    } catch (error) {
      console.log(error);
    }
  }

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
            <a onClick={camera_button}><img src="/images/camera_icon_to_upload.png"></img></a>
          </div>
          {cameraClicked ? <div className="d-flex flex-column justify-content-center align-items-center" >
            <video id="video" width="320" height="240" autoPlay></video>
            <Button onClick={click_button}>Click Photo</Button>
            <canvas id="canvas" width="320" height="240"></canvas>
          </div> : <></>}

          <Button variant="success" href="/home/team">
            Submit
          </Button>
        </div>
      </div>
    </>
  ) : (
    <>userRole === ???</>
  );
}
