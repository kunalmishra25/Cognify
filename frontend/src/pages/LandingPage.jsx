import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../components/Logo';

const LandingPage = () => {
    return (
        <div className="min-h-screen w-full flex flex-col relative bg-white text-gray-800">
            {/* Background Decor */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-50 rounded-full opacity-50 blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                <div className="absolute top-1/4 -left-64 w-[600px] h-[600px] bg-indigo-50 rounded-full opacity-50 blur-3xl"></div>
                <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#6B82F6] rounded-full opacity-10 filter blur-[100px]"></div>

                <svg
                    className="absolute top-0 left-0 w-full h-[60vh] opacity-20"
                    viewBox="0 0 1440 320"
                    preserveAspectRatio="none"
                >
                    <path
                        fill="#6B82F6"
                        fillOpacity="0.1"
                        d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,213.3C672,224,768,224,864,197.3C960,171,1056,117,1152,101.3C1248,85,1344,107,1392,117.3L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
                    />
                </svg>
            </div>

            {/* Header */}
            <header className="w-full max-w-7xl mx-auto px-6 py-8 flex justify-between items-center relative z-20">
                <div className="flex items-center gap-3">
                    <Logo className="h-14 sm:h-16 w-auto max-w-[190px]" />
                </div>

                <div className="flex items-center gap-6">
                    <Link
                        to="/login"
                        className="hidden sm:block text-[15px] font-semibold text-gray-600 hover:text-[#6B82F6] transition-colors"
                    >
                        Log In
                    </Link>

                    <Link
                        to="/signup"
                        className="text-[15px] font-medium text-white bg-[#6B82F6] hover:bg-[#5B72E2] px-6 py-2.5 rounded-full shadow-lg shadow-[#6B82F6]/30 transition-all hover:-translate-y-0.5 active:translate-y-0 active:scale-95"
                    >
                        Start for Free
                    </Link>
                </div>
            </header>

            {/* Main Hero */}
            <main className="flex-1 w-full flex flex-col items-center relative z-10 pt-10 pb-20">

                {/* Hero Text */}
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h1 className="text-5xl md:text-6xl lg:text-[72px] font-black text-gray-900 leading-[1.1] tracking-tight mb-8">
                        Your Personal AI <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6B82F6] to-indigo-500">
                            Learning Companion
                        </span>
                    </h1>

                    <p className="text-lg md:text-xl text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed">
                        Simplify your study routine. Upload your notes, slides, or documents, and let our AI instantly
                        generate structured flashcards, summaries, and quizzes seamlessly.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            to="/signup"
                            className="w-full sm:w-auto bg-[#6B82F6] hover:bg-[#5B72E2] text-white font-semibold py-4 px-8 rounded-full shadow-xl shadow-[#6B82F6]/30 transition-all hover:-translate-y-1 active:translate-y-0 active:scale-95 flex items-center justify-center gap-2 text-[16px]"
                        >
                            Get Started
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2.5}
                                stroke="currentColor"
                                className="w-4 h-4"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                                />
                            </svg>
                        </Link>

                        <Link
                            to="/login"
                            className="w-full sm:w-auto bg-white border-2 border-gray-100 hover:border-gray-200 hover:bg-gray-50 text-gray-700 font-semibold py-4 px-8 rounded-full transition-all text-[16px] flex items-center justify-center"
                        >
                            I have an account
                        </Link>
                    </div>
                </div>

                {/* AI Visualization Graphic Section */}
                <div className="w-full max-w-5xl mx-auto mt-16 mb-20 relative px-6 overflow-visible">
                    <div className="relative flex items-center justify-center min-h-[400px]">
                        {/* Central AI Circle */}
                        <div className="relative z-10 w-32 h-32 md:w-40 md:h-40 rounded-full bg-white border-[6px] border-blue-50 shadow-[0_0_50px_rgba(107,130,246,0.15)] flex items-center justify-center">
                            <span className="text-4xl md:text-5xl font-black text-[#6B82F6] tracking-tighter">AI</span>
                            
                            {/* Orbit Rings */}
                            <div className="absolute inset-[-20px] rounded-full border-2 border-dashed border-blue-100/60 animate-[spin_20s_linear_infinite]"></div>
                            <div className="absolute inset-[-45px] rounded-full border border-dashed border-blue-50/40 animate-[spin_30s_linear_infinite_reverse]"></div>
                        </div>

                        {/* Connection Lines (SVGs) */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" overflow="visible">
                            {/* Lines from center to nodes */}
                            <line x1="50%" y1="50%" x2="25%" y2="25%" stroke="#E2E8F0" strokeWidth="2" strokeDasharray="6,6" className="opacity-60" />
                            <line x1="50%" y1="50%" x2="75%" y2="25%" stroke="#E2E8F0" strokeWidth="2" strokeDasharray="6,6" className="opacity-60" />
                            <line x1="50%" y1="50%" x2="20%" y2="50%" stroke="#E2E8F0" strokeWidth="2" strokeDasharray="6,6" className="opacity-60" />
                            <line x1="50%" y1="50%" x2="80%" y2="55%" stroke="#E2E8F0" strokeWidth="2" strokeDasharray="6,6" className="opacity-60" />
                            <line x1="50%" y1="50%" x2="40%" y2="75%" stroke="#E2E8F0" strokeWidth="2" strokeDasharray="6,6" className="opacity-60" />
                        </svg>

                        {/* Floating Nodes */}
                        {/* Top Left: Document */}
                        <div className="absolute top-[15%] left-[20%] md:left-[25%] p-4 bg-white rounded-2xl shadow-xl shadow-gray-100/50 border border-gray-50 -rotate-12 hover:rotate-0 transition-transform duration-500 group">
                            <div className="w-16 h-20 bg-blue-50 rounded-lg flex flex-col p-2 gap-1.5 overflow-hidden">
                                <div className="w-full h-1.5 bg-blue-200/50 rounded-full"></div>
                                <div className="w-4/5 h-1.5 bg-blue-200/50 rounded-full"></div>
                                <div className="w-3/4 h-1.5 bg-blue-200/50 rounded-full"></div>
                                <div className="mt-auto ml-auto w-4 h-4 bg-blue-400 rounded-md flex items-center justify-center">
                                    <div className="w-2 h-0.5 bg-white rounded-full"></div>
                                </div>
                            </div>
                        </div>

                        {/* Top Right: List */}
                        <div className="absolute top-[15%] right-[20%] md:right-[25%] p-4 bg-white rounded-2xl shadow-xl shadow-gray-100/50 border border-gray-50 rotate-12 hover:rotate-0 transition-transform duration-500">
                            <div className="w-16 h-20 bg-green-50/30 rounded-lg flex flex-col p-2 gap-2.5">
                                <div className="flex items-center gap-1.5">
                                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                    <div className="flex-1 h-1 bg-gray-200 rounded-full"></div>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <div className="w-2 h-2 rounded-full border border-gray-300"></div>
                                    <div className="flex-1 h-1 bg-gray-200 rounded-full"></div>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <div className="w-2 h-2 rounded-full border border-gray-300"></div>
                                    <div className="flex-1 h-1 bg-gray-200 rounded-full"></div>
                                </div>
                            </div>
                        </div>

                        {/* Mid Left: WHAT IS AI? */}
                        <div className="absolute top-[45%] left-[5%] md:left-[10%] px-4 py-2 bg-amber-50 rounded-xl border border-amber-100 shadow-md -rotate-6 hover:rotate-0 transition-all">
                            <span className="text-[12px] font-black text-amber-700 tracking-tight">WHAT IS AI?</span>
                        </div>

                        {/* Mid Right: ARTIFICIAL INTELLIGENCE */}
                        <div className="absolute top-[50%] right-[5%] md:right-[10%] px-4 py-2 bg-emerald-50 rounded-xl border border-emerald-100 shadow-md rotate-6 hover:rotate-0 transition-all">
                            <span className="text-[12px] font-black text-emerald-700 tracking-tight uppercase">Artificial Intelligence</span>
                        </div>

                        {/* Bottom: PDF */}
                        <div className="absolute bottom-[10%] left-[40%] px-5 py-3 bg-rose-500 text-white rounded-2xl shadow-lg shadow-rose-200 rotate-12 hover:rotate-0 transition-all flex items-center justify-center">
                            <span className="text-[14px] font-black tracking-widest">PDF</span>
                        </div>
                    </div>
                </div>

                {/* Features Section */}
                <div className="w-full max-w-7xl mx-auto px-6 py-10">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Smart Uploads */}
                        <div className="p-8 rounded-[2rem] bg-white border border-gray-50 shadow-[0_10px_40px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] transition-all duration-500 hover:-translate-y-2 group flex flex-col items-center text-center">
                            <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-[#6B82F6]">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-3">Smart Uploads</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                Instantly process PDFs and text files to securely compile your knowledge base.
                            </p>
                        </div>

                        {/* Auto-Summaries */}
                        <div className="p-8 rounded-[2rem] bg-white border border-gray-50 shadow-[0_10px_40px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] transition-all duration-500 hover:-translate-y-2 group flex flex-col items-center text-center">
                            <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-indigo-500">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-3">Auto-Summaries</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                Extract key concepts automatically so you never have to read through fluff again.
                            </p>
                        </div>

                        {/* Dynamic Quizzes */}
                        <div className="p-8 rounded-[2rem] bg-white border border-gray-50 shadow-[0_10px_40px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] transition-all duration-500 hover:-translate-y-2 group flex flex-col items-center text-center">
                            <div className="w-14 h-14 rounded-2xl bg-purple-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-purple-500">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-3">Dynamic Quizzes</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                Measure retention seamlessly with AI-generated multiple-choice questions.
                            </p>
                        </div>

                        {/* Flashcards */}
                        <div className="p-8 rounded-[2rem] bg-white border border-gray-50 shadow-[0_10px_40px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] transition-all duration-500 hover:-translate-y-2 group flex flex-col items-center text-center">
                            <div className="w-14 h-14 rounded-2xl bg-rose-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-rose-500">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 6.878V6a2.25 2.25 0 0 1 2.25-2.25h7.5A2.25 2.25 0 0 1 18 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 0 0 4.5 9v.878m13.5-3A2.25 2.25 0 0 1 19.5 9v.878m-15 0a2.25 2.25 0 0 0-1.5 2.122v.878m16.5-3a2.25 2.25 0 0 1 1.5 2.122v.878m-18 0c.235-.083.487-.128.75-.128h15c.263 0 .515.045.75.128m-16.5 0A2.25 2.25 0 0 0 2.25 15v.878m16.5-3a2.25 2.25 0 0 1 1.5 2.122v.878m-18 0A2.25 2.25 0 0 0 4.5 18v.25c0 .414.336.75.75.75h13.5a.75.75 0 0 0 .75-.75V18a2.25 2.25 0 0 0-1.5-2.122m-15 0A2.25 2.25 0 0 1 4.5 15v-.878m15 0A2.25 2.25 0 0 0 18 12v-.878" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-3">Flashcards</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                Utilize active recall methodologies optimally with interactive flashcard decks.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>

    );
};

export default LandingPage;