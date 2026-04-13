import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    return (
        <div className="min-h-screen w-full flex flex-col relative bg-white overflow-hidden text-gray-800">
            {/* Background Decor */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-50 rounded-full opacity-50 blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                <div className="absolute top-1/4 -left-64 w-[600px] h-[600px] bg-indigo-50 rounded-full opacity-50 blur-3xl"></div>
                <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#6B82F6] rounded-full opacity-10 filter blur-[100px]"></div>
                <svg className="absolute top-0 left-0 w-full h-[60vh] opacity-20" viewBox="0 0 1440 320" preserveAspectRatio="none">
                    <path fill="#6B82F6" fillOpacity="0.1" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,213.3C672,224,768,224,864,197.3C960,171,1056,117,1152,101.3C1248,85,1344,107,1392,117.3L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
                </svg>
            </div>

            {/* Header */}
            <header className="w-full max-w-7xl mx-auto px-6 py-8 flex justify-between items-center relative z-20">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#6B82F6] rounded-full text-white flex items-center justify-center font-bold text-[14px] shadow-lg shadow-[#6B82F6]/30">AI</div>
                    <span className="text-2xl font-extrabold tracking-tight text-gray-900">StudyGen</span>
                </div>
                <div className="flex items-center gap-6">
                    <Link to="/login" className="hidden sm:block text-[15px] font-semibold text-gray-600 hover:text-[#6B82F6] transition-colors">Log In</Link>
                    <Link to="/signup" className="text-[15px] font-medium text-white bg-[#6B82F6] hover:bg-[#5B72E2] px-6 py-2.5 rounded-full shadow-lg shadow-[#6B82F6]/30 transition-all hover:-translate-y-0.5 active:translate-y-0 active:scale-95">Start for Free</Link>
                </div>
            </header>

            {/* Main Hero */}
            <main className="flex-1 w-full flex flex-col items-center relative z-10 pt-10 pb-20">
                
                {/* Hero Text */}
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h1 className="text-5xl md:text-6xl lg:text-[72px] font-black text-gray-900 leading-[1.1] tracking-tight mb-8">
                        Your Personal AI <br />
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-[#6B82F6] to-indigo-500">Learning Companion</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed">
                        Simplify your study routine. Upload your notes, slides, or documents, and let our AI instantly generate structured flashcards, summaries, and quizzes seamlessly.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link to="/signup" className="w-full sm:w-auto bg-[#6B82F6] hover:bg-[#5B72E2] text-white font-semibold py-4 px-8 rounded-full shadow-xl shadow-[#6B82F6]/30 transition-all hover:-translate-y-1 active:translate-y-0 active:scale-95 flex items-center justify-center gap-2 text-[16px]">
                            Get Started
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                            </svg>
                        </Link>
                        <Link to="/login" className="w-full sm:w-auto bg-white border-2 border-gray-100 hover:border-gray-200 hover:bg-gray-50 text-gray-700 font-semibold py-4 px-8 rounded-full transition-all text-[16px] flex items-center justify-center">
                            I have an account
                        </Link>
                    </div>
                </div>

                {/* Center stage CSS Illustration */}
                <div className="relative w-full max-w-3xl mx-auto mt-24 mb-32 flex justify-center items-center h-64 scale-90 sm:scale-100">
                    <div className="relative w-80 h-80 flex items-center justify-center">

                        {/* Connecting dashed lines SVG */}
                        <svg className="absolute inset-0 w-full h-full z-0 opacity-20 pointer-events-none" viewBox="0 0 320 320">
                            <path d="M160 160 L40 60 M160 160 L280 60 M160 160 L160 300 M160 160 L40 260 M160 160 L280 260" stroke="#2563EB" strokeWidth="2" strokeDasharray="6 6" />
                        </svg>

                        {/* Background glow behind AI core */}
                        <div className="absolute w-40 h-40 bg-[#6B82F6] rounded-full opacity-20 filter blur-2xl"></div>

                        {/* Central AI glowing core */}
                        <div className="absolute z-30 w-32 h-32 bg-white rounded-full shadow-[0_10px_40px_rgba(107,130,246,0.3)] flex flex-col items-center justify-center border-4 border-[#6B82F6]/10">
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-indigo-500 font-black text-4xl">AI</span>
                            <div className="absolute inset-2 rounded-full border border-[#6B82F6]/20"></div>
                            <div className="absolute -inset-2 border border-[#6B82F6]/10 rounded-full animate-[spin_10s_linear_infinite]"></div>
                        </div>

                        {/* Floating Card 1: Document/Summary */}
                        <div className="absolute z-20 w-24 h-28 bg-white backdrop-blur-sm rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] -top-6 -left-4 transform -rotate-[15deg] p-3 flex flex-col gap-2 border border-gray-100 hover:scale-105 transition-transform cursor-default">
                            <div className="w-full h-2.5 bg-blue-100 rounded-lg"></div>
                            <div className="w-full h-1.5 bg-gray-100 rounded-lg mt-1"></div>
                            <div className="w-full h-1.5 bg-gray-100 rounded-lg"></div>
                            <div className="w-2/3 h-1.5 bg-gray-100 rounded-lg"></div>
                            <div className="mt-auto self-end w-5 h-5 bg-[#6B82F6] rounded-md flex items-center justify-center">
                                <div className="w-2.5 h-0.5 bg-white rounded"></div>
                            </div>
                        </div>

                        {/* Floating Card 2: Quiz Checkmarks */}
                        <div className="absolute z-20 w-28 h-24 bg-white backdrop-blur-sm rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] top-2 -right-10 transform rotate-12 p-3.5 flex flex-col gap-2.5 border border-gray-100 hover:scale-105 transition-transform cursor-default">
                            <div className="flex items-center gap-2"><div className="w-3.5 h-3.5 rounded-full bg-[#10B981] shadow-sm shadow-emerald-200 flex-shrink-0"></div><div className="w-full h-2 bg-gray-100 rounded"></div></div>
                            <div className="flex items-center gap-2"><div className="w-3.5 h-3.5 rounded-full border-2 border-gray-200 flex-shrink-0"></div><div className="w-2/3 h-2 bg-gray-100 rounded"></div></div>
                            <div className="flex items-center gap-2"><div className="w-3.5 h-3.5 rounded-full border-2 border-gray-200 flex-shrink-0"></div><div className="w-5/6 h-2 bg-gray-100 rounded"></div></div>
                        </div>

                        {/* Floating Card 3: Flashcard Back */}
                        <div className="absolute z-20 w-24 h-16 bg-amber-50 border border-amber-100 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] bottom-12 -left-12 transform -rotate-12 flex flex-col items-center justify-center gap-1 hover:scale-105 transition-transform cursor-default">
                            <span className="text-[12px] font-black text-amber-600 tracking-wide">WHAT IS AI?</span>
                        </div>

                        {/* Floating Card 4: Flashcard Front */}
                        <div className="absolute z-20 w-24 h-16 bg-teal-50 border border-teal-100 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] bottom-2 -right-4 transform rotate-[20deg] flex flex-col items-center justify-center hover:scale-105 transition-transform cursor-default">
                            <span className="text-[12px] font-black text-teal-600 tracking-wide text-center leading-tight">ARTIFICIAL<br/>INTELLIGENCE</span>
                        </div>

                        {/* Floating PDF Icon */}
                        <div className="absolute z-40 w-14 h-16 bg-rose-500 text-white rounded-xl shadow-xl shadow-rose-200 -bottom-8 left-10 border border-rose-400 flex flex-col items-center justify-center transform rotate-6 hover:scale-110 transition-transform cursor-default">
                            <span className="font-bold text-[15px] tracking-widest">PDF</span>
                        </div>
                    </div>
                </div>

                {/* Features Highlights (Clean Centered Row) */}
                <div className="w-full max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6 lg:gap-8">
                    
                    {/* Feature 1 */}
                    <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-white/50 backdrop-blur-xl border border-gray-100/50 hover:bg-white hover:shadow-xl hover:shadow-gray-200/50 transition-all group">
                        <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#6B82F6] flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-[#6B82F6] group-hover:text-white transition-all duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                            </svg>
                        </div>
                        <h3 className="font-bold text-gray-900 mb-2 text-[17px]">Smart Uploads</h3>
                        <p className="text-[14.5px] text-gray-500 leading-relaxed">Instantly process PDFs and text files to securely compile your knowledge base.</p>
                    </div>

                    {/* Feature 2 */}
                    <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-white/50 backdrop-blur-xl border border-gray-100/50 hover:bg-white hover:shadow-xl hover:shadow-gray-200/50 transition-all group">
                        <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-500 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-indigo-500 group-hover:text-white transition-all duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                            </svg>
                        </div>
                        <h3 className="font-bold text-gray-900 mb-2 text-[17px]">Auto-Summaries</h3>
                        <p className="text-[14.5px] text-gray-500 leading-relaxed">Extract key concepts automatically so you never have to read through fluff again.</p>
                    </div>

                    {/* Feature 3 */}
                    <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-white/50 backdrop-blur-xl border border-gray-100/50 hover:bg-white hover:shadow-xl hover:shadow-gray-200/50 transition-all group">
                        <div className="w-14 h-14 rounded-2xl bg-purple-50 text-purple-500 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-purple-500 group-hover:text-white transition-all duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="font-bold text-gray-900 mb-2 text-[17px]">Dynamic Quizzes</h3>
                        <p className="text-[14.5px] text-gray-500 leading-relaxed">Measure retention seamlessly with AI-generated multiple-choice questions.</p>
                    </div>

                    {/* Feature 4 */}
                    <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-white/50 backdrop-blur-xl border border-gray-100/50 hover:bg-white hover:shadow-xl hover:shadow-gray-200/50 transition-all group">
                        <div className="w-14 h-14 rounded-2xl bg-pink-50 text-pink-500 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-pink-500 group-hover:text-white transition-all duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3" />
                            </svg>
                        </div>
                        <h3 className="font-bold text-gray-900 mb-2 text-[17px]">Flashcards</h3>
                        <p className="text-[14.5px] text-gray-500 leading-relaxed">Utilize active recall methodologies optimally with interactive flashcard decks.</p>
                    </div>

                </div>
            </main>
        </div>
    );
};

export default LandingPage;