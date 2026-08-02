import React from 'react';

const Profile = () => {
    return (
        <div className="h-full min-h-screen w-full bg-transparent flex flex-col pt-10 md:pt-16 pb-24">
            <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 flex-1 flex flex-col gap-6 md:gap-8">
                <div>
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-800 to-gray-600 tracking-tight pb-1">
                        Profile
                    </h1>
                    <p className="text-[14px] sm:text-[16px] text-gray-500 mt-1 font-medium">
                        Manage your account settings and preferences.
                    </p>
                </div>

                <div className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-[1.5rem] sm:rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col items-center justify-center min-h-[300px] text-center">
                    <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-500 flex items-center justify-center mb-4">
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Profile Page</h3>
                    <p className="text-gray-500 max-w-md text-sm">
                        This page is currently under development. Profile configuration options will be available soon.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Profile;
