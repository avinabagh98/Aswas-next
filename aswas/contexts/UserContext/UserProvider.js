"use client";
import LanguageContext from "@/contexts/LanguageContext";
import { useState } from "react";
import UserContext from "./UserContext";

export default function UserProvider({ children }) {
    const [token, setToken] = useState("");
    const [userName, setUserName] = useState("");
    const [userId, setUserId] = useState("");
    const [teamId, setTeamId] = useState("");
    const [wardId, setWardId] = useState("");
    const [wardname, setWardName] = useState("");
    const [municipalityId, setMunicipalityId] = useState("");
    const [municipalityName, setMunicipalityName] = useState("");

    return (
        <UserContext.Provider value={{ token, setToken, userName, setUserName, userId, setUserId, municipalityId, setMunicipalityId, municipalityName, setMunicipalityName }}>
            {children}
        </UserContext.Provider>
    );
}
