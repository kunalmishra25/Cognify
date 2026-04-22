import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation();

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Dashboard', path: '/dashboard' },
        { name: 'Upload', path: '/upload' },
        { name: 'Summary', path: '/summary' },
        { name: 'Quiz', path: '/quiz' },
        { name: 'Flashcards', path: '/flashcards' },
    ];

    return (
        <nav className="fixed left-0 top-0 h-screen w-64 z-50 bg-white border-r border-gray-100 hidden md:flex flex-col shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
            {/* Header Section */}
            <div className="flex items-center h-24 px-8 shrink-0">
                <Link to="/" className="flex items-center gap-3 transition-transform hover:scale-105 duration-200">
                    <div className="relative flex items-center justify-center w-10 h-10 bg-linear-to-tr from-[#5b75f0] to-[#6B82F6] rounded-xl shadow-lg shadow-[#6B82F6]/30">
                        <span className="font-bold text-white text-lg tracking-wide">SG</span>
                    </div>
                    <span className="font-bold text-xl text-gray-800 tracking-tight">
                        SG
                    </span>
                </Link>
            </div>

            {/* Navigation Links */}
            <div className="flex-1 px-4 py-6 flex flex-col gap-1.5 overflow-y-auto no-scrollbar">
                <div className="px-4 mb-2">
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Menu</span>
                </div>
                {navLinks.map((link) => {
                    const isActive = location.pathname === link.path;
                    return (
                        <Link
                            key={link.name}
                            to={link.path}
                            className={`relative px-4 py-3.5 rounded-xl text-[14.5px] font-semibold transition-all duration-200 flex items-center group ${isActive
                                ? 'bg-[#6B82F6] text-white shadow-md shadow-[#6B82F6]/30'
                                : 'text-gray-500 hover:bg-gray-200 hover:text-gray-900'
                                }`}
                        >
                            <span className="relative z-10 w-full text-left">{link.name}</span>
                            {/* Active indicator line */}
                            {isActive && (
                                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-white rounded-r-full"></span>
                            )}
                        </Link>
                    )
                })}
            </div>

            {/* Bottom action area (Profile & Notifications) */}
            <div className="p-4 shrink-0 mb-4">
                <button className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                    <div className="flex flex-`shrink-0` items-center justify-center w-10 h-10 rounded-full bg-[#6B82F6]/10 text-[#6B82F6]">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                    </div>
                    <div className="flex flex-col text-left overflow-hidden">
                        <span className="text-[14px] font-semibold text-gray-800 truncate w-full">Notifications</span>
                        <span className="text-[12px] text-gray-500 truncate w-full">2 new updates</span>
                    </div>
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
