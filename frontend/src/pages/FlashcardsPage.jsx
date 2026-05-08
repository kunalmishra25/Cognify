import React from 'react';
import { useNavigate } from 'react-router-dom';

const FlashcardsPage = () => {
    const navigate = useNavigate();

    return (
        <div className="h-full min-h-screen w-full bg-transparent flex flex-col pt-10 md:pt-20">
            <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 flex-1 flex flex-col">
                <div className="mb-8 md:mb-12 text-center">
                    <h1 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-800 to-gray-600 tracking-tight pb-1">Flashcards</h1>
                    <p className="text-[14px] sm:text-[16px] text-gray-500 mt-3 md:mt-4 max-w-lg mx-auto font-medium px-4">Master your study material with AI-generated flashcards for active recall.</p>
                </div>
                
                <div className="flex-1 flex flex-col items-center justify-center w-full pb-20">
                    <div className="text-center bg-white/60 backdrop-blur-xl p-8 sm:p-14 rounded-[2rem] sm:rounded-[2.5rem] border border-white/80 w-full max-w-lg shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                        <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-full shadow-inner flex items-center justify-center mx-auto mb-6 sm:mb-8 border border-white">
                            <svg className="w-10 h-10 sm:w-12 sm:h-12 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4 tracking-tight">No Flashcards Yet</h3>
                        <p className="text-gray-500 mb-8 sm:mb-10 text-[14px] sm:text-[16px] leading-relaxed px-2 sm:px-4">Upload a document first to let our AI automatically generate a study deck for you.</p>
                        <button onClick={() => navigate('/upload')} className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-8 sm:px-10 py-3.5 sm:py-4 rounded-2xl font-semibold transition-all duration-300 shadow-[0_8px_20px_rgba(99,102,241,0.3)] hover:shadow-[0_8px_25px_rgba(99,102,241,0.45)] hover:-translate-y-1 active:translate-y-0 active:scale-[0.98] text-[15px] sm:text-[16px]">Generate Flashcards</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FlashcardsPage;