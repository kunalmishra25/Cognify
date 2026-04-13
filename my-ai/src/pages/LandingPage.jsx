import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    return (
        <div className="h-screen w-full flex flex-col md:flex-row-reverse overflow-hidden bg-white">

            {/* RIGHT SIDE (Visual Panel)  */}
            <div className="hidden md:flex md:w-5/12 relative flex-col justify-between text-white overflow-hidden shrink-0">
                {/* A slightly different background shape composition */}
                <div className="absolute inset-0 z-0 bg-linear-to-b from-[#6B82F6] to-[#4F46E5] overflow-hidden">
                    <div className="absolute top-0 right-0 w-[150%] h-[150%] -translate-y-1/4 translate-x-1/4 opacity-20 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
                    <div className="absolute -top-10 -left-10 w-96 h-96 bg-white rounded-full opacity-10 filter blur-3xl"></div>
                    <div className="absolute bottom-10 right-10 w-64 h-64 bg-indigo-300 rounded-full opacity-20 filter blur-3xl"></div>

                    {/* Decorative abstract wave instead of circles */}
                    <svg className="absolute bottom-0 left-0 w-full h-1/2 opacity-30" viewBox="0 0 1440 320" preserveAspectRatio="none">
                        <path fill="#ffffff" fillOpacity="0.5" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,213.3C672,224,768,224,864,197.3C960,171,1056,117,1152,101.3C1248,85,1344,107,1392,117.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                    </svg>
                </div>

                {/* Content */}
                <div className="relative z-10 p-12 flex flex-col h-full justify-between items-center text-center">
                    <div className="w-full flex items-center justify-end gap-3 opacity-90">
                        <span className="text-xl font-bold tracking-wide">StudyGen Platform</span>
                        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center font-bold text-xs">AI</div>
                    </div>

                    <div className="mt-10 mb-auto flex flex-col justify-center items-center w-full">
                        <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight mb-4">
                            Smarter Study
                        </h1>
                        <p className="text-indigo-100 text-[15px] leading-relaxed max-w-sm font-medium">
                            Generate flashcards, summaries, and quizzes instantly.
                        </p>
                    </div>

                    {/* New CSS Illustration: AI Brain connecting to documents */}
                    <div className="flex justify-center mt-4 h-64 w-full items-center pb-12">
                        <div className="relative w-72 h-72 flex items-center justify-center">

                            {/* Connecting dashed lines SVG */}
                            <svg className="absolute inset-0 w-full h-full z-0 opacity-40 pointer-events-none" viewBox="0 0 288 288">
                                <path d="M144 144 L60 80 M144 144 L228 80 M144 144 L144 240 M144 144 L60 210 M144 144 L228 210" stroke="white" strokeWidth="2" strokeDasharray="6 6" />
                            </svg>

                            {/* Central AI glowing core */}
                            <div className="absolute z-30 w-24 h-24 bg-white rounded-full shadow-[0_0_40px_rgba(255,255,255,0.4)] flex flex-col items-center justify-center">
                                <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-indigo-500 font-black text-3xl">AI</span>
                                <div className="absolute inset-2 rounded-full border border-blue-100/50"></div>
                            </div>

                            {/* Floating Card 1: Document/Summary */}
                            <div className="absolute z-20 w-20 h-24 bg-white/95 backdrop-blur-sm rounded-xl shadow-xl -top-2 left-6 transform -rotate-12 p-2.5 flex flex-col gap-1.5 border border-white/40">
                                <div className="w-full h-2 bg-blue-100 rounded-lg"></div>
                                <div className="w-full h-1 bg-gray-100 rounded-lg"></div>
                                <div className="w-full h-1 bg-gray-100 rounded-lg"></div>
                                <div className="w-2/3 h-1 bg-gray-100 rounded-lg"></div>
                                <div className="mt-auto self-end w-4 h-4 bg-blue-500 rounded flex items-center justify-center">
                                    <div className="w-2 h-0.5 bg-white rounded"></div>
                                </div>
                            </div>

                            {/* Floating Card 2: Quiz Checkmarks */}
                            <div className="absolute z-20 w-24 h-20 bg-white/95 backdrop-blur-sm rounded-xl shadow-xl top-4 right-4 transform rotate-12 p-3 flex flex-col gap-2 border border-white/40">
                                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#34A853] flex-shrink-0"></div><div className="w-full h-1.5 bg-gray-200 rounded"></div></div>
                                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full border-2 border-gray-200 flex-shrink-0"></div><div className="w-2/3 h-1.5 bg-gray-200 rounded"></div></div>
                                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full border-2 border-gray-200 flex-shrink-0"></div><div className="w-4/5 h-1.5 bg-gray-200 rounded"></div></div>
                            </div>

                            {/* Floating Card 3: Flashcard Back */}
                            <div className="absolute z-20 w-20 h-14 bg-amber-100 border border-amber-200 rounded-xl shadow-lg bottom-10 left-4 transform -rotate-6 flex flex-col items-center justify-center gap-1">
                                <span className="text-[11px] font-bold text-amber-700">Q: Concept?</span>
                            </div>

                            {/* Floating Card 4: Flashcard Front */}
                            <div className="absolute z-20 w-20 h-14 bg-teal-100 border border-teal-200 rounded-xl shadow-lg bottom-16 right-4 transform rotate-[15deg] flex flex-col items-center justify-center">
                                <span className="text-[11px] font-bold text-teal-700">A: Answer!</span>
                            </div>

                            {/* Floating PDF Icon */}
                            <div className="absolute z-40 w-12 h-14 bg-rose-500 text-white rounded-lg shadow-xl bottom-0 -ml-6 border border-rose-400 flex flex-col items-center justify-center transform rotate-3">
                                <span className="font-bold text-sm tracking-widest">PDF</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* LEFT SIDE (Content Panel) */}
            <div className="w-full md:w-7/12 bg-white p-8 md:p-12 lg:p-16 xl:p-24 flex flex-col justify-center relative">

                <div className="md:hidden flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 bg-blue-600 rounded-full text-white flex items-center justify-center font-bold text-xs shadow-md">AI</div>
                    <span className="text-xl font-bold text-gray-800 tracking-wide">StudyGen</span>
                </div>

                <div className="max-w-xl mx-auto md:mx-0 w-full h-full flex flex-col justify-center">


                    <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4 tracking-tight leading-tight">
                        Your Personal AI <br className="hidden md:block" /><span className="text-transparent bg-clip-text bg-linear-to-r from-[#6B82F6] to-indigo-500">Learning Companion</span>
                    </h2>

                    <p className="text-gray-500 mb-8 text-[14px] lg:text-[15px] leading-relaxed">
                        Simplify your study routine. Upload your notes, slides, or documents, and let our AI generate structured learning materials designed to help you succeed.
                    </p>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                        {/* Feature 1 */}
                        <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-100 hover:border-blue-200 transition-colors">
                            <div className="w-10 h-10 rounded-lg bg-blue-100 text-[#6B82F6] flex items-center justify-center mb-3">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                                </svg>
                            </div>
                            <h3 className="font-semibold text-gray-800 mb-1 text-base">Smart Uploads</h3>
                            <p className="text-[13px] text-gray-500 leading-snug">Process PDFs and text files in seconds to build your knowledge base.</p>
                        </div>

                        {/* Feature 2 */}
                        <div className="p-4 rounded-xl bg-indigo-50/50 border border-indigo-100 hover:border-indigo-200 transition-colors">
                            <div className="w-10 h-10 rounded-lg bg-indigo-100 text-indigo-500 flex items-center justify-center mb-3">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                </svg>
                            </div>
                            <h3 className="font-semibold text-gray-800 mb-1 text-base">Auto-Summaries</h3>
                            <p className="text-[13px] text-gray-500 leading-snug">Extract key concepts and summaries without reading the whole text.</p>
                        </div>

                        {/* Feature 3 */}
                        <div className="p-4 rounded-xl bg-purple-50/50 border border-purple-100 hover:border-purple-200 transition-colors">
                            <div className="w-10 h-10 rounded-lg bg-purple-100 text-purple-500 flex items-center justify-center mb-3">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="font-semibold text-gray-800 mb-1 text-base">Dynamic Quizzes</h3>
                            <p className="text-[13px] text-gray-500 leading-snug">Test your knowledge with AI-generated multiple-choice questions.</p>
                        </div>

                        {/* Feature 4 */}
                        <div className="p-4 rounded-xl bg-pink-50/50 border border-pink-100 hover:border-pink-200 transition-colors">
                            <div className="w-10 h-10 rounded-lg bg-pink-100 text-pink-500 flex items-center justify-center mb-3">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3" />
                                </svg>
                            </div>
                            <h3 className="font-semibold text-gray-800 mb-1 text-base">Flashcards</h3>
                            <p className="text-[13px] text-gray-500 leading-snug">Perfect your memory retention with active recall flashcard sets.</p>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link to="/signup" className="flex-1 bg-[#6B82F6] hover:bg-[#5B72E2] text-white font-medium py-3.5 px-6 rounded-xl shadow-lg shadow-[#6B82F6]/30 transition duration-200 active:scale-[0.98] text-center flex items-center justify-center gap-2 text-[15px]">
                            Get Started Free
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                            </svg>
                        </Link>
                        <Link to="/login" className="flex-1 bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-3.5 px-6 rounded-xl transition duration-200 active:scale-[0.98] text-center flex items-center justify-center text-[15px]">
                            I already have an account
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;