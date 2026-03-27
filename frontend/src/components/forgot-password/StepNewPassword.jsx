import { useState } from 'react';
import axios from 'axios';

const getStrength = (val) => {
    if (!val) return null;
    let score = 0;
    if (val.length >= 8)          score++;
    if (/[A-Z]/.test(val))        score++;
    if (/[0-9]/.test(val))        score++;
    if (/[^A-Za-z0-9]/.test(val)) score++;
    const map = [
        { label: 'Yếu',      color: '#c0504a', width: '25%' },
        { label: 'Trung bình', color: '#e6a23c', width: '50%' },
        { label: 'Khá tốt',  color: '#c9a84c', width: '75%' },
        { label: 'Mạnh',     color: '#4a9968', width: '100%' },
    ];
    return map[score - 1] || map[0];
};

export default function StepNewPassword({ email, verifyToken, onNext }) {
    const [pw1, setPw1]         = useState('');
    const [pw2, setPw2]         = useState('');
    const [showPw1, setShowPw1] = useState(false);
    const [showPw2, setShowPw2] = useState(false);
    const [error, setError]     = useState('');
    const [loading, setLoading] = useState(false);

    const strength = getStrength(pw1);

    const handleSubmit = async () => {
        setError('');
        if (pw1.length < 6) {
            setError('Mật khẩu phải có ít nhất 6 ký tự.');
            return;
        }
        if (pw1 !== pw2) {
            setError('Mật khẩu nhập lại không khớp.');
            return;
        }
        try {
            setLoading(true);
            await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/reset-password`, {
                email,
                verifyToken,
                newPassword: pw1,
            });
            onNext();
        } catch (err) {
            setError(err.response?.data?.message || 'Có lỗi xảy ra. Vui lòng thử lại.');
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
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                </svg>
            </div>

            <p className="text-[10px] tracking-[0.22em] uppercase text-[#c9a84c] text-center mb-3">
                Tạo mật khẩu mới
            </p>
            <h1 className="font-['Cormorant_Garamond'] font-light text-[clamp(32px,5vw,48px)] leading-[1.1] text-center mb-3">
                Đặt lại <em className="italic text-[#c9a84c]">mật khẩu</em>
            </h1>
            <p className="text-[13px] text-[#999] text-center leading-[1.8] mb-9 max-w-[340px] mx-auto">
                Tạo mật khẩu mới cho tài khoản của bạn. Đảm bảo nó đủ mạnh và dễ nhớ.
            </p>

            {/* Mật khẩu mới */}
            <div className="flex flex-col gap-2 mb-5">
                <label className="text-[10px] tracking-[0.18em] uppercase text-[#888]">Mật khẩu mới *</label>
                <div className="relative">
                    <input
                        type={showPw1 ? 'text' : 'password'}
                        value={pw1}
                        onChange={e => setPw1(e.target.value)}
                        placeholder="Tối thiểu 6 ký tự"
                        className="w-full bg-transparent border border-[#222] text-[#e8e2d9] text-[14px] px-4 py-[14px] pr-11 outline-none transition-colors duration-200 placeholder:text-[#444] focus:border-[#8a6d2f]"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPw1(v => !v)}
                        className="absolute right-[14px] top-1/2 -translate-y-1/2 text-[#555] hover:text-[#c9a84c] transition-colors"
                    >
                        {showPw1 ? (
                            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                                <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                                <line x1="1" y1="1" x2="23" y2="23"/>
                            </svg>
                        ) : (
                            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                                <circle cx="12" cy="12" r="3"/>
                            </svg>
                        )}
                    </button>
                </div>

                {/* Strength meter */}
                {pw1 && (
                    <>
                        <div className="h-[2px] bg-[#222] relative overflow-hidden mt-1">
                            <div
                                className="h-full absolute left-0 top-0 transition-all duration-300"
                                style={{ width: strength?.width, background: strength?.color }}
                            />
                        </div>
                        <p className="text-[10px] tracking-[0.1em] uppercase mt-1" style={{ color: strength?.color }}>
                            Độ mạnh: {strength?.label}
                        </p>
                    </>
                )}
            </div>

            {/* Xác nhận mật khẩu */}
            <div className="flex flex-col gap-2 mb-6">
                <label className="text-[10px] tracking-[0.18em] uppercase text-[#888]">Xác nhận mật khẩu *</label>
                <div className="relative">
                    <input
                        type={showPw2 ? 'text' : 'password'}
                        value={pw2}
                        onChange={e => setPw2(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                        placeholder="Nhập lại mật khẩu"
                        className="w-full bg-transparent border border-[#222] text-[#e8e2d9] text-[14px] px-4 py-[14px] pr-11 outline-none transition-colors duration-200 placeholder:text-[#444] focus:border-[#8a6d2f]"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPw2(v => !v)}
                        className="absolute right-[14px] top-1/2 -translate-y-1/2 text-[#555] hover:text-[#c9a84c] transition-colors"
                    >
                        {showPw2 ? (
                            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                                <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                                <line x1="1" y1="1" x2="23" y2="23"/>
                            </svg>
                        ) : (
                            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                                <circle cx="12" cy="12" r="3"/>
                            </svg>
                        )}
                    </button>
                </div>
                {error && <p className="text-[11px] text-[#c0504a] mt-1">{error}</p>}
            </div>

            <button
                onClick={handleSubmit}
                disabled={loading}
                className="block w-full py-4 bg-[#c9a84c] text-black text-[11px] tracking-[0.18em] uppercase font-medium border-none cursor-pointer transition-all duration-200 hover:bg-[#e0bc5f] hover:-translate-y-px disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0"
            >
                {loading ? 'Đang xử lý...' : 'Đặt lại mật khẩu →'}
            </button>
        </div>
    );
}