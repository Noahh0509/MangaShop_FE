import React from 'react';
import { Link } from 'react-router-dom'; // Nhớ import Link

const AdminSidebar = ({ activeTab, setActiveTab }) => {
  const tabs = [
    {
      id: 'products',
      label: 'Sản phẩm',
      icon: <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    },
    {
      id: 'orders',
      label: 'Đơn hàng',
      icon: (
        <>
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
          <path d="M3 6h18" />
          <path d="M16 10a4 4 0 0 1-8 0" />
        </>
      )
    },
    {
      id: 'promotions', // 🎯 ID đã được đổi lại để không bị trùng
      label: 'Khuyến mãi',
      // 🏷️ Icon cái Tag Khuyến mãi cực đẹp
      icon: (
        <>
          <path d="M12.5 22l-9.5-9.5V3h9.5l9.5 9.5a3.5 3.5 0 0 1-5 5l-4.5 4.5z" />
          <circle cx="7.5" cy="7.5" r=".5" fill="currentColor" />
        </>
      )
    },
  ];

  return (
    <nav className="w-[220px] shrink-0 bg-[#0a0a0a] border-r border-[#1a1a1a] flex flex-col min-h-screen">
      {/* LOGO AREA */}
      <div className="p-[28px_24px] border-b border-[#1a1a1a] font-['Cormorant_Garamond'] text-[20px] font-semibold tracking-[.08em]">
        Manga<span className="text-[#c9a84c]">Shop</span>
        <small className="block font-['DM_Sans'] text-[9px] tracking-[.18em] uppercase text-[#444] mt-0.5">Admin Panel</small>
      </div>

      {/* ✅ NÚT QUAY VỀ TRANG CHỦ (BỔ SUNG) */}
      <div className="py-5 border-b border-[#111]">
        <div className="text-[9px] tracking-[.2em] uppercase text-[#333] px-6 pb-2">Hệ thống</div>
        <Link to="/" className="flex items-center gap-2.5 px-6 py-2.5 text-xs tracking-[.06em] text-[#555] hover:text-[#c9a84c] hover:bg-[#c9a84c]/5 transition-all no-underline group">
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="shrink-0 opacity-70 group-hover:opacity-100">
            <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          Trang chủ User
        </Link>
      </div>

      {/* TỔNG QUAN */}
      <div className="py-5 border-b border-[#111]">
        <div className="text-[9px] tracking-[.2em] uppercase text-[#333] px-6 pb-2">Tổng quan</div>
        <div className="flex items-center gap-2.5 px-6 py-2.5 text-xs tracking-[.06em] text-[#555] cursor-pointer transition-all border-l-2 border-transparent hover:text-[#e8e2d9] hover:bg-[#0e0e0e]">
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="shrink-0 opacity-70">
            <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
            <rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
          </svg>
          Dashboard
        </div>
      </div>

      {/* QUẢN LÝ */}
      <div className="py-5 border-b border-[#111]">
        <div className="text-[9px] tracking-[.2em] uppercase text-[#333] px-6 pb-2">Quản lý</div>
        {tabs.map((tab) => (
          <div
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2.5 px-6 py-2.5 text-xs tracking-[.06em] cursor-pointer transition-all border-l-2 
              ${activeTab === tab.id ? 'text-[#c9a84c] border-[#c9a84c] bg-[#c9a84c]/5' : 'text-[#555] border-transparent hover:text-[#e8e2d9] hover:bg-[#0e0e0e]'}`}
          >
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className={`shrink-0 ${activeTab === tab.id ? 'opacity-100' : 'opacity-70'}`}>
              {tab.icon}
            </svg>
            {tab.label}
          </div>
        ))}
      </div>

      {/* ADMIN INFO BOX */}
      <div className="mt-auto p-[20px_24px] border-t border-[#1a1a1a] flex items-center gap-2.5">
        <div className="w-8 h-8 border border-[#8a6d2f] rounded-full flex items-center justify-center text-xs text-[#c9a84c] font-bold">
          {/* Tuan có thể thay chữ A bằng chữ cái đầu của tên sếp */}
          T
        </div>
        <div>
          <div className="text-xs text-[#888] font-medium">Admin</div>
          <div className="text-[10px] tracking-[.1em] uppercase text-[#444]">Master Control</div>
        </div>
      </div>
    </nav>
  );
};

export default AdminSidebar;