import React, { useState, useEffect, useRef, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

export default function Header() {
    // 👑 Lấy thêm loading để tránh bị "nháy" nút lúc đang load
    const { user, loading, logout } = useContext(AuthContext);
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    const isLoggedIn = !!user;
    const isAdmin = user?.role === 'admin' || user?.role === 'super_admin';
    const isSuperAdmin = user?.role === 'super_admin'; // 👑 Định nghĩa Trùm Cuối
    const cartCount = JSON.parse(localStorage.getItem('cart') || '[]').length;

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

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
        logout();
        setDropdownOpen(false);
        navigate('/login');
    };

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 h-[72px] flex items-center justify-between px-12
                transition-all duration-300
                ${scrolled ? 'border-b border-[#222] bg-[#0e0e0eeb] backdrop-blur-md' : 'border-b border-transparent'}`}
        >
            {/* Logo Group */}
            <div className="flex items-center gap-4">
                <Link to="/"
                    className="font-['Cormorant_Garamond'] text-[22px] font-semibold tracking-[0.08em] text-[#e8e2d9] no-underline flex items-center gap-2 hover:opacity-80 transition-opacity">
                    Manga<span className="text-[#c9a84c]">Shop</span>
                </Link>

                {/* 🕵️‍♂️ CỔNG TÀNG HÌNH: Chỉ hiện khi là Super Admin và load xong */}
                {!loading && isSuperAdmin && (
                    <Link
                        to="/admin/master-control"
                        className="w-2 h-2 rounded-full bg-[#c9a84c]/20 hover:bg-[#c9a84c] transition-all duration-500 ml-2"
                        title="Master Control Access"
                    />
                )}
            </div>

            {/* Nav links — desktop */}
            <nav className="hidden md:flex items-center gap-10">
                {[
                    { to: '/', label: 'Trang chủ' },
                    { to: '/products', label: 'Truyện tranh' },
                    { to: '/about', label: 'Về chúng tôi' },
                ].map(({ to, label }) => (
                    <Link key={to} to={to}
                        className="text-[11px] tracking-[0.14em] uppercase text-[#888] hover:text-[#e8e2d9] transition-colors no-underline">
                        {label}
                    </Link>
                ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-6">
                {/* 👑 MASTER ICON (Ẩn tinh tế cạnh giỏ hàng) */}
                {!loading && isSuperAdmin && (
                    <Link to="/admin/master-control" className="text-[#c9a84c] opacity-30 hover:opacity-100 transition-opacity">
                        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                    </Link>
                )}

                <Link to="/cart" className="relative text-[#888] hover:text-[#c9a84c] transition-colors">
                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                        <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.5 6h13M10 21a1 1 0 100-2 1 1 0 000 2zm7 0a1 1 0 100-2 1 1 0 000 2z" />
                    </svg>
                    {cartCount > 0 && (
                        <span className="absolute -top-2 -right-2 bg-[#c9a84c] text-black text-[9px] font-bold
                            w-4 h-4 rounded-full flex items-center justify-center leading-none">
                            {cartCount > 99 ? '99+' : cartCount}
                        </span>
                    )}
                </Link>

                {isLoggedIn ? (
                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            className="flex items-center gap-2 text-[#888] hover:text-[#e8e2d9] transition-colors bg-transparent border-none cursor-pointer"
                        >
                            <div className="w-8 h-8 rounded-full bg-[#222] border border-[#333] flex items-center justify-center hover:border-[#c9a84c] transition-colors overflow-hidden">
                                {user.avatar ? (
                                    <img src={user.avatar} alt="avatar" className="w-full h-full object-cover" />
                                ) : (
                                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z" />
                                    </svg>
                                )}
                            </div>
                        </button>

                        {dropdownOpen && (
                            <div className="absolute right-0 top-[calc(100%+12px)] w-48 bg-[#161616] border border-[#222] shadow-xl z-50">
                                <div className="absolute -top-1.5 right-3 w-3 h-3 bg-[#161616] border-l border-t border-[#222] rotate-45" />
                                <div className="py-1">
                                    {/* Link Dashboard cho cả Admin và Super Admin */}
                                    {isAdmin && (
                                        <Link
                                            // Nếu là Super Admin thì đi Master, nếu là Admin thường thì đi Admin Panel
                                            to={user?.role === 'super_admin' ? "/admin/master-control" : "/admin"}
                                            onClick={() => setDropdownOpen(false)}
                                            className="flex items-center gap-3 px-4 py-3 text-[11px] font-bold tracking-[0.12em] uppercase text-[#c9a84c] hover:bg-[#c9a84c] hover:text-black transition-all no-underline"
                                        >
                                            <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                <path d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                                            </svg>
                                            {user?.role === 'super_admin' ? 'Hệ Thống' : 'Quản trị viên'}
                                        </Link>
                                    )}

                                    <Link to="/profile"
                                        onClick={() => setDropdownOpen(false)}
                                        className="flex items-center gap-3 px-4 py-3 text-[11px] tracking-[0.12em] uppercase text-[#888] hover:text-[#e8e2d9] hover:bg-[#1e1e1e] transition-colors no-underline">
                                        Tài khoản
                                    </Link>
                                    <Link to="/orders"
                                      onClick={() => setDropdownOpen(false)}
                                     className="flex items-center gap-3 px-4 py-3 text-[11px] tracking-[0.12em] uppercase text-[#888] hover:text-[#e8e2d9] hover:bg-[#1e1e1e] transition-colors no-underline">
                                      Đơn hàng
                                    </Link>

                                    <div className="border-t border-[#222] my-1" />
                                    <button onClick={handleLogout}
                                        className="w-full flex items-center gap-3 px-4 py-3 text-[11px] tracking-[0.12em] uppercase text-red-500/60 hover:text-red-400 hover:bg-[#1e1e1e] transition-colors bg-transparent border-none cursor-pointer">
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
            </div>
        </header>
    );
}