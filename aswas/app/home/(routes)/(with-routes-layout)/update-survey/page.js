"use client";
import React, { useEffect, useState } from "react";
import Surveyques from "@/components/home/Surveyques";
import Surveyoption from "@/components/home/Surveyoption";
import styles from "./update-survey.module.css";
import Textparser from "@/components/home/Textparser";
import { Button } from "react-bootstrap";
import LanguageFetcher from "@/components/LanguageFetcher";
import "react-loading-skeleton/dist/skeleton.css";
import { useRouter } from "next/navigation";
import { sendRequest } from "@/api/sendRequest";
import swal from "sweetalert";
import Header from "@/components/Header/Header";

export default function page() {
  const translate = LanguageFetcher();
  const route = useRouter();

  // Survey State variables
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

  //Other State Variables
  const [userRole, setUserRole] = useState("");
  const [token, setToken] = useState("");
  const [household_id, setHouseholdId] = useState("");
  const [team_id, setTeamID] = useState("");
  const [api_data_survey, setApi_Data_Survey_updated] = useState([]);
  const [api_data_hosuehold, setAPI_Data_household] = useState([]);
  const [surveyBtnDisable, setSurveyBtnDisable] = useState(false);
  const [survey_id, setSurvey_id] = useState("");
  const [household_name, setHousehold_Name] = useState("");

  //Header-Loading Data States
  const [username, setUserName] = useState("");
  const [municipality_name, setMunicipality_name] = useState("");
  const [team_num, setTeam_num] = useState("");
  const [ward_name, setWard_name] = useState("");

  const loadingHeaderData = {
    name: username,
    municipality_name: municipality_name,
    team_num: team_num,
    ward_name: ward_name,
  };

  const surveyDataHM = {
    token: token,
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
    resolved_garbage: "",
    resolved_blocked_drains: "",
    resolved_puddle: "",
    resolved_stagnant_water: "",
    resolved_larva_others: "",
    resolved_garbage_others: "",
    resolve_start_date: "",
    resolve_end_date: "",
    remarks: "",
    landmark: Landmark,
    image: image,
  };

  const dropdownOptions = ["Misbehaved", "Abondoned", "Tala jhulche", "Other"];
  //Localstorage and Token fetching
  useEffect(() => {
    setTeamID(localStorage.getItem("team_id"));
    setHouseholdId(localStorage.getItem("household_id"));

    try {
      async function fetchData() {
        const token = await localStorage.getItem("token");
        setHousehold_Name(localStorage.getItem("household_name"));
        const role = localStorage.getItem("role_name");
        if (!token) {
          route.push("/home/login");
        } else {
          //Initite states with local storage data
          const name_local = await localStorage.getItem("name");
          const municipality_name_local = await localStorage.getItem(
            "municipality_name"
          );
          const team_num_local = await localStorage.getItem("team_num");
          const ward_name_local = await localStorage.getItem("ward_name");
          setUserRole(localStorage.getItem("role_name"));
          setUserName(name_local);
          setMunicipality_name(municipality_name_local);
          setTeam_num(team_num_local);
          setWard_name(ward_name_local);

          setToken(token);
          const household_id_update = localStorage.getItem(
            "household_id(survey-update)"
          );

          // Read Survey Data from Property ID
          if (role === "hth-member") {
            const response = await sendRequest(
              "get",
              `/properties/${household_id_update}/survey/hth-member`,
              null,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            if (response.status === 1) {
              setAPI_Data_household(response.data);
              console.log("response", response.data);
              setSurvey_id(response.data.id);

              if (response.status === 1) {
                const data = response.data;
                setField_1_form_5(String(data.fever_cases) || "");
                setField_2_form_5(String(data.has_indoor_breeding_spots) || "");
                setField_3_form_5(
                  String(data.has_peridomestic_breeding_spots) || ""
                );
                setবাড়ীর_বাইরে_আব্বর্জনা_আছে_কি_না(
                  String(data.has_garbage) || ""
                );
                setবাড়ীর_বাইরে_ৰদ্ধ_ডোবা_আছে_কি_না(
                  String(data.has_puddle) || ""
                );
                setবাড়ীর_বাইরে_নিচু_জলা_জমি_আছে_কি_না(
                  String(data.has_stagnant_water) || ""
                );
                setবাড়ীর_বাইরে_বদ্ধ_নৰ্দমা_আছে_কি_না(
                  String(data.has_blocked_drains) || ""
                );
                setজল_জমে_আছে_এমন_মোট_কতগুলি_জায়গা_পাত্র_দেখা_গেল(
                  String(data.water_containers) || ""
                );
                setএর_মধ্যে_কতগুলিতে_লার্ভা_পাওয়া_গেল(
                  String(data.water_containers_with_larva) || ""
                );
                setField_7_form_5(String(data.water_containers_managed) || "");
                setLandmark(String(data.landmark) || "");
                setImage(String(data.image) || "");
                setকতগুলো_বাসিন্দা_সঙ্গে_আলোচনা_করা_হল_ও_লিফলেট_দেওয়া_হল(
                  String(data.leaflets_distributed) || ""
                );
              }
            }
          }
        }
      }
      fetchData();
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

  const handleSubmit = async (e, userRole) => {
    e.preventDefault();
    localStorage.removeItem("household_id");
    if (userRole === "hth-member") {
      console.log("submitted HTH-MEM Survey", surveyDataHM);

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
          const survey_update_response = await sendRequest(
            "put",
            `/surveys/${survey_id}`,
            surveyDataHM,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (survey_update_response.status === 1) {
            console.log("Updated survey_response", survey_update_response.data);
            setApi_Data_Survey_updated(survey_update_response.data);
            setSurveyBtnDisable(true);
            route.push("/home/team");
          }
        } catch (error) {
          swal("Error", error.message, "error");
        }
      }
    }
    if (userRole === "hth-supervisor") {
      console.log("submitted", surveyDataHS);
      route.push("/home/householdlist");
    }
  };

  return (
    <>
      <Header isOffCanvasVisible={false} loadingdata={loadingHeaderData} />
      <div className={styles.container}>
        <span className={styles.name}>
          <Textparser text={household_name} />
          <Textparser
            text={`latitude:${location?.latitude}, longitude:${location?.longitude}`}
          />
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
                  apiResponse={field_2_form_5}
                />
                <Surveyoption
                  id={"field_3_form_5"}
                  name={"field_3_form_5"}
                  optionText={translate?.field_3_form_5}
                  handleRadioChange_value={handleRadioChange_value}
                  handleRadioChange_color={handleRadioChange_color}
                  radioValue={selectedOption["field_3_form_5"]}
                  apiResponse={field_3_form_5}
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
                  apiResponse={বাড়ীর_বাইরে_আব্বর্জনা_আছে_কি_না}
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
                  apiResponse={বাড়ীর_বাইরে_বদ্ধ_নৰ্দমা_আছে_কি_না}
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
                  apiResponse={বাড়ীর_বাইরে_ৰদ্ধ_ডোবা_আছে_কি_না}
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
                  apiResponse={বাড়ীর_বাইরে_নিচু_জলা_জমি_আছে_কি_না}
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
  );
}
