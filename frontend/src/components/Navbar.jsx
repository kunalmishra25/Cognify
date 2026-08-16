import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Logo from './Logo';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { user, logout } = useAuth();

    const isLoggedIn = !!user;
    const userName = user?.fullname || 'Guest';
    const userEmail = user?.email || '';
    const userInitials = user?.fullname
        ? user.fullname.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
        : 'G';

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    const navLinks = [
        { name: 'Dashboard', path: '/dashboard', icon: <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg> },
        { name: 'Upload', path: '/upload', icon: <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg> },
        { name: 'Summary', path: '/summary', icon: <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg> },
        { name: 'My Notes', path: '/mynotes', icon: <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 4h10a2 2 0 012 2v12a2 2 0 01-2 2H7a2 2 0 01-2-2V6a2 2 0 012-2zM8 6h8M8 10h8M8 14h6" /></svg> },
        { name: 'Profile', path: '/profile', icon: <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg> },
    ];

    const visibleLinks = navLinks;
    const mobileBottomLinks = navLinks;

    // ── Logout confirmation modal state ──
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const confirmLogout = async () => {
        setShowLogoutModal(false);
        await handleLogout();
    };

    return (
        <>
            {/* ── Logout Confirmation Modal ── */}
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
                                onClick={confirmLogout}
                                className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-sm font-semibold text-white transition-colors shadow-md shadow-red-500/20"
                            >
                                Log out
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Desktop Sidebar */}
            <nav className="fixed left-0 top-0 h-screen w-64 z-50 bg-white border-r border-gray-100 hidden md:flex flex-col shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
                {/* Header Section */}
                <div className="flex items-center h-24 px-8 shrink-0">
                    <Link to={isLoggedIn ? "/dashboard" : "/"} className="flex items-center transition-transform hover:scale-[1.02] duration-200">
                        <Logo className="h-14 w-auto max-w-[170px]" />
                    </Link>
                </div>

                {/* Navigation Links */}
                <div className="flex-1 px-4 py-6 flex flex-col gap-1.5 overflow-y-auto no-scrollbar">
                    <div className="px-4 mb-2">
                        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Menu</span>
                    </div>
                    {visibleLinks.map((link) => {
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
                                {isActive && (
                                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-white rounded-r-full"></span>
                                )}
                            </Link>
                        )
                    })}
                </div>

                {/* Bottom action area (User Profile) */}
                <div className="p-4 shrink-0 mb-4 border-t border-gray-100">
                    <div className="flex items-center gap-3 w-full p-2 rounded-xl hover:bg-gray-50 transition-colors group mt-2">
                        <div className="flex shrink-0 items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-[#6B82F6]/20 to-[#6B82F6]/10 text-[#6B82F6] border border-[#6B82F6]/20 group-hover:scale-105 transition-transform">
                            <span className="font-bold text-[14px]">{userInitials}</span>
                        </div>
                        <div className="flex flex-col text-left overflow-hidden">
                            <span className="text-[14px] font-bold text-gray-800 truncate max-w-[110px] group-hover:text-[#6B82F6] transition-colors">{userName}</span>
                            <span className="text-[12px] text-gray-500 truncate max-w-[110px]">{userEmail || 'Free Plan'}</span>
                        </div>
                        {isLoggedIn && (
                            <button
                                onClick={() => setShowLogoutModal(true)}
                                title="Logout"
                                className="ml-auto p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all duration-200 cursor-pointer"
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                            </button>
                        )}
                    </div>
                </div>
            </nav>

            <header className="fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-6 z-50 md:hidden shadow-sm">
                <Link to={isLoggedIn ? "/dashboard" : "/"} className="flex items-center">
                    <Logo className="h-8 w-auto" />
                </Link>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-500 hover:text-[#6B82F6] transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                        </svg>
                    </button>
                </div>
            </header>

            {/* Mobile Bottom Navigation */}
            <nav className="fixed bottom-0 left-0 right-0 h-[72px] bg-white/80 backdrop-blur-md border-t border-gray-100 flex items-center justify-around px-4 z-50 md:hidden shadow-[0_-4px_24px_rgba(0,0,0,0.04)] pb-safe">
                {mobileBottomLinks.map((link) => {
                    const isActive = location.pathname === link.path;
                    return (
                        <Link
                            key={link.name}
                            to={link.path}
                            className={`flex flex-col items-center justify-center gap-1.5 px-3 py-1 rounded-2xl transition-all duration-300 ${isActive
                                ? 'text-[#6B82F6]'
                                : 'text-gray-400 hover:text-gray-600'}`}
                        >
                            <div className={`p-1 rounded-xl transition-all duration-300 ${isActive ? 'bg-[#6B82F6]/10' : ''}`}>
                                {React.cloneElement(link.icon, {
                                    className: `w-6 h-6 shrink-0 transition-colors duration-300 ${isActive ? 'text-[#6B82F6]' : 'text-gray-400'}`
                                })}
                            </div>
                            <span className={`text-[10px] font-bold tracking-tight transition-colors duration-300 ${isActive ? 'text-[#6B82F6]' : 'text-gray-400'}`}>
                                {link.name}
                            </span>
                        </Link>
                    )
                })}
            </nav>

            {/* Mobile Slide-over Menu (Drawer) */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-[60] md:hidden">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity"
                        onClick={() => setIsMobileMenuOpen(false)}
                    ></div>

                    {/* Menu Content */}
                    <div className="absolute right-0 top-0 bottom-0 w-[280px] bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
                        <div className="flex items-center justify-between h-20 px-6 border-b border-gray-50">
                            <Logo className="h-8 w-auto" />
                            <button
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="p-2 text-gray-400 hover:text-gray-600"
                            >
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-2">
                            {visibleLinks.map((link) => {
                                const isActive = location.pathname === link.path;
                                return (
                                    <Link
                                        key={link.name}
                                        to={link.path}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className={`flex items-center gap-3 px-4 py-4 rounded-xl text-sm font-bold transition-all ${isActive
                                            ? 'bg-[#6B82F6] text-white'
                                            : 'text-gray-500 hover:bg-gray-50'}`}
                                    >
                                        {link.icon}
                                        {link.name}
                                    </Link>
                                )
                            })}
                        </div>

                        <div className="p-6 border-t border-gray-50">
                            <div className="flex items-center gap-3 p-3 rounded-2xl bg-gray-50">
                                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#6B82F6] font-bold border border-gray-100">
                                    {userInitials}
                                </div>
                                <div className="flex flex-col text-left overflow-hidden">
                                    <span className="text-sm font-bold text-gray-800 truncate max-w-[120px]">{userName}</span>
                                    <span className="text-[10px] text-gray-500 truncate max-w-[120px]">{userEmail || 'Free Plan'}</span>
                                </div>
                                {isLoggedIn && (
                                    <button
                                        onClick={() => { setIsMobileMenuOpen(false); setShowLogoutModal(true); }}
                                        title="Logout"
                                        className="ml-auto p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all duration-200 cursor-pointer"
                                    >
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                        </svg>
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar;

