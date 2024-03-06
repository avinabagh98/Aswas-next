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

    const handleStartDateChange = (e) => {
        setStartDate(e.target.value);
    };

    const handleEndDateChange = (e) => {
        setEndDate(e.target.value);
    };

    const handleApply = () => {
        console.log('Start Date:', startDate);
        console.log('End Date:', endDate);
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

            <div className={styles.datePickerContainer}>
                <label className={styles.label} htmlFor="start">Start Date:</label>
                <input className={styles.inputField} type="date" id="start" value={startDate} onChange={handleStartDateChange} />

                <label className={styles.label} htmlFor="end">End Date:</label>
                <input className={styles.inputField} type="date" id="end" value={endDate} onChange={handleEndDateChange} />

                <button className={styles.button} onClick={handleApply}>Apply</button>
            </div>

        </>
    );
}
