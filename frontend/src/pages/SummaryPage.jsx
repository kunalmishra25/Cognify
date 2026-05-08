import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const SummaryPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const summary = location.state?.summary;

    return (
        <div className="h-full min-h-screen w-full bg-transparent flex flex-col pt-10 md:pt-20">
            <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 flex-1 flex flex-col">
                <div className="mb-8 md:mb-12 text-center">
                    <h1 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-800 to-gray-600 tracking-tight pb-1">Generated Summary</h1>
                    <p className="text-[14px] sm:text-[16px] text-gray-500 mt-3 md:mt-4 max-w-lg mx-auto font-medium px-4">Review the AI-generated notes extracted from your uploaded document.</p>
                </div>

                <div className="flex-1 flex flex-col items-center w-full pb-20">
                    {!summary ? (
                        <div className="text-center bg-white/60 backdrop-blur-xl p-14 rounded-[2.5rem] border border-white/80 w-full max-w-lg shadow-[0_8px_30px_rgb(0,0,0,0.04)] mt-10">
                            <div className="w-24 h-24 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-full shadow-inner flex items-center justify-center mx-auto mb-8 border border-white">
                                <svg className="w-12 h-12 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-4 tracking-tight">No Summary Found</h3>
                            <p className="text-gray-500 mb-10 text-[16px] leading-relaxed px-4">It looks like you haven't uploaded a document yet. Let's get started.</p>
                            <button onClick={() => navigate('/upload')} className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-10 py-4 rounded-2xl font-semibold transition-all duration-300 shadow-[0_8px_20px_rgba(99,102,241,0.3)] hover:shadow-[0_8px_25px_rgba(99,102,241,0.45)] hover:-translate-y-1 active:translate-y-0 active:scale-[0.98] text-[16px]">Go to Upload</button>
                        </div>
                    ) : (
                        <div className="w-full">
                            {/* Download button */}
                            <div className="flex justify-center sm:justify-end mb-6">
                                <button
                                    className="inline-flex items-center gap-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-[14px] font-bold px-6 py-3 rounded-xl shadow-lg shadow-indigo-200 transition-all duration-300 hover:-translate-y-1 active:translate-y-0 active:scale-95"
                                >
                                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                    </svg>
                                    Download Summary
                                </button>
                            </div>

                            {/* Summary card */}
                            <div className="bg-white/70 backdrop-blur-xl border border-white/80 p-6 sm:p-10 md:p-12 rounded-[2rem] sm:rounded-[2.5rem] w-full shadow-[0_8px_30px_rgb(0,0,0,0.04)] text-left relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-[100px] -z-10 opacity-50"></div>
                                <div className="prose prose-indigo max-w-none text-gray-700">
                                    <p className="whitespace-pre-wrap leading-relaxed text-[15px] sm:text-[16px] md:text-[17px]">{summary}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SummaryPage;