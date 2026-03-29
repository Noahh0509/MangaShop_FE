import React, { useEffect, useRef, useState } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import HeroSection from '../components/home/HeroSection';
import FeaturedSection from '../components/home/Featuredsection';
import NewReleasesSection from '../components/home/Newreleasessection';
import { chatService } from '../services/chatService'; // Import service vừa tạo

export default function HomePage() {
    // Quản lý trạng thái khung chat
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'bot', content: 'Konichiwa! ✨ Mình là trợ lý AI của Manga Paradise. Bạn cần mình tư vấn bộ truyện nào hôm nay? 📚' }
    ]);
    const [input, setInput] = useState('');
    const [sessionId, setSessionId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    
    const messagesEndRef = useRef(null);

    // Tự động cuộn xuống khi có tin nhắn mới
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isChatOpen]);

    // Xử lý gửi tin nhắn
    const handleSendMessage = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage = input.trim();
        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
        setInput('');
        setIsLoading(true);

        try {
            const data = await chatService.sendMessageToBot(sessionId, userMessage);

            if (data.success) {
                if (!sessionId && data.sessionId) setSessionId(data.sessionId);
                
                // Kiểm tra nếu AI yêu cầu chuyển cho nhân viên (Handover)
                if (data.action === "SWITCH_TO_STAFF") {
                    setMessages(prev => [...prev, { role: 'bot', content: "Dạ, em sẽ kết nối ngay với nhân viên để hỗ trợ mình ạ!" }]);
                } else {
                    setMessages(prev => [...prev, { role: 'bot', content: data.reply }]);
                }
            } else {
                setMessages(prev => [...prev, { role: 'bot', content: data.message || "Có lỗi xảy ra rồi ạ!" }]);
            }
        } catch (error) {
            setMessages(prev => [...prev, { role: 'bot', content: "Không thể kết nối máy chủ. Thử lại sau nhé Huy!" }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-[#0e0e0e] text-[#e8e2d9] relative">
            <Header />
            <main className="flex-1">
                <HeroSection />
                <FeaturedSection />
                <NewReleasesSection />
            </main>
            <Footer />

            {/* --- UI CHAT BOX --- */}
            <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start">
                {!isChatOpen && (
                    <button
                        onClick={() => setIsChatOpen(true)}
                        className="w-14 h-14 bg-[#c9a84c] text-[#0e0e0e] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
                            <path d="M4.848 2.771A49.144 49.144 0 0 1 12 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 0 1-3.476.383.39.39 0 0 0-.297.17l-2.755 4.133a.75.75 0 0 1-1.248 0l-2.755-4.133a.39.39 0 0 0-.297-.17 48.9 48.9 0 0 1-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97Z" />
                        </svg>
                    </button>
                )}

                {isChatOpen && (
                    <div className="w-80 h-[450px] bg-[#1a1a1a] border border-[#c9a84c]/50 rounded-lg shadow-2xl flex flex-col overflow-hidden animate-fade-in-up">
                        <div className="bg-[#242424] p-3 border-b border-[#333] flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></div>
                                <h3 className="font-semibold text-sm text-[#c9a84c]">Manga Paradise Bot</h3>
                            </div>
                            <button onClick={() => setIsChatOpen(false)} className="text-gray-400 hover:text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="flex-1 p-4 overflow-y-auto space-y-4 text-sm scrollbar-thin scrollbar-thumb-[#333]">
                            {messages.map((msg, index) => (
                                <div key={index} className={`flex items-start gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                                    {msg.role === 'bot' && (
                                        <div className="w-8 h-8 shrink-0 rounded-full bg-[#333] flex items-center justify-center border border-[#c9a84c]/30 text-xs text-[#c9a84c] font-bold">AI</div>
                                    )}
                                    <div className={`max-w-[220px] p-3 rounded-xl ${msg.role === 'user' ? 'bg-[#c9a84c] text-[#0e0e0e] rounded-tr-none' : 'bg-[#242424] border border-[#333] text-[#e8e2d9] rounded-tl-none'}`}>
                                        <p className="whitespace-pre-wrap">{msg.content}</p>
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex items-start gap-2.5 italic text-gray-500">AI đang suy nghĩ...</div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        <div className="p-3 bg-[#242424] border-t border-[#333] flex items-center gap-2">
                            <input 
                                type="text" 
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                                placeholder="Nhập tin nhắn..." 
                                className="flex-1 bg-[#0e0e0e] text-sm text-[#e8e2d9] border border-[#333] rounded-md px-3 py-2 focus:outline-none focus:border-[#c9a84c]"
                            />
                            <button onClick={handleSendMessage} className="p-2 rounded-md bg-[#c9a84c] text-[#0e0e0e] hover:bg-[#b89840]">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 rotate-90">
                                    <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}