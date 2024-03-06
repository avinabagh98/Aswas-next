"use client";
import SurveyDropdown from "@/components/home/SurveyDropdown";
import Surveyques from "@/components/home/Surveyques";
import Textparser from "@/components/home/Textparser";
import styles from "./householdentry.module.css";
import { Button } from "react-bootstrap";
import LanguageFetcher from "@/components/LanguageFetcher";

export default function page() {
  const translate = LanguageFetcher();
  return (
    <>
      <div className={styles.householdentrycontainer}>
        <div className={styles.titlebar}>
          <Textparser text={"New House holds Entry"} />
        </div>
        <SurveyDropdown labelText={translate?.ward_no} />
        <Surveyques labelText={translate?.household_name} />
        <Surveyques labelText={translate?.aadhar_no} />
        <Surveyques labelText={translate?.mobile_no} />
        <Surveyques labelText={translate?.family_members} />
        <SurveyDropdown labelText={translate?.owner_type} />
        <Surveyques labelText={translate?.holding_number} />
        <Button variant="success" href="/home/team">
          SUBMIT
        </Button>
      </div>
    </>
  );
}
