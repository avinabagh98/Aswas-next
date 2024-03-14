
import React, { useEffect, useState } from 'react';

const LocalStorageHandler = ({ method, keyName, keyValue }) => {
    const [data, setData] = useState("");
    const [value, setValue] = useState(null);

    useEffect(() => {
        try {
            if (method === 'getItem') {
                const dataString = localStorage.getItem(keyName);
                const dataObject = JSON.parse(dataString) || {};
                setData(dataObject);

                if (dataObject && dataObject.hasOwnProperty(keyName)) {
                    setValue(dataObject[keyName]);
                } else {
                    console.log(`Key '${keyName}' not found in local storage data.`);
                }
            } else if (method === 'setItem') {
                if (keyName && keyValue) {
                    const newData = { ...data, [keyName]: keyValue };
                    setData(newData);
                    localStorage.setItem(keyName, JSON.stringify(keyValue));
                } else {
                    console.log('Both keyName and keyValue are required for setItem method.');
                }
            }
        } catch (error) {
            console.log(error);
        }

    }, [method, keyName, keyValue]);

    return { value };
};

export default LocalStorageHandler;
