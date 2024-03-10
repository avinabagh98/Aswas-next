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
  // State variables
  const [ward, setWard] = useState("");
  const [household, setHousehold] = useState("");
  const [aadhar, setAadhar] = useState("");
  const [mobile, setMobile] = useState("");
  const [family, setFamily] = useState("");
  const [ownertype, setOwnerType] = useState("");
  const [holding, setHolding] = useState("");
  //Language Function Fetcher
  const translate = LanguageFetcher();
  // Dropdown options
  const ward_options = ["Choose", "Option 1", "Option 2", "Option 3"];
  const option2 = ["Select", "Own", "Rent"];

  // Other variables
  const formData = {
    ward,
    household,
    aadhar,
    mobile,
    family,
    ownertype,
    holding,
  };

  //Functions
  const submitHandler = (e) => {
    e.preventDefault();
    console.log("submitted", formData);
  };

  const handleVal = (id, val) => {
    if (id === "ward") {
      setWard(val);
    }
    if (id === "household") {
      setHousehold(val);
    }
    if (id === "aadhar") {
      setAadhar(val);
    }
    if (id === "mobile") {
      setMobile(val);
    }
    if (id === "family_members") {
      setFamily(val);
    }
    if (id === "ownertype") {
      setOwnerType(val);
    }
    if (id === "holding_number") {
      setHolding(val);
    }
  };

  return (
    (
      <>
        <div className={styles.householdentrycontainer}>
          <div className={styles.titlebar}>
            <Textparser text={"New Households Entry"} />
          </div>
          <SurveyDropdown
            id="ward"
            labelText={translate?.ward_no}
            numberOfOptions={3}
            options={ward_options}
            handleVal={handleVal}
          />
          <Surveyques
            id="household"
            labelText={translate?.household_name}
            handleVal={handleVal}
          />
          <Surveyques
            id="aadhar"
            labelText={translate?.aadhar_no}
            handleVal={handleVal}
          />
          <Surveyques
            id="mobile"
            labelText={translate?.mobile_no}
            handleVal={handleVal}
          />
          <Surveyques
            id="family_members"
            labelText={translate?.family_members}
            handleVal={handleVal}
          />
          <SurveyDropdown
            id={"ownertype"}
            labelText={translate?.owner_type}
            numberOfOptions={3}
            options={option2}
            handleVal={handleVal}
          />
          <Surveyques
            id={"holding_number"}
            labelText={translate?.holding_number}
            handleVal={handleVal}
          />
          <Button variant="success" href="/home/team" onClick={submitHandler}>
            SUBMIT
          </Button>
        </div>
      </>
    ) || (
      <>
        <div className={styles.householdentrycontainer}>
          <div className={styles.titlebar}>
            <Skeleton height={20} width={"100%"} />
          </div>
          <div className={styles.SkeletonContainer}>
            <span>
              <Skeleton height={20} width={"100%"} />
            </span>
            <span>
              <Skeleton height={20} width={"100%"} />
            </span>
            <span>
              <Skeleton height={20} width={"100%"} />
            </span>
            <span>
              <Skeleton height={20} width={"100%"} />
            </span>
            <span>
              <Skeleton height={20} width={"100%"} />
            </span>
            <span>
              <Skeleton height={20} width={"100%"} />
            </span>
            <span>
              <Skeleton height={30} width={150} />
            </span>
          </div>
        </div>
      </>
    )
  );
}
