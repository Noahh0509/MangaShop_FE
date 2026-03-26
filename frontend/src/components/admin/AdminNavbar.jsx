import React, { useState, useContext, useRef, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

export default function AdminNavbar({ activeTab, onAddProduct, onAddUser }) {
  const { logout, user } = useContext(AuthContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Đóng dropdown khi click ra ngoài vùng menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
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
    <header className="flex items-center justify-between p-[20px_40px] border-b border-[#222] bg-[#080808] sticky top-0 z-50">
      <div>
        <h2 className="text-[12px] font-medium uppercase tracking-[0.2em] text-[#c9a84c]">Admin Panel</h2>
        <h1 className="text-[18px] font-light mt-1 text-[#e8e2d9] font-['Cormorant_Garamond'] uppercase tracking-[0.1em]">
          {getTabTitle(activeTab)}
        </h1>
      </div>

      <div className="flex items-center gap-6">
        {/* Nút chức năng tùy theo Tab */}
        {activeTab === 'products' && (
          <button onClick={onAddProduct} className="px-5 py-2 text-[11px] uppercase tracking-[0.1em] border border-[#c9a84c] text-[#c9a84c] hover:bg-[#c9a84c] hover:text-black transition-all">
            + Sản phẩm mới
          </button>
        )}

        {/* --- KHU VỰC AVATAR & DROPDOWN --- */}
        <div className="relative" ref={dropdownRef}>
          {/* ✅ TRẢ LẠI ICON TRÒN CŨ, KHÔNG HIỆN CHỮ NỮA */}
          <div 
            onClick={() => setShowDropdown(!showDropdown)}
            className="w-10 h-10 rounded-full border border-[#333] flex items-center justify-center cursor-pointer hover:border-[#c9a84c] transition-all bg-[#111] overflow-hidden"
          >
            {/* Nếu bạn có ảnh đại diện, thay cái này bằng <img src={user?.avatar} /> */}
            <span className="text-[16px] text-[#555]">👤</span> 
          </div>

          {/* Menu Dropdown hiện ra khi showDropdown = true */}
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