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
        <nav className="fixed left-0 top-0 h-screen w-64 z-50 transition-all duration-300 bg-white/80 backdrop-blur-xl border-r border-blue-100/50 shadow-[4px_0_30px_rgba(0,0,0,0.03)] hidden md:flex flex-col">
            {/* Header Section */}
            <div className="flex items-center h-20 px-6 shrink-0 border-b border-transparent">
                <Link to="/" className="flex items-center gap-3 transition-transform hover:scale-105 duration-300">
                    <div className="relative flex items-center justify-center p-2 bg-linear-to-tr from-blue-600 to-indigo-500 rounded-xl shadow-lg shadow-blue-500/30">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                    </div>
                    <span className="font-extrabold text-xl tracking-tight bg-clip-text text-transparent bg-linear-to-r from-blue-700 to-indigo-600">
                        SG
                    </span>
                </Link>
            </div>

            {/* Navigation Links */}
            <div className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-2 no-scrollbar">
                {navLinks.map((link) => {
                    const isActive = location.pathname === link.path;
                    return (
                        <Link
                            key={link.name}
                            to={link.path}
                            className={`relative px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center group ${isActive
                                ? 'bg-blue-50 text-blue-600 shadow-sm border border-blue-100'
                                : 'text-gray-500 hover:bg-gray-50 hover:text-blue-600'
                                }`}
                        >
                            <span className="relative z-10 w-full text-left">{link.name}</span>
                            {/* Active indicator line */}
                            {isActive && (
                                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-blue-600 rounded-r-full"></span>
                            )}
                        </Link>
                    )
                })}
            </div>

            {/* Bottom action area (Profile & Notifications) */}
            <div className="p-4 border-t border-gray-100 shrink-0">
                <button className="flex items-center gap-3 w-full p-2 rounded-xl hover:bg-gray-50 transition-colors">
                    <div className="flex flex-shrink-0 items-center justify-center w-10 h-10 rounded-full bg-blue-50 border border-blue-100 text-blue-600 shadow-sm">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                    </div>
                    <div className="flex flex-col text-left overflow-hidden">
                        <span className="text-sm font-semibold text-gray-700 truncate w-full">Notifications</span>
                        <span className="text-xs text-gray-500 truncate w-full">2 new updates</span>
                    </div>
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
