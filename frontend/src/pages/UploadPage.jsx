import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const UploadPage = () => {
    const [file, setFile] = useState(null);
    const [data, setdata] = useState("")
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    console.log("File is ", file);

    const callbackend = async () => {
        if (!file) return;
        setIsLoading(true);
        const formData = new FormData()
        formData.append('pdf', file)

        try {
            const res = await axios.post(
                'https://cognify-v5za.onrender.com/api/summary/upload',
                formData,
                {
                    withCredentials: true
                }
            );
            setdata(res.data.summary);
            return res.data.summary;
        }
        catch (error) {
            console.error('error', error);
        } finally {
            setIsLoading(false);
        }
    }

    const handleGenerateNotes = async () => {
        try {
            const result = await callbackend();
            navigate('/summary', {
                state: { summary: result }
            });
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="h-full min-h-screen w-full bg-transparent flex flex-col pt-12 md:pt-20">
            <div className="max-w-4xl mx-auto w-full px-6 flex-1 flex flex-col">
                <div className="mb-8 md:mb-12 text-center">
                    <h1 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-800 to-gray-600 tracking-tight pb-1">Upload Document</h1>
                    <p className="text-[14px] sm:text-[16px] text-gray-500 mt-3 md:mt-4 max-w-lg mx-auto font-medium px-4">Upload your study material in PDF format. Our AI will analyze the content and generate summaries, quiz questions, and flashcards instantly.</p>
                </div>

                <div className="flex-1 flex flex-col items-center">
                    {/* The actual upload zone */}
                    <input
                        type='file' id='fileUpload' accept='.pdf' className='hidden'
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                    <label
                        htmlFor="fileUpload"
                        className="group w-full flex flex-col items-center justify-center cursor-pointer border-2 border-dashed border-indigo-200 hover:border-indigo-400 bg-white/40 hover:bg-white/80 backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(99,102,241,0.1)] transition-all duration-500 rounded-[2rem] sm:rounded-[2.5rem] py-16 sm:py-24 px-6 sm:px-10 relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-indigo-50/30 pointer-events-none"></div>
                        <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white border border-indigo-50 rounded-full group-hover:scale-110 group-hover:shadow-[0_0_40px_rgba(99,102,241,0.2)] transition-all duration-500 flex items-center justify-center mb-6 sm:mb-8 shadow-sm z-10">
                            <svg className="w-8 h-8 sm:w-10 sm:h-10 text-indigo-300 group-hover:text-indigo-600 transition-colors duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                        </div>
                        <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 z-10">Click to select a file</h3>
                        <p className="text-[14px] sm:text-[15px] text-gray-500 z-10">or drag and drop it here</p>
                        <p className="text-[11px] sm:text-[12px] text-gray-400 mt-2 uppercase tracking-wider font-semibold z-10">PDF formats only</p>

                        {file && (
                            <div className="mt-8 flex items-center gap-3 bg-white border border-gray-100 shadow-sm rounded-xl px-5 py-3 transition-opacity z-10">
                                <div className="w-10 h-10 bg-[#6B82F6]/10 rounded-lg flex items-center justify-center shrink-0">
                                    <svg className="w-5 h-5 text-[#6B82F6]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" /></svg>
                                </div>
                                <div className="flex flex-col text-left">
                                    <span className="text-[14px] font-medium text-gray-800 truncate max-w-[200px]">{file.name}</span>
                                    <span className="text-[12px] text-gray-500">Ready to upload</span>
                                </div>
                            </div>
                        )}
                    </label>

                    <div className="w-full mt-10">
                        <button
                            disabled={!file || isLoading}
                            className={`w-full max-w-sm mx-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 active:scale-[0.98] cursor-pointer text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 shadow-[0_8px_20px_rgba(99,102,241,0.3)] hover:shadow-[0_8px_25px_rgba(99,102,241,0.45)] disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none flex justify-center items-center gap-2 text-[16px]`}
                            onClick={handleGenerateNotes}
                        >
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Analyzing Content...
                                </>
                            ) : 'Generate Notes'}
                        </button>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default UploadPage