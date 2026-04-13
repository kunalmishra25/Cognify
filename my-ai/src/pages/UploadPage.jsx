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

    return (
        <div className='flex-1 flex items-center justify-center p-6 bg-linear-to-b from-blue-50/50 to-white'>
            <div className='bg-white p-8 md:p-10 rounded-3xl shadow-xl shadow-blue-100/40 border border-gray-100 text-center space-y-8 w-full max-w-md'>

                <div>
                    <h1 className='text-3xl font-extrabold text-gray-800 tracking-tight'>Upload PDF</h1>
                    <p className='text-sm text-gray-500 mt-2'>Upload your study material to get started</p>
                </div>

                <input
                    type='file' id='fileUpload' accept='.pdf' className='hidden'
                    onChange={(e) => setFile(e.target.files[0])}
                />
                <label
                    htmlFor="fileUpload"
                    className="group flex flex-col items-center justify-center gap-4 cursor-pointer border-2 border-dashed border-blue-200 hover:border-blue-500 hover:bg-blue-50/50 transition-all duration-300 rounded-2xl px-6 py-12"
                >
                    <div className='p-4 bg-blue-50 rounded-full group-hover:scale-110 group-hover:bg-blue-100 transition-all duration-300'>
                        <svg className='w-8 h-8 text-blue-500' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12' />
                        </svg>
                    </div>
                    <div className='flex flex-col'>
                        <span className='text-base font-semibold text-gray-700'>Click to upload</span>
                        <span className='text-xs text-gray-400 mt-1'>PDF files only</span>
                    </div>
                </label>

                {/* Show selected file */}
                {file && (
                    <div className="flex items-center justify-center gap-2 text-sm text-blue-700 bg-blue-50/80 border border-blue-100 rounded-xl px-4 py-3 font-medium transition-all">
                        <svg className="w-5 h-5 flex-shrink-0'" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" /></svg>
                        <span className="truncate max-w-[200px]">{file.name}</span>
                    </div>
                )}

                <button
                    disabled={!file || isLoading}
                    className={`w-full bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 active:scale-[0.98] cursor-pointer text-white font-semibold py-3.5 rounded-xl transition-all duration-200 shadow-md shadow-blue-200 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2`}
                    onClick={() => {
                        callbackend();
                    }}
                >
                    {isLoading ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Generating...
                        </>
                    ) : 'Generate Summary'}
                </button>

                {data && (
                    <div className='bg-gray-50 border border-gray-100 rounded-2xl p-5 text-left shadow-inner transition-all relative overflow-hidden'>
                        <div className="absolute top-0 left-0 w-1 h-full bg-green-500"></div>
                        <div className='flex items-center gap-2 mb-3'>
                            <p className='text-xs font-bold text-gray-500 uppercase tracking-widest pl-2'>Summary Results</p>
                        </div>
                        <p className='text-sm text-gray-700 leading-relaxed pl-2'>{data}</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default UploadPage