import React from 'react';

const SidebarFilter = () => {
  return (
    <aside className="w-[260px] shrink-0 border-r border-[#222] p-8 lg:p-10 sticky top-[72px] h-[calc(100vh-72px)] overflow-y-auto hidden md:block">
      <div className="mb-9">
        <span className="text-[10px] tracking-[0.2em] uppercase text-[#c9a84c] mb-4 block">Thể loại</span>
        {['Shounen', 'Seinen', 'Shoujo', 'Mystery', 'Sports', 'Sci-fi', 'Comedy', 'Horror'].map((cat, i) => (
          <label key={cat} className="flex items-center gap-2.5 py-2 cursor-pointer border-b border-[#161616] group">
            <input type="checkbox" className="accent-[#c9a84c]" defaultChecked={i === 0} />
            <span className="text-[13px] text-[#888] group-hover:text-[#e8e2d9] transition-colors">{cat}</span>
          </label>
        ))}
      </div>

      <div className="mb-9">
        <span className="text-[10px] tracking-[0.2em] uppercase text-[#c9a84c] mb-4 block">Giá</span>
        {['Tất cả', 'Dưới 30.000đ', '30.000 – 40.000đ', 'Trên 40.000đ'].map((price, i) => (
          <label key={price} className="flex items-center gap-2.5 py-2 cursor-pointer border-b border-[#161616] group">
            <input type="radio" name="price" className="accent-[#c9a84c]" defaultChecked={i === 0} />
            <span className="text-[13px] text-[#888] group-hover:text-[#e8e2d9] transition-colors">{price}</span>
          </label>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t border-[#222]">
        <button className="w-full p-3 bg-transparent border border-[#222] text-[#555] text-[11px] tracking-[0.14em] uppercase hover:border-[#8a6d2f] hover:text-[#c9a84c] transition-all">
          Xóa bộ lọc
        </button>
      </div>
    </aside>
  );
};

export default SidebarFilter;