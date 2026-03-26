import React, { useState, useEffect } from 'react';
import api from '../../services/axiosInstance';

export const ProductsPanel = ({ onOpenModal }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/api/products/admin-all?search=${searchTerm}`);
      const data = res.data.data || res.data;
      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Lỗi lấy danh sách sản phẩm:", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Hàm xóa sản phẩm
  const handleDelete = async (id, name) => {
    if (window.confirm(`Xác nhận tiêu hủy cuốn "${name}" khỏi kho?`)) {
      try {
        await api.delete(`/api/products/${id}`);
        fetchProducts(); // Load lại danh sách
      } catch (err) {
        alert("Lỗi khi xóa: " + (err.response?.data?.message || err.message));
      }
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchProducts();
    }, 500);
    return () => clearTimeout(delayDebounceFn);
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
            <th className="text-left text-[10px] tracking-[.18em] uppercase text-[#444] font-normal px-3 pb-4">Kho</th>
            <th className="text-left text-[10px] tracking-[.18em] uppercase text-[#444] font-normal px-3 pb-4">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item, index) => {
            // ✅ Fix lỗi link dài có dấu ba chấm và tìm ảnh chính
            let rawUrl = item.images?.find(i => i.isPrimary)?.url || item.images?.[0]?.url || "";

            // Tối ưu ảnh Cloudinary: tự động nén và resize về đúng kích thước hiển thị
            // Nó sẽ thêm 'f_auto,q_auto,w_200' vào link nếu là link Cloudinary
            const optimizedUrl = rawUrl.includes("cloudinary.com")
              ? rawUrl.replace("/upload/", "/upload/f_auto,q_auto,w_200/")
              : rawUrl.replace(/\.\.\./g, "").trim();
            const cleanUrl = rawUrl.replace(/\.\.\./g, "").trim();

            return (
              <tr key={item._id} className="hover:bg-[#0c0c0c] transition-colors group">
                <td className="p-4 border-b border-[#111] text-[12px] text-[#333]">
                  {index + 1 < 10 ? `0${index + 1}` : index + 1}
                </td>
                <td className="p-4 border-b border-[#111]">
                  <div className="w-10 h-14 bg-[#111] border border-[#222] overflow-hidden flex items-center justify-center">
                    {cleanUrl ? (
                      <img
                        src={cleanUrl}
                        alt=""
                        className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-110"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'block';
                        }}
                      />
                    ) : null}
                    <div style={{ display: cleanUrl ? 'none' : 'block' }} className="text-[18px] opacity-10">📖</div>
                  </div>
                </td>
                <td className="p-4 border-b border-[#111]">
                  <div className="font-['Cormorant_Garamond'] text-[16px] text-[#e8e2d9] leading-tight group-hover:text-[#c9a84c] transition-colors">{item.name}</div>
                  <div className="text-[10px] text-[#444] mt-1 uppercase tracking-widest">{item.category?.name || 'Manga'}</div>
                </td>
                <td className="p-4 border-b border-[#111] text-[13px] text-[#c9a84c]">
                  {item.basePrice?.toLocaleString()}đ
                </td>
                <td className="p-4 border-b border-[#111] text-[13px]">
                  <span className={item.stock > 0 ? "text-[#e8e2d9]" : "text-red-500"}>
                    {item.stock} <span className="text-[10px] text-[#444] ml-1 uppercase">cuốn</span>
                  </span>
                </td>
                <td className="p-4 border-b border-[#111]">
                  <div className="flex gap-3">
                    <button onClick={() => onOpenModal(item)} className="text-[10px] uppercase tracking-widest text-[#555] hover:text-[#c9a84c] transition-colors font-medium">Sửa</button>
                    <button
                      onClick={() => handleDelete(item._id, item.name)}
                      className="text-[10px] uppercase tracking-widest text-[#555] hover:text-red-600 transition-colors font-medium"
                    >
                      Xóa
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export const UsersPanel = () => <div className="p-20 text-center text-[#333] text-[11px] uppercase tracking-[0.2em]">Đang phát triển danh sách thành viên...</div>;
export const OrdersPanel = () => <div className="p-20 text-center text-[#333] text-[11px] uppercase tracking-[0.2em]">Chưa có dữ liệu đơn hàng mới...</div>;