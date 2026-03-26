import React from 'react';

export const ProductsPanel = ({ onOpenModal }) => (
  <div className="animate-[fadeUp_0.5s_ease_both]">
    <div className="flex items-center justify-between mb-5 gap-3">
      <div className="relative flex-1 max-w-[280px]">
        <input type="text" placeholder="Tìm sản phẩm..." className="w-full bg-transparent border border-[#1a1a1a] text-[#e8e2d9] text-xs py-[9px] pr-9 pl-3.5 outline-none transition-colors focus:border-[#8a6d2f] placeholder-[#333]" />
        <svg className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#444]" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
      </div>
      <div className="flex gap-2">
        <select className="bg-transparent border border-[#1a1a1a] text-[#555] text-[11px] p-[8px_12px] outline-none uppercase tracking-[.1em]">
          <option>Tất cả</option><option>Shounen</option><option>Seinen</option>
        </select>
        <select className="bg-transparent border border-[#1a1a1a] text-[#555] text-[11px] p-[8px_12px] outline-none uppercase tracking-[.1em]">
          <option>Trạng thái</option><option>Còn hàng</option><option>Hết hàng</option>
        </select>
      </div>
    </div>
    
    <table className="w-full border-collapse">
      <thead>
        <tr>
          <th className="text-left text-[10px] tracking-[.18em] uppercase text-[#444] font-normal px-3 pb-3 border-b border-[#1a1a1a] w-[40px]">#</th>
          <th className="text-left text-[10px] tracking-[.18em] uppercase text-[#444] font-normal px-3 pb-3 border-b border-[#1a1a1a] w-[50px]">Ảnh</th>
          <th className="text-left text-[10px] tracking-[.18em] uppercase text-[#444] font-normal px-3 pb-3 border-b border-[#1a1a1a]">Tên sản phẩm</th>
          <th className="text-left text-[10px] tracking-[.18em] uppercase text-[#444] font-normal px-3 pb-3 border-b border-[#1a1a1a]">Giá</th>
          <th className="text-left text-[10px] tracking-[.18em] uppercase text-[#444] font-normal px-3 pb-3 border-b border-[#1a1a1a]">Trạng thái</th>
          <th className="text-left text-[10px] tracking-[.18em] uppercase text-[#444] font-normal px-3 pb-3 border-b border-[#1a1a1a]">Thao tác</th>
        </tr>
      </thead>
      <tbody>
        <tr className="hover:bg-[#0c0c0c] transition-colors">
          <td className="p-[14px_12px] border-b border-[#111] text-[13px] text-[#888]">01</td>
          <td className="p-[14px_12px] border-b border-[#111] text-[13px]"><div className="w-9 h-12 bg-gradient-to-br from-[#1a1a1a] to-[#222] flex items-center justify-center text-xs opacity-25">📖</div></td>
          <td className="p-[14px_12px] border-b border-[#111] text-[13px]">
            <div className="font-['Cormorant_Garamond'] text-base">Jujutsu Kaisen — Tập 26</div>
            <div className="text-[11px] text-[#555]">Gege Akutami</div>
          </td>
          <td className="p-[14px_12px] border-b border-[#111] text-[13px]">35.000đ</td>
          <td className="p-[14px_12px] border-b border-[#111] text-[13px]"><span className="inline-block text-[9px] tracking-[.12em] uppercase px-2 py-0.5 bg-[#4a9968]/10 border border-[#4a9968]/30 text-[#4a9968]">Còn hàng</span></td>
          <td className="p-[14px_12px] border-b border-[#111] text-[13px]">
            <button onClick={onOpenModal} className="px-3 py-1 border border-[#222] text-[#555] text-[10px] uppercase tracking-[.1em] transition-colors hover:border-[#8a6d2f] hover:text-[#c9a84c] ml-1">Sửa</button>
            <button className="px-3 py-1 border border-[#222] text-[#555] text-[10px] uppercase tracking-[.1em] transition-colors hover:border-[#c0504a] hover:text-[#c0504a] ml-1">Xóa</button>
          </td>
        </tr>
        {/* Render thêm các <tr> khác tương tự ở đây */}
      </tbody>
    </table>
  </div>
);

export const UsersPanel = ({ onOpenModal }) => (
  // Cấu trúc bảng tương tự ProductsPanel, bạn áp dụng class tương tự
  <div className="animate-[fadeUp_0.5s_ease_both]">
     <div className="text-[#888] mb-4">Giao diện danh sách người dùng...</div>
     <button onClick={onOpenModal} className="px-4 py-2 bg-[#111] border border-[#222] text-xs text-[#888] hover:text-[#c9a84c]">Mở Modal Sửa User</button>
  </div>
);

export const OrdersPanel = () => (
   <div className="animate-[fadeUp_0.5s_ease_both]">
     <div className="text-[#888] mb-4">Giao diện danh sách đơn hàng...</div>
  </div>
);