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
            const res = await axios.post('http://localhost:5000/upload', formData)
            setdata(res.data.summary)
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
            navigate('/Summarypage');
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="h-full min-h-screen w-full bg-white flex flex-col pt-12 md:pt-20">
            <div className="max-w-4xl mx-auto w-full px-6 flex-1 flex flex-col">
                <div className="mb-12 text-center">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">Upload Document</h1>
                    <p className="text-[15px] text-gray-500 mt-3 max-w-lg mx-auto">Upload your study material in PDF format. Our AI will analyze the content and generate summaries, quiz questions, and flashcards instantly.</p>
                </div>

                <div className="flex-1 flex flex-col items-center">
                    {/* The actual upload zone */}
                    <input
                        type='file' id='fileUpload' accept='.pdf' className='hidden'
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                    <label
                        htmlFor="fileUpload"
                        className="group w-full flex flex-col items-center justify-center cursor-pointer border-2 border-dashed border-gray-200 hover:border-[#6B82F6] hover:bg-[#6B82F6]/5 transition-all duration-300 rounded-[32px] py-24 px-10 relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-linear-to-b from-transparent to-gray-50/50 pointer-events-none"></div>
                        <div className="w-20 h-20 bg-gray-50 border border-gray-100 rounded-full group-hover:scale-110 group-hover:bg-white group-hover:shadow-md transition-all duration-300 flex items-center justify-center mb-6 shadow-sm z-10">
                            <svg className="w-8 h-8 text-gray-400 group-hover:text-[#6B82F6] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2 z-10">Click to select a file</h3>
                        <p className="text-[15px] text-gray-500 z-10">or drag and drop it here</p>
                        <p className="text-[12px] text-gray-400 mt-2 uppercase tracking-wider font-semibold z-10">PDF formats only</p>

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
                            className={`w-full max-w-sm mx-auto bg-[#6B82F6] hover:bg-[#5B72E2] active:scale-[0.98] cursor-pointer text-white font-medium py-3.5 px-8 rounded-xl transition-all duration-200 shadow-lg shadow-[#6B82F6]/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none flex justify-center items-center gap-2 text-[15px]`}
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

                    {data && (
                        <div className='w-full mt-12 bg-gray-50/50 border border-gray-100 rounded-[24px] p-8 md:p-10 text-left mb-10'>
                            <div className='flex items-center gap-3 mb-6'>
                                <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center border border-teal-100">
                                    <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h3 className='text-xl font-bold text-gray-800 tracking-tight'>Analysis Complete</h3>
                            </div>
                            <div className="prose prose-sm max-w-none text-gray-600 leading-relaxed text-[15px]">
                                <p>{data}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div >
    )
}

export default UploadPage