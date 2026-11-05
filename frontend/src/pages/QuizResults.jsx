import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../config";

const QuizResults = () => {
    const [attempts, setAttempts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAttempts = async () => {
            try {
                const response = await axios.get(
                    `${API_BASE_URL}/quiz/attempts`,
                    { withCredentials: true }
                );
                if (response.data.success) {
                    setAttempts(response.data.data);
                }
            } catch (error) {
                console.error("Error fetching quiz attempts:", error);
                setError("Failed to load quiz history.");
            } finally {
                setLoading(false);
            }
        };
        fetchAttempts();
    }, []);

    const totalAttempts = attempts.length;
    const avgScore = totalAttempts
        ? Math.round(attempts.reduce((sum, a) => sum + a.percentage, 0) / totalAttempts)
        : 0;
    const bestScore = totalAttempts
        ? Math.max(...attempts.map((a) => a.percentage))
        : 0;

    const getScoreColor = (percentage) => {
        if (percentage >= 80) return { bar: "from-green-400 to-emerald-500", badge: "bg-green-50 text-green-700" };
        if (percentage >= 60) return { bar: "from-[#6B82F6] to-indigo-500", badge: "bg-indigo-50 text-[#6B82F6]" };
        if (percentage >= 40) return { bar: "from-amber-400 to-orange-400", badge: "bg-amber-50 text-amber-700" };
        return { bar: "from-red-400 to-rose-500", badge: "bg-red-50 text-red-600" };
    };

    if (loading) {
        return (
            <div className="h-full min-h-screen w-full bg-transparent flex items-center justify-center">
                <svg className="animate-spin h-8 w-8 text-[#6B82F6]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            </div>
        );
    }

    if (error) {
        return (
            <div className="h-full min-h-screen w-full bg-transparent flex items-center justify-center px-4">
                <div className="text-center bg-white/60 backdrop-blur-xl p-8 sm:p-14 rounded-[2rem] border border-white/80 w-full max-w-lg shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                    <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-white">
                        <svg className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Something went wrong</h3>
                    <p className="text-gray-500 text-sm">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="h-full min-h-screen w-full bg-transparent flex flex-col pt-10 md:pt-20 pb-20">
            <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 flex-1 flex flex-col">

                {/* Header */}
                <div className="mb-8 md:mb-12 text-left">
                    <h1 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-800 to-gray-600 tracking-tight pb-1">
                        Quiz Results
                    </h1>
                    <p className="text-[14px] sm:text-[16px] text-gray-500 mt-2 font-medium">
                        Track your learning progress and analyze your quiz performance.
                    </p>
                </div>

                {attempts.length === 0 ? (

                    /* Empty State */
                    <div className="text-center bg-white/60 backdrop-blur-xl p-8 sm:p-14 rounded-[2rem] sm:rounded-[2.5rem] border border-white/80 w-full max-w-lg mx-auto shadow-[0_8px_30px_rgb(0,0,0,0.04)] mt-10">
                        <div className="w-20 h-20 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-full shadow-inner flex items-center justify-center mx-auto mb-6 border border-white">
                            <svg className="w-10 h-10 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                            </svg>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 tracking-tight">
                            No quiz attempts yet
                        </h3>
                        <p className="text-gray-500 mb-8 text-[14px] sm:text-[16px] leading-relaxed px-4">
                            Complete your first quiz to start tracking your learning progress.
                        </p>
                        <button
                            onClick={() => navigate('/mynotes')}
                            className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-8 py-3.5 rounded-2xl font-semibold transition-all duration-300 shadow-[0_8px_20px_rgba(99,102,241,0.3)] hover:shadow-[0_8px_25px_rgba(99,102,241,0.45)] hover:-translate-y-1 active:translate-y-0 active:scale-[0.98] text-[15px]"
                        >
                            Explore My Notes
                        </button>
                    </div>

                ) : (
                    <div className="flex flex-col gap-6 md:gap-8">

                        {/* Stats Cards */}
                        <div className="grid grid-cols-3 gap-3 md:gap-6">

                            <div className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-[1.25rem] sm:rounded-[1.5rem] p-4 sm:p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col gap-1">
                                <div className="w-8 h-8 rounded-lg bg-indigo-50 text-[#6B82F6] flex items-center justify-center mb-2">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                </div>
                                <span className="text-gray-500 text-[11px] sm:text-xs font-semibold uppercase tracking-wider">Total Attempts</span>
                                <span className="text-2xl sm:text-3xl font-black text-gray-800">{totalAttempts}</span>
                                <span className="text-[11px] text-gray-400 font-medium">Quizzes completed</span>
                            </div>

                            <div className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-[1.25rem] sm:rounded-[1.5rem] p-4 sm:p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col gap-1">
                                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-500 flex items-center justify-center mb-2">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                </div>
                                <span className="text-gray-500 text-[11px] sm:text-xs font-semibold uppercase tracking-wider">Average Score</span>
                                <span className="text-2xl sm:text-3xl font-black text-blue-600">{avgScore}%</span>
                                <span className="text-[11px] text-gray-400 font-medium">Across all attempts</span>
                            </div>

                            <div className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-[1.25rem] sm:rounded-[1.5rem] p-4 sm:p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col gap-1">
                                <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-500 flex items-center justify-center mb-2">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                    </svg>
                                </div>
                                <span className="text-gray-500 text-[11px] sm:text-xs font-semibold uppercase tracking-wider">Best Score</span>
                                <span className="text-2xl sm:text-3xl font-black text-purple-600">{bestScore}%</span>
                                <span className="text-[11px] text-gray-400 font-medium">Personal best</span>
                            </div>

                        </div>

                        {/* Attempts List */}
                        <div className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-[1.5rem] sm:rounded-[2rem] p-4 sm:p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col">
                            <div className="flex items-center justify-between mb-5 sm:mb-6">
                                <h3 className="text-lg sm:text-xl font-bold text-gray-800">Recent Quiz Attempts</h3>
                                <span className="text-[11px] font-bold text-[#6B82F6] bg-indigo-50/60 px-2.5 py-1 rounded-full uppercase tracking-wider">
                                    {totalAttempts} {totalAttempts === 1 ? "attempt" : "attempts"}
                                </span>
                            </div>

                            <div className="flex flex-col gap-3">
                                {attempts.map((attempt) => {
                                    const colors = getScoreColor(attempt.percentage);
                                    return (
                                        <div
                                            key={attempt._id}
                                            className="group flex flex-col sm:flex-row sm:items-center gap-4 p-4 sm:p-5 rounded-xl sm:rounded-2xl hover:bg-white/80 transition-all border border-transparent hover:border-gray-100"
                                        >
                                            {/* Icon */}
                                            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-500 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </div>

                                            {/* Info + Progress */}
                                            <div className="flex-1 min-w-0 overflow-hidden">
                                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-2">
                                                    <h4 className="text-[14px] sm:text-[15px] font-bold text-gray-800 truncate">
                                                        {attempt.quizId?.fileName || "Quiz"}
                                                    </h4>
                                                    <div className="flex items-center gap-2 shrink-0">
                                                        <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${colors.badge}`}>
                                                            {attempt.percentage}%
                                                        </span>
                                                        <span className="text-xs text-gray-400 font-medium">
                                                            {attempt.score}/{attempt.totalQuestions}
                                                        </span>
                                                    </div>
                                                </div>
                                                {/* Progress Bar */}
                                                <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                                                    <div
                                                        className={`bg-gradient-to-r ${colors.bar} h-full rounded-full transition-all duration-500`}
                                                        style={{ width: `${attempt.percentage}%` }}
                                                    />
                                                </div>
                                                <p className="text-[11px] text-gray-400 font-medium mt-1.5 flex items-center gap-1">
                                                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                    {new Date(attempt.createdAt).toLocaleDateString("en-US", {
                                                        month: "short",
                                                        day: "numeric",
                                                        year: "numeric",
                                                    })}
                                                </p>
                                            </div>

                                            {/* Retake Button */}
                                            {attempt.quizId?._id && (
                                                <button
                                                    onClick={() => navigate(`/quiz/${attempt.quizId._id}`)}
                                                    className="flex items-center gap-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-[12px] font-semibold px-3.5 py-1.5 rounded-xl shadow-[0_4px_12px_rgba(99,102,241,0.25)] hover:shadow-[0_4px_16px_rgba(99,102,241,0.4)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97] transition-all duration-200 shrink-0 cursor-pointer"
                                                >
                                                    Retake
                                                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </button>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                    </div>
                )}
            </div>
        </div>
    );
};

export default QuizResults;
