// src/services/chatService.js

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const chatService = {
    /**
     * Gửi tin nhắn tới MangaExpert AI
     */
    sendMessageToBot: async (sessionId, content) => {
        try {
            // Lấy đúng key 'accessToken' như đã thấy trong tab Application
            const token = localStorage.getItem('accessToken'); 

            const response = await fetch(`${API_URL}/api/chat/bot`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Đính kèm token vào header Authorization để vượt qua middleware protect
                    'Authorization': token ? `Bearer ${token}` : ''
                },
                credentials: 'include', 
                body: JSON.stringify({ sessionId, content })
            });
            
            return await response.json(); 
        } catch (error) {
            console.error("Lỗi tại chatService:", error);
            throw error;
        }
    }
};