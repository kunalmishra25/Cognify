import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import API_BASE_URL from '../config';

const ViewSummary = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [summary, setSummary] = useState(null);
    const [loading, setLoading] = useState(true);

    const handledownload = () => {
        if (!summary) return;

        const summaryText = typeof summary === "string" ? summary : summary?.summary || "";
        if (!summaryText) return;

        const blob = new Blob([summaryText], {
            type: "text/plain;charset=utf-8",
        });

        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = summary?.fileName ? `${summary.fileName.replace(/\.pdf$/i, "")}-Summary.txt` : "Cognify-Summary.txt";

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        setTimeout(() => {
            URL.revokeObjectURL(url);
        }, 1000);
    };

    useEffect(() => {
        const getsummary = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/summary/${id}`, {
                    withCredentials: true
                });
                setSummary(response.data.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        }
        getsummary();
    }, [id])

    return (
        <div className="h-full min-h-screen w-full bg-transparent flex flex-col pt-10 md:pt-20 pb-20">
            <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 flex-1 flex flex-col">

                {/* Navigation Breadcrumb / Back Link */}
                <button
                    onClick={() => navigate('/mynotes')}
                    className="inline-flex items-center gap-2 text-[14px] font-semibold text-gray-500 hover:text-[#6B82F6] transition-colors mb-6 cursor-pointer self-start"
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Notes
                </button>

                {loading ? (
                    <div className="flex justify-center items-center py-20 flex-1">
                        <svg className="animate-spin h-8 w-8 text-[#6B82F6]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    </div>
                ) : !summary ? (
                    <div className="text-center bg-white/60 backdrop-blur-xl p-8 sm:p-14 rounded-[2rem] border border-white/80 w-full max-w-lg mx-auto shadow-[0_8px_30px_rgb(0,0,0,0.04)] mt-10">
                        <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 tracking-tight">Summary Not Found</h3>
                        <p className="text-gray-500 mb-8 text-[14px] sm:text-[16px] leading-relaxed">
                            We couldn't find the study notes you were looking for.
                        </p>
                        <button
                            onClick={() => navigate('/mynotes')}
                            className="bg-[#6B82F6] hover:bg-[#6B82F6]/90 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 shadow-[0_8px_20px_rgba(99,102,241,0.2)]"
                        >
                            View My Notes
                        </button>
                    </div>
                ) : (
                    <div className="flex-1 flex flex-col w-full">

                        {/* Document Header Panel */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                            <div className="flex items-start gap-4 overflow-hidden">
                                <div className="w-12 h-12 rounded-xl bg-red-50 text-red-500 flex items-center justify-center shrink-0 border border-red-100/50 shadow-sm">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="flex flex-col min-w-0">
                                    <h1 className="text-xl sm:text-2xl font-extrabold text-gray-800 leading-snug break-words">
                                        {summary.fileName}
                                    </h1>
                                    <span className="text-[12px] text-gray-400 font-semibold uppercase tracking-wider mt-1">
                                        AI Study Guide
                                    </span>
                                </div>
                            </div>

                            {/* Action Toolbar Buttons */}
                            <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
                                <button
                                    onClick={handledownload}
                                    className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-[13px] font-bold px-4 py-2.5 rounded-xl shadow-lg shadow-indigo-100 transition-all duration-300 cursor-pointer group relative"
                                    title="Download notes"
                                >
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                    </svg>
                                    <span>Download</span>
                                </button>
                            </div>
                        </div>

                        {/* Summary Notes Card */}
                        <div className="bg-white/70 backdrop-blur-xl border border-white/80 p-6 sm:p-10 md:p-12 rounded-[2rem] sm:rounded-[2.5rem] w-full shadow-[0_8px_30px_rgb(0,0,0,0.04)] text-left relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-[100px] -z-10 opacity-50"></div>

                            {/* Structured text container */}
                            <div className="markdown-content">
                                <ReactMarkdown>
                                    {summary.summary}
                                </ReactMarkdown>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
};

export default ViewSummary;
