import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";


const ViewSummary = () => {
    const { id } = useParams();
    const [summary, setSummary] = useState(null);

    useEffect(() => {
        const getsummary = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/summary/${id}`, {
                    withCredentials: true
                });
                setSummary(response.data.data);

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        getsummary();

    }, [id])

    return (
        <div>
            <h1>{summary?.fileName}</h1>
            <p>{summary?.summary}</p>
        </div>
        // ?. (optional chaining). It prevents an error before the API response arrives
    )
};


export default ViewSummary;
