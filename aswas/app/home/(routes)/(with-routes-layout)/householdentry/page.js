"use client";
import { useState } from "react";
import SurveyDropdown from "@/components/home/SurveyDropdown";
import Surveyques from "@/components/home/Surveyques";
import Textparser from "@/components/home/Textparser";
import styles from "./householdentry.module.css";
import { Button } from "react-bootstrap";
import LanguageFetcher from "@/components/LanguageFetcher";

import Skeleton from "react-loading-skeleton"; // Import react-loading-skeleton
import "react-loading-skeleton/dist/skeleton.css"; // Import the CSS file

export default function page() {
  const [ward, setWard] = useState("");
  const [household, setHousehold] = useState("");
  const [aadhar, setAadhar] = useState("");
  const [mobile, setMobile] = useState("");
  const [family, setFamily] = useState("");
  const [ownertype, setOwnerType] = useState("");
  const [holding, setHolding] = useState("");

  const formData = {
    ward,
    household,
    aadhar,
    mobile,
    family,
    ownertype,
    holding,
  };

  const translate = LanguageFetcher();

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("submitted");
  };

  const options1 = ["Choose", "Option 1", "Option 2", "Option 3"];
  const option2 = ["Select", "Own", "Rent"];

  return (
    (
      <>
        <div className={styles.householdentrycontainer}>
          <div className={styles.titlebar}>
            <Textparser text={"New House holds Entry"} />
          </div>
          <SurveyDropdown
            id="ward"
            labelText={translate?.ward_no}
            numberOfOptions={3}
            options={options1}
          />
          <Surveyques labelText={translate?.household_name} />
          <Surveyques labelText={translate?.aadhar_no} />
          <Surveyques labelText={translate?.mobile_no} />
          <Surveyques labelText={translate?.family_members} />
          <SurveyDropdown
            id={"ownertype"}
            labelText={translate?.owner_type}
            numberOfOptions={2}
            options={option2}
          />
          <Surveyques labelText={translate?.holding_number} />
          <Button variant="success" href="/home/team">
            SUBMIT
          </Button>
        </div>
      </>
    ) || (
      <>
        <Skeleton />
      </>
    )
  );
}
