"use client";

import { createContext, useState, useContext } from 'react';

const TeamContext = createContext();

export function TeamProvider({ children }) {
    const [teamNumber, setTeamNumber] = useState("");

    return (
        <TeamContext.Provider value={{ teamNumber, setTeamNumber }}>
            {children}
        </TeamContext.Provider>
    );
};

export function useTeam() {
    return useContext(TeamContext);
}
