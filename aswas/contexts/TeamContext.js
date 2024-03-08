"use client";

import React, { createContext, useState, useEffect, useContext } from 'react';

const TeamContext = createContext();

export const TeamProvider = ({ children }) => {
    const [teamNumber, setTeamNumber] = useState(null);
    const [teamData, setTeamData] = useState(null);
    useEffect(() => {
        if (teamNumber) {
            console.log(`Fetching team data for team number ${teamNumber}`);
            // fetch(`your-api-url/${teamNumber}`)
            //     .then((response) => response.json())
            //     .then((data) => setTeamData(data))
            //     .catch((error) => console.error('Error fetching data:', error));
        }
    }, [teamNumber]);

    return (
        <TeamContext.Provider value={{ teamNumber, setTeamNumber, teamData }}>
            {children}
        </TeamContext.Provider>
    );
};

export const useTeam = () => useContext(TeamContext);
