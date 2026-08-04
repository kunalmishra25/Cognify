import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import API_BASE_URL from '../config';
const MyNotes = () => {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const getNotes = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/summary`, {
                    withCredentials: true
                });
                const data = response.data.data;
                setNotes(data || []);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        }
        getNotes();
    }, [])

    return (
        <div className="h-full min-h-screen w-full bg-transparent flex flex-col pt-10 md:pt-20 pb-20">
            <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 flex-1 flex flex-col">

                {/* Header Section */}
                <div className="mb-8 md:mb-12 text-left">
                    <h1 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-800 to-gray-600 tracking-tight pb-1">
                        My Notes
                    </h1>
                    <p className="text-[14px] sm:text-[16px] text-gray-500 mt-2 font-medium">
                        Access and review all your AI-generated summaries and study guides.
                    </p>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 flex flex-col">
                    {loading ? (
                        <div className="flex justify-center items-center py-20 flex-1">
                            <svg className="animate-spin h-8 w-8 text-[#6B82F6]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        </div>
                    ) : notes.length === 0 ? (
                        <div className="text-center bg-white/60 backdrop-blur-xl p-8 sm:p-14 rounded-[2rem] sm:rounded-[2.5rem] border border-white/80 w-full max-w-lg mx-auto shadow-[0_8px_30px_rgb(0,0,0,0.04)] mt-10">
                            <div className="w-20 h-20 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-full shadow-inner flex items-center justify-center mx-auto mb-6 border border-white">
                                <svg className="w-10 h-10 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                </svg>
                            </div>
                            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 tracking-tight">No Saved Notes</h3>
                            <p className="text-gray-500 mb-8 text-[14px] sm:text-[16px] leading-relaxed px-4">
                                You haven't uploaded any documents yet. Let's upload a PDF to generate your first study guide.
                            </p>
                            <button
                                onClick={() => navigate('/upload')}
                                className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-8 py-3.5 rounded-2xl font-semibold transition-all duration-300 shadow-[0_8px_20px_rgba(99,102,241,0.3)] hover:shadow-[0_8px_25px_rgba(99,102,241,0.45)] hover:-translate-y-1 active:translate-y-0 active:scale-[0.98] text-[15px]"
                            >
                                Upload Document
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {notes.map((note) => (
                                <div
                                    key={note._id}
                                    onClick={() => navigate(`/study-options/${note._id}`, { state: { note } })}
                                    className="group flex flex-col justify-between p-6 rounded-2xl bg-white/60 backdrop-blur-xl border border-white/80 hover:bg-white/80 hover:border-[#6B82F6]/20 shadow-[0_8px_30px_rgb(0,0,0,0.03)] hover:shadow-[0_12px_40px_rgba(107,130,246,0.07)] transition-all duration-300 cursor-pointer"
                                >
                                    <div>
                                        {/* Card Header Info */}
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="w-10 h-10 rounded-xl bg-red-50 text-red-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <span className="text-[11px] font-bold text-[#6B82F6] bg-indigo-50/60 px-2.5 py-1 rounded-full uppercase tracking-wider">
                                                Study Guide
                                            </span>
                                        </div>

                                        {/* File Name */}
                                        <h3 className="text-[15px] sm:text-[16px] font-bold text-gray-800 group-hover:text-[#6B82F6] transition-colors line-clamp-2 leading-snug mb-2">
                                            {note.fileName}
                                        </h3>

                                        {/* Brief Preview of Summary Content */}
                                        <p className="text-[13px] text-gray-500 line-clamp-3 leading-relaxed mb-4">
                                            {note.summary ? note.summary.replace(/[#*`_-]/g, '') : "Click to view your AI study notes."}
                                        </p>
                                    </div>

                                    {/* Card Footer Info */}
                                    <div className="flex items-center justify-between pt-4 border-t border-gray-100/50 text-[12px] text-gray-400 font-medium">
                                        <span className="flex items-center gap-1.5">
                                            <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            Saved Note
                                        </span>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                navigate(`/study-options/${note._id}`, { state: { note } });
                                            }}
                                            className="flex items-center gap-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-[12px] font-semibold px-3.5 py-1.5 rounded-xl shadow-[0_4px_12px_rgba(99,102,241,0.25)] hover:shadow-[0_4px_16px_rgba(99,102,241,0.4)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97] transition-all duration-200"
                                        > Study Now

                                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default MyNotes;
