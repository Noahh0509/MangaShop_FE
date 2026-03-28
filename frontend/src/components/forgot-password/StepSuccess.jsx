import { Link } from 'react-router-dom';

export default function StepSuccess() {
    return (
        <div className="text-center" style={{ animation: 'fadeUp 0.5s ease both' }}>
            {/* Success icon */}
            <div className="w-[80px] h-[80px] border border-[#8a6d2f] rounded-full flex items-center justify-center mx-auto mb-7">
                <svg width="36" height="36" fill="none" viewBox="0 0 36 36">
                    <polyline
                        points="6,19 15,27 30,11"
                        stroke="#c9a84c"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </div>

            <p className="text-[10px] tracking-[0.22em] uppercase text-[#c9a84c] mb-3">
                Thành công
            </p>
            <h1 className="font-['Cormorant_Garamond'] font-light text-[clamp(32px,5vw,48px)] leading-[1.1] mb-3">
                Mật khẩu <br />
                <em className="italic text-[#c9a84c]">đã được đặt lại!</em>
            </h1>
            <p className="text-[13px] text-[#999] leading-[1.8] mb-8 max-w-[340px] mx-auto">
                Tuyệt vời! Mật khẩu của bạn đã được cập nhật thành công. Bạn có thể đăng nhập với mật khẩu mới ngay bây giờ.
            </p>

            <Link
                to="/login"
                className="block w-full py-4 bg-[#c9a84c] text-black text-[11px] tracking-[0.18em] uppercase font-medium text-center transition-all duration-200 hover:bg-[#e0bc5f] hover:-translate-y-px"
            >
                Đăng nhập ngay →
            </Link>
        </div>
    );
}