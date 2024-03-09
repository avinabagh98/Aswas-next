"use client";
import React, { useEffect } from "react";

import { useTeam } from "@/context/TeamContext";
import {ShowOffCanvas} from "@/components/ShowOffCanvas";

export default function page() {
const { teamNumber } = useTeam();

useEffect(() => {
  ShowOffCanvas(false);
}, [])

  return (
    <>
      <h1>testing {teamNumber}</h1>
    </>
  );
}
