import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const userInitial = user?.fullname
        ? user.fullname.trim()[0].toUpperCase()
        : 'K';

    const handleLogout = async () => {
        setShowLogoutModal(false);
        await logout();
        navigate('/login');
    };

    return (
        <div className="h-full min-h-screen w-full bg-transparent flex flex-col pt-10 md:pt-16 pb-24">
            <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 flex-1 flex flex-col gap-6 md:gap-8">
                {/* Header Section */}
                <div>
                    <h1 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-800 to-gray-600 tracking-tight pb-1">
                        Profile
                    </h1>
                    <p className="text-[14px] sm:text-[16px] text-gray-500 mt-2 font-medium">
                        View your account information and manage your session.
                    </p>
                </div>

                {/* Profile Card */}
                <div className="bg-white/70 backdrop-blur-xl border border-white/80 rounded-3xl p-6 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col gap-8">
                    {/* User Summary Header */}
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left border-b border-gray-100 pb-8">
                        <div className="w-16 h-16 rounded-full bg-indigo-50 text-[#6B82F6] flex items-center justify-center text-2xl font-bold shrink-0 border border-indigo-100">
                            {userInitial}
                        </div>
                        <div className="flex-1 min-w-0">
                            <h2 className="text-2xl font-bold text-gray-800 truncate">
                                {user?.fullname || 'User'}
                            </h2>
                            <p className="text-gray-500 text-sm mt-0.5 break-all">
                                {user?.email || 'No email provided'}
                            </p>
                            <span className="inline-block mt-3 px-3 py-1 bg-indigo-50 text-[#6B82F6] text-xs font-semibold rounded-full uppercase tracking-wider">
                                Active Account
                            </span>
                        </div>
                    </div>

                    {/* Account Details Grid */}
                    <div>
                        <h3 className="text-base font-bold text-gray-800 mb-4">
                            Account Information
                        </h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="p-4 rounded-2xl bg-gray-50/80 border border-gray-100">
                                <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">
                                    Full Name
                                </p>
                                <p className="mt-1 text-gray-800 font-medium">
                                    {user?.fullname || '-'}
                                </p>
                            </div>

                            <div className="p-4 rounded-2xl bg-gray-50/80 border border-gray-100">
                                <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">
                                    Email Address
                                </p>
                                <p className="mt-1 text-gray-800 font-medium break-all">
                                    {user?.email || '-'}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Actions / Logout Footer */}
                    <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                        <p className="text-xs text-gray-400 font-medium">
                            Need to exit your account?
                        </p>
                        <button
                            onClick={() => setShowLogoutModal(true)}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-50 text-red-600 font-semibold hover:bg-red-100 transition-all text-sm cursor-pointer"
                        >
                            <svg
                                className="w-4 h-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                />
                            </svg>
                            Logout
                        </button>
                    </div>
                </div>
            </div>

            {/* Logout Confirmation Modal */}
            {showLogoutModal && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
                        onClick={() => setShowLogoutModal(false)}
                    />
                    {/* Card */}
                    <div className="relative bg-white rounded-2xl shadow-2xl w-[90%] max-w-sm mx-auto p-7 flex flex-col items-center gap-5 animate-in fade-in zoom-in-95 duration-200">
                        {/* Icon */}
                        <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center">
                            <svg className="w-7 h-7 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                        </div>
                        <div className="text-center">
                            <h2 className="text-[17px] font-bold text-gray-900 mb-1">Log out?</h2>
                            <p className="text-sm text-gray-500">You'll need to sign in again to access your account.</p>
                        </div>
                        <div className="flex gap-3 w-full mt-1">
                            <button
                                onClick={() => setShowLogoutModal(false)}
                                className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleLogout}
                                className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-sm font-semibold text-white transition-colors shadow-md shadow-red-500/20"
                            >
                                Log out
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;
