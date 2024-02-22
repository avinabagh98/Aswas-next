import React from 'react';

const DynamicTable = ({ dataArray }) => {
    if (!dataArray || dataArray.length === 0) {
        return <p>No data available</p>;
    }

    // Get the keys from the first object to use as column headers
    const columns = Object.keys(dataArray[0]);

    return (
        <table>
            <thead>
                <tr>
                    {columns.map(columnName => (
                        <th key={columnName}>{columnName}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {dataArray.map((dataRow, index) => (
                    <tr key={index}>
                        {columns.map(columnName => (
                            <td key={columnName}>{dataRow[columnName]}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default DynamicTable;
