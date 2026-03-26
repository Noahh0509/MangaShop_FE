import React from 'react';

const ProductToolbar = () => (
  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
    <div className="relative flex-1 max-w-[360px]">
      <input 
        type="text" 
        placeholder="Tìm truyện, tác giả..." 
        className="w-full bg-transparent border border-[#222] text-[#e8e2d9] text-[13px] py-2.5 pl-4 pr-10 outline-none focus:border-[#8a6d2f] transition-colors placeholder:text-[#444]"
      />
      <svg className="absolute right-3 top-1/2 -translate-y-1/2 text-[#555]" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
    </div>
    <div className="flex items-center gap-4">
      <span className="text-xs text-[#555] tracking-[0.08em] hidden sm:block">Hiển thị 1–12 / 248 kết quả</span>
      <select className="bg-transparent border border-[#222] text-[#888] text-[11px] tracking-[0.1em] py-2.5 px-4 outline-none uppercase cursor-pointer focus:border-[#8a6d2f] focus:text-[#e8e2d9]">
        <option>Mới nhất</option>
        <option>Bán chạy</option>
        <option>Giá tăng dần</option>
        <option>Giá giảm dần</option>
      </select>
    </div>
  </div>
);

export default ProductToolbar;