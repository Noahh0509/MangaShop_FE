import React, { useState, useContext, useRef, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

export default function AdminNavbar({ activeTab, onAddProduct, onAddUser }) {
  const { logout, user } = useContext(AuthContext);
  const [showDropdown, setShowDropdown] = useState(false);
  
  // ✅ 1. State để nhận diện cuộn trang
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    // Hàm xử lý khi cuộn chuột
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const getTabTitle = (tab) => {
    switch (tab) {
      case 'products': return 'QUẢN LÝ SẢN PHẨM';
      case 'users': return 'QUẢN LÝ NGƯỜI DÙNG';
      case 'orders': return 'QUẢN LÝ ĐƠN HÀNG';
      default: return 'BẢNG ĐIỀU KHIỂN';
    }
  };

  return (
    <header 
      className={`
        flex items-center justify-between sticky top-0 z-50 transition-all duration-300
        ${isScrolled 
          ? 'p-[12px_40px] bg-[#080808]/80 backdrop-blur-md border-b border-[#c9a84c]/30 shadow-2xl' 
          : 'p-[20px_40px] bg-[#080808] border-b border-[#222]'}
      `}
    >
      <div>
        <h2 className={`text-[10px] font-medium uppercase tracking-[0.2em] transition-all ${isScrolled ? 'text-[#c9a84c]' : 'text-[#666]'}`}>
          Admin Panel
        </h2>
        <h1 className={`font-light text-[#e8e2d9] font-['Cormorant_Garamond'] uppercase tracking-[0.1em] transition-all ${isScrolled ? 'text-[16px] mt-0' : 'text-[18px] mt-1'}`}>
          {getTabTitle(activeTab)}
        </h1>
      </div>

      <div className="flex items-center gap-6">
        {activeTab === 'products' && (
          <button 
            onClick={onAddProduct} 
            className={`px-5 py-2 text-[11px] uppercase tracking-[0.1em] border transition-all ${
              isScrolled 
              ? 'border-[#c9a84c] bg-[#c9a84c] text-black hover:bg-transparent hover:text-[#c9a84c]' 
              : 'border-[#c9a84c] text-[#c9a84c] hover:bg-[#c9a84c] hover:text-black'
            }`}
          >
            + Sản phẩm mới
          </button>
        )}

        <div className="relative" ref={dropdownRef}>
          <div
            onClick={() => setShowDropdown(!showDropdown)}
            className="w-10 h-10 rounded-full border border-[#333] flex items-center justify-center cursor-pointer hover:border-[#c9a84c] transition-all bg-[#111] overflow-hidden"
          >
            <span className="text-[16px] text-[#555]">👤</span>
          </div>

          {showDropdown && (
            <div className="absolute right-0 mt-3 w-56 bg-[#111] border border-[#222] shadow-2xl py-2 animate-[fadeDown_0.2s_ease-out]">
              <div className="px-4 py-3 border-b border-[#222]">
                <p className="text-[13px] text-[#e8e2d9] font-medium truncate">{user?.username || 'Admin'}</p>
                <p className="text-[11px] text-[#777] truncate mt-0.5">{user?.email || 'admin@mangashop.com'}</p>
              </div>

              <button
                onClick={logout}
                className="w-full text-left px-4 py-3 text-[12px] text-red-400 hover:bg-red-500/10 transition-colors border-t border-[#222]"
              >
                Đăng xuất tài khoản
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}