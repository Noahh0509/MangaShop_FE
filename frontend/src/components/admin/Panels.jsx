import React, { useState, useEffect } from 'react';
import api from '../../services/axiosInstance';

export const ProductsPanel = ({ onOpenModal }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // ✅ 1. Thêm State phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const fetchProducts = async (page = 1) => {
    try {
      setLoading(true);
      // ✅ 2. Gửi thêm page và limit=5 lên BE
      const res = await api.get(`/api/products/admin-all?search=${searchTerm}&page=${page}&limit=5`);

      // Khớp với cấu trúc trả về { success: true, data: [...], pagination: {...} }
      const data = res.data.data || [];
      setProducts(data);

      // Cập nhật thông tin trang từ BE trả về
      if (res.data.pagination) {
        setTotalPages(res.data.pagination.totalPages);
        setCurrentPage(res.data.pagination.currentPage);
        setTotalItems(res.data.pagination.totalItems);
      }
    } catch (err) {
      console.error("Lỗi lấy danh sách sản phẩm:", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ 3. Xóa sản phẩm xong thì load lại trang hiện tại
  const handleDelete = async (id, name) => {
    // 1. Hỏi ý kiến sếp trước khi ra tay
    const confirmDelete = window.confirm(`Sếp có chắc muốn xóa vĩnh viễn cuốn "${name}" không?`);

    if (confirmDelete) {
      try {
        setLoading(true);
        // 2. Gọi API DELETE lên Backend
        const res = await api.delete(`/api/products/${id}`);

        if (res.data.success) {
          alert(res.data.message);
          // 3. Xóa xong thì load lại danh sách sản phẩm
          fetchProducts(currentPage);
        }
      } catch (err) {
        alert("Lỗi khi xóa: " + (err.response?.data?.message || err.message));
      } finally {
        setLoading(false);
      }
    }
  };

  // Load lại khi search hoặc đổi trang
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      // Chỉ gọi API khi thực sự có thay đổi hoặc xóa trắng
      fetchProducts(1);
    }, 500);

    // Nếu gõ chữ tiếp theo trước 500ms, nó sẽ HỦY cái lịch cũ đi
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  // Reset về trang 1 khi người dùng gõ tìm kiếm mới
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  if (loading && products.length === 0) {
    return (
      <div className="p-20 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#c9a84c] mb-4"></div>
        <p className="text-[#444] text-[10px] uppercase tracking-[0.2em]">Đang truy xuất thư viện...</p>
      </div>
    );
  }

  return (
    <div className="animate-[fadeUp_0.5s_ease_both]">
      {/* Thanh tìm kiếm */}
      <div className="flex items-center justify-between mb-6 gap-3">
        <div className="relative flex-1 max-w-[300px]">
          <input
            type="text"
            placeholder="Tìm kiếm tên truyện..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-transparent border border-[#1a1a1a] text-[#e8e2d9] text-xs py-[10px] pr-10 pl-4 outline-none focus:border-[#c9a84c] transition-all placeholder-[#333]"
          />
        </div>
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-[#1a1a1a]">
            <th className="text-left text-[10px] tracking-[.18em] uppercase text-[#444] font-normal px-3 pb-4 w-[40px]">#</th>
            <th className="text-left text-[10px] tracking-[.18em] uppercase text-[#444] font-normal px-3 pb-4 w-[60px]">Ảnh</th>
            <th className="text-left text-[10px] tracking-[.18em] uppercase text-[#444] font-normal px-3 pb-4">Thông tin truyện</th>
            <th className="text-left text-[10px] tracking-[.18em] uppercase text-[#444] font-normal px-3 pb-4">Giá bán</th>
            <th className="text-left text-[10px] tracking-[.18em] uppercase text-[#444] font-normal px-3 pb-4 text-center">Kho</th>
            <th className="text-left text-[10px] tracking-[.18em] uppercase text-[#444] font-normal px-3 pb-4 text-right">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item, index) => {
            let cleanUrl = item.images?.find(i => i.isPrimary)?.url || item.images?.[0]?.url || "";
            // Cách tính số thứ tự đúng theo trang: (Trang hiện tại - 1) * 5 + index + 1
            const displayIndex = (currentPage - 1) * 5 + index + 1;

            return (
              <tr key={item._id} className="hover:bg-[#0c0c0c] transition-colors group border-b border-[#111]">
                <td className="p-4 text-[12px] text-[#333]">
                  {displayIndex < 10 ? `0${displayIndex}` : displayIndex}
                </td>
                <td className="p-4">
                  <div className="w-10 h-14 bg-[#111] border border-[#222] overflow-hidden flex items-center justify-center">
                    {cleanUrl ? (
                      <img src={cleanUrl} alt="" className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-110" />
                    ) : <span className="text-[18px] opacity-10">📖</span>}
                  </div>
                </td>
                <td className="p-4">
                  <div className="font-['Cormorant_Garamond'] text-[16px] text-[#e8e2d9] leading-tight group-hover:text-[#c9a84c] transition-colors">{item.name}</div>
                  <div className="text-[10px] text-[#444] mt-1 uppercase tracking-widest">{item.category?.name || 'Manga'}</div>
                </td>
                <td className="p-4 text-[13px] text-[#c9a84c]">
                  {item.basePrice?.toLocaleString()}đ
                </td>
                <td className="p-4 text-[13px] text-center">
                  <span className={item.stock > 0 ? "text-[#e8e2d9]" : "text-red-500"}>{item.stock}</span>
                </td>
                <td className="p-4 text-right">
                  <div className="flex gap-4 justify-end">
                    <button onClick={() => onOpenModal(item)} className="text-[10px] uppercase tracking-widest text-[#555] hover:text-[#c9a84c] transition-colors">Sửa</button>
                    <button onClick={() => handleDelete(item._id, item.name)} className="text-[10px] uppercase tracking-widest text-[#555] hover:text-red-600 transition-colors">Xóa</button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* ─── THANH PHÂN TRANG (PAGINATION) ─── */}
      {/* ─── THANH PHÂN TRANG (PAGINATION) ─── */}
      <div className="mt-10 flex items-center justify-between border-t border-[#111] pt-6">
        <span className="text-[9px] text-[#333] uppercase tracking-[0.2em]">
          Hiển thị {products.length} / {totalItems} tác phẩm
        </span>

        <div className="flex items-center gap-1">
          {/* Nút Trước */}
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => prev - 1)}
            className="w-8 h-8 flex items-center justify-center border border-[#1a1a1a] text-[#555] hover:border-[#c9a84c] hover:text-[#c9a84c] transition-all disabled:opacity-5"
          >
            <span className="text-[10px]">‹</span>
          </button>

          {/* Logic Số Trang Tinh Gọn */}
          <div className="flex gap-1 mx-2">
            {(() => {
              const pages = [];
              const range = 1; // Số trang hiển thị xung quanh trang hiện tại

              for (let i = 1; i <= totalPages; i++) {
                // Luôn hiện trang đầu, trang cuối, và các trang sát trang hiện tại
                if (i === 1 || i === totalPages || (i >= currentPage - range && i <= currentPage + range)) {
                  pages.push(
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i)}
                      className={`w-7 h-7 text-[9px] border transition-all ${currentPage === i
                        ? 'border-[#c9a84c] text-[#c9a84c]'
                        : 'border-transparent text-[#444] hover:text-white'
                        }`}
                    >
                      {i < 10 ? `0${i}` : i}
                    </button>
                  );
                }
                // Thêm dấu "..." nếu có khoảng cách
                else if (i === currentPage - range - 1 || i === currentPage + range + 1) {
                  pages.push(<span key={i} className="text-[#222] text-[9px] self-center">...</span>);
                }
              }
              return pages;
            })()}
          </div>

          {/* Nút Sau */}
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => prev + 1)}
            className="w-8 h-8 flex items-center justify-center border border-[#1a1a1a] text-[#555] hover:border-[#c9a84c] hover:text-[#c9a84c] transition-all disabled:opacity-5"
          >
            <span className="text-[10px]">›</span>
          </button>
        </div>
      </div>
    </div>
  );
};
// Dán cái này vào cuối file Panels.jsx nha sếp
export const UsersPanel = () => (
  <div className="p-20 text-center text-[#333] text-[11px] uppercase tracking-[0.2em]">
    Đang phát triển danh sách thành viên...
  </div>
);

export const OrdersPanel = () => (
  <div className="p-20 text-center text-[#333] text-[11px] uppercase tracking-[0.2em]">
    Chưa có dữ liệu đơn hàng mới...
  </div>
);