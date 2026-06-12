import React from 'react'
import LandingPage from './pages/LandingPage'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import UploadPage from './pages/UploadPage'
import SummaryPage from './pages/SummaryPage'
import Quiz from './pages/Quiz'
import FlashcardsPage from './pages/FlashcardsPage'
import Navbar from './components/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoutes'
import MyNotes from './pages/MyNotes'



const App = () => {
    const location = useLocation();
    const hideNavbar = location.pathname === '/login' || location.pathname === '/signup' || location.pathname === '/';

    return (
        <div className="flex min-h-screen overflow-x-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#f6f8ff] via-white to-white">
            {!hideNavbar && <Navbar />}
            <main className={`flex-1 flex flex-col w-full min-h-screen transition-all duration-300 ${!hideNavbar ? 'md:ml-64 pt-16 pb-[72px] md:pt-0 md:pb-0' : ''}`}>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />

                    <Route element={<ProtectedRoute />}>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/upload" element={<UploadPage />} />
                        <Route path="/summary" element={<SummaryPage />} />
                        <Route path="/quiz" element={<Quiz />} />
                        <Route path="/flashcards" element={<FlashcardsPage />} />
                        <Route path="/mynotes" element={<MyNotes />} />


                    </Route>
                </Routes>
            </main>
        </div>
    )
}
export default App