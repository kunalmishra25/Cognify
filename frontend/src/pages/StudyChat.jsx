import React, { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import axios from "axios";
import { useParams } from "react-router-dom";
import API_BASE_URL from "../config";

const StudyChat = () => {
    const { id } = useParams();
    const [question, setQuestion] = useState("");
    const [messages, setMessages] = useState([]);
    const [chatId, setChatId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // This automatically scrolls down whenever messages change or the AI loading state changes.
    const chatEndRef = useRef(null);
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({
            behavior: "smooth"
        });
    }, [messages, loading]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!question.trim() || loading) return;

        const currentQuestion = question.trim();
        setLoading(true);
        setError("");

        try {
            const response = await axios.post(`${API_BASE_URL}/chat/send`,
                {
                    summaryId: id,
                    question: currentQuestion,
                    chatId: chatId,
                },
                {
                    withCredentials: true
                }
            );
            setChatId(response.data.chatId);
            setMessages(response.data.data);
            setQuestion("");

        } catch (error) {
            console.log("Chat error", error);
            setError(error.response?.data?.message || "Unable to get response. Please try again.");

        } finally {
            setLoading(false);
        }

    };
    return (
        <div className="flex flex-col min-h-screen bg-[#f8faff]">

            {/* Header */}
            <div className="bg-white border-b border-gray-200 px-6 py-5">
                <div className="max-w-5xl mx-auto">
                    <p className="text-sm text-indigo-600 font-medium mb-1">
                        Cognify AI
                    </p>

                    <h1 className="text-2xl font-bold text-gray-800">
                        AI Study Assistant
                    </h1>

                    <p className="text-sm text-gray-500 mt-1">
                        Ask questions about your study material.
                    </p>
                </div>
            </div>


            {/* Chat area */}
            <div className="flex-1 w-full max-w-5xl mx-auto px-4 py-6">

                {/* Empty state */}
                {messages.length === 0 && (
                    <div className="flex flex-col items-center justify-center text-center mt-20">

                        <div className="w-16 h-16 rounded-2xl bg-indigo-100 flex items-center justify-center mb-5">
                            <span className="text-3xl">✦</span>
                        </div>

                        <h2 className="text-xl font-semibold text-gray-800">
                            What would you like to learn?
                        </h2>

                        <p className="text-gray-500 mt-2 max-w-md">
                            Ask Cognify to explain a concept, clarify a topic,
                            or help you understand your study material.
                        </p>

                        {/* Suggested questions */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-8 w-full max-w-2xl">

                            <button
                                type="button"
                                onClick={() =>
                                    setQuestion("Explain the main concepts in this material.")
                                }
                                className="text-left p-4 bg-white border border-gray-200 rounded-xl hover:border-indigo-300 hover:bg-indigo-50 transition"
                            >
                                <p className="font-medium text-gray-700">
                                    Explain the main concepts
                                </p>
                                <p className="text-sm text-gray-500 mt-1">
                                    Understand the important topics
                                </p>
                            </button>

                            <button
                                type="button"
                                onClick={() =>
                                    setQuestion("Explain this material in simple language.")
                                }
                                className="text-left p-4 bg-white border border-gray-200 rounded-xl hover:border-indigo-300 hover:bg-indigo-50 transition"
                            >
                                <p className="font-medium text-gray-700">
                                    Explain in simple language
                                </p>
                                <p className="text-sm text-gray-500 mt-1">
                                    Make difficult topics easier
                                </p>
                            </button>

                            <button
                                type="button"
                                onClick={() =>
                                    setQuestion("Give me an example of the important concepts.")
                                }
                                className="text-left p-4 bg-white border border-gray-200 rounded-xl hover:border-indigo-300 hover:bg-indigo-50 transition"
                            >
                                <p className="font-medium text-gray-700">
                                    Give me examples
                                </p>
                                <p className="text-sm text-gray-500 mt-1">
                                    Learn concepts through examples
                                </p>
                            </button>

                            <button
                                type="button"
                                onClick={() =>
                                    setQuestion("What are the most important points to remember?")
                                }
                                className="text-left p-4 bg-white border border-gray-200 rounded-xl hover:border-indigo-300 hover:bg-indigo-50 transition"
                            >
                                <p className="font-medium text-gray-700">
                                    Important points
                                </p>
                                <p className="text-sm text-gray-500 mt-1">
                                    Revise the key takeaways
                                </p>
                            </button>

                        </div>
                    </div>
                )}


                {/* Chat messages */}
                {messages.length > 0 && (
                    <div className="space-y-5">
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`flex ${msg.role === "user"
                                    ? "justify-end"
                                    : "justify-start"
                                    }`}
                            >
                                <div
                                    className={`max-w-[85%] p-4 rounded-2xl ${msg.role === "user"
                                        ? "bg-indigo-600 text-white"
                                        : "bg-white border border-gray-200 text-gray-700"
                                        }`}
                                >
                                    <p className="text-xs font-semibold mb-2 opacity-70">
                                        {msg.role === "user" ? "You" : "Cognify AI"}
                                    </p>

                                    {msg.role === "assistant" ? (
                                        <div className="text-sm leading-7 break-words">
                                            <ReactMarkdown
                                                remarkPlugins={[remarkGfm]}
                                                components={{
                                                    h1: ({ children }) => (
                                                        <h1 className="text-xl font-bold mt-4 mb-2">
                                                            {children}
                                                        </h1>
                                                    ),
                                                    h2: ({ children }) => (
                                                        <h2 className="text-lg font-bold mt-4 mb-2">
                                                            {children}
                                                        </h2>
                                                    ),
                                                    h3: ({ children }) => (
                                                        <h3 className="font-bold mt-3 mb-2">
                                                            {children}
                                                        </h3>
                                                    ),
                                                    p: ({ children }) => (
                                                        <p className="mb-3 last:mb-0">
                                                            {children}
                                                        </p>
                                                    ),
                                                    ul: ({ children }) => (
                                                        <ul className="list-disc pl-6 mb-3 space-y-1">
                                                            {children}
                                                        </ul>
                                                    ),
                                                    ol: ({ children }) => (
                                                        <ol className="list-decimal pl-6 mb-3 space-y-1">
                                                            {children}
                                                        </ol>
                                                    ),
                                                    li: ({ children }) => <li>{children}</li>,
                                                    strong: ({ children }) => (
                                                        <strong className="font-bold">
                                                            {children}
                                                        </strong>
                                                    ),
                                                    code: ({ children }) => (
                                                        <code className="bg-gray-100 text-indigo-700 px-1.5 py-0.5 rounded">
                                                            {children}
                                                        </code>
                                                    ),
                                                    pre: ({ children }) => (
                                                        <pre className="bg-gray-900 text-white p-4 rounded-xl overflow-x-auto my-3">
                                                            {children}
                                                        </pre>
                                                    ),
                                                    blockquote: ({ children }) => (
                                                        <blockquote className="border-l-4 border-indigo-400 pl-3 my-3 text-gray-500">
                                                            {children}
                                                        </blockquote>
                                                    ),
                                                    table: ({ children }) => (
                                                        <div className="overflow-x-auto my-3">
                                                            <table className="border-collapse w-full text-sm">
                                                                {children}
                                                            </table>
                                                        </div>
                                                    ),
                                                    th: ({ children }) => (
                                                        <th className="border border-gray-300 p-2 bg-gray-100 text-left">
                                                            {children}
                                                        </th>
                                                    ),
                                                    td: ({ children }) => (
                                                        <td className="border border-gray-300 p-2">
                                                            {children}
                                                        </td>
                                                    )
                                                }}
                                            >
                                                {msg.content}
                                            </ReactMarkdown>
                                        </div>
                                    ) : (
                                        <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
                                            {msg.content}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* AI loading */}
                {loading && (
                    <div className="flex justify-start mt-5">
                        <div className="bg-white border border-gray-200 rounded-2xl p-4 text-sm text-indigo-600">
                            Cognify AI is thinking...
                        </div>
                    </div>
                )}

                {/* Error message */}
                {error && (
                    <p className="text-sm text-red-500 mt-4 text-center">
                        {error}
                    </p>
                )}

                {/* Auto-scroll target */}
                <div ref={chatEndRef} />
            </div>

            {/* Message input */}
            <div className="sticky bottom-0 bg-white border-t border-gray-200 px-4 py-4">
                <form
                    onSubmit={handleSubmit}
                    className="max-w-5xl mx-auto"
                >
                    <div className="flex items-end gap-3 bg-gray-50 border border-gray-200 rounded-2xl p-3">
                        <textarea
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            placeholder="Ask a question about your study material..."
                            rows={1}
                            className="flex-1 resize-none bg-transparent outline-none text-gray-700 placeholder-gray-400 px-2 py-2"
                        />

                        <button
                            type="submit"
                            disabled={!question.trim() || loading}
                            className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed transition"
                        >
                            Send
                        </button>
                    </div>

                    <p className="text-xs text-gray-400 text-center mt-2">
                        Cognify AI answers using your saved study material.
                    </p>
                </form>
            </div>
        </div>
    );
};
export default StudyChat;
