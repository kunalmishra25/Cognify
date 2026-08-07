import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import API_BASE_URL from "../config";

const FlashcardsPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [flashcards, setFlashcards] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentCard, setCurrentCard] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);

    useEffect(() => {
        const getFlashcards = async () => {
            try {
                const response = await axios.get(
                    `${API_BASE_URL}/flashcards/${id}`,
                    {
                        withCredentials: true
                    }
                );
                setFlashcards(response.data.data);
            } catch (error) {
                console.error("Error fetching flashcards:", error);
            } finally {
                setLoading(false);
            }
        };
        getFlashcards();
    }, [id]);

    // Keyboard Shortcuts for Navigation and Answer Toggle
    useEffect(() => {
        const handleKeyDown = (e) => {
            // Avoid handling keys if user is typing in an input
            if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;

            if (e.code === 'Space' || e.code === 'Enter') {
                e.preventDefault();
                setShowAnswer(prev => !prev);
            } else if (e.code === 'ArrowRight') {
                if (flashcards && currentCard < flashcards.flashcards.length - 1) {
                    setCurrentCard(prev => prev + 1);
                    setShowAnswer(false);
                }
            } else if (e.code === 'ArrowLeft') {
                if (currentCard > 0) {
                    setCurrentCard(prev => prev - 1);
                    setShowAnswer(false);
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [flashcards, currentCard]);

    if (loading) {
        return (
            <div className="h-full min-h-screen w-full bg-transparent flex flex-col justify-center items-center py-20">
                <div className="flex flex-col items-center gap-4 bg-white/60 backdrop-blur-xl p-8 rounded-3xl border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                    <svg className="animate-spin h-10 w-10 text-amber-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <p className="text-gray-600 font-semibold text-base">Loading flashcards...</p>
                </div>
            </div>
        );
    }

    if (!flashcards || !flashcards.flashcards || flashcards.flashcards.length === 0) {
        return (
            <div className="h-full min-h-screen w-full bg-transparent flex flex-col pt-10 md:pt-20">
                <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 flex-1 flex flex-col">
                    <button
                        onClick={() => navigate('/mynotes')}
                        className="inline-flex items-center gap-2 text-[14px] font-semibold text-gray-500 hover:text-[#6B82F6] transition-colors mb-6 cursor-pointer self-start group"
                    >
                        <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to My Notes
                    </button>

                    <div className="flex-1 flex flex-col items-center justify-center w-full pb-20">
                        <div className="text-center bg-white/60 backdrop-blur-xl p-8 sm:p-14 rounded-[2rem] sm:rounded-[2.5rem] border border-white/80 w-full max-w-lg shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-full shadow-inner flex items-center justify-center mx-auto mb-6 sm:mb-8 border border-white">
                                <svg className="w-10 h-10 sm:w-12 sm:h-12 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                            </div>
                            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4 tracking-tight">No Flashcards Found</h3>
                            <p className="text-gray-500 mb-8 sm:mb-10 text-[14px] sm:text-[16px] leading-relaxed px-2 sm:px-4">Upload a document first to let our AI automatically generate a study deck for you.</p>
                            <button onClick={() => navigate('/upload')} className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-8 sm:px-10 py-3.5 sm:py-4 rounded-2xl font-semibold transition-all duration-300 shadow-[0_8px_20px_rgba(99,102,241,0.3)] hover:shadow-[0_8px_25px_rgba(99,102,241,0.45)] hover:-translate-y-1 active:translate-y-0 active:scale-[0.98] text-[15px] sm:text-[16px]">Generate Flashcards</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const totalCards = flashcards.flashcards.length;
    const progressPercent = Math.round(((currentCard + 1) / totalCards) * 100);
    const cardData = flashcards.flashcards[currentCard];

    return (
        <div className="h-full min-h-screen w-full bg-transparent flex flex-col pt-8 md:pt-16 pb-20">
            <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 flex-1 flex flex-col items-center">

                {/* Navigation Back Link */}
                <button
                    onClick={() => navigate(-1)}
                    className="inline-flex items-center gap-2 text-[14px] font-semibold text-gray-500 hover:text-[#6B82F6] transition-colors mb-6 cursor-pointer self-start group"
                >
                    <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Study Hub
                </button>

                {/* Header Section */}
                <div className="text-center w-full max-w-2xl mb-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200/60 text-amber-700 text-[12px] font-bold uppercase tracking-wider mb-3">
                        <span>🃏</span> Flashcard Study Deck
                    </div>
                    <h1 className="text-2xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-800 to-gray-600 tracking-tight line-clamp-1 pb-1">
                        {flashcards.fileName || "Study Deck"}
                    </h1>
                </div>

                {/* Progress Bar & Counter Tag */}
                <div className="w-full max-w-2xl mb-8">
                    <div className="flex justify-between items-center mb-2 px-1 text-xs sm:text-sm font-semibold text-gray-500">
                        <span>Progress</span>
                        <span className="text-amber-600 font-bold">Card {currentCard + 1} of {totalCards}</span>
                    </div>
                    <div className="w-full bg-gray-200/80 rounded-full h-2.5 overflow-hidden border border-white/60 shadow-inner">
                        <div
                            className="bg-gradient-to-r from-amber-500 to-indigo-600 h-full transition-all duration-300 ease-out rounded-full"
                            style={{ width: `${progressPercent}%` }}
                        />
                    </div>
                </div>

                {/* Main Flashcard Container */}
                <div className="w-full max-w-2xl flex flex-col items-center">
                    <div className="bg-white/70 backdrop-blur-xl border border-white/80 p-6 sm:p-10 rounded-[2rem] sm:rounded-[2.5rem] w-full shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden flex flex-col justify-between min-h-[300px] sm:min-h-[340px] transition-all duration-300">
                        
                        {/* Decorative background blur shape */}
                        <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl from-amber-100/50 to-indigo-100/30 rounded-bl-[100px] -z-10 opacity-70"></div>

                        {/* Top Card Badge */}
                        <div className="flex items-center justify-between mb-6">
                            <span className="text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-lg bg-amber-50 text-amber-600 border border-amber-100">
                                Question {currentCard + 1}
                            </span>
                            <span className="text-xs text-gray-400 font-medium">
                                {showAnswer ? "Answer Revealed" : "Click below to reveal answer"}
                            </span>
                        </div>

                        {/* Question Section */}
                        <div className="my-auto py-2">
                            <h2 className="text-lg sm:text-2xl font-bold text-gray-800 leading-relaxed text-center tracking-tight">
                                {cardData.question}
                            </h2>

                            {/* Answer Section with Smooth Transition */}
                            {showAnswer && (
                                <div className="mt-6 p-5 sm:p-6 rounded-2xl bg-amber-50/70 border border-amber-200/60 text-gray-800 transition-all duration-300">
                                    <div className="text-[11px] font-extrabold uppercase tracking-wider text-amber-700 mb-2">
                                        Answer
                                    </div>
                                    <p className="text-base sm:text-lg font-medium leading-relaxed text-gray-800">
                                        {cardData.answer}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Show / Hide Answer Action Button */}
                        <div className="mt-8 pt-4 border-t border-gray-100 flex justify-center">
                            <button
                                onClick={() => setShowAnswer(!showAnswer)}
                                className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 cursor-pointer ${
                                    showAnswer 
                                        ? "bg-amber-100 text-amber-800 hover:bg-amber-200/80 shadow-sm" 
                                        : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-[0_4px_16px_rgba(99,102,241,0.3)] hover:shadow-[0_6px_20px_rgba(99,102,241,0.45)] hover:-translate-y-0.5"
                                }`}
                            >
                                {showAnswer ? (
                                    <>
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858-5.908a10.05 10.05 0 013.682-.763c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21M3 3l18 18" />
                                        </svg>
                                        Hide Answer
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                        Show Answer
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Bottom Controls Row: Previous & Next */}
                    <div className="flex items-center justify-between w-full mt-6 gap-4">
                        <button
                            disabled={currentCard === 0}
                            onClick={() => {
                                setCurrentCard(currentCard - 1);
                                setShowAnswer(false);
                            }}
                            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/80 border border-gray-200 text-gray-700 font-semibold text-sm hover:bg-white hover:border-gray-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 shadow-sm cursor-pointer"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                            </svg>
                            Previous
                        </button>

                        {/* Reset / Restart Deck if on last card */}
                        {currentCard === totalCards - 1 ? (
                            <button
                                onClick={() => {
                                    setCurrentCard(0);
                                    setShowAnswer(false);
                                }}
                                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-semibold text-sm transition-all duration-200 shadow-[0_4px_14px_rgba(245,158,11,0.35)] cursor-pointer"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                                Restart Deck
                            </button>
                        ) : (
                            <button
                                disabled={currentCard === totalCards - 1}
                                onClick={() => {
                                    setCurrentCard(currentCard + 1);
                                    setShowAnswer(false);
                                }}
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-sm disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 shadow-[0_4px_14px_rgba(99,102,241,0.3)] hover:shadow-[0_6px_18px_rgba(99,102,241,0.45)] cursor-pointer"
                            >
                                Next
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FlashcardsPage;