import React from "react";
import SurveyDropdown from "@/components/home/SurveyDropdown";
import Surveyques from "@/components/home/Surveyques";
import Textparser from "@/components/home/Textparser";
import styles from "./householdentry.module.css";
import { Button } from "react-bootstrap";

export default function page() {
  return (
    <>
      <div className={styles.householdentrycontainer}>
        <div className={styles.titlebar}>
          <Textparser text={"New House holds Entry"} />
        </div>
        <SurveyDropdown labelText={"Ward No. *"} />
        <Surveyques labelText={"Household Name. *"} />
        <Surveyques labelText={"Aadhaar No*"} />
        <Surveyques labelText={"Mobile No. *"} />
        <Surveyques labelText={"Family Members *"} />
        <SurveyDropdown labelText={"Owner Type *"} />
        <Surveyques labelText={"Holding Number"} />
        <Button variant="success" href="/home/layout/team">
          SUBMIT
        </Button>
      </div>
    </>
  );
}
