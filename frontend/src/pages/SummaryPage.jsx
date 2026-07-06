import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

const SummaryPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const summary = location.state?.summary;

    return (
        <div className="h-full min-h-screen w-full bg-transparent flex flex-col pt-10 md:pt-20 pb-20">
            <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 flex-1 flex flex-col">
                
                {/* Unified Centered Page Header */}
                <div className="mb-8 md:mb-12 text-center">
                    <h1 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-800 to-gray-600 tracking-tight pb-1">
                        Generated Summary
                    </h1>
                    <p className="text-[14px] sm:text-[16px] text-gray-500 mt-3 md:mt-4 max-w-lg mx-auto font-medium px-4">
                        Review the AI-generated study notes extracted from your uploaded document.
                    </p>
                </div>

                {!summary ? (
                    <div className="text-center bg-white/60 backdrop-blur-xl p-8 sm:p-14 rounded-[2rem] sm:rounded-[2.5rem] border border-white/80 w-full max-w-lg mx-auto shadow-[0_8px_30px_rgb(0,0,0,0.04)] mt-10">
                        <div className="w-20 h-20 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-full shadow-inner flex items-center justify-center mx-auto mb-6 border border-white">
                            <svg className="w-10 h-10 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 tracking-tight">No Summary Found</h3>
                        <p className="text-gray-500 mb-8 text-[14px] sm:text-[16px] leading-relaxed px-4">
                            It looks like you haven't uploaded a document yet. Let's get started.
                        </p>
                        <button 
                            onClick={() => navigate('/upload')} 
                            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-8 py-3.5 rounded-2xl font-semibold transition-all duration-300 shadow-[0_8px_20px_rgba(99,102,241,0.3)] text-[15px]"
                        >
                            Go to Upload
                        </button>
                    </div>
                ) : (
                    <div className="flex-1 flex flex-col w-full">
                        
                        {/* Document Metadata Row */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                            <div className="flex items-center gap-3.5">
                                <div className="w-10 h-10 rounded-xl bg-red-50 text-red-500 flex items-center justify-center shrink-0 border border-red-100/50 shadow-sm">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="text-left">
                                    <h3 className="text-sm font-bold text-gray-800 leading-tight">
                                        Generated Notes
                                    </h3>
                                    <span className="text-[11px] text-gray-400 font-semibold uppercase tracking-wider">
                                        AI Study Guide
                                    </span>
                                </div>
                            </div>

                            {/* Toolbar Buttons */}
                            <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
                                <button 
                                    className="p-2.5 bg-white border border-gray-150 hover:bg-gray-50 rounded-xl text-gray-400 hover:text-indigo-500 transition-all cursor-not-allowed group relative"
                                    title="Add Note"
                                >
                                    <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                                    </svg>
                                    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 text-[10px] text-white bg-gray-800 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-md z-20">Add (Coming Soon)</span>
                                </button>
                                
                                <button 
                                    className="p-2.5 bg-white border border-gray-150 hover:bg-red-50/50 rounded-xl text-gray-400 hover:text-red-500 transition-all cursor-not-allowed group relative"
                                    title="Delete Note"
                                >
                                    <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 text-[10px] text-white bg-gray-800 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-md z-20">Delete (Coming Soon)</span>
                                </button>

                                <button 
                                    className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-[13px] font-bold px-4 py-2.5 rounded-xl shadow-lg shadow-indigo-100 transition-all duration-300 cursor-not-allowed group relative"
                                    title="Download notes"
                                >
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                    </svg>
                                    <span>Download</span>
                                    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 text-[10px] text-white bg-gray-800 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-md z-20">Download (Coming Soon)</span>
                                </button>
                            </div>
                        </div>

                        {/* Summary Notes Card */}
                        <div className="bg-white/70 backdrop-blur-xl border border-white/80 p-6 sm:p-10 md:p-12 rounded-[2rem] sm:rounded-[2.5rem] w-full shadow-[0_8px_30px_rgb(0,0,0,0.04)] text-left relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-[100px] -z-10 opacity-50"></div>
                            
                            {/* Structured text container */}
                            <div className="markdown-content">
                                <ReactMarkdown>
                                    {summary}
                                </ReactMarkdown>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SummaryPage;