const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const chatService = {
    /**
     * Gửi tin nhắn tới MangaExpert AI
     */
    sendMessageToBot: async (sessionId, content) => {
        try {
            const token = localStorage.getItem('accessToken'); 

            const response = await fetch(`${API_URL}/api/chat/bot`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token ? `Bearer ${token}` : ''
                },
                credentials: 'include', 
                body: JSON.stringify({ sessionId, content })
            });
            
            // Kiểm tra nếu response không thành công (vd: 401, 500)
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Lỗi server');
            }

            return await response.json(); 
        } catch (error) {
            console.error("Lỗi tại chatService:", error.message);
            throw error;
        }
    }
};