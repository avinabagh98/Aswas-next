"use client";
import React, { useEffect, useState } from "react";
import Surveyques from "@/components/home/Surveyques";
import Surveyoption from "@/components/home/Surveyoption";
import styles from "./survey.module.css";
import Textparser from "@/components/home/Textparser";
import { Button } from "react-bootstrap";
import LocalStorageFetcher from "@/components/LocalStorageFetcher";
import Resizer from "react-image-file-resizer";
import LanguageFetcher from "@/components/LanguageFetcher";
import { useTeam } from "@/context/TeamContext";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useRouter } from "next/navigation";

export default function page() {
  const { teamNumber } = useTeam();
  const userRole = LocalStorageFetcher({ keyName: "role" });
  const translate = LanguageFetcher();
  const route = useRouter();

  const [radioValue, setRadioValue] = useState("");
  const [cameraClicked, setCameraClicked] = useState(false);
  const [captureClicked, setCaptureClicked] = useState(false);
  const [isLocked, setIsLocked] = useState(true);
  const [image, setImage] = useState("");
  const [location, setLocation] = useState({});
  const [field_1_form_5, setField_1_form_5] = useState("");
  const [field_2_form_5, setField_2_form_5] = useState("");
  const [field_3_form_5, setField_3_form_5] = useState("");

  const [
    বাড়ীর_বাইরে_আব্বর্জনা_আছে_কি_না,
    setবাড়ীর_বাইরে_আব্বর্জনা_আছে_কি_না,
  ] = useState("");
  const [
    বাড়ীর_বাইরে_বদ্ধ_নৰ্দমা_আছে_কি_না,
    setবাড়ীর_বাইরে_বদ্ধ_নৰ্দমা_আছে_কি_না,
  ] = useState("");
  const [
    বাড়ীর_বাইরে_ৰদ্ধ_ডোবা_আছে_কি_না,
    setবাড়ীর_বাইরে_ৰদ্ধ_ডোবা_আছে_কি_না,
  ] = useState("");
  const [
    বাড়ীর_বাইরে_নিচু_জলা_জমি_আছে_কি_না,
    setবাড়ীর_বাইরে_নিচু_জলা_জমি_আছে_কি_না,
  ] = useState("");
  const [
    জল_জমে_আছে_এমন_মোট_কতগুলি_জায়গা_পাত্র_দেখা_গেল,
    setজল_জমে_আছে_এমন_মোট_কতগুলি_জায়গা_পাত্র_দেখা_গেল,
  ] = useState("");
  const [
    এর_মধ্যে_কতগুলিতে_লার্ভা_পাওয়া_গেল,
    setএর_মধ্যে_কতগুলিতে_লার্ভা_পাওয়া_গেল,
  ] = useState("");
  const [field_7_form_5, setField_7_form_5] = useState("");

  const [
    কতগুলো_বাসিন্দা_সঙ্গে_আলোচনা_করা_হল_ও_লিফলেট_দেওয়া_হল,
    setকতগুলো_বাসিন্দা_সঙ্গে_আলোচনা_করা_হল_ও_লিফলেট_দেওয়া_হল,
  ] = useState("");
  const [Landmark, setLandmark] = useState("");
  const [remarks, setRemarks] = useState("");

  const [selectedOption, setSelectedOption] = useState({}); //changed

  const surveyDataHM = {
    location,
    isLocked,
    field_1_form_5,
    field_2_form_5,
    field_3_form_5,
    বাড়ীর_বাইরে_আব্বর্জনা_আছে_কি_না,
    বাড়ীর_বাইরে_বদ্ধ_নৰ্দমা_আছে_কি_না,
    বাড়ীর_বাইরে_ৰদ্ধ_ডোবা_আছে_কি_না,
    বাড়ীর_বাইরে_নিচু_জলা_জমি_আছে_কি_না,
    জল_জমে_আছে_এমন_মোট_কতগুলি_জায়গা_পাত্র_দেখা_গেল,
    এর_মধ্যে_কতগুলিতে_লার্ভা_পাওয়া_গেল,
    field_7_form_5,
    কতগুলো_বাসিন্দা_সঙ্গে_আলোচনা_করা_হল_ও_লিফলেট_দেওয়া_হল,
    Landmark,
    image,
  };

  const surveyDataHS = {
    location,
    isLocked,
    field_1_form_5,
    field_2_form_5,
    field_3_form_5,
    বাড়ীর_বাইরে_আব্বর্জনা_আছে_কি_না,
    বাড়ীর_বাইরে_বদ্ধ_নৰ্দমা_আছে_কি_না,
    বাড়ীর_বাইরে_ৰদ্ধ_ডোবা_আছে_কি_না,
    বাড়ীর_বাইরে_নিচু_জলা_জমি_আছে_কি_না,
    জল_জমে_আছে_এমন_মোট_কতগুলি_জায়গা_পাত্র_দেখা_গেল,
    এর_মধ্যে_কতগুলিতে_লার্ভা_পাওয়া_গেল,
    field_7_form_5,
    কতগুলো_বাসিন্দা_সঙ্গে_আলোচনা_করা_হল_ও_লিফলেট_দেওয়া_হল,
    Landmark,
    image,
    remarks,
  };

  useEffect(() => {
    const geolocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        });
      } else {
        // alert("Geolocation not available")
        setLocation(null);
      }
    };

    geolocation();
  }, []);

  //Functions
  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        100,
        100,
        "JPEG",
        100,
        0,
        (uri) => {
          resolve(uri);
        },
        "base64"
      );
    });

  const camera_button = async () => {
    try {
      setCameraClicked(true);
      let stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });
      video.srcObject = stream;
    } catch (error) {
      console.log(error);
    }
  };

  const click_button = () => {
    try {
      setCaptureClicked(true);
      canvas
        .getContext("2d")
        .drawImage(video, 0, 0, canvas.width, canvas.height);
      let image_data_url = canvas.toDataURL("image/jpeg");
      console.log(image_data_url);
      setImage(image_data_url);
      // resizeFile(image_data_url).then((data) => {
      //   setImage(data);
      // });
    } catch (error) {
      console.log(error);
    }
  };

  const handleRadioChange_value = (event) => {
    const id = event.target.id;
    const value = event.target.value;
    const name = event.target.name;
    console.log("id :::", id);
    setRadioValue(value);
    console.log(name, value);
    if (value === "yes" && name === "isLocked") {
      setIsLocked(true);
      console.log("isLocked", isLocked);
    }
    if (value === "no" && name === "isLocked") {
      setIsLocked(false);
      console.log("isLocked", isLocked);
    }
    if (name === "field_2_form_5") {
      setField_2_form_5(value);
    }
    if (name === "field_3_form_5") {
      setField_3_form_5(value);
    }
    if (name === "বাড়ীর_বাইরে_আব্বর্জনা_আছে_কি_না") {
      setবাড়ীর_বাইরে_আব্বর্জনা_আছে_কি_না(value);
    }
    if (name === "বাড়ীর_বাইরে_বদ্ধ_নৰ্দমা_আছে_কি_না") {
      setবাড়ীর_বাইরে_বদ্ধ_নৰ্দমা_আছে_কি_না(value);
    }
    if (name === "বাড়ীর_বাইরে_ৰদ্ধ_ডোবা_আছে_কি_না") {
      setবাড়ীর_বাইরে_ৰদ্ধ_ডোবা_আছে_কি_না(value);
    }
    if (name === "বাড়ীর_বাইরে_নিচু_জলা_জমি_আছে_কি_না") {
      setবাড়ীর_বাইরে_নিচু_জলা_জমি_আছে_কি_না(value);
    }
  };

  const handleRadioChange_color = (id, value) => {
    //changed
    setSelectedOption((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleVal = (id, val) => {
    if (id === "field_1_form_5") {
      setField_1_form_5(val);
    }

    if (id === "জল_জমে_আছে_এমন_মোট_কতগুলি_জায়গা_পাত্র_দেখা_গেল") {
      setজল_জমে_আছে_এমন_মোট_কতগুলি_জায়গা_পাত্র_দেখা_গেল(val);
    }
    if (id === "এর_মধ্যে_কতগুলিতে_লার্ভা_পাওয়া_গেল") {
      setএর_মধ্যে_কতগুলিতে_লার্ভা_পাওয়া_গেল(val);
    }
    if (id === "field_7_form_5") {
      setField_7_form_5(val);
    }
    if (id === "কতগুলো_বাসিন্দা_সঙ্গে_আলোচনা_করা_হল_ও_লিফলেট_দেওয়া_হল") {
      setকতগুলো_বাসিন্দা_সঙ্গে_আলোচনা_করা_হল_ও_লিফলেট_দেওয়া_হল(val);
    }
    if (id === "landmark") {
      setLandmark(val);
    }
    if (id === "remarks") {
      setRemarks(val);
    }
  };

  const handleSubmit = (e, userRole) => {
    e.preventDefault();
    if (userRole === "hth-member") {
      console.log("submitted", surveyDataHM);
    }
    if (userRole === "hth-supervisor") {
      console.log("submitted", surveyDataHS);
      route.push("/home/householdlist");
    }
  };

  return userRole === "hth-member" ? (
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
        {isLocked ? (
          <>
            <Surveyoption
              id={"isLocked"}
              name={"isLocked"}
              optionText={translate?.isLocked}
              handleRadioChange_value={handleRadioChange_value}
              handleRadioChange_color={handleRadioChange_color} //changed
              radioValue={selectedOption["isLocked"]}
            />

            <Surveyoption //changed
              id="option1"
              name="option1"
              optionText="Option 1"
              handleRadioChange_value={handleRadioChange_value}
              handleRadioChange_color={handleRadioChange_color}
              radioValue={selectedOption["option1"]}
            />
          </>
        ) : null}
        {isLocked ? null : (
          <>
            <span>
              <Surveyques
                id="field_1_form_5"
                labelText={translate?.field_1_form_5}
                handleVal={handleVal}
              />

              <Surveyoption
                id={"field_2_form_5"}
                name={"field_2_form_5"}
                optionText={translate?.field_2_form_5}
                handleRadioChange_value={handleRadioChange_value}
                handleRadioChange_color={handleRadioChange_color}
                radioValue={selectedOption["field_2_form_5"]}
              />
              <Surveyoption
                id={"field_3_form_5"}
                name={"field_3_form_5"}
                optionText={translate?.field_3_form_5}
                handleRadioChange_value={handleRadioChange_value}
                handleRadioChange_color={handleRadioChange_color}
                radioValue={selectedOption["field_3_form_5"]}
              />
              <Surveyoption
                id={"বাড়ীর_বাইরে_আব্বর্জনা_আছে_কি_না"}
                name={"বাড়ীর_বাইরে_আব্বর্জনা_আছে_কি_না"}
                optionText={translate?.বাড়ীর_বাইরে_আব্বর্জনা_আছে_কি_না}
                handleRadioChange_value={handleRadioChange_value}
                handleRadioChange_color={handleRadioChange_color}
                radioValue={selectedOption["বাড়ীর_বাইরে_আব্বর্জনা_আছে_কি_না"]}
              />
              <Surveyoption
                id={"বাড়ীর_বাইরে_বদ্ধ_নৰ্দমা_আছে_কি_না"}
                name={"বাড়ীর_বাইরে_বদ্ধ_নৰ্দমা_আছে_কি_না"}
                optionText={translate?.বাড়ীর_বাইরে_বদ্ধ_নৰ্দমা_আছে_কি_না}
                handleRadioChange_value={handleRadioChange_value}
                handleRadioChange_color={handleRadioChange_color}
                radioValue={
                  selectedOption["বাড়ীর_বাইরে_বদ্ধ_নৰ্দমা_আছে_কি_না"]
                }
              />
              <Surveyoption
                id={"বাড়ীর_বাইরে_ৰদ্ধ_ডোবা_আছে_কি_না"}
                name={"বাড়ীর_বাইরে_ৰদ্ধ_ডোবা_আছে_কি_না"}
                optionText={translate?.বাড়ীর_বাইরে_ৰদ্ধ_ডোবা_আছে_কি_না}
                handleRadioChange_value={handleRadioChange_value}
                handleRadioChange_color={handleRadioChange_color}
                radioValue={selectedOption["বাড়ীর_বাইরে_ৰদ্ধ_ডোবা_আছে_কি_না"]}
              />
              <Surveyoption
                id={"বাড়ীর_বাইরে_নিচু_জলা_জমি_আছে_কি_না"}
                name={"বাড়ীর_বাইরে_নিচু_জলা_জমি_আছে_কি_না"}
                optionText={translate?.বাড়ীর_বাইরে_নিচু_জলা_জমি_আছে_কি_না}
                handleRadioChange_value={handleRadioChange_value}
                handleRadioChange_color={handleRadioChange_color}
                radioValue={
                  selectedOption["বাড়ীর_বাইরে_নিচু_জলা_জমি_আছে_কি_না"]
                }
              />
              <Surveyques
                id={"জল_জমে_আছে_এমন_মোট_কতগুলি_জায়গা_পাত্র_দেখা_গেল"}
                labelText={
                  translate?.জল_জমে_আছে_এমন_মোট_কতগুলি_জায়গা_পাত্র_দেখা_গেল
                }
                handleVal={handleVal}
              />
              <Surveyques
                id={"এর_মধ্যে_কতগুলিতে_লার্ভা_পাওয়া_গেল"}
                labelText={translate?.এর_মধ্যে_কতগুলিতে_লার্ভা_পাওয়া_গেল}
                handleVal={handleVal}
              />
              <Surveyques
                id={"field_7_form_5"}
                labelText={translate?.field_7_form_5}
                handleVal={handleVal}
              />
              <Surveyques
                id={"কতগুলো_বাসিন্দা_সঙ্গে_আলোচনা_করা_হল_ও_লিফলেট_দেওয়া_হল"}
                labelText={
                  translate?.কতগুলো_বাসিন্দা_সঙ্গে_আলোচনা_করা_হল_ও_লিফলেট_দেওয়া_হল
                }
                handleVal={handleVal}
              />
              <Surveyques
                id={"landmark"}
                labelText={translate?.Landmark}
                handleVal={handleVal}
              />
            </span>
            <div className={styles.imgContainer}>
              <Textparser
                text={translate?.জমে_থাকা_আবর্জনা_বা_জলের_ছবি_তুলুন}
              />
              <a onClick={camera_button}>
                <img src="/images/camera_icon_to_upload.png"></img>
              </a>
            </div>
            {cameraClicked ? (
              <div className="d-flex flex-column justify-content-center align-items-center">
                <video id="video" width="320" height="240" autoPlay></video>
                <Button onClick={click_button}>Click Photo</Button>
                <canvas id="canvas" width="320" height="240"></canvas>
              </div>
            ) : (
              <></>
            )}
            <Button
              variant="success"
              href="#"
              onClick={(e) => handleSubmit(e, userRole)}
            >
              Submit
            </Button>
          </>
        )}
      </div>
    </div>
  ) : userRole === "hth-supervisor" ? (
    <div className={styles.container}>
      <h1>testing {teamNumber}</h1>
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
          <Surveyques
            id="field_1_form_5"
            labelText={translate?.field_1_form_5}
            handleVal={handleVal}
          />
          <Surveyoption
            id={"field_2_form_5"}
            name={"field_2_form_5"}
            optionText={translate?.field_2_form_5}
            handleRadioChange_value={handleRadioChange_value}
            radioValue={radioValue}
          />
          <Surveyoption
            id={"field_3_form_5"}
            name={"field_3_form_5"}
            optionText={translate?.field_3_form_5}
            handleRadioChange_value={handleRadioChange_value}
            radioValue={radioValue}
          />
          <Surveyoption
            id={"বাড়ীর_বাইরে_আব্বর্জনা_আছে_কি_না"}
            name={"বাড়ীর_বাইরে_আব্বর্জনা_আছে_কি_না"}
            optionText={translate?.বাড়ীর_বাইরে_আব্বর্জনা_আছে_কি_না}
            handleRadioChange_value={handleRadioChange_value}
            radioValue={radioValue}
          />
          <Surveyoption
            id={"বাড়ীর_বাইরে_বদ্ধ_নৰ্দমা_আছে_কি_না"}
            name={"বাড়ীর_বাইরে_বদ্ধ_নৰ্দমা_আছে_কি_না"}
            optionText={translate?.বাড়ীর_বাইরে_বদ্ধ_নৰ্দমা_আছে_কি_না}
            handleRadioChange_value={handleRadioChange_value}
            radioValue={radioValue}
          />
          <Surveyoption
            id={"বাড়ীর_বাইরে_ৰদ্ধ_ডোবা_আছে_কি_না"}
            name={"বাড়ীর_বাইরে_ৰদ্ধ_ডোবা_আছে_কি_না"}
            optionText={translate?.বাড়ীর_বাইরে_ৰদ্ধ_ডোবা_আছে_কি_না}
            handleRadioChange_value={handleRadioChange_value}
            radioValue={radioValue}
          />
          <Surveyoption
            id={"বাড়ীর_বাইরে_নিচু_জলা_জমি_আছে_কি_না"}
            name={"বাড়ীর_বাইরে_নিচু_জলা_জমি_আছে_কি_না"}
            optionText={translate?.বাড়ীর_বাইরে_নিচু_জলা_জমি_আছে_কি_না}
            handleRadioChange_value={handleRadioChange_value}
            radioValue={radioValue}
          />
          <Surveyques
            id={"জল_জমে_আছে_এমন_মোট_কতগুলি_জায়গা_পাত্র_দেখা_গেল"}
            labelText={
              translate?.জল_জমে_আছে_এমন_মোট_কতগুলি_জায়গা_পাত্র_দেখা_গেল
            }
            handleVal={handleVal}
          />
          <Surveyques
            id={"এর_মধ্যে_কতগুলিতে_লার্ভা_পাওয়া_গেল"}
            labelText={translate?.এর_মধ্যে_কতগুলিতে_লার্ভা_পাওয়া_গেল}
            handleVal={handleVal}
          />
          <Surveyques
            id={"field_7_form_5"}
            labelText={translate?.field_7_form_5}
            handleVal={handleVal}
          />
          <Surveyques
            id={"কতগুলো_বাসিন্দা_সঙ্গে_আলোচনা_করা_হল_ও_লিফলেট_দেওয়া_হল"}
            labelText={
              translate?.কতগুলো_বাসিন্দা_সঙ্গে_আলোচনা_করা_হল_ও_লিফলেট_দেওয়া_হল
            }
            handleVal={handleVal}
          />
          <Surveyques
            id={"landmark"}
            labelText={translate?.Landmark}
            handleVal={handleVal}
          />

          <Surveyques
            id={"remarks"}
            labelText={translate?.remarks}
            handleVal={handleVal}
          />
        </span>
        <div className={styles.imgContainer}>
          <Textparser text={translate?.জমে_থাকা_আবর্জনা_বা_জলের_ছবি_তুলুন} />
          <a onClick={camera_button}>
            <img src="/images/camera_icon_to_upload.png"></img>
          </a>
        </div>
        {cameraClicked ? (
          <div className="d-flex flex-column justify-content-center align-items-center">
            <video id="video" width="320" height="240" autoPlay></video>
            <Button onClick={click_button}>Click Photo</Button>
            <canvas id="canvas" width="320" height="240"></canvas>
          </div>
        ) : (
          <></>
        )}
        <Button variant="success" onClick={(e) => handleSubmit(e, userRole)}>
          Submit
        </Button>
      </div>
    </div>
  ) : userRole === "vct-member" ? (
    <>
      <div className={styles.container}>
        <span className="text-center text-decoration-underline fs-4 fw-bold">
          <Textparser text={translate?.form_no_5} />
        </span>

        <div className={styles.content}>
          <span>
            <Surveyques labelText={translate?.field_1_form_5} />
            <Surveyques labelText={translate?.field_2_form_5} />
            <Surveyques labelText={translate?.field_3_form_5} />
            <Surveyques labelText={translate?.field_4_form_5} />
            <Surveyques labelText={translate?.field_5_form_5} />
            <Surveyques labelText={translate?.field_6_form_5} />
            <Surveyques labelText={translate?.field_7_form_5} />
            <Surveyoption optionText={translate?.field_8_form_5} />
            <div className={styles.dateContainer}>
              <label>{translate?.field_9_form_5}</label>
              <input type="date" className="w-100 p-2" />
            </div>
            <div className={styles.dateContainer}>
              <label>{translate?.field_10_form_5}</label>
              <input type="date" className="w-100 p-2" />
            </div>
          </span>
          <div className={styles.imgContainer}>
            <Textparser text={translate?.জমে_থাকা_আবর্জনা_বা_জলের_ছবি_তুলুন} />
            <a onClick={camera_button}>
              <img src="/images/camera_icon_to_upload.png"></img>
            </a>
          </div>
          {cameraClicked ? (
            <div className="d-flex flex-column justify-content-center align-items-center">
              <video id="video" width="320" height="240" autoPlay></video>
              <Button onClick={click_button}>Click Photo</Button>
              <canvas id="canvas" width="320" height="240"></canvas>
            </div>
          ) : (
            <></>
          )}

          <Button
            variant="success"
            href="/home/team"
            disabled={location}
            onClick={console.log(surveyData)}
          >
            Submit
          </Button>
        </div>
      </div>
    </>
  ) : (
    <>
      <div className={styles.container}>
        <Skeleton height={20} width={200} />
        <Skeleton height={20} width={200} />
        <Skeleton height={20} width={200} />
        <Skeleton height={20} width={200} />
        <Skeleton height={20} width={200} />
        <Skeleton height={20} width={200} />
        <Skeleton height={20} width={200} />
        <Skeleton height={20} width={200} />
        <Skeleton height={20} width={200} />
        <Skeleton height={20} width={200} />
        <Skeleton height={20} width={200} />

        <div className={styles.imgContainer}>
          <Skeleton height={100} width={100} />
        </div>

        <Button variant="success" disabled></Button>
      </div>
    </>
  );
}
