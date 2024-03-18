"use client";

import styles from "../survey/survey.module.css";
import React, { useEffect, useState } from "react";
import Surveyques from "@/components/home/Surveyques";
import Surveyoption from "@/components/home/Surveyoption";
import Textparser from "@/components/home/Textparser";
import { Button } from "react-bootstrap";
import Resizer from "react-image-file-resizer";
import LanguageFetcher from "@/components/LanguageFetcher";
import { useTeam } from "@/context/TeamContext";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useRouter } from "next/navigation";
import { sendRequest } from "@/api/sendRequest";
import swal from "sweetalert";

export default function page() {
  const translate = LanguageFetcher();
  const route = useRouter();

  // Survey State variables
  const [radioValue, setRadioValue] = useState("");
  const [cameraClicked, setCameraClicked] = useState(false);
  const [captureClicked, setCaptureClicked] = useState(false);

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

  const [leaflets_distributed, setleaflets_distributed] = useState("");
  const [Landmark, setLandmark] = useState("");
  const [remarks, setRemarks] = useState("");
  const [selectedOption, setSelectedOption] = useState({}); //changed

  //Other State Variables
  const [userRole, setUserRole] = useState("");
  const [token, setToken] = useState("");
  const [api_data_survey, setApi_Data_Survey] = useState([]);
  const [surveyBtnDisable, setSurveyBtnDisable] = useState(false);

  // //Token initialzation and localstorage fetching
  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const token = await localStorage.getItem("token");
  //       if (!token) {
  //         route.push("/home/login");
  //       } else {
  //         setToken(localStorage.getItem("token"));
  //         setUserRole(localStorage.getItem("role_name"));
  //         const householdId = localStorage.getItem("household_id");

  //         if (householdId) {
  //           //survey for HTH Member
  //           const response = await sendRequest(
  //             "get",
  //             `/properties/${householdId}/survey/hth-member`,
  //             null,
  //             {
  //               headers: {
  //                 Authorization: `Bearer ${token}`,
  //               },
  //             }
  //           );
  //           if (response.status === 1) {
  //             console.log(response.data);
  //             const data = response.data;
  //             setField_1_form_5(data.fever_cases || "");
  //             setField_2_form_5(data.has_indoor_breeding_spots || "");
  //             setField_3_form_5(data.has_peridomestic_breeding_spots || "");
  //             setবাড়ীর_বাইরে_আব্বর্জনা_আছে_কি_না(data.has_garbage || "");
  //             setবাড়ীর_বাইরে_ৰদ্ধ_ডোবা_আছে_কি_না(data.has_puddle || "");
  //             setবাড়ীর_বাইরে_নিচু_জলা_জমি_আছে_কি_না(
  //               data.has_stagnant_water || ""
  //             );
  //             setবাড়ীর_বাইরে_বদ্ধ_নৰ্দমা_আছে_কি_না(
  //               data.has_blocked_drains || ""
  //             );
  //             setজল_জমে_আছে_এমন_মোট_কতগুলি_জায়গা_পাত্র_দেখা_গেল(
  //               data.water_containers || ""
  //             );
  //             setএর_মধ্যে_কতগুলিতে_লার্ভা_পাওয়া_গেল(
  //               data.water_containers_with_larva || ""
  //             );
  //             setField_7_form_5(data.water_containers_managed || "");
  //             setLandmark(data.landmark || "");
  //             setImage(data.image || "");
  //             setকতগুলো_বাসিন্দা_সঙ্গে_আলোচনা_করা_হল_ও_লিফলেট_দেওয়া_হল(
  //               data.leaflets_distributed || ""
  //             );
  //           } else {
  //             swal("Error", response.msg, "error");
  //           }
  //         }
  //       }
  //     } catch (error) {
  //       swal("Error", error.message, "error");
  //     }
  //   }
  //   fetchData();
  // }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const token = await localStorage.getItem("token");
        if (!token) {
          route.push("/home/login");
        } else {
          setToken(localStorage.getItem("token"));
          setUserRole(localStorage.getItem("role_name"));
          const householdId = localStorage.getItem("household_id");

          if (householdId) {
            // Survey for HTH Member
            const response = await sendRequest(
              "get",
              `/properties/${householdId}/survey/hth-member`,
              null,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            if (response.status === 1) {
              console.log(response.data);
              const data = response.data;
              setField_1_form_5(data.fever_cases || "");
              setField_2_form_5(
                data.has_indoor_breeding_spots.toString() || ""
              );

              setField_3_form_5(data.has_peridomestic_breeding_spots || "");
              setবাড়ীর_বাইরে_আব্বর্জনা_আছে_কি_না(data.has_garbage || "");
              setবাড়ীর_বাইরে_ৰদ্ধ_ডোবা_আছে_কি_না(data.has_puddle || "");
              setবাড়ীর_বাইরে_নিচু_জলা_জমি_আছে_কি_না(
                data.has_stagnant_water || ""
              );
              setবাড়ীর_বাইরে_বদ্ধ_নৰ্দমা_আছে_কি_না(
                data.has_blocked_drains || ""
              );
              setজল_জমে_আছে_এমন_মোট_কতগুলি_জায়গা_পাত্র_দেখা_গেল(
                data.water_containers || ""
              );
              setএর_মধ্যে_কতগুলিতে_লার্ভা_পাওয়া_গেল(
                data.water_containers_with_larva || ""
              );
              setField_7_form_5(data.water_containers_managed || "");
              setLandmark(data.landmark || "");
              setImage(data.image || "");
              setleaflets_distributed(data.leaflets_distributed);
            }
          }
        }
      } catch (error) {
        swal("Error", error.message, "error");
      }
    }
    fetchData();
  }, []);

  //Handler functions
  const handleRadioChange_value = (event) => {
    const id = event.target.id;
    const value = event.target.value;
    const name = event.target.name;
    console.log("id :::", id);
    setRadioValue(value);
    console.log(name, value);
    if (value === "yes" && name === "isLocked") {
      setIsLocked(true);
      setLockValue("1");
      console.log("isLocked", isLocked);
    }
    if (value === "no" && name === "isLocked") {
      setIsLocked(false);
      setLockValue("0");
      console.log("isLocked", isLocked);
    }
    if (value === "yes" && name === "field_2_form_5") {
      setField_2_form_5("1");
    }
    if (value === "no" && name === "field_2_form_5") {
      setField_2_form_5("0");
    }
    if (value === "yes" && name === "field_3_form_5") {
      setField_3_form_5("1");
    }
    if (value === "no" && name === "field_3_form_5") {
      setField_3_form_5("0");
    }

    if (value === "yes" && name === "বাড়ীর_বাইরে_আব্বর্জনা_আছে_কি_না") {
      setবাড়ীর_বাইরে_আব্বর্জনা_আছে_কি_না("1");
    }
    if (value === "no" && name === "বাড়ীর_বাইরে_আব্বর্জনা_আছে_কি_না") {
      setবাড়ীর_বাইরে_আব্বর্জনা_আছে_কি_না("0");
    }

    if (value === "yes" && name === "বাড়ীর_বাইরে_বদ্ধ_নৰ্দমা_আছে_কি_না") {
      setবাড়ীর_বাইরে_বদ্ধ_নৰ্দমা_আছে_কি_না("1");
    }
    if (value === "no" && name === "বাড়ীর_বাইরে_বদ্ধ_নৰ্দমা_আছে_কি_না") {
      setবাড়ীর_বাইরে_বদ্ধ_নৰ্দমা_আছে_কি_না("0");
    }
    if (value === "yes" && name === "বাড়ীর_বাইরে_ৰদ্ধ_ডোবা_আছে_কি_না") {
      setবাড়ীর_বাইরে_ৰদ্ধ_ডোবা_আছে_কি_না("1");
    }
    if (value === "no" && name === "বাড়ীর_বাইরে_ৰদ্ধ_ডোবা_আছে_কি_না") {
      setবাড়ীর_বাইরে_ৰদ্ধ_ডোবা_আছে_কি_না("0");
    }
    if (value === "yes" && name === "বাড়ীর_বাইরে_নিচু_জলা_জমি_আছে_কি_না") {
      setবাড়ীর_বাইরে_নিচু_জলা_জমি_আছে_কি_না("1");
    }
    if (value === "no" && name === "বাড়ীর_বাইরে_নিচু_জলা_জমি_আছে_কি_না") {
      setবাড়ীর_বাইরে_নিচু_জলা_জমি_আছে_কি_না("0");
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

  const handleSubmit = async (e, userRole) => {
    e.preventDefault();
    localStorage.removeItem("household_id");
    if (userRole === "hth-member") {
      console.log("submitted HTH-MEM Survey", surveyDataHM);
      const survey_response = await sendRequest(
        "post",
        "/surveys",
        surveyDataHM,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (survey_response.status === 1) {
        console.log("survey_response hth mem submitted", survey_response.data);
        setApi_Data_Survey(survey_response.data);
        setSurveyBtnDisable(true);
        route.push("/home/householdlist");
      } else {
        swal("Error", survey_response.message, "error");
      }
    }
    if (userRole === "hth-supervisor") {
      console.log("submitted", surveyDataHS);
      route.push("/home/householdlist");
    }
  };

  return userRole === "hth-supervisor" ? (
    <div className={styles.container}>
      <>
        <span>
          <Surveyques
            id="field_1_form_5"
            value={field_1_form_5}
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
            radioValue={selectedOption["বাড়ীর_বাইরে_বদ্ধ_নৰ্দমা_আছে_কি_না"]}
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
            radioValue={selectedOption["বাড়ীর_বাইরে_নিচু_জলা_জমি_আছে_কি_না"]}
          />
          <Surveyques
            id={"জল_জমে_আছে_এমন_মোট_কতগুলি_জায়গা_পাত্র_দেখা_গেল"}
            value={জল_জমে_আছে_এমন_মোট_কতগুলি_জায়গা_পাত্র_দেখা_গেল}
            labelText={
              translate?.জল_জমে_আছে_এমন_মোট_কতগুলি_জায়গা_পাত্র_দেখা_গেল
            }
            handleVal={handleVal}
          />
          <Surveyques
            id={"এর_মধ্যে_কতগুলিতে_লার্ভা_পাওয়া_গেল"}
            value={এর_মধ্যে_কতগুলিতে_লার্ভা_পাওয়া_গেল}
            labelText={translate?.এর_মধ্যে_কতগুলিতে_লার্ভা_পাওয়া_গেল}
            handleVal={handleVal}
          />
          <Surveyques
            id={"field_7_form_5"}
            value={field_7_form_5}
            labelText={translate?.field_7_form_5}
            handleVal={handleVal}
          />
          <Surveyques
            id={"কতগুলো_বাসিন্দা_সঙ্গে_আলোচনা_করা_হল_ও_লিফলেট_দেওয়া_হল"}
            value={leaflets_distributed}
            labelText={
              translate?.কতগুলো_বাসিন্দা_সঙ্গে_আলোচনা_করা_হল_ও_লিফলেট_দেওয়া_হল
            }
            handleVal={handleVal}
          />
          <Surveyques
            id={"landmark"}
            value={Landmark}
            labelText={translate?.Landmark}
            handleVal={handleVal}
          />
        </span>
        {/* <div className={styles.imgContainer}>
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
          disabled={surveyBtnDisable} //does not work
          onClick={(e) => handleSubmit(e, userRole)}
        >
          Submit
        </Button> */}
      </>
    </div>
  ) : (
    <></>
  );
}
