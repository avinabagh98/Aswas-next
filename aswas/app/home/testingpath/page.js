"use client";
import React from "react";

import { useTeam } from "@/context/TeamContext";

export default function page() {
  const { teamNumber } = useTeam();
  return (
    <>
      <h1>testing {teamNumber}</h1>
    </>
  );
}
