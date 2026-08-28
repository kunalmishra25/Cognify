import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import API_BASE_URL from "../config";

const FlashcardsPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [flashcards, setFlashcards] = useState(null);
    const [loading, setLoading] = useState(true);

    // Active deck & study state
    const [currentCard, setCurrentCard] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [deckCompleted, setDeckCompleted] = useState(false);

    useEffect(() => {
        const getFlashcards = async () => {
            try {
                const response = await axios.get(
                    `${API_BASE_URL}/flashcards/${id}`,
                    { withCredentials: true }
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

    // Restart full deck
    const handleRestartDeck = () => {
        setCurrentCard(0);
        setIsFlipped(false);
        setDeckCompleted(false);
    };

    // Keyboard Shortcuts for Navigation and Card Flip
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;
            if (deckCompleted || !flashcards || !flashcards.flashcards) return;

            const totalCards = flashcards.flashcards.length;

            if (e.code === 'Space' || e.code === 'Enter') {
                e.preventDefault();
                setIsFlipped(prev => !prev);
            } else if (e.code === 'ArrowRight') {
                if (currentCard < totalCards - 1) {
                    setCurrentCard(prev => prev + 1);
                    setIsFlipped(false);
                } else if (currentCard === totalCards - 1) {
                    setDeckCompleted(true);
                }
            } else if (e.code === 'ArrowLeft') {
                if (currentCard > 0) {
                    setCurrentCard(prev => prev - 1);
                    setIsFlipped(false);
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [flashcards, currentCard, deckCompleted]);

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

    // =====================================
    // DECK COMPLETION SUMMARY VIEW
    // =====================================
    if (deckCompleted) {
        return (
            <div className="h-full min-h-screen w-full bg-transparent flex flex-col pt-8 md:pt-16 pb-20">
                <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 flex-1 flex flex-col items-center">
                    <button
                        onClick={() => navigate(-1)}
                        className="inline-flex items-center gap-2 text-[14px] font-semibold text-gray-500 hover:text-[#6B82F6] transition-colors mb-6 cursor-pointer self-start group"
                    >
                        <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Study Hub
                    </button>

                    <div className="w-full max-w-2xl">
                        {/* Summary Header */}
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200/60 text-amber-700 text-[12px] font-bold uppercase tracking-wider mb-3">
                                <span>🃏</span> Deck Complete
                            </div>
                            <h1 className="text-2xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-800 to-gray-600 tracking-tight pb-1">
                                {flashcards.fileName || "Study Deck"}
                            </h1>
                        </div>

                        {/* Summary Card */}
                        <div className="bg-white/70 backdrop-blur-xl border border-white/80 p-8 sm:p-12 rounded-[2rem] sm:rounded-[2.5rem] w-full shadow-[0_8px_30px_rgb(0,0,0,0.04)] text-center relative overflow-hidden">
                            <div className="w-20 h-20 bg-gradient-to-br from-amber-50 to-indigo-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-white text-4xl shadow-inner">
                                👏
                            </div>
                            
                            <h3 className="text-2xl font-extrabold text-gray-800 mb-2">Great job reviewing!</h3>
                            <p className="text-gray-500 text-sm sm:text-base mb-8">You've gone through all {totalCards} flashcards in this deck.</p>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                                <button
                                    onClick={handleRestartDeck}
                                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-indigo-600 hover:from-amber-600 hover:to-indigo-700 text-white font-semibold text-sm transition-all duration-200 shadow-[0_4px_14px_rgba(245,158,11,0.35)] w-full sm:w-auto justify-center cursor-pointer"
                                >
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                    </svg>
                                    Restart Deck
                                </button>
                                <button
                                    onClick={() => navigate(-1)}
                                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-white/80 border border-gray-200 text-gray-700 font-semibold text-sm hover:bg-white hover:border-gray-300 transition-all duration-200 shadow-sm w-full sm:w-auto justify-center cursor-pointer"
                                >
                                    Back to Study Hub
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // =====================================
    // MAIN FLASHCARD STUDY VIEW
    // =====================================
    return (
        <div className="h-full min-h-screen w-full bg-transparent flex flex-col pt-8 md:pt-16 pb-20">
            <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 flex-1 flex flex-col items-center">

                {/* Back Button */}
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

                {/* Progress Bar & Counter */}
                <div className="w-full max-w-2xl mb-6">
                    <div className="flex justify-between items-center mb-2 px-1 text-xs sm:text-sm font-semibold text-gray-500">
                        <span>Progress</span>
                        <span className="text-amber-600 font-bold">
                            Card {currentCard + 1} of {totalCards}
                        </span>
                    </div>

                    <div className="w-full bg-gray-200/80 rounded-full h-2.5 overflow-hidden border border-white/60 shadow-inner">
                        <div
                            className="bg-gradient-to-r from-amber-500 to-indigo-600 h-full transition-all duration-300 ease-out rounded-full"
                            style={{ width: `${progressPercent}%` }}
                        />
                    </div>
                </div>

                {/* Clean 3D Interactive Flashcard */}
                <div className="w-full max-w-2xl flex flex-col items-center">
                    <div 
                        className="w-full perspective-1000 my-2 cursor-pointer select-none group"
                        onClick={() => setIsFlipped(!isFlipped)}
                    >
                        {/* 3D Flipping Card Container */}
                        <div className={`w-full min-h-[320px] sm:min-h-[360px] transition-transform duration-500 transform-style-3d relative ${isFlipped ? 'rotate-y-180' : ''}`}>

                            {/* FRONT SIDE: QUESTION */}
                            <div className="absolute inset-0 w-full h-full backface-hidden bg-white/70 backdrop-blur-xl border border-white/80 p-6 sm:p-10 rounded-[2rem] sm:rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col justify-between overflow-hidden">
                                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-amber-100/50 to-indigo-100/30 rounded-bl-[100px] -z-10 opacity-70"></div>

                                {/* Question Header */}
                                <div className="flex items-center justify-between">
                                    <span className="text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-lg bg-amber-50 text-amber-600 border border-amber-100">
                                        Question {currentCard + 1}
                                    </span>
                                    <span className="text-[12px] text-gray-400 font-medium group-hover:text-amber-600 transition-colors">
                                        Click or press Space to flip
                                    </span>
                                </div>

                                {/* Question Content */}
                                <div className="my-auto py-6 text-center">
                                    <h2 className="text-xl sm:text-2xl font-extrabold text-gray-800 leading-relaxed tracking-tight">
                                        {cardData.question}
                                    </h2>
                                </div>

                                {/* Reveal Answer Action Button */}
                                <div className="pt-4 border-t border-gray-100/80 flex justify-center">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setIsFlipped(true);
                                        }}
                                        className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-indigo-600 hover:from-amber-600 hover:to-indigo-700 text-white font-semibold text-xs sm:text-sm shadow-[0_4px_16px_rgba(245,158,11,0.3)] transition-all duration-200 cursor-pointer"
                                    >
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                        Reveal Answer
                                    </button>
                                </div>
                            </div>

                            {/* BACK SIDE: ANSWER */}
                            <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-white/85 backdrop-blur-xl border border-amber-200/70 p-6 sm:p-10 rounded-[2rem] sm:rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col justify-between overflow-hidden">
                                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-indigo-100/60 to-purple-100/30 rounded-bl-[100px] -z-10 opacity-70"></div>

                                {/* Answer Header */}
                                <div className="flex items-center justify-between">
                                    <span className="text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-100">
                                        Answer
                                    </span>
                                    <span className="text-[12px] text-gray-400 font-medium">
                                        Click card to flip back
                                    </span>
                                </div>

                                {/* Answer Text */}
                                <div className="my-auto py-6 text-center">
                                    <p className="text-base sm:text-xl font-medium leading-relaxed text-gray-800">
                                        {cardData.answer}
                                    </p>
                                </div>

                                {/* Hide Answer Action Button */}
                                <div className="pt-4 border-t border-gray-100/80 flex justify-center">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setIsFlipped(false);
                                        }}
                                        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-amber-100/80 text-amber-800 font-bold text-xs sm:text-sm hover:bg-amber-200/80 transition-all duration-200 cursor-pointer"
                                    >
                                        Hide Answer
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Bottom Controls Row: Previous & Next */}
                    <div className="flex items-center justify-between w-full mt-6 gap-4">
                        <button
                            disabled={currentCard === 0}
                            onClick={() => {
                                setCurrentCard(currentCard - 1);
                                setIsFlipped(false);
                            }}
                            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/80 border border-gray-200 text-gray-700 font-semibold text-sm hover:bg-white hover:border-gray-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 shadow-sm cursor-pointer"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                            </svg>
                            Previous
                        </button>

                        <button
                            onClick={() => {
                                if (currentCard < totalCards - 1) {
                                    setCurrentCard(currentCard + 1);
                                    setIsFlipped(false);
                                } else {
                                    setDeckCompleted(true);
                                }
                            }}
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-indigo-600 hover:from-amber-600 hover:to-indigo-700 text-white font-semibold text-sm transition-all duration-200 shadow-[0_4px_14px_rgba(245,158,11,0.35)] cursor-pointer"
                        >
                            {currentCard === totalCards - 1 ? "Finish Deck" : "Next"}
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default FlashcardsPage;