import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const OTP_LENGTH = 6;
const TIMER_SECONDS = 299; // 4:59

export default function StepOtp({ email, onNext, onBack }) {
    const [otp, setOtp]         = useState(Array(OTP_LENGTH).fill(''));
    const [error, setError]     = useState('');
    const [loading, setLoading] = useState(false);
    const [timeLeft, setTimeLeft] = useState(TIMER_SECONDS);
    const [canResend, setCanResend] = useState(false);
    const inputRefs = useRef([]);

    // Đếm ngược
    useEffect(() => {
        if (timeLeft <= 0) { setCanResend(true); return; }
        const t = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
        return () => clearTimeout(t);
    }, [timeLeft]);

    const formatTime = (s) => {
        const m = Math.floor(s / 60);
        const sec = s % 60;
        return `${m}:${sec < 10 ? '0' : ''}${sec}`;
    };

    const handleChange = (val, idx) => {
        if (!/^\d?$/.test(val)) return;
        const next = [...otp];
        next[idx] = val;
        setOtp(next);
        if (val && idx < OTP_LENGTH - 1) inputRefs.current[idx + 1]?.focus();
    };

    const handleKeyDown = (e, idx) => {
        if (e.key === 'Backspace' && !otp[idx] && idx > 0) {
            inputRefs.current[idx - 1]?.focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, OTP_LENGTH);
        if (!pasted) return;
        const next = [...otp];
        pasted.split('').forEach((ch, i) => { next[i] = ch; });
        setOtp(next);
        inputRefs.current[Math.min(pasted.length, OTP_LENGTH - 1)]?.focus();
    };

    const handleResend = async () => {
        try {
            await axios.post('/api/auth/forgot-password', { email });
            setOtp(Array(OTP_LENGTH).fill(''));
            setTimeLeft(TIMER_SECONDS);
            setCanResend(false);
            setError('');
            inputRefs.current[0]?.focus();
        } catch {
            setError('Không thể gửi lại. Thử lại sau.');
        }
    };

    const handleVerify = async () => {
        const code = otp.join('');
        if (code.length < OTP_LENGTH) {
            setError('Vui lòng nhập đủ 6 chữ số.');
            return;
        }
        try {
            setLoading(true);
            setError('');
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/verify-otp`, { email, otp: code });
            onNext(res.data.verifyToken);
        } catch (err) {
            setError(err.response?.data?.message || 'Mã OTP không đúng hoặc đã hết hạn.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {/* Icon */}
            <div className="w-[72px] h-[72px] border border-[#8a6d2f] flex items-center justify-center mx-auto mb-7"
                style={{ animation: 'float 4s ease infinite 0.2s' }}>
                <svg width="28" height="28" fill="none" stroke="#c9a84c" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.18 2 2 0 0 1 3.6 1H6.6a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.59 8.84a16 16 0 0 0 6 6l1.21-1.21a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.6 16z"/>
                </svg>
            </div>

            <p className="text-[10px] tracking-[0.22em] uppercase text-[#c9a84c] text-center mb-3">
                Xác thực OTP
            </p>
            <h1 className="font-['Cormorant_Garamond'] font-light text-[clamp(32px,5vw,48px)] leading-[1.1] text-center mb-3">
                Nhập mã <em className="italic text-[#c9a84c]">xác thực</em>
            </h1>
            <p className="text-[13px] text-[#999] text-center leading-[1.8] mb-9 max-w-[340px] mx-auto">
                Chúng tôi đã gửi mã 6 chữ số đến{' '}
                <strong className="text-[#e8e2d9]">{email}</strong>.
                Mã có hiệu lực trong 5 phút.
            </p>

            {/* OTP inputs */}
            <div className="flex gap-[10px] justify-center mb-5" onPaste={handlePaste}>
                {otp.map((val, idx) => (
                    <input
                        key={idx}
                        ref={el => inputRefs.current[idx] = el}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={val}
                        onChange={e => handleChange(e.target.value, idx)}
                        onKeyDown={e => handleKeyDown(e, idx)}
                        className="w-[52px] h-[60px] bg-transparent border border-[#222] text-[#e8e2d9] font-['Cormorant_Garamond'] text-[28px] text-center outline-none transition-colors duration-200 focus:border-[#8a6d2f]"
                    />
                ))}
            </div>

            {error && <p className="text-[11px] text-[#c0504a] text-center mb-3">{error}</p>}

            {/* Timer / Resend */}
            <div className="text-center text-[12px] text-[#666] mb-6">
                {canResend ? (
                    <span
                        onClick={handleResend}
                        className="text-[#c9a84c] cursor-pointer border-b border-[#8a6d2f] pb-[1px] hover:text-[#e0bc5f] transition-colors"
                    >
                        Gửi lại mã
                    </span>
                ) : (
                    <span>
                        Gửi lại sau <strong className="text-[#e8e2d9]">{formatTime(timeLeft)}</strong>
                    </span>
                )}
            </div>

            <button
                onClick={handleVerify}
                disabled={loading}
                className="block w-full py-4 bg-[#c9a84c] text-black text-[11px] tracking-[0.18em] uppercase font-medium border-none cursor-pointer transition-all duration-200 hover:bg-[#e0bc5f] hover:-translate-y-px mb-4 disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0"
            >
                {loading ? 'Đang xác thực...' : 'Xác nhận →'}
            </button>

            <button
                onClick={onBack}
                className="block w-full py-[14px] bg-transparent text-[#888] text-[11px] tracking-[0.16em] uppercase border border-[#222] cursor-pointer transition-all duration-200 hover:border-[#8a6d2f] hover:text-[#c9a84c]"
            >
                ← Quay lại
            </button>
        </div>
    );
}