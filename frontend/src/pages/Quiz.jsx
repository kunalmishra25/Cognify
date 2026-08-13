import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import API_BASE_URL from "../config";

const Quiz = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [quiz, setQuiz] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [score, setScore] = useState(0);
    const [quizCompleted, setQuizCompleted] = useState(false);

    useEffect(() => {
        const getQuiz = async () => {
            try {
                const response = await axios.get(
                    `${API_BASE_URL}/quiz/${id}`,
                    {
                        withCredentials: true,
                    }
                );

                console.log("Quiz response:", response.data);

                setQuiz(response.data.data);
            } catch (error) {
                console.error("Error fetching quiz:", error);
            } finally {
                setLoading(false);
            }
        };

        getQuiz();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <h1>Loading...</h1>
            </div>
        );
    }

    if (!quiz) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <h1>Quiz not found</h1>
            </div>
        );
    }
    if (quizCompleted) {
        const percentage = Math.round(
            (score / quiz.quiz.length) * 100
        );

        let message;

        if (percentage >= 80) {
            message = "Excellent work! 🎉";
        } else if (percentage >= 60) {
            message = "Good job! 👍";
        } else if (percentage >= 40) {
            message = "Keep practicing! 💪";
        } else {
            message = "Don't give up. Keep learning! 📚";
        }

        return (
            <div className="min-h-screen flex items-center justify-center p-6">

                <div className="w-full max-w-lg bg-white rounded-3xl shadow-xl p-8 text-center">

                    <h1 className="text-3xl font-bold text-gray-800">
                        Quiz Completed 🎉
                    </h1>

                    <p className="mt-6 text-lg text-gray-500">
                        Your Score
                    </p>

                    <p className="mt-2 text-5xl font-bold text-blue-600">
                        {score} / {quiz.quiz.length}
                    </p>

                    <p className="mt-4 text-2xl font-semibold text-gray-700">
                        {percentage}%
                    </p>

                    <p className="mt-4 text-lg text-gray-500">
                        {message}
                    </p>
                    <div className="flex gap-4 justify-center mt-8">

                        <button
                            onClick={() => {
                                setCurrentQuestion(0);
                                setSelectedAnswer(null);
                                setScore(0);
                                setQuizCompleted(false);
                            }}
                            className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
                        >
                            Try Again
                        </button>

                        <button
                            onClick={() => navigate("/notes")}
                            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition"
                        >
                            Back to Notes
                        </button>

                    </div>

                </div>

            </div>
        );
    }

    const currentQuizQuestion = quiz.quiz[currentQuestion];

    const handleNext = () => {
        const isCorrect =
            selectedAnswer === currentQuizQuestion.correctAnswer;
        const updatedScore = isCorrect
            ? score + 1
            : score;

        if (currentQuestion < quiz.quiz.length - 1) {
            if (isCorrect) {
                setScore((prevScore) => prevScore + 1);
            }
            setCurrentQuestion((prevQuestion) => prevQuestion + 1);
            setSelectedAnswer(null);
        } else {
            setScore(updatedScore);
            setQuizCompleted(true);
        }
    };
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6">

            {/* File Name */}
            <h1 className="text-3xl font-bold">
                {quiz.fileName}
            </h1>

            {/* Question Counter */}
            <p className="mt-4 text-gray-500">
                Question {currentQuestion + 1} / {quiz.quiz.length}
            </p>

            {/* Question */}
            <h2 className="mt-8 text-2xl font-semibold text-center max-w-2xl">
                {currentQuizQuestion.question}
            </h2>

            {/* Options */}
            <div className="mt-8 w-full max-w-lg space-y-4">
                {currentQuizQuestion.options.map((option, index) => (
                    <button
                        key={index}
                        onClick={() => setSelectedAnswer(option)}
                        className={`w-full p-4 text-left rounded-xl border transition ${selectedAnswer === option
                            ? "border-blue-600 bg-blue-50"
                            : "border-gray-200 bg-white hover:bg-gray-50"
                            }`}
                    >
                        {option}
                    </button>
                ))}
            </div>

            {/* Next / Finish */}
            <button
                disabled={!selectedAnswer}
                onClick={handleNext}
                className="mt-8 px-8 py-3 bg-blue-600 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {currentQuestion === quiz.quiz.length - 1
                    ? "Finish"
                    : "Next"}
            </button>

        </div>
    );
};

export default Quiz;