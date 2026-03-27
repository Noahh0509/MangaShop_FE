import { useState } from 'react';
import axios from 'axios';

export default function StepEmail({ email, setEmail, onNext }) {
    const [error, setError]     = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        setError('');
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError('Vui lòng nhập địa chỉ email hợp lệ.');
            return;
        }
        try {
            setLoading(true);
            await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/forgot-password`, { email });
            onNext();
        } catch {
            setError('Có lỗi xảy ra. Vui lòng thử lại.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {/* Icon */}
            <div className="w-[72px] h-[72px] border border-[#8a6d2f] flex items-center justify-center mx-auto mb-7"
                style={{ animation: 'float 4s ease infinite' }}>
                <svg width="28" height="28" fill="none" stroke="#c9a84c" strokeWidth="1.5" viewBox="0 0 24 24">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
            </div>

            <p className="text-[10px] tracking-[0.22em] uppercase text-[#c9a84c] text-center mb-3">
                Khôi phục tài khoản
            </p>
            <h1 className="font-['Cormorant_Garamond'] font-light text-[clamp(32px,5vw,48px)] leading-[1.1] text-center mb-3">
                Quên mật <em className="italic text-[#c9a84c]">khẩu?</em>
            </h1>
            <p className="text-[13px] text-[#999] text-center leading-[1.8] mb-9 max-w-[340px] mx-auto">
                Nhập địa chỉ email đã đăng ký. Chúng tôi sẽ gửi mã xác thực để đặt lại mật khẩu.
            </p>

            {/* Input email */}
            <div className="flex flex-col gap-2 mb-5">
                <label className="text-[10px] tracking-[0.18em] uppercase text-[#888]">
                    Địa chỉ email *
                </label>
                <div className="relative">
                    <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                        placeholder="your@email.com"
                        className="w-full bg-transparent border border-[#222] text-[#e8e2d9] text-[14px] px-4 py-[14px] pr-11 outline-none transition-colors duration-200 placeholder:text-[#444] focus:border-[#8a6d2f]"
                    />
                    <svg className="absolute right-[14px] top-1/2 -translate-y-1/2 text-[#555] pointer-events-none"
                        width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                        <polyline points="22,6 12,13 2,6"/>
                    </svg>
                </div>
                {error && <p className="text-[11px] text-[#c0504a] mt-1">{error}</p>}
            </div>

            <button
                onClick={handleSubmit}
                disabled={loading}
                className="block w-full py-4 bg-[#c9a84c] text-black text-[11px] tracking-[0.18em] uppercase font-medium border-none cursor-pointer transition-all duration-200 hover:bg-[#e0bc5f] hover:-translate-y-px mb-4 disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0"
            >
                {loading ? 'Đang gửi...' : 'Gửi mã xác thực →'}
            </button>

            <button
                onClick={() => window.history.back()}
                className="block w-full py-[14px] bg-transparent text-[#888] text-[11px] tracking-[0.16em] uppercase border border-[#222] cursor-pointer transition-all duration-200 hover:border-[#8a6d2f] hover:text-[#c9a84c]"
            >
                Hủy
            </button>
        </div>
    );
}