import React, { useState, useEffect } from 'react';
import api from '../../services/axiosInstance';

// 1. Quản lý Sản phẩm (Sẽ hiển thị mặc định)
export const ProductsPanel = ({ onOpenModal }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchProducts = async () => {
    try {
      setLoading(true);
      // Gọi API lấy toàn bộ sản phẩm cho Admin
      const res = await api.get(`/api/products/admin-all?search=${searchTerm}`);
      const data = res.data.data || res.data;
      setProducts(data);
    } catch (err) {
      console.error("Lỗi lấy danh sách sản phẩm:", err);
    } finally {
      setLoading(false);
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

  const handleUploadImage = () => {
    // Gọi cái widget đã nhúng từ index.html
    const myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: 'durcb5nfr', // Cloud name của Tuan
        uploadPreset: 'mangashop_preset', // Preset mangashop_preset của Tuan
        folder: 'products', // Tự chui vào folder products cho gọn
        sources: ['local', 'url', 'camera'], // Nguồn lấy ảnh
        multiple: false, // Admin chỉ cần 1 ảnh bìa thôi
        cropping: true, // Cho phép cắt ảnh theo tỷ lệ
        croppingAspectRatio: 0.7, // Tỷ lệ bìa truyện 5:7 (~0.7)
        showSkipCropButton: false,
        theme: 'minimal', // Giao diện tối giản sang trọng
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          console.log("Link ảnh xịn đây Tuan ơi: ", result.info.secure_url);
          
          // Sau khi có link ảnh, bạn có thể:
          // 1. Alert cho vui: alert("Upload thành công!");
          // 2. Hoặc cập nhật vào State để chuẩn bị Lưu Sản Phẩm
        }
      }
    );
    
    myWidget.open(); // Mở khung lên!
  };
  
  return (
    <div className="animate-[fadeUp_0.5s_ease_both]">
      {/* Search Bar */}
      <div className="flex items-center justify-between mb-6 gap-3">
        <div className="relative flex-1 max-w-[300px]">
          <input 
            type="text" 
            placeholder="Tìm kiếm tên truyện..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-transparent border border-[#1a1a1a] text-[#e8e2d9] text-xs py-[10px] pr-10 pl-4 outline-none focus:border-[#c9a84c] transition-all placeholder-[#333]" 
          />
          <svg className="absolute right-3 top-1/2 -translate-y-1/2 text-[#444]" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
        </div>
      </div>

      {/* Table List */}
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
            const imgUrl = item.images?.find(i => i.isPrimary)?.url || item.images?.[0]?.url;
            return (
              <tr key={item._id} className="hover:bg-[#0c0c0c] transition-colors group">
                <td className="p-4 border-b border-[#111] text-[12px] text-[#333]">
                  {index + 1 < 10 ? `0${index + 1}` : index + 1}
                </td>
                <td className="p-4 border-b border-[#111]">
                  <div className="w-10 h-14 bg-[#111] border border-[#222] overflow-hidden">
                    {imgUrl ? (
                      <img src={imgUrl} alt="" className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[18px] opacity-10">📖</div>
                    )}
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
                    <button onClick={() => onOpenModal(item)} className="text-[10px] uppercase tracking-widest text-[#555] hover:text-[#c9a84c] transition-colors">Sửa</button>
                    <button className="text-[10px] uppercase tracking-widest text-[#555] hover:text-red-600 transition-colors">Xóa</button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {products.length === 0 && !loading && (
        <div className="text-center py-20 text-[#333] text-[11px] uppercase tracking-[0.2em]">
          Không tìm thấy cuốn truyện nào phù hợp
        </div>
      )}
    </div>
  );
};

// 2. Quản lý Người dùng (Mẫu)
export const UsersPanel = () => (
  <div className="p-20 text-center animate-[fadeUp_0.5s_ease_both]">
    <p className="text-[#333] text-[11px] uppercase tracking-[0.2em]">Đang phát triển danh sách thành viên...</p>
  </div>
);

// 3. Quản lý Đơn hàng (Mẫu)
export const OrdersPanel = () => (
  <div className="p-20 text-center animate-[fadeUp_0.5s_ease_both]">
    <p className="text-[#333] text-[11px] uppercase tracking-[0.2em]">Chưa có dữ liệu đơn hàng mới...</p>
  </div>
);