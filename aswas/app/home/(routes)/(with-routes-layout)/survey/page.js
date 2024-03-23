"use client";
import React, { useEffect, useState } from "react";
import Surveyques from "@/components/home/Surveyques";
import Surveyoption from "@/components/home/Surveyoption";
import styles from "./survey.module.css";
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
import Header from "@/components/Header/Header";

export default function page() {
  const { teamNumber } = useTeam();
  const translate = LanguageFetcher();
  const route = useRouter();

  // Survey State variables
  const [user_id, setUser_ID] = useState(null);
  const [radioValue, setRadioValue] = useState("");
  const [cameraClicked, setCameraClicked] = useState(false);
  const [captureClicked, setCaptureClicked] = useState(false);
  const [isLocked, setIsLocked] = useState(true);
  const [isSurveyed, setIsSurveyed] = useState("");
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

  const [resolved_garbage, setResolvedGarbage] = useState([]);
  const [resolved_blocked_drains, setResolvedBlockedDrains] = useState([]);
  const [resolved_puddle, setResolvedPuddle] = useState([]);
  const [resolved_stagnant_water, setResolvedStagnantWater] = useState([]);
  const [resolved_larva_others, setResolvedLarvaOthers] = useState([]);
  const [resolved_garbage_others, setResolvedGarbageOthers] = useState([]);
  const [resolve_start_date, setResolvedStartDate] = useState("");
  const [resolve_end_date, setResolvedEndDate] = useState("");

  //Other State Variables
  const [userRole, setUserRole] = useState("");
  const [token, setToken] = useState("");
  const [household_id, setHouseholdId] = useState("");
  const [team_id, setTeamID] = useState("");
  const [api_data_survey, setApi_Data_Survey] = useState([]);
  const [api_data_HSsurvey, setApi_Data_HSurvey] = useState([]);
  const [api_data_hosuehold, setAPI_Data_household] = useState([]);
  const [api_data_vctSurvey, setAPI_Data_vctSurvey] = useState([]);
  const [surveyBtnDisable, setSurveyBtnDisable] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [locationString, setLocationString] = useState("");

  const surveyDataHM = {
    token: token,
    location: locationString,
    // isSurveyed: isSurveyed,
    property_id: household_id,
    team_id: team_id,
    fever_cases: field_1_form_5,
    has_indoor_breeding_spots: field_2_form_5,
    has_peridomestic_breeding_spots: field_3_form_5,
    has_garbage: বাড়ীর_বাইরে_আব্বর্জনা_আছে_কি_না,
    has_blocked_drains: বাড়ীর_বাইরে_বদ্ধ_নৰ্দমা_আছে_কি_না,
    has_puddle: বাড়ীর_বাইরে_ৰদ্ধ_ডোবা_আছে_কি_না,
    has_stagnant_water: বাড়ীর_বাইরে_নিচু_জলা_জমি_আছে_কি_না,
    has_larva_others: "",
    has_garbage_others: "",
    water_containers: জল_জমে_আছে_এমন_মোট_কতগুলি_জায়গা_পাত্র_দেখা_গেল,
    had_larva_previously: "",
    water_containers_with_larva: এর_মধ্যে_কতগুলিতে_লার্ভা_পাওয়া_গেল,
    water_containers_managed: field_7_form_5,
    leaflets_distributed:
      কতগুলো_বাসিন্দা_সঙ্গে_আলোচনা_করা_হল_ও_লিফলেট_দেওয়া_হল,
    landmark: Landmark,
    image: image,
  };

  const surveyDataHS = {
    token: token,
    location: locationString,
    // isSurveyed: isSurveyed,
    property_id: household_id,
    team_id: team_id,
    fever_cases: field_1_form_5,
    has_indoor_breeding_spots: field_2_form_5,
    has_peridomestic_breeding_spots: field_3_form_5,
    has_garbage: বাড়ীর_বাইরে_আব্বর্জনা_আছে_কি_না,
    has_blocked_drains: বাড়ীর_বাইরে_বদ্ধ_নৰ্দমা_আছে_কি_না,
    has_puddle: বাড়ীর_বাইরে_ৰদ্ধ_ডোবা_আছে_কি_না,
    has_stagnant_water: বাড়ীর_বাইরে_নিচু_জলা_জমি_আছে_কি_না,
    has_larva_others: "",
    has_garbage_others: "",
    water_containers: জল_জমে_আছে_এমন_মোট_কতগুলি_জায়গা_পাত্র_দেখা_গেল,
    had_larva_previously: "",
    water_containers_with_larva: এর_মধ্যে_কতগুলিতে_লার্ভা_পাওয়া_গেল,
    water_containers_managed: field_7_form_5,
    leaflets_distributed:
      কতগুলো_বাসিন্দা_সঙ্গে_আলোচনা_করা_হল_ও_লিফলেট_দেওয়া_হল,
    landmark: Landmark,
    image: image,
    remarks: remarks,
  };

  const surveyDataVCT = {
    token: token,
    property_id: household_id,
    team_id: team_id,
    user_id: user_id,
    resolved_garbage: resolved_garbage,
    resolved_blocked_drains: resolved_blocked_drains,
    resolved_puddle: resolved_puddle,
    resolved_stagnant_water: resolved_stagnant_water,
    resolve_start_date: startDate,
    resolve_end_date: endDate,
    location: locationString,
    image: image,
  };

  //Localstorage and Token fetching
  useEffect(() => {
    setTeamID(localStorage.getItem("team_id"));
    setHouseholdId(localStorage.getItem("household_id"));
    setUser_ID(localStorage.getItem("user_id"));
    try {
      async function fetchData() {
        const token = await localStorage.getItem("token");
        const household_id = localStorage.getItem("household_id");
        const role = localStorage.getItem("role_name");
        if (!token) {
          route.push("/home/login");
        } else {
          setUserRole(localStorage.getItem("role_name"));
          setToken(token);

          // Fetching Household data - HTH MEMBER
          if (role === "hth-member") {
            const response = await sendRequest(
              "get",
              `/properties/${household_id}`,
              null,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            if (response.status === 1) {
              setAPI_Data_household(response.data);
            }
          }

          // Fetching Household data - VCT Supervisor
          // if (role === "vct-supervisor") {
          //   console.log("insride vct supervisor");

          //   const response_vct = await sendRequest(
          //     "get",
          //     `properties/${household_id}/survey/hth-member`,
          //     null,
          //     {
          //       headers: {
          //         Authorization: `Bearer ${token}`,
          //       },
          //     }
          //   );
          //   if (response_vct.status === 1) {
          //     setAPI_Data_vctSurvey(response_vct.data);
          //     console.log(response_vct.data);
          //   }
          // }
        }
      }
      fetchData();
    } catch (error) {
      swal("Error", error, "error");
    }
  }, []);

  useEffect(() => {
    try {
      async function fetchVCTdata() {
        const token = await localStorage.getItem("token");
        const household_id_vct = localStorage.getItem("household_id_vct");
        const role = localStorage.getItem("role_name");

        if (!token) {
          route.push("/home/login");
        } else {
          setUserRole(localStorage.getItem("role_name"));
          setToken(token);

          // Fetching Household data - VCT Supervisor
          if (role === "vct-supervisor") {
            console.log("inside vct supervisor");

            const response_vct = await sendRequest(
              "get",
              `/properties/${household_id_vct}/survey/hth-member`,
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

  // Location Fetching
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
  //Location String
  useEffect(() => {
    setLocationString(`${location?.latitude},${location?.longitude}`);
  }, [location, locationString]);

  //API Data checking
  useEffect(() => {
    console.log("api_data_survey", api_data_survey);
    console.log("api_data_vctSurvey", api_data_vctSurvey);
  }, [api_data_survey, api_data_vctSurvey]);

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

  //Handler Functions
  const handleRadioChange_value = (event) => {
    const id = event.target.id;
    const value = event.target.value;
    const name = event.target.name;
    console.log("id :::", id);
    setRadioValue(value);
    console.log(name, value);
    if (value === "yes" && name === "isLocked") {
      setIsLocked(true);
      setIsSurveyed("1");
      console.log("isLocked", isLocked);
    }
    if (value === "no" && name === "isLocked") {
      setIsLocked(false);
      setIsSurveyed("0");
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

    if (value === "yes" && name === "field_8_form_5_aborjona") {
      setResolvedGarbage("1");
    }
    if (value === "no" && name === "field_8_form_5_aborjona") {
      setResolvedGarbage("0");
    }

    if (value === "yes" && name === "field_8_form_5_nordoma") {
      setResolvedBlockedDrains("1");
    }

    if (value === "no" && name === "field_8_form_5_nordoma") {
      setResolvedBlockedDrains("0");
    }

    if (value === "yes" && name === "field_8_form_5_doba") {
      setResolvedPuddle("1");
    }

    if (value === "no" && name === "field_8_form_5_doba") {
      setResolvedPuddle("0");
    }

    if (value === "yes" && name === "field_8_form_5_nichu_jomi") {
      setResolvedStagnantWater("1");
    }

    if (value === "no" && name === "field_8_form_5_nichu_jomi") {
      setResolvedStagnantWater("0");
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
      setField_1_form_5(String(val));
    }

    if (id === "জল_জমে_আছে_এমন_মোট_কতগুলি_জায়গা_পাত্র_দেখা_গেল") {
      setজল_জমে_আছে_এমন_মোট_কতগুলি_জায়গা_পাত্র_দেখা_গেল(String(val));
    }
    if (id === "এর_মধ্যে_কতগুলিতে_লার্ভা_পাওয়া_গেল") {
      setএর_মধ্যে_কতগুলিতে_লার্ভা_পাওয়া_গেল(String(val));
    }
    if (id === "field_7_form_5") {
      setField_7_form_5(String(val));
    }
    if (id === "কতগুলো_বাসিন্দা_সঙ্গে_আলোচনা_করা_হল_ও_লিফলেট_দেওয়া_হল") {
      setকতগুলো_বাসিন্দা_সঙ্গে_আলোচনা_করা_হল_ও_লিফলেট_দেওয়া_হল(String(val));
    }
    if (id === "landmark") {
      setLandmark(String(val));
    }
    if (id === "remarks") {
      setRemarks(String(val));
    }
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const handleSubmit = async (e, userRole) => {
    e.preventDefault();
    localStorage.removeItem("household_id");
    if (userRole === "hth-member") {
      console.log("submitted HTH-MEM Survey", surveyDataHM);
      //Form Valiadation
      if (
        surveyDataHM.fever_cases === "" ||
        surveyDataHM.has_indoor_breeding_spots === "" ||
        surveyDataHM.has_peridomestic_breeding_spots === "" ||
        surveyDataHM.has_garbage === "" ||
        surveyDataHM.has_blocked_drains === "" ||
        surveyDataHM.has_puddle === "" ||
        surveyDataHM.has_stagnant_water === "" ||
        surveyDataHM.water_containers === "" ||
        surveyDataHM.water_containers_with_larva === "" ||
        surveyDataHM.water_containers_managed === "" ||
        surveyDataHM.leaflets_distributed === "" ||
        surveyDataHM.landmark === ""
      ) {
        swal("Error", "Please fill all the fields", "error");
      } else {
        try {
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
            console.log(
              "survey_response hth mem submitted",
              survey_response.data
            );
            setApi_Data_Survey(survey_response.data);
            setSurveyBtnDisable(true);
            route.push("/home/team");
          }
        } catch (error) {
          swal("Error", error.message, "error");
        }
      }
    }
    if (userRole === "hth-supervisor") {
      console.log("submitted HTH-Supervisor Survey", surveyDataHM);
      //Form Valiadation
      if (
        surveyDataHS.fever_cases === "" ||
        surveyDataHS.has_indoor_breeding_spots === "" ||
        surveyDataHS.has_peridomestic_breeding_spots === "" ||
        surveyDataHS.has_garbage === "" ||
        surveyDataHS.has_blocked_drains === "" ||
        surveyDataHS.has_puddle === "" ||
        surveyDataHS.has_stagnant_water === "" ||
        surveyDataHS.water_containers === "" ||
        surveyDataHS.water_containers_with_larva === "" ||
        surveyDataHS.water_containers_managed === "" ||
        surveyDataHS.leaflets_distributed === "" ||
        surveyDataHS.landmark === ""
      ) {
        swal("Error", "Please fill all the fields", "error");
      } else {
        try {
          const survey_response_HS = await sendRequest(
            "post",
            "/surveys",
            surveyDataHS,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (survey_response_HS.status === 1) {
            console.log(
              "survey_response hth supervisor submitted",
              survey_response_HS.data
            );
            setApi_Data_HSurvey(survey_response_HS.data);
            route.push("/home/team");
          }
        } catch (error) {
          swal("Error", error, "error");
        }
      }
    }
    if (userRole === "vct-supervisor") {
      console.log("submitted VCT_SUPERVISOR Survey", surveyDataVCT);

      //Form Valiadation
      if (
        surveyDataVCT.resolved_garbage === "" ||
        surveyDataVCT.resolved_blocked_drains === "" ||
        surveyDataVCT.resolved_puddle === "" ||
        surveyDataVCT.resolved_stagnant_water === "" ||
        surveyDataVCT.resolve_start_date === "" ||
        surveyDataVCT.resolve_end_date === ""
      ) {
        swal("Error", "Please fill all the fields", "error");
      } else {
        try {
          const survey_response_VCT = await sendRequest(
            "post",
            "/surveys",
            surveyDataVCT,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (survey_response_VCT.status === 1) {
            console.log(
              "survey_response VCT Supervisor submitted",
              survey_response_VCT.data
            );
            setAPI_Data_vctSurvey(survey_response_VCT.data);

            route.push("/home/team");
          }
        } catch (error) {
          swal("Error", error, "error");
        }
      }
    }
  };

  const dropdownOptions = ["Keliye Brindabon dekhiye diyeche", "Tala jhulche"];

  return userRole === "hth-member" ? (
    <>
      <Header userRole={userRole} isOffCanvasVisible={false} />
      <div className={styles.container}>
        {/* <div className={styles.titlebar}>
      <span>
        <Textparser text={"Form-No-2"} />
      </span>
      <span>
        <Textparser text={"Round-2"} />
      </span>
    </div> */}

        <span className={styles.name}>
          <Textparser text={api_data_hosuehold?.name} />
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
            </>
          ) : null}
          {isSurveyed === "0" ? (
            <>
              <div className={styles.dropdownContainer}>
                <label className={styles.dropdownLabel} htmlFor="reason">
                  Please choose a reason:
                </label>
                <select id="reason" className={styles.dropdownSelect}>
                  <option value="" disabled selected hidden>
                    Please choose a reason
                  </option>
                  {dropdownOptions.map((option, index) => (
                    <option
                      key={index}
                      value={option}
                      className={styles.dropdownOption}
                    >
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <button className={styles.submitBtn}>Submit</button>
            </>
          ) : isSurveyed === "1" ? (
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
                  radioValue={
                    selectedOption["বাড়ীর_বাইরে_আব্বর্জনা_আছে_কি_না"]
                  }
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
                  radioValue={
                    selectedOption["বাড়ীর_বাইরে_ৰদ্ধ_ডোবা_আছে_কি_না"]
                  }
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
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  ) : userRole === "hth-supervisor" ? (
    <>
      <Header isOffCanvasVisible={false} />
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
    </>
  ) : userRole === "vct-supervisor" ? (
    <>
      <Header isOffCanvasVisible={false} />
      <div className={styles.container}>
        <h4 className="text-decoration-underline text-center">Form No. 5</h4>
        <span className={styles.name}>
          <Textparser text={`Team Id: ${api_data_vctSurvey?.team_id}`} />
        </span>
        <span className={styles.name}>
          <Textparser text={localStorage.getItem("household_name")} />
        </span>

        <span className={styles.name}>
          <Textparser
            text={`latitude:${location?.latitude}, longitude:${location?.longitude}`}
          />
        </span>

        <div className={styles.content}>
          <>
            <span>
              <span className={styles.report_field}>
                <span className={styles.report_field_label}>
                  <Textparser text={translate?.field_1_form_5} />
                </span>
                <Textparser text={api_data_vctSurvey?.fever_cases} />
              </span>

              <span className={styles.report_field}>
                <span className={styles.report_field_label}>
                  <Textparser text={translate?.field_2_form_5} />
                </span>
                <Textparser
                  text={api_data_vctSurvey?.has_indoor_breeding_spots}
                />
              </span>

              <span className={styles.report_field}>
                <span className={styles.report_field_label}>
                  <Textparser text={translate?.field_3_form_5} />
                </span>
                <Textparser
                  text={api_data_vctSurvey?.has_peridomestic_breeding_spots}
                />
              </span>

              <span className={styles.report_field}>
                <span className={styles.report_field_label}>
                  <Textparser text={translate?.field_4_form_5} />
                </span>
                <Textparser text={api_data_vctSurvey?.has_garbage} />
              </span>

              <span className={styles.report_field}>
                <span className={styles.report_field_label}>
                  <Textparser text={translate?.field_5_form_5} />
                </span>
                <Textparser text={api_data_vctSurvey?.water_containers} />
              </span>

              <span className={styles.report_field}>
                <span className={styles.report_field_label}>
                  <Textparser text={translate?.field_6_form_5} />
                </span>
                <Textparser
                  text={api_data_vctSurvey?.water_containers_with_larva}
                />
              </span>

              <span className={styles.report_field}>
                <span className={styles.report_field_label}>
                  <Textparser text={translate?.field_7_form_5} />
                </span>
                <Textparser
                  text={api_data_vctSurvey?.water_containers_managed}
                />
              </span>

              <span className={styles.report_field}>
                <span className={styles.report_field_label}>
                  <Textparser text={translate?.Landmark} />
                </span>
                <Textparser text={api_data_vctSurvey?.landmark} />
              </span>

              <Surveyoption
                id={"field_8_form_5_aborjona"}
                name={"field_8_form_5_aborjona"}
                optionText={translate?.field_8_form_5_aborjona}
                handleRadioChange_value={handleRadioChange_value}
                handleRadioChange_color={handleRadioChange_color}
                radioValue={selectedOption["field_8_form_5_aborjona"]}
              />
              <Surveyoption
                id={"field_8_form_5_nordoma"}
                name={"field_8_form_5_nordoma"}
                optionText={translate?.field_8_form_5_nordoma}
                handleRadioChange_value={handleRadioChange_value}
                handleRadioChange_color={handleRadioChange_color}
                radioValue={selectedOption["field_8_form_5_nordoma"]}
              />

              <Surveyoption
                id={"field_8_form_5_doba"}
                name={"field_8_form_5_doba"}
                optionText={translate?.field_8_form_5_doba}
                handleRadioChange_value={handleRadioChange_value}
                handleRadioChange_color={handleRadioChange_color}
                radioValue={selectedOption["field_8_form_5_doba"]}
              />

              <Surveyoption
                id={"field_8_form_5_nichu_jomi"}
                name={"field_8_form_5_nichu_jomi"}
                optionText={translate?.field_8_form_5_nichu_jomi}
                handleRadioChange_value={handleRadioChange_value}
                handleRadioChange_color={handleRadioChange_color}
                radioValue={selectedOption["field_8_form_5_nichu_jomi"]}
              />
              <div className={styles.datePickerContainer}>
                <label className={styles.label} htmlFor="start">
                  {translate?.field_9_form_5}
                </label>
                <input
                  className={styles.inputField}
                  type="date"
                  id="start"
                  value={startDate}
                  onChange={handleStartDateChange}
                />

                <label className={styles.label} htmlFor="end">
                  {translate?.field_10_form_5}
                </label>
                <input
                  className={styles.inputField}
                  type="date"
                  id="end"
                  value={endDate}
                  onChange={handleEndDateChange}
                />
              </div>
            </span>
            <div className={styles.imgContainer}>
              <Textparser text={translate?.picture_after_survey} />
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
          </>
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
