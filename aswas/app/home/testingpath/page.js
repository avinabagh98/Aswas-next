"use client";
import React, { useEffect, useState } from "react";
import Surveyques from "@/components/home/Surveyques";
import Surveyoption from "@/components/home/Surveyoption";
import styles from "@/app/home/(routes)/(with-routes-layout)/survey/survey.module.css";
import Textparser from "@/components/home/Textparser";
import { useTeam } from "@/context/TeamContext";
import { sendRequest } from "@/api/sendRequest";
import swal from "sweetalert";

export default function page() {
  const { teamNumber } = useTeam();
  const [api_data_vctSurvey, setAPI_Data_vctSurvey] = useState([]);

  useEffect(() => {
    try {
      async function fetchVCTdata() {
        const token = await localStorage.getItem("token");
        const household_id = localStorage.getItem("household_id");
        const role = localStorage.getItem("role_name");

        if (!token) {
          route.push("/home/login");
        } else {
          // Fetching Household data - VCT Supervisor
          if (role === "vct-supervisor") {
            console.log("inside vct supervisor");

            const response_vct = await sendRequest(
              "get",
              `properties/${household_id}/survey/hth-member`,
              null,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            if (response_vct.status === 1) {
              setAPI_Data_vctSurvey(response_vct.data);
              console.log(response_vct.data);
            }
          }
        }
      }
      fetchVCTdata();
    } catch (error) {
      swal("Error", error, "error");
    }
  }, []);
  return (
    <>
      <div className={styles.container}>
        <span className={styles.name}>
          <Textparser text={api_data_vctSurvey?.name} />
        </span>

        <div className={styles.content}>
          {/* <>
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
              value={কতগুলো_বাসিন্দা_সঙ্গে_আলোচনা_করা_হল_ও_লিফলেট_দেওয়া_হল}
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
            disabled={surveyBtnDisable} //does not work
            onClick={(e) => handleSubmit(e, userRole)}
          >
            Submit
          </Button>
        </> */}
        </div>
      </div>
    </>
  );
}
