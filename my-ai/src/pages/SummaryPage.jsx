import React from 'react'
import { useLocation } from 'react-router-dom'

const SummaryPage = () => {
    const location = useLocation();
    const summary = location.state?.summary;
    return (
        <div className="p-10">
            <h1 className="text-2xl font-bold mb-6">Generated Notes</h1>
            {!summary ? (
                <p>No data found. Please upload a file first.</p>
            ) : (
                <div className="bg-gray-100 p-6 rounded-lg">
                    <p>{summary}</p>
                </div>
            )}
        </div>
    );
};

export default SummaryPage