import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import API_BASE_URL from '../config';

const StudyOptions = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const [note, setNote] = useState(location.state?.note || null);
    const [loading, setLoading] = useState(!location.state?.note && !!id);
    const [generatingFlashcards, setGeneratingFlashcards] = useState(false);

    useEffect(() => {
        if (!note && id) {
            const fetchNote = async () => {
                try {
                    const response = await axios.get(`${API_BASE_URL}/summary/${id}`, {
                        withCredentials: true
                    });
                    setNote(response.data.data);
                } catch (error) {
                    console.error("Error fetching study note:", error);
                } finally {
                    setLoading(false);
                }
            };
            fetchNote();
        }
    }, [id, note]);

    const handleViewSummary = () => {
        navigate(`/summary/${id}`);
    };


    // handleFlashcards() first checks whether flashcards already exist for the selected summary. 
    // If they do, it opens them; if they don't, 
    // it generates, saves, and then opens them automatically.
    const handleFlashcards = async () => {
        if (generatingFlashcards) return;
        setGeneratingFlashcards(true);
        try {
            const response = await axios.get(
                `${API_BASE_URL}/flashcards/summary/${id}`,
                {
                    withCredentials: true,
                }
            );

            navigate(`/flashcards/${response.data.data._id}`);

        } catch (error) {

            if (error.response?.status === 404) {
                try {
                    const response = await axios.post(
                        `${API_BASE_URL}/flashcards/generate`,
                        {
                            summaryId: id,
                        },
                        {
                            withCredentials: true,
                        }
                    );

                    navigate(`/flashcards/${response.data.data._id}`);
                } catch (genError) {
                    console.error("Error generating flashcards:", genError);
                    setGeneratingFlashcards(false);
                }
            } else {
                console.error("Error fetching flashcards:", error);
                setGeneratingFlashcards(false);
            }
        }
    };

    const handleQuizClick = () => {

    };

    return (
        <div className="h-full min-h-screen w-full bg-transparent flex flex-col pt-10 md:pt-20 pb-20">
            <div className="max-w-5xl mx-auto w-full px-4 sm:px-6 flex-1 flex flex-col">

                {/* Back Button */}
                <button
                    onClick={() => navigate('/mynotes')}
                    className="inline-flex items-center gap-2 text-[14px] font-semibold text-gray-500 hover:text-[#6B82F6] transition-colors mb-6 cursor-pointer self-start group"
                >
                    <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to My Notes
                </button>

                {loading ? (
                    <div className="flex justify-center items-center py-20 flex-1">
                        <svg className="animate-spin h-8 w-8 text-[#6B82F6]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    </div>
                ) : (
                    <div className="flex-1 flex flex-col">
                        {/* Header Section */}
                        <div className="mb-10 text-left">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50/80 border border-indigo-100 text-[#6B82F6] text-[12px] font-bold uppercase tracking-wider mb-3">
                                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                                </svg>
                                Document Study Hub
                            </div>
                            <h1 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-800 to-gray-600 tracking-tight pb-1">
                                {note?.fileName || "Study Options"}
                            </h1>
                            <p className="text-[15px] sm:text-[17px] text-gray-500 mt-2 font-medium">
                                Choose how you want to study this document.
                            </p>
                        </div>

                        {/* Cards Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mt-2">

                            {/* Card 1: View Summary */}
                            <div
                                onClick={handleViewSummary}
                                className="group relative flex flex-col justify-between p-7 rounded-[2rem] bg-white/60 backdrop-blur-xl border border-white/80 hover:bg-white/85 hover:border-[#6B82F6]/30 shadow-[0_8px_30px_rgb(0,0,0,0.03)] hover:shadow-[0_16px_40px_rgba(107,130,246,0.12)] transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
                            >
                                <div>
                                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 text-blue-600 flex items-center justify-center text-2xl mb-6 shadow-sm border border-blue-100/60 group-hover:scale-110 transition-transform duration-300">
                                        📄
                                    </div>
                                    <h2 className="text-xl font-bold text-gray-800 group-hover:text-[#6B82F6] transition-colors mb-3">
                                        View Summary
                                    </h2>
                                    <p className="text-[14px] text-gray-500 leading-relaxed font-normal">
                                        Read your concise AI-generated summary, key takeaways, and structured study notes.
                                    </p>
                                </div>
                                <div className="mt-8 pt-4 border-t border-gray-100 flex items-center justify-between text-[#6B82F6] font-semibold text-[14px]">
                                    <span>Read Notes</span>
                                    <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </div>
                            </div>

                            {/* Card 2: Flashcards */}
                            <div
                                onClick={handleFlashcards}
                                className="group relative flex flex-col justify-between p-7 rounded-[2rem] bg-white/60 backdrop-blur-xl border border-white/80 hover:bg-white/85 hover:border-amber-400/30 shadow-[0_8px_30px_rgb(0,0,0,0.03)] hover:shadow-[0_16px_40px_rgba(245,158,11,0.12)] transition-all duration-300 transform hover:-translate-y-2 cursor-pointer overflow-hidden"
                            >
                                {generatingFlashcards && (
                                    <div className="absolute inset-0 bg-white/95 backdrop-blur-md z-10 flex flex-col items-center justify-center p-6 text-center transition-all duration-300 animate-fadeIn">
                                        <div className="w-12 h-12 mb-3.5 text-amber-500 flex items-center justify-center bg-amber-50 rounded-2xl border border-amber-100 shadow-inner">
                                            <svg className="animate-spin w-7 h-7 text-amber-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                        </div>
                                        <h4 className="text-base font-bold text-gray-800 tracking-tight">Generating Flashcards...</h4>
                                        <p className="text-[12px] text-gray-500 mt-1 max-w-[200px] leading-relaxed">Extracting key concepts & building your study deck</p>
                                    </div>
                                )}
                                <div>
                                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 text-amber-600 flex items-center justify-center text-2xl mb-6 shadow-sm border border-amber-100/60 group-hover:scale-110 transition-transform duration-300">
                                        🃏
                                    </div>
                                    <h2 className="text-xl font-bold text-gray-800 group-hover:text-amber-600 transition-colors mb-3">
                                        Flashcards
                                    </h2>
                                    <p className="text-[14px] text-gray-500 leading-relaxed font-normal">
                                        Master concepts and boost memory recall with interactive AI-generated flashcard decks.
                                    </p>
                                </div>
                                <div className="mt-8 pt-4 border-t border-gray-100 flex items-center justify-between text-amber-600 font-semibold text-[14px]">
                                    <span>Practice Cards</span>
                                    <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </div>
                            </div>

                            {/* Card 3: Quiz (Visual Placeholder Only) */}
                            <div
                                onClick={handleQuizClick}
                                className="group relative flex flex-col justify-between p-7 rounded-[2rem] bg-white/60 backdrop-blur-xl border border-white/80 hover:bg-white/85 hover:border-purple-400/30 shadow-[0_8px_30px_rgb(0,0,0,0.03)] hover:shadow-[0_16px_40px_rgba(168,85,247,0.12)] transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
                            >
                                <div>
                                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-50 to-fuchsia-50 text-purple-600 flex items-center justify-center text-2xl mb-6 shadow-sm border border-purple-100/60 group-hover:scale-110 transition-transform duration-300">
                                        ❓
                                    </div>
                                    <h2 className="text-xl font-bold text-gray-800 group-hover:text-purple-600 transition-colors mb-3">
                                        Quiz
                                    </h2>
                                    <p className="text-[14px] text-gray-500 leading-relaxed font-normal">
                                        Test your knowledge with multiple-choice quizzes generated from your document content.
                                    </p>
                                </div>
                                <div className="mt-8 pt-4 border-t border-gray-100 flex items-center justify-between text-purple-600 font-semibold text-[14px]">
                                    <span>Take Quiz</span>
                                    <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </div>
                            </div>

                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StudyOptions;
