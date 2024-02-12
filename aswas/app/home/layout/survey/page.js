"use client";
import React from "react";
import Surveyques from "@/components/home/Surveyques";
import Surveyoption from "@/components/home/Surveyoption";

export default function page() {
  return (
    <div>
      this is survey page
      <Surveyques labelText="this is a label you can change through props dynamically" />
      <Surveyoption labelText="testing" />
    </div>
  );
}
