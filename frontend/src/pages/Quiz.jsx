import React from 'react';
import { useNavigate } from 'react-router-dom';

const Quiz = () => {
    const navigate = useNavigate();

    return (
        <div className="h-full min-h-screen w-full bg-transparent flex flex-col pt-12 md:pt-20">
            <div className="max-w-4xl mx-auto w-full px-6 flex-1 flex flex-col">
                <div className="mb-12 text-center">
                    <h1 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-800 to-gray-600 tracking-tight pb-1">Dynamic Quizzes</h1>
                    <p className="text-[16px] text-gray-500 mt-4 max-w-lg mx-auto font-medium">Test your knowledge with multiple-choice questions based on your notes.</p>
                </div>
                
                <div className="flex-1 flex flex-col items-center justify-center w-full pb-20">
                    <div className="text-center bg-white/60 backdrop-blur-xl p-14 rounded-[2.5rem] border border-white/80 w-full max-w-lg shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                        <div className="w-24 h-24 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-full shadow-inner flex items-center justify-center mx-auto mb-8 border border-white">
                            <svg className="w-12 h-12 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-4 tracking-tight">Ready for a Quiz?</h3>
                        <p className="text-gray-500 mb-10 text-[16px] leading-relaxed px-4">Upload your study materials to instantly generate a custom multiple-choice quiz.</p>
                        <button onClick={() => navigate('/upload')} className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-10 py-4 rounded-2xl font-semibold transition-all duration-300 shadow-[0_8px_20px_rgba(99,102,241,0.3)] hover:shadow-[0_8px_25px_rgba(99,102,241,0.45)] hover:-translate-y-1 active:translate-y-0 active:scale-[0.98] text-[16px]">Upload Material</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Quiz;