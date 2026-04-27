import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';

const Navbar = () => {
    const location = useLocation();

    const navLinks = [
        { name: 'Home', path: '/', icon: <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg> },
        { name: 'Dashboard', path: '/dashboard', icon: <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg> },
        { name: 'Upload', path: '/upload', icon: <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg> },
        { name: 'Summary', path: '/summary', icon: <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg> },
        { name: 'Quiz', path: '/quiz', icon: <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
        { name: 'Flashcards', path: '/flashcards', icon: <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg> },
    ];

    return (
        <nav className="fixed left-0 top-0 h-screen w-64 z-50 bg-white border-r border-gray-100 hidden md:flex flex-col shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
            {/* Header Section */}
            <div className="flex items-center h-24 px-8 shrink-0">
                <Link to="/" className="flex items-center transition-transform hover:scale-[1.02] duration-200">
                    <Logo className="h-14 w-auto max-w-[170px]" />
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
                            className={`relative px-4 py-3.5 rounded-xl text-[14.5px] font-semibold transition-all duration-200 flex items-center gap-3 group ${isActive
                                ? 'bg-[#6B82F6] text-white shadow-md shadow-[#6B82F6]/30'
                                : 'text-gray-500 hover:bg-gray-50 hover:text-[#6B82F6]'
                                }`}
                        >
                            {link.icon}
                            <span className="relative z-10 w-full text-left">{link.name}</span>
                            {/* Active indicator line */}
                            {isActive && (
                                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-white rounded-r-full"></span>
                            )}
                        </Link>
                    )
                })}
            </div>

            {/* Bottom action area (User Profile) */}
            <div className="p-4 shrink-0 mb-4 border-t border-gray-100">
                <button className="flex items-center gap-3 w-full p-2 rounded-xl hover:bg-gray-50 transition-colors group mt-2">
                    <div className="flex shrink-0 items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-[#6B82F6]/20 to-[#6B82F6]/10 text-[#6B82F6] border border-[#6B82F6]/20 group-hover:scale-105 transition-transform">
                        <span className="font-bold text-[14px]">KM</span>
                    </div>
                    <div className="flex flex-col text-left overflow-hidden">
                        <span className="text-[14px] font-bold text-gray-800 truncate w-full group-hover:text-[#6B82F6] transition-colors">Kunal Mishra</span>
                        <span className="text-[12px] text-gray-500 truncate w-full">Free Plan</span>
                    </div>
                    <div className="ml-auto text-gray-400 group-hover:text-gray-600 transition-colors">
                         <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>
                    </div>
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
