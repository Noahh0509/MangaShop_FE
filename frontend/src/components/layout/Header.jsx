import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();
    const isLoggedIn = !!localStorage.getItem('accessToken');

    // Giả sử cart count lưu trong localStorage, sau này thay bằng context/redux
    const cartCount = JSON.parse(localStorage.getItem('cart') || '[]').length;

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Đóng dropdown khi click ra ngoài
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        setDropdownOpen(false);
        navigate('/login');
    };

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 h-[72px] flex items-center justify-between px-12
                transition-all duration-300
                ${scrolled ? 'border-b border-[#222] bg-[#0e0e0eeb] backdrop-blur-md' : 'border-b border-transparent'}`}
        >
            {/* Logo */}
            <Link to="/"
                className="font-['Cormorant_Garamond'] text-[22px] font-semibold tracking-[0.08em] text-[#e8e2d9] no-underline flex items-center gap-2 hover:opacity-80 transition-opacity">
                Manga<span className="text-[#c9a84c]">Shop</span>
            </Link>

            {/* Nav links — desktop */}
            <nav className="hidden md:flex items-center gap-10">
                {[
                    { to: '/',         label: 'Trang chủ' },
                    { to: '/products', label: 'Truyện tranh' },
                    { to: '/about',    label: 'Về chúng tôi' },
                ].map(({ to, label }) => (
                    <Link key={to} to={to}
                        className="text-[11px] tracking-[0.14em] uppercase text-[#888] hover:text-[#e8e2d9] transition-colors no-underline">
                        {label}
                    </Link>
                ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-6">

                {/* Cart với badge */}
                <Link to="/cart" className="relative text-[#888] hover:text-[#c9a84c] transition-colors">
                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                        <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.5 6h13M10 21a1 1 0 100-2 1 1 0 000 2zm7 0a1 1 0 100-2 1 1 0 000 2z"/>
                    </svg>
                    {cartCount > 0 && (
                        <span className="absolute -top-2 -right-2 bg-[#c9a84c] text-black text-[9px] font-bold
                            w-4 h-4 rounded-full flex items-center justify-center leading-none">
                            {cartCount > 99 ? '99+' : cartCount}
                        </span>
                    )}
                </Link>

                {isLoggedIn ? (
                    // Avatar + Dropdown
                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            className="flex items-center gap-2 text-[#888] hover:text-[#e8e2d9] transition-colors bg-transparent border-none cursor-pointer"
                        >
                            {/* Avatar placeholder */}
                            <div className="w-8 h-8 rounded-full bg-[#222] border border-[#333] flex items-center justify-center hover:border-[#c9a84c] transition-colors">
                                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z"/>
                                </svg>
                            </div>
                            {/* Chevron */}
                            <svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
                                className={`transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
                            </svg>
                        </button>

                        {/* Dropdown menu */}
                        {dropdownOpen && (
                            <div className="absolute right-0 top-[calc(100%+12px)] w-48 bg-[#161616] border border-[#222] shadow-xl z-50">
                                {/* Mũi tên nhỏ */}
                                <div className="absolute -top-1.5 right-3 w-3 h-3 bg-[#161616] border-l border-t border-[#222] rotate-45" />

                                <div className="py-1">
                                    <Link to="/profile"
                                        onClick={() => setDropdownOpen(false)}
                                        className="flex items-center gap-3 px-4 py-3 text-[11px] tracking-[0.12em] uppercase text-[#888] hover:text-[#e8e2d9] hover:bg-[#1e1e1e] transition-colors no-underline">
                                        <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z"/>
                                        </svg>
                                        Tài khoản
                                    </Link>

                                    <Link to="/orders"
                                        onClick={() => setDropdownOpen(false)}
                                        className="flex items-center gap-3 px-4 py-3 text-[11px] tracking-[0.12em] uppercase text-[#888] hover:text-[#e8e2d9] hover:bg-[#1e1e1e] transition-colors no-underline">
                                        <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                                        </svg>
                                        Đơn hàng
                                    </Link>

                                    <div className="border-t border-[#222] my-1" />

                                    <button onClick={handleLogout}
                                        className="w-full flex items-center gap-3 px-4 py-3 text-[11px] tracking-[0.12em] uppercase text-[#555] hover:text-red-400 hover:bg-[#1e1e1e] transition-colors bg-transparent border-none cursor-pointer">
                                        <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H6a2 2 0 01-2-2V7a2 2 0 012-2h5a2 2 0 012 2v1"/>
                                        </svg>
                                        Đăng xuất
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <Link to="/login"
                        className="px-5 py-2 border border-[#8a6d2f] text-[#c9a84c] text-[11px] tracking-[0.14em] uppercase
                            no-underline hover:bg-[#c9a84c] hover:text-black transition-all duration-250">
                        Đăng nhập
                    </Link>
                )}

                {/* Hamburger mobile */}
                <button className="md:hidden text-[#888] bg-transparent border-none"
                    onClick={() => setMenuOpen(!menuOpen)}>
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round"
                            d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                    </svg>
                </button>
            </div>

            {/* Mobile menu */}
            {menuOpen && (
                <div className="absolute top-[72px] left-0 right-0 bg-[#161616] border-b border-[#222] px-6 py-5 flex flex-col gap-5 md:hidden">
                    {[['/', 'Trang chủ'], ['/products', 'Truyện tranh'], ['/about', 'Về chúng tôi']].map(([to, label]) => (
                        <Link key={to} to={to} onClick={() => setMenuOpen(false)}
                            className="text-[11px] tracking-[0.14em] uppercase text-[#888] hover:text-[#c9a84c] no-underline transition-colors">
                            {label}
                        </Link>
                    ))}
                    {isLoggedIn && (
                        <>
                            <Link to="/profile" onClick={() => setMenuOpen(false)}
                                className="text-[11px] tracking-[0.14em] uppercase text-[#888] hover:text-[#c9a84c] no-underline transition-colors">
                                Tài khoản
                            </Link>
                            <Link to="/orders" onClick={() => setMenuOpen(false)}
                                className="text-[11px] tracking-[0.14em] uppercase text-[#888] hover:text-[#c9a84c] no-underline transition-colors">
                                Đơn hàng
                            </Link>
                            <button onClick={handleLogout}
                                className="text-left text-[11px] tracking-[0.14em] uppercase text-[#555] hover:text-red-400 bg-transparent border-none transition-colors">
                                Đăng xuất
                            </button>
                        </>
                    )}
                </div>
            )}
        </header>
    );
}