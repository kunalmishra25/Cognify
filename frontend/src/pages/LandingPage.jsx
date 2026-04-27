import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../components/Logo';

const LandingPage = () => {
    return (
        <div className="min-h-screen w-full flex flex-col relative bg-white overflow-hidden text-gray-800">
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
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-[#6B82F6] to-indigo-500">
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
            </main>
        </div>
    );
};

export default LandingPage;