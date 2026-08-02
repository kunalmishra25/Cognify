import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import authLogo from '../assets/logo_bgremove.png';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import API_BASE_URL from '../config';

const Signup = () => {
    const [showPassword, setShowPassword] = useState(false);
    //signup
    const [fullname, setfullname] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");

    const navigate = useNavigate();
    const { user, loading, setUser } = useAuth();

    useEffect(() => {
        if (!loading && user) {
            navigate('/dashboard', { replace: true });
        }
    }, [user, loading, navigate]);

    if (loading) {
        return (
            <div className="flex h-screen w-screen items-center justify-center bg-white">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#6B82F6]"></div>
            </div>
        );
    }

    if (user) {
        return null;
    }


    const handlesignup = async (e) => {
        e.preventDefault();

        const userdata = {
            fullname,
            email,
            password,
        }
        try {
            const response = await axios.post(`${API_BASE_URL}/auth/register`, userdata);
            setUser(response.data.user);
            setfullname("");
            setemail("");
            setpassword("");
            navigate('/dashboard');

        } catch (error) {
            console.log(error.response?.data || error.message)
        }

    }



    return (
        <div className="min-h-screen w-full flex flex-col md:flex-row overflow-x-hidden bg-white">
            {/* LEFT SIDE - Blue area */}
            <div className="hidden md:flex md:w-5/12 relative flex-col justify-between text-white overflow-hidden shrink-0">
                <div className="absolute inset-0 z-0 bg-[#5b75f0] overflow-hidden">
                    <svg className="absolute top-0 right-0 w-[150%] h-[150%] -translate-y-1/4 translate-x-1/4 opacity-30 pointer-events-none" viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="400" cy="400" r="399.5" stroke="white" strokeWidth="1" strokeOpacity="0.3" />
                        <circle cx="400" cy="400" r="300" stroke="white" strokeWidth="1" strokeOpacity="0.2" />
                        <circle cx="400" cy="400" r="200" stroke="white" strokeWidth="1" strokeOpacity="0.1" />
                        <path d="M100 400C100 234.315 234.315 100 400 100" stroke="white" strokeWidth="2" strokeOpacity="0.5" />
                    </svg>
                    <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full opacity-10 filter blur-2xl"></div>
                    <div className="absolute bottom-20 right-20 w-48 h-48 bg-white rounded-full opacity-20 filter blur-3xl"></div>
                    <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-white opacity-5"></div>
                    <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-indigo-700 opacity-20"></div>
                </div>

                <div className="relative z-10 p-12 flex flex-col h-full justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-3">
                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/12 ring-1 ring-white/20 backdrop-blur-sm">
                                <Logo src={authLogo} className="h-9 w-9" />
                            </div>
                            <span className="text-2xl font-bold tracking-wide text-white">Cognify</span>
                        </div>
                    </div>

                    <div className="mt-10 mb-auto flex-1 flex flex-col justify-center">
                        <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-5">
                            Start your <br />learning <br />journey today
                        </h1>
                        <p className="text-indigo-100 text-[15px] leading-relaxed max-w-xs font-light">
                            Join us and experience the perfect place to store your documents and generate AI study materials.
                        </p>
                    </div>

                    {/* CSS Illustration mimicking the folders/documents */}
                    <div className="flex justify-center mt-8 h-48 w-full items-end pb-8">
                        <div className="w-56 h-48 relative">
                            {/* Folder Back */}
                            <div className="absolute bottom-0 w-48 h-36 bg-[#2B54E8] rounded-xl shadow-lg left-4 origin-bottom-left"></div>

                            {/* Documents */}
                            <div className="absolute bottom-10 left-12 w-28 h-36 bg-white rounded-lg shadow-md border border-gray-50 transform -rotate-[15deg] p-3 flex flex-col gap-2 z-10">
                                <div className="w-8 h-8 rounded-md bg-rose-100 mb-1 flex items-center justify-center">
                                    <div className="w-4 h-4 bg-rose-500 rounded-full flex items-center justify-center">
                                        <div className="w-0 h-0 border-t-[4px] border-t-transparent border-l-[6px] border-l-white border-b-[4px] border-b-transparent ml-1"></div>
                                    </div>
                                </div>
                                <div className="w-full h-1.5 bg-gray-200 rounded-full"></div>
                                <div className="w-3/4 h-1.5 bg-gray-200 rounded-full"></div>
                            </div>

                            <div className="absolute bottom-16 left-24 w-28 h-36 bg-white rounded-lg shadow-md border border-gray-50 transform rotate-[8deg] p-3 flex flex-col gap-2 z-10">
                                <div className="w-full h-14 bg-amber-100 rounded mb-1 border-t-8 border-amber-300"></div>
                                <div className="w-full h-1.5 bg-gray-200 rounded-full"></div>
                                <div className="w-full h-1.5 bg-gray-200 rounded-full"></div>
                                <div className="w-1/2 h-1.5 bg-gray-200 rounded-full"></div>
                            </div>

                            <div className="absolute bottom-12 left-20 w-24 h-32 bg-white rounded-lg shadow-md border border-gray-50 transform -rotate-[4deg] p-3 flex flex-col gap-2 z-20">
                                <div className="w-full h-10 bg-teal-100 rounded mb-1"></div>
                                <div className="w-full h-1.5 bg-gray-200 rounded-full"></div>
                                <div className="w-2/3 h-1.5 bg-gray-200 rounded-full"></div>
                            </div>

                            {/* Folder Front */}
                            <div className="absolute bottom-0 w-52 h-28 bg-[#4970FA] rounded-xl shadow-lg left-2 origin-bottom-left z-30 flex items-center border-[0.5px] border-white/20"></div>

                            {/* Magnifying glass */}
                            <div className="absolute right-0 -bottom-4 z-40 transform rotate-[30deg]">
                                <div className="w-16 h-16 rounded-full border-[6px] border-indigo-200 bg-white/20 shadow-lg backdrop-blur-sm relative"></div>
                                <div className="w-5 h-10 bg-amber-400 absolute top-14 left-1/2 -ml-2.5 rounded-b-md shadow-md">
                                    <div className="w-full h-2 bg-yellow-300 rounded-t-sm"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* RIGHT SIDE - Form area */}
            <div className="w-full md:w-7/12 bg-white px-6 py-10 md:p-10 lg:p-12 flex flex-col justify-center relative min-h-screen md:h-full">
                <div className="max-w-md mx-auto w-full">
                    <Link to="/" className="inline-flex md:hidden mb-6">
                        <Logo src={authLogo} className="h-12 w-12" />
                    </Link>
                    <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-6 tracking-tight">Create Account</h2>

                    <form className="space-y-4" onSubmit={handlesignup}>
                        <div className="flex flex-col gap-1">
                            <label className="text-[13px] font-medium text-gray-500">Full Name</label>
                            <input
                                type="text"
                                placeholder="Enter your name" value={fullname} onChange={(e) => setfullname(e.target.value)}
                                className="w-full px-4 py-3.5 rounded-xl border border-gray-100 focus:border-[#6B82F6] focus:ring-2 focus:ring-[#6B82F6]/20 bg-gray-50/50 focus:bg-white outline-none transition-all placeholder:text-gray-400 text-[15px]"
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-[13px] font-medium text-gray-500">Email</label>
                            <input
                                type="email" required
                                placeholder="name@example.com" value={email} onChange={(e) => setemail(e.target.value)}
                                className="w-full px-4 py-3.5 rounded-xl border border-gray-100 focus:border-[#6B82F6] focus:ring-2 focus:ring-[#6B82F6]/20 bg-gray-50/50 focus:bg-white outline-none transition-all placeholder:text-gray-400 text-[15px]"
                            />
                        </div>

                        <div className="flex flex-col gap-1 relative">
                            <label className="text-[13px] font-medium text-gray-500">Password</label>
                            <div className="relative">
                                <style>{`
                                    input[type="password"]::-ms-reveal,
                                    input[type="password"]::-webkit-textfield-decoration-reveal {
                                        display: none;
                                    }
                                `}</style>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••••••" value={password} onChange={(e) => setpassword(e.target.value)}
                                    className="w-full px-4 py-3.5 rounded-xl border border-gray-100 focus:border-[#6B82F6] focus:ring-2 focus:ring-[#6B82F6]/20 bg-gray-50/50 focus:bg-white outline-none transition-all pr-12 placeholder:text-gray-400 text-[15px]"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    {showPassword ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className="pt-6">
                            <button type="submit" className="w-full bg-[#6B82F6] hover:bg-[#5B72E2] cursor-pointer text-white font-medium py-3.5 px-4 rounded-xl shadow-lg shadow-[#6B82F6]/30 transition duration-200 active:scale-[0.98] text-[15px]">
                                Sign Up
                            </button>
                        </div>
                    </form>

                    <div className="mt-6">
                        <div className="relative flex py-4 items-center">
                            <div className="flex-grow border-t border-gray-100"></div>
                            <span className="flex-shrink-0 mx-4 text-gray-400 text-[13px]">or</span>
                            <div className="flex-grow border-t border-gray-100"></div>
                        </div>

                        <div className="flex gap-4 justify-center mt-2">
                            <button className="flex items-center justify-center w-12 h-12 rounded-full border border-gray-100 shadow-sm hover:shadow-md transition-all hover:bg-gray-50 active:scale-95">
                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                    <path d="M1 1h22v22H1z" fill="none" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <p className="text-center mt-6 text-[14px] text-gray-500 font-medium">
                        Already have an account? <Link to="/login" className="font-semibold text-[#6B82F6] hover:text-indigo-700 transition-colors">Login</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Signup;
