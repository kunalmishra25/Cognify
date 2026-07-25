import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {

    const [stats, setStats] = useState({
        documents: 0,
        flashcards: 0,
        quizzes: 0,
        streak: 0,
    });

    useEffect(() => {
        const getStats = async () => {
            try {
                const response = await axios.get('https://cognify-v5za.onrender.com/api/dashboard/stats',
                    {
                        withCredentials: true,
                    }
                );
                setStats(response.data.data);

            } catch (error) {
                console.log(error);
            }
        }
        getStats()
    }, [])

    const recentUploads = [
        { id: 1, name: 'Biology_Chapter_4_Notes.pdf', size: '2.4 MB', date: '2 hours ago' },
        { id: 2, name: 'Machine_Learning_Intro.pdf', size: '4.1 MB', date: 'Yesterday' },
        { id: 3, name: 'History_Essay_Draft.pdf', size: '1.2 MB', date: '3 days ago' },
    ];

    const recentQuizzes = [
        { id: 1, topic: 'Cellular Respiration', score: '85%', date: 'Today' },
        { id: 2, topic: 'Neural Networks basics', score: '92%', date: 'Yesterday' },
    ];

    const usageHistory = [40, 70, 45, 90, 65, 30, 85]; // Mock chart data

    return (
        <div className="h-full min-h-screen w-full bg-transparent flex flex-col pt-10 md:pt-16 pb-24">
            <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 flex-1 flex flex-col gap-6 md:gap-8">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
                    <div>
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-800 to-gray-600 tracking-tight pb-1">Dashboard</h1>
                        <p className="text-[14px] sm:text-[16px] text-gray-500 mt-1 font-medium">Welcome back! Here's an overview of your study progress.</p>
                    </div>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
                    <div className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-[1.25rem] sm:rounded-[1.5rem] p-4 sm:p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col">
                        <span className="text-gray-500 text-[11px] sm:text-sm font-semibold mb-1 uppercase tracking-wider">Documents</span>
                        <span className="text-2xl sm:text-3xl font-black text-gray-800">{stats.documents}</span>
                    </div>
                    <div className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-[1.25rem] sm:rounded-[1.5rem] p-4 sm:p-5 shadow-[0_8px_30_rgb(0,0,0,0.04)] flex flex-col">
                        <span className="text-gray-500 text-[11px] sm:text-sm font-semibold mb-1 uppercase tracking-wider">Flashcards</span>
                        <span className="text-2xl sm:text-3xl font-black text-blue-600">{stats.flashcards}</span>
                    </div>
                    <div className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-[1.25rem] sm:rounded-[1.5rem] p-4 sm:p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col">
                        <span className="text-gray-500 text-[11px] sm:text-sm font-semibold mb-1 uppercase tracking-wider">Quizzes</span>
                        <span className="text-2xl sm:text-3xl font-black text-purple-600">{stats.quizzes}</span>
                    </div>
                    <div className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-[1.25rem] sm:rounded-[1.5rem] p-4 sm:p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col">
                        <span className="text-gray-500 text-[11px] sm:text-sm font-semibold mb-1 uppercase tracking-wider">Streak</span>
                        <span className="text-2xl sm:text-3xl font-black text-orange-500">{stats.streak} <span className="text-sm sm:text-lg text-orange-400">Days</span></span>
                    </div>
                </div>

                {/* Main Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">

                    {/* Left Column */}
                    <div className="lg:col-span-2 flex flex-col gap-6 md:gap-8">

                        {/* Quick Actions */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <Link to="/upload" className="group p-5 rounded-[1.5rem] bg-white/60 backdrop-blur-xl border border-white/80 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(107,130,246,0.12)] hover:bg-white/80 transition-all duration-300 hover:-translate-y-1 flex items-center gap-4">
                                <div className="w-12 h-12 shrink-0 rounded-xl flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-md shadow-blue-500/30 group-hover:scale-110 transition-all duration-300">
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-[15px] font-bold text-gray-900 group-hover:text-[#6B82F6] transition-colors leading-tight">Upload<br />Material</h3>
                                </div>
                            </Link>
                            <Link to="/mynotes" className="group p-5 rounded-[1.5rem] bg-white/60 backdrop-blur-xl border border-white/80 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(168,85,247,0.12)] hover:bg-white/80 transition-all duration-300 hover:-translate-y-1 flex items-center gap-4">
                                <div className="w-12 h-12 shrink-0 rounded-xl flex items-center justify-center bg-gradient-to-br from-purple-500 to-fuchsia-600 text-white shadow-md shadow-purple-500/30 group-hover:scale-110 transition-all duration-300">
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-[15px] font-bold text-gray-900 group-hover:text-purple-600 transition-colors leading-tight">My<br />Notes</h3>
                                </div>
                            </Link>
                            <Link to="/flashcards" className="group p-5 rounded-[1.5rem] bg-white/60 backdrop-blur-xl border border-white/80 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(236,72,153,0.12)] hover:bg-white/80 transition-all duration-300 hover:-translate-y-1 flex items-center gap-4">
                                <div className="w-12 h-12 shrink-0 rounded-xl flex items-center justify-center bg-gradient-to-br from-pink-500 to-rose-500 text-white shadow-md shadow-pink-500/30 group-hover:scale-110 transition-all duration-300">
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-[15px] font-bold text-gray-900 group-hover:text-pink-600 transition-colors leading-tight">Flashcard<br />Decks</h3>
                                </div>
                            </Link>
                        </div>

                        {/* Recent Uploads */}
                        <div className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-[1.5rem] sm:rounded-[2rem] p-4 sm:p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col">
                            <div className="flex items-center justify-between mb-5 sm:mb-6">
                                <h3 className="text-lg sm:text-xl font-bold text-gray-800">Recent Uploads</h3>
                                <Link to="/upload" className="text-xs sm:text-sm font-semibold text-indigo-600 hover:text-indigo-500 transition-colors">View All</Link>
                            </div>
                            <div className="flex flex-col gap-3">
                                {recentUploads.map((file) => (
                                    <div key={file.id} className="group flex items-center justify-between p-3 sm:p-4 rounded-xl sm:rounded-2xl hover:bg-white/80 transition-all border border-transparent hover:border-gray-100 cursor-pointer">
                                        <div className="flex items-center gap-3 sm:gap-4 overflow-hidden">
                                            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-red-50 text-red-500 flex items-center justify-center shrink-0">
                                                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" /></svg>
                                            </div>
                                            <div className="flex flex-col truncate">
                                                <span className="text-[14px] sm:text-[15px] font-bold text-gray-800 truncate">{file.name}</span>
                                                <span className="text-[10px] sm:text-xs text-gray-500 font-medium">{file.size}</span>
                                            </div>
                                        </div>
                                        <div className="text-[10px] sm:text-xs text-gray-400 font-medium shrink-0 ml-2 sm:ml-4">{file.date}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Recent Quizzes */}
                        <div className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-[2rem] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-bold text-gray-800">Recent Quizzes</h3>
                                <Link to="/quiz" className="text-sm font-semibold text-purple-600 hover:text-purple-500 transition-colors">Take New</Link>
                            </div>
                            <div className="flex flex-col gap-3">
                                {recentQuizzes.map((quiz) => (
                                    <div key={quiz.id} className="group flex items-center justify-between p-4 rounded-2xl hover:bg-white/80 transition-all border border-transparent hover:border-gray-100 cursor-pointer">
                                        <div className="flex items-center gap-4 overflow-hidden">
                                            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-500 flex items-center justify-center shrink-0">
                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                            </div>
                                            <div className="flex flex-col truncate">
                                                <span className="text-[15px] font-bold text-gray-800 truncate">{quiz.topic}</span>
                                                <span className="text-xs text-gray-500 font-medium">{quiz.date}</span>
                                            </div>
                                        </div>
                                        <div className="px-3 py-1 bg-green-50 text-green-600 font-bold text-sm rounded-lg shrink-0 ml-4">
                                            {quiz.score}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>

                    {/* Right Column */}
                    <div className="flex flex-col gap-6 md:gap-8">

                        {/* Usage History */}
                        <div className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-[2rem] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col">
                            <h3 className="text-xl font-bold text-gray-800 mb-6">Usage History</h3>
                            <div className="flex items-end justify-between h-32 gap-2 mt-auto">
                                {usageHistory.map((value, idx) => (
                                    <div key={idx} className="w-full relative group flex justify-center">
                                        <div
                                            className="w-full max-w-[24px] bg-indigo-100 group-hover:bg-indigo-400 rounded-t-md transition-all duration-300"
                                            style={{ height: `${value}%` }}
                                        ></div>
                                        {/* Tooltip mockup */}
                                        <div className="absolute -top-8 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                                            {value} pts
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-between mt-3 text-xs font-semibold text-gray-400">
                                <span>Mon</span>
                                <span>Wed</span>
                                <span>Sun</span>
                            </div>
                        </div>



                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;