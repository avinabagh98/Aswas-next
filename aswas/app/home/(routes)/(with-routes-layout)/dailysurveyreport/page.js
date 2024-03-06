"use client";

import { useState } from 'react';
import styles from './dailyreport.module.css';
import DynamicDropdown from '@/components/DynamicDropdown/DynamicDropdown';

export default function page() {

    const scheduleListOptions = [
        { value: 'HTH 2024-03-04 2024-03-08 (23)', label: 'HTH 2024-03-04 2024-03-08 (23)' },
        { value: 'ABC 2024-03-10 2024-03-14 (15)', label: 'ABC 2024-03-10 2024-03-14 (15)' },
        { value: 'XYZ 2024-03-16 2024-03-20 (30)', label: 'XYZ 2024-03-16 2024-03-20 (30)' },
        { value: 'PQR 2024-03-22 2024-03-26 (18)', label: 'PQR 2024-03-22 2024-03-26 (18)' },
        // Add more options as needed
    ];



    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [data, setData] = useState([]);

    const handleStartDateChange = (e) => {
        setStartDate(e.target.value);
    };

    const handleEndDateChange = (e) => {
        setEndDate(e.target.value);
    };

    const handleApply = () => {
        console.log('Start Date:', startDate);
        console.log('End Date:', endDate);

        // Fetch data and filter after data is fetched
        fetchData();
    };

    const fetchData = () => {
        console.log('Fetching data from', startDate, 'to', endDate);
        // Here you can fetch data from an API based on the selected date range
        // For demonstration purposes, let's simulate fetching data asynchronously
        // Replace this with your actual data fetching logic
        setTimeout(() => {
            const dummyData = [
                { date: '2024-03-04', value: 10 },
                { date: '2024-03-05', value: 20 },
                { date: '2024-03-06', value: 15 },
                { date: '2024-03-07', value: 25 },
                { date: '2024-03-08', value: 30 },
            ];

            // Filter the fetched data based on the selected date range
            const filteredData = dummyData.filter(item => {
                const itemDate = new Date(item.date);
                return itemDate >= new Date(startDate) && itemDate <= new Date(endDate);
            });

            // Set the filtered data to state
            setData(filteredData);
        }, 1000); // Simulate a delay of 1 second
    };


    return (
        <>
            <div>
                <div className={styles.dailySurveyReportContainer}>
                    <DynamicDropdown id="scheduleList" label="Schedule List" options={scheduleListOptions} />

                    <div className={styles.dailySurveyReport}>

                    </div>
                </div>
            </div>

            <div className={styles.section}>
                <div className={styles.datePickerContainer}>
                    <label className={styles.label} htmlFor="start">Start Date:</label>
                    <input className={styles.inputField} type="date" id="start" value={startDate} onChange={handleStartDateChange} />

                    <label className={styles.label} htmlFor="end">End Date:</label>
                    <input className={styles.inputField} type="date" id="end" value={endDate} onChange={handleEndDateChange} />

                    <button className={styles.button} onClick={handleApply}>Apply</button>
                </div>

                <div className={styles.tableContainer}>
                    <h2>Data for Selected Range:</h2>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.date}</td>
                                    <td>{item.value}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </>
    );
}
