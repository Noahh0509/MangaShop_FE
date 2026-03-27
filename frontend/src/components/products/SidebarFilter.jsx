import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios'; // Nhớ import axios nhé

const API_URL = `${import.meta.env.VITE_API_URL}/api/categories`; // Đường dẫn API lấy danh mục

const SidebarFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentCategory = searchParams.get('category');
  
  // State lưu danh sách Thể loại từ Backend
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Gọi API lấy danh mục khi component vừa render
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(API_URL);
        if (response.data.success) {
          setCategories(response.data.data); // Gán dữ liệu vào state
        }
      } catch (error) {
        console.error("Lỗi khi tải danh mục:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryId) => {
    if (currentCategory === categoryId) {
      searchParams.delete('category'); // Bấm lại thì hủy lọc
    } else {
      searchParams.set('category', categoryId);
    }
    setSearchParams(searchParams);
  };

  const handleClearFilters = () => {
    setSearchParams({}); // Xóa toàn bộ URL params
  };

  return (
    <aside className="w-[260px] shrink-0 border-r border-[#222] p-8 lg:p-10 sticky top-[72px] h-[calc(100vh-72px)] overflow-y-auto hidden md:block">
      <div className="mb-9">
        <span className="text-[10px] tracking-[0.2em] uppercase text-[#c9a84c] mb-4 block">Thể loại</span>
        
        {loading ? (
          <div className="text-[12px] text-[#555]">Đang tải...</div>
        ) : (
          categories.map((cat) => (
            <label key={cat._id} className="flex items-center gap-2.5 py-2 cursor-pointer border-b border-[#161616] group">
              <input 
                type="checkbox" 
                className="accent-[#c9a84c]" 
                checked={currentCategory === cat._id}
                onChange={() => handleCategoryClick(cat._id)}
              />
              <span className={`text-[13px] transition-colors ${currentCategory === cat._id ? 'text-[#c9a84c] font-medium' : 'text-[#888] group-hover:text-[#e8e2d9]'}`}>
                {cat.name}
              </span>
            </label>
          ))
        )}
      </div>

      <div className="mt-8 pt-6 border-t border-[#222]">
        <button 
          onClick={handleClearFilters}
          className="w-full p-3 bg-transparent border border-[#222] text-[#555] text-[11px] tracking-[0.14em] uppercase hover:border-[#8a6d2f] hover:text-[#c9a84c] transition-all"
        >
          Xóa bộ lọc
        </button>
      </div>
    </aside>
  );
};

export default SidebarFilter;