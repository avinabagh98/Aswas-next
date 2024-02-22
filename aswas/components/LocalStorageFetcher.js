"use client";
import { useEffect, useState } from 'react';

const LocalStorageFetcher = ({ keyName }) => {
    const [value, setValue] = useState(null);

    useEffect(() => {
        // Retrieve the data object from local storage
        const dataString = localStorage.getItem('data');

        // Parse the data string into an object
        const dataObject = JSON.parse(dataString);

        // Check if dataObject is not null and the key exists
        if (dataObject && dataObject.hasOwnProperty(keyName)) {
            setValue(dataObject[keyName]);
        } else {
            console.log(`Key '${keyName}' not found in local storage data.`);
        }
    }, [keyName]);

    return value
};

export default LocalStorageFetcher;
