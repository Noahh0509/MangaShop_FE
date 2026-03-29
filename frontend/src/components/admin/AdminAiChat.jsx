import React, { useState, useEffect, useRef } from "react";
import { Send, X, Bot, Loader2 } from "lucide-react";
import { chatService } from "../../services/chatService";

export default function AdminAIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  // --- SỬA LỖI TẠI ĐÂY ---
  // Lấy userId từ localStorage (đây là chuỗi 24 ký tự chuẩn ObjectId)
  // Nếu không có, ta dùng một chuỗi 24 ký tự mặc định để tránh lỗi CastError
  const getValidSessionId = () => {
    const userId = localStorage.getItem("userId"); 
    // Kiểm tra xem có phải định dạng ObjectId 24 ký tự không
    const regexExp = /^[0-9a-fA-F]{24}$/;
    if (userId && regexExp.test(userId)) {
      return userId;
    }
    // Nếu không có userId hợp lệ, dùng ID mặc định (24 số 0) để không bị crash BE
    return "000000000000000000000000"; 
  };

  const sessionId = useRef(getValidSessionId()).current;

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, loading, isOpen]);

  const handleSend = async () => {
    const messageContent = input.trim();
    if (!messageContent || loading) return;

    const userMsg = { role: "user", content: messageContent };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      // Gọi qua chatService của Huy
      const data = await chatService.sendMessageToBot(sessionId, messageContent);
      
      if (data && data.reply) {
        setMessages((prev) => [...prev, { role: "bot", content: data.reply }]);
      }
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages((prev) => [
        ...prev, 
        { role: "bot", content: "Lỗi kết nối server (Có thể do Token hết hạn hoặc ID không hợp lệ). Huy kiểm tra lại terminal nhé! 🛠️" }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999]">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-full shadow-2xl transition-all transform hover:scale-110 flex items-center gap-2 border-2 border-white"
        >
          <Bot size={28} />
          <span className="font-bold pr-1 text-white">Hỏi Admin AI</span>
        </button>
      )}

      {isOpen && (
        <div className="bg-white w-[350px] md:w-[400px] h-[550px] shadow-2xl rounded-2xl border border-gray-200 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5">
          {/* Header */}
          <div className="bg-indigo-600 p-4 text-white flex justify-between items-center shadow-md">
            <div className="flex items-center gap-2">
              <div className="bg-white/20 p-1.5 rounded-lg text-white">
                <Bot size={22} />
              </div>
              <div>
                <p className="font-bold text-sm leading-none text-white">MangaParadise Assistant</p>
                <p className="text-[10px] text-indigo-200 mt-1">Trợ lý quản trị (Session: {sessionId.slice(-4)})</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-1.5 rounded-full text-white">
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-2 opacity-60">
                <Bot size={40} className="text-indigo-600 mb-2" />
                <p className="text-gray-800 text-sm font-bold">Chào Huy Admin!</p>
                <p className="text-gray-500 text-xs px-10 italic">Hỏi tôi về doanh thu, tồn kho hoặc quản lý sản phẩm.</p>
              </div>
            )}
            
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] p-3 shadow-sm text-sm ${
                  m.role === "user" 
                  ? "bg-indigo-600 text-white rounded-2xl rounded-tr-none" 
                  : "bg-white text-gray-800 border border-gray-100 rounded-2xl rounded-tl-none"
                }`}>
                  {m.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-100 p-3 rounded-2xl shadow-sm flex items-center gap-2 text-indigo-600">
                  <Loader2 size={16} className="animate-spin" />
                  <span className="text-xs font-medium">AI đang tra cứu...</span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-gray-100">
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-1">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    placeholder="Nhập nội dung hỏi AI..."
                    className="flex-1 bg-transparent py-2 text-sm focus:outline-none text-gray-700"
                />
                <button onClick={handleSend} disabled={loading} className="text-indigo-600 disabled:text-gray-300">
                    <Send size={20} />
                </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}