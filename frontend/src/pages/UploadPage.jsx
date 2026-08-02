import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import API_BASE_URL from '../config'
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
                `${API_BASE_URL}/summary/upload`,
                formData,
                {
                    withCredentials: true
                }
            );
            setdata(res.data.summary);
            return res.data.summary;
        }
        catch (error) {
            console.log("STATUS:", error.response?.status);
            console.log("DATA:", error.response?.data);
            console.log("HEADERS:", error.response?.headers);
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
        <div className="h-full min-h-[calc(100vh-4rem)] w-full bg-transparent flex flex-col justify-center pt-4 md:pt-8 pb-12">
            <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 flex-1 flex flex-col justify-center">
                <div className="mb-4 md:mb-6 text-center shrink-0">
                    <h1 className="text-2xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-800 to-gray-600 tracking-tight pb-1">Upload Document</h1>
                    <p className="text-[13px] sm:text-[15px] text-gray-500 mt-2 max-w-lg mx-auto font-medium px-4">Upload your study material in PDF format. Our AI will analyze the content and generate summaries, quiz questions, and flashcards instantly.</p>
                </div>

                <div className="flex-1 flex flex-col items-center justify-center max-w-2xl mx-auto w-full">
                    {/* The actual upload zone */}
                    <input
                        type='file' id='fileUpload' accept='.pdf' className='hidden'
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                    <label
                        htmlFor="fileUpload"
                        className="group w-full flex flex-col items-center justify-center cursor-pointer border-2 border-dashed border-indigo-200 hover:border-indigo-400 bg-white/40 hover:bg-white/80 backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(99,102,241,0.1)] transition-all duration-500 rounded-[1.5rem] sm:rounded-[2rem] py-8 sm:py-12 px-6 sm:px-10 relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-indigo-50/30 pointer-events-none"></div>
                        <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white border border-indigo-50 rounded-full group-hover:scale-110 group-hover:shadow-[0_0_40px_rgba(99,102,241,0.2)] transition-all duration-500 flex items-center justify-center mb-3 sm:mb-4 shadow-sm z-10">
                            <svg className="w-7 h-7 sm:w-8 sm:h-8 text-indigo-300 group-hover:text-indigo-600 transition-colors duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                        </div>
                        <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-1 z-10">Click to select a file</h3>
                        <p className="text-[13px] sm:text-[14px] text-gray-500 z-10">or drag and drop it here</p>
                        <p className="text-[10px] sm:text-[11px] text-gray-400 mt-2 uppercase tracking-wider font-semibold z-10">PDF formats only</p>

                        {file && (
                            <div className="mt-4 flex items-center gap-3 bg-white border border-gray-100 shadow-sm rounded-xl px-4 py-2.5 transition-opacity z-10">
                                <div className="w-8 h-8 bg-[#6B82F6]/10 rounded-lg flex items-center justify-center shrink-0">
                                    <svg className="w-4 h-4 text-[#6B82F6]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" /></svg>
                                </div>
                                <div className="flex flex-col text-left">
                                    <span className="text-[13px] font-medium text-gray-800 truncate max-w-[200px]">{file.name}</span>
                                    <span className="text-[11px] text-gray-500">Ready to upload</span>
                                </div>
                            </div>
                        )}
                    </label>

                    <div className="w-full mt-6 sm:mt-8 shrink-0">
                        <button
                            disabled={!file || isLoading}
                            className={`w-full max-w-sm mx-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 active:scale-[0.98] cursor-pointer text-white font-semibold py-3.5 px-8 rounded-2xl transition-all duration-300 shadow-[0_8px_20px_rgba(99,102,241,0.3)] hover:shadow-[0_8px_25px_rgba(99,102,241,0.45)] disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none flex justify-center items-center gap-2 text-[15px]`}
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
        </div>
    )
}

export default UploadPage