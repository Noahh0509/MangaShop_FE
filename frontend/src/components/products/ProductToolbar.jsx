import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const ProductToolbar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentSort = searchParams.get('sort') || '-createdAt';
  
  // Lấy keyword từ URL (nếu có) để hiển thị sẵn
  const initialKeyword = searchParams.get('keyword') || '';
  const [searchTerm, setSearchTerm] = useState(initialKeyword);

  // Xử lý thay đổi sắp xếp (Sort)
  const handleSortChange = (e) => {
    searchParams.set('sort', e.target.value);
    setSearchParams(searchParams);
  };

  // KỸ THUẬT DEBOUNCE: Tự động tìm kiếm sau khi ngừng gõ 500ms
  useEffect(() => {
    // Tạo một bộ đếm giờ (hẹn giờ 0.5 giây)
    const delayDebounceFn = setTimeout(() => {
      // Bỏ qua lần render đầu tiên nếu từ khóa chưa đổi
      if (searchTerm === initialKeyword && searchTerm === '') return;

      if (searchTerm.trim()) {
        searchParams.set('keyword', searchTerm);
      } else {
        searchParams.delete('keyword'); // Xóa chữ thì hủy tìm kiếm
      }
      
      searchParams.set('page', '1'); // Đổi từ khóa thì tự động quay về trang 1
      setSearchParams(searchParams);
    }, 500); // Đợi 500 mili-giây (0.5 giây)

    // Dọn dẹp: Nếu người dùng gõ tiếp chữ mới khi chưa hết 0.5s, hủy bộ đếm cũ đi
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]); // React sẽ chạy lại effect này mỗi khi bạn gõ 1 chữ cái mới

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
      <div className="relative flex-1 max-w-[360px]">
        <input 
          type="text" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          // Đã xóa onKeyDown vì giờ nó tự động tìm rồi!
          placeholder="Tìm truyện, tác giả..." 
          className="w-full bg-transparent border border-[#222] text-[#e8e2d9] text-[13px] py-2.5 pl-4 pr-10 outline-none focus:border-[#8a6d2f] transition-colors placeholder:text-[#444]"
        />
        {/* Nút X màu xám hiện ra khi có chữ để xóa nhanh */}
        {searchTerm && (
          <button 
            onClick={() => setSearchTerm('')}
            className="absolute right-10 top-1/2 -translate-y-1/2 text-[#555] hover:text-red-400 transition-colors"
          >
            ✕
          </button>
        )}
        <svg className="absolute right-3 top-1/2 -translate-y-1/2 text-[#555]" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
      </div>
      
      <div className="flex items-center gap-4">
        <span className="text-xs text-[#555] tracking-[0.08em] hidden sm:block">Lọc danh sách</span>
        <select 
          value={currentSort}
          onChange={handleSortChange}
          className="bg-[#0e0e0e] border border-[#222] text-[#888] text-[11px] tracking-[0.1em] py-2.5 px-4 outline-none uppercase cursor-pointer focus:border-[#8a6d2f] focus:text-[#e8e2d9]"
        >
          <option value="-createdAt">Mới nhất</option>
          <option value="-soldCount">Bán chạy</option>
          <option value="basePrice">Giá tăng dần</option>
          <option value="-basePrice">Giá giảm dần</option>
        </select>
      </div>
    </div>
  );
};

export default ProductToolbar;