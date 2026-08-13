import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import API_BASE_URL from "../config";

const Quiz = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [quiz, setQuiz] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [score, setScore] = useState(0);
    const [quizCompleted, setQuizCompleted] = useState(false);

    useEffect(() => {
        const getQuiz = async () => {
            try {
                const response = await axios.get(
                    `${API_BASE_URL}/quiz/${id}`,
                    { withCredentials: true }
                );
                setQuiz(response.data.data);
            } catch (error) {
                console.error("Error fetching quiz:", error);
            } finally {
                setLoading(false);
            }
        };
        getQuiz();
    }, [id]);

    if (loading) {
        return (
            <div className="h-full min-h-screen w-full bg-transparent flex flex-col justify-center items-center py-20">
                <div className="flex flex-col items-center gap-4 bg-white/60 backdrop-blur-xl p-8 rounded-3xl border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                    <svg className="animate-spin h-10 w-10 text-purple-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <p className="text-gray-600 font-semibold text-base">Loading quiz...</p>
                </div>
            </div>
        );
    }

    if (!quiz) {
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
                    <div className="flex-1 flex items-center justify-center pb-20">
                        <div className="text-center bg-white/60 backdrop-blur-xl p-8 sm:p-14 rounded-[2rem] border border-white/80 w-full max-w-lg shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                            <div className="w-20 h-20 bg-gradient-to-br from-purple-50 to-fuchsia-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-white text-4xl">❓</div>
                            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 tracking-tight">Quiz Not Found</h3>
                            <p className="text-gray-500 mb-8 text-[14px] sm:text-[16px] leading-relaxed">We couldn't load this quiz. Please go back and try again.</p>
                            <button onClick={() => navigate('/mynotes')} className="bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white px-8 py-3.5 rounded-2xl font-semibold transition-all duration-300 shadow-[0_8px_20px_rgba(168,85,247,0.3)]">Back to My Notes</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (quizCompleted) {
        const percentage = Math.round((score / quiz.quiz.length) * 100);

        let message, messageBg, scoreColor;
        if (percentage >= 80) {
            message = "Excellent work! 🎉";
            messageBg = "bg-green-50 text-green-700 border-green-200";
            scoreColor = "text-green-600";
        } else if (percentage >= 60) {
            message = "Good job! 👍";
            messageBg = "bg-blue-50 text-blue-700 border-blue-200";
            scoreColor = "text-blue-600";
        } else if (percentage >= 40) {
            message = "Keep practicing! 💪";
            messageBg = "bg-amber-50 text-amber-700 border-amber-200";
            scoreColor = "text-amber-600";
        } else {
            message = "Don't give up. Keep learning! 📚";
            messageBg = "bg-red-50 text-red-700 border-red-200";
            scoreColor = "text-purple-600";
        }

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
                        {/* Header */}
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-200/60 text-purple-700 text-[12px] font-bold uppercase tracking-wider mb-3">
                                <span>❓</span> Quiz Complete
                            </div>
                            <h1 className="text-2xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-800 to-gray-600 tracking-tight pb-1">
                                {quiz.fileName || "Quiz"}
                            </h1>
                        </div>

                        {/* Result Card */}
                        <div className="bg-white/70 backdrop-blur-xl border border-white/80 p-8 sm:p-12 rounded-[2rem] sm:rounded-[2.5rem] w-full shadow-[0_8px_30px_rgb(0,0,0,0.04)] text-center relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl from-purple-100/50 to-indigo-100/30 rounded-bl-[100px] -z-10 opacity-70"></div>

                            <p className="text-[13px] font-bold uppercase tracking-widest text-gray-400 mb-3">Your Score</p>
                            <p className={`text-6xl sm:text-7xl font-extrabold ${scoreColor} mb-2`}>
                                {score}<span className="text-3xl sm:text-4xl text-gray-400 font-semibold">/{quiz.quiz.length}</span>
                            </p>
                            <p className="text-2xl font-bold text-gray-700 mb-6">{percentage}%</p>

                            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-semibold ${messageBg} mb-10`}>
                                {message}
                            </div>

                            {/* Progress Bar */}
                            <div className="w-full bg-gray-200/80 rounded-full h-2.5 overflow-hidden border border-white/60 shadow-inner mb-10">
                                <div
                                    className="bg-gradient-to-r from-purple-500 to-indigo-600 h-full rounded-full transition-all duration-500"
                                    style={{ width: `${percentage}%` }}
                                />
                            </div>

                            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                                <button
                                    onClick={() => {
                                        setCurrentQuestion(0);
                                        setSelectedAnswer(null);
                                        setScore(0);
                                        setQuizCompleted(false);
                                    }}
                                    className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white font-semibold text-sm transition-all duration-200 shadow-[0_4px_14px_rgba(168,85,247,0.35)] w-full sm:w-auto justify-center"
                                >
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                    </svg>
                                    Try Again
                                </button>
                                <button
                                    onClick={() => navigate(-1)}
                                    className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/80 border border-gray-200 text-gray-700 font-semibold text-sm hover:bg-white hover:border-gray-300 transition-all duration-200 shadow-sm w-full sm:w-auto justify-center"
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

    const currentQuizQuestion = quiz.quiz[currentQuestion];
    const totalQuestions = quiz.quiz.length;
    const progressPercent = Math.round(((currentQuestion + 1) / totalQuestions) * 100);

    const handleNext = () => {
        const isCorrect = selectedAnswer === currentQuizQuestion.correctAnswer;
        const updatedScore = isCorrect ? score + 1 : score;

        if (currentQuestion < totalQuestions - 1) {
            if (isCorrect) setScore(prev => prev + 1);
            setCurrentQuestion(prev => prev + 1);
            setSelectedAnswer(null);
        } else {
            setScore(updatedScore);
            setQuizCompleted(true);
        }
    };

    const optionLabels = ["A", "B", "C", "D"];

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

                {/* Header */}
                <div className="text-center w-full max-w-2xl mb-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-200/60 text-purple-700 text-[12px] font-bold uppercase tracking-wider mb-3">
                        <span>❓</span> Quiz
                    </div>
                    <h1 className="text-2xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-800 to-gray-600 tracking-tight line-clamp-1 pb-1">
                        {quiz.fileName || "Quiz"}
                    </h1>
                </div>

                {/* Progress Bar & Counter */}
                <div className="w-full max-w-2xl mb-8">
                    <div className="flex justify-between items-center mb-2 px-1 text-xs sm:text-sm font-semibold text-gray-500">
                        <span>Progress</span>
                        <span className="text-purple-600 font-bold">Question {currentQuestion + 1} of {totalQuestions}</span>
                    </div>
                    <div className="w-full bg-gray-200/80 rounded-full h-2.5 overflow-hidden border border-white/60 shadow-inner">
                        <div
                            className="bg-gradient-to-r from-purple-500 to-indigo-600 h-full transition-all duration-300 ease-out rounded-full"
                            style={{ width: `${progressPercent}%` }}
                        />
                    </div>
                </div>

                {/* Main Quiz Card */}
                <div className="w-full max-w-2xl flex flex-col">
                    <div className="bg-white/70 backdrop-blur-xl border border-white/80 p-6 sm:p-10 rounded-[2rem] sm:rounded-[2.5rem] w-full shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden mb-4">
                        
                        {/* Decorative shape */}
                        <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl from-purple-100/50 to-indigo-100/30 rounded-bl-[100px] -z-10 opacity-70"></div>

                        {/* Question Badge */}
                        <div className="flex items-center justify-between mb-6">
                            <span className="text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-lg bg-purple-50 text-purple-600 border border-purple-100">
                                Question {currentQuestion + 1}
                            </span>
                            <span className="text-xs text-gray-400 font-medium">
                                {selectedAnswer ? "Answer selected" : "Select an option below"}
                            </span>
                        </div>

                        {/* Question Text */}
                        <h2 className="text-lg sm:text-xl font-bold text-gray-800 leading-relaxed tracking-tight mb-8">
                            {currentQuizQuestion.question}
                        </h2>

                        {/* Options */}
                        <div className="flex flex-col gap-3">
                            {currentQuizQuestion.options.map((option, index) => {
                                const isSelected = selectedAnswer === option;
                                return (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedAnswer(option)}
                                        className={`w-full flex items-center gap-4 p-4 sm:p-4.5 text-left rounded-2xl border font-medium text-sm sm:text-base transition-all duration-200 cursor-pointer ${
                                            isSelected
                                                ? "border-purple-400 bg-purple-50/80 text-purple-900 shadow-[0_2px_12px_rgba(168,85,247,0.15)]"
                                                : "border-gray-200/80 bg-white/60 hover:bg-white/90 hover:border-gray-300 text-gray-700"
                                        }`}
                                    >
                                        <span className={`shrink-0 w-8 h-8 rounded-xl flex items-center justify-center text-xs font-extrabold border transition-all duration-200 ${
                                            isSelected
                                                ? "bg-purple-600 border-purple-600 text-white"
                                                : "bg-gray-100 border-gray-200 text-gray-500"
                                        }`}>
                                            {optionLabels[index]}
                                        </span>
                                        <span className="leading-snug">{option}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Next / Finish Button */}
                    <div className="flex justify-end">
                        <button
                            disabled={!selectedAnswer}
                            onClick={handleNext}
                            className="inline-flex items-center gap-2 px-7 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-sm disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 shadow-[0_4px_14px_rgba(168,85,247,0.3)] hover:shadow-[0_6px_18px_rgba(168,85,247,0.45)] cursor-pointer"
                        >
                            {currentQuestion === totalQuestions - 1 ? "Finish Quiz" : "Next"}
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

export default Quiz;