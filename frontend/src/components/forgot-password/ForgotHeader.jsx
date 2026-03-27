import { Link } from 'react-router-dom';

export default function ForgotHeader() {
    return (
        <header className="relative z-10 flex items-center justify-between px-12 py-7 border-b border-[#161616]">
            <Link to="/" className="font-['Cormorant_Garamond'] text-[22px] font-semibold tracking-[0.08em] text-[#e8e2d9]">
                Manga<span className="text-[#c9a84c]">Shop</span>
            </Link>
            <Link
                to="/login"
                className="text-[11px] tracking-[0.12em] uppercase text-[#888] border-b border-[#333] pb-[2px] transition-all duration-200 hover:text-[#c9a84c] hover:border-[#c9a84c]"
            >
                ← Quay lại đăng nhập
            </Link>
        </header>
    );
}