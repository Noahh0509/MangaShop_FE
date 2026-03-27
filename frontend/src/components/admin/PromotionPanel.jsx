import React, { useState, useEffect } from 'react';
import api from '../../services/axiosInstance'; // Axios instance của sếp

export const PromotionsPanel = () => {
  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(true);

  // 📡 1. LẤY DANH SÁCH TỪ BE
  const fetchPromotions = async () => {
    try {
      setLoading(true);
      const res = await api.get('/api/promotions/admin-all'); 
      if (res.data.success) {
        setPromotions(res.data.data);
      }
    } catch (err) {
      console.error("Lỗi kết nối BE:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPromotions();
  }, []);

  // ⚡ 2. XỬ LÝ GẠT CÔNG TẮC (TOGGLE STATUS)
  const handleToggleStatus = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
      
      // Gọi API Patch lên BE
      const res = await api.patch(`/api/promotions/${id}/toggle`, { status: newStatus });

      if (res.data.success) {
        // Cập nhật State cục bộ để giao diện nảy ngay lập tức (không cần load lại trang)
        setPromotions(prev => 
          prev.map(p => p._id === id ? { ...p, status: newStatus } : p)
        );
      }
    } catch (err) {
      alert("Lỗi gạt công tắc: " + (err.response?.data?.message || err.message));
    }
  };

  if (loading) return <div className="p-20 text-center text-[#444] text-[10px] uppercase tracking-widest">Đang truy xuất kho mã...</div>;

  return (
    <div className="animate-[fadeUp_0.5s_ease_both]">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-[#1a1a1a]">
            <th className="text-left text-[10px] tracking-[.18em] uppercase text-[#444] font-normal px-4 pb-4 w-[25%]">Tên mã</th>
            <th className="text-left text-[10px] tracking-[.18em] uppercase text-[#444] font-normal px-4 pb-4">Mã Code</th>
            <th className="text-left text-[10px] tracking-[.18em] uppercase text-[#444] font-normal px-4 pb-4">Mức giảm</th>
            <th className="text-left text-[10px] tracking-[.18em] uppercase text-[#444] font-normal px-4 pb-4">Ngày bắt đầu</th>
            <th className="text-left text-[10px] tracking-[.18em] uppercase text-[#444] font-normal px-4 pb-4">Ngày kết thúc</th>
            <th className="text-center text-[10px] tracking-[.18em] uppercase text-[#444] font-normal px-4 pb-4">Trạng thái</th>
            <th className="text-right text-[10px] tracking-[.18em] uppercase text-[#444] font-normal px-4 pb-4">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {promotions.map((promo) => (
            <tr key={promo._id} className="hover:bg-[#0c0c0c] transition-colors border-b border-[#111] group">
              <td className="p-4">
                <div className="font-['Cormorant_Garamond'] text-[15px] text-[#e8e2d9] group-hover:text-[#c9a84c] transition-colors line-clamp-1">{promo.name}</div>
              </td>
              <td className="p-4">
                <span className="font-mono text-[11px] text-[#c9a84c] bg-[#c9a84c]/5 border border-[#c9a84c]/20 px-2 py-0.5 uppercase">
                  {promo.code || "AUTO"}
                </span>
              </td>
              <td className="p-4 text-[13px] text-[#e8e2d9]">
                {promo.discountType === 'percentage' ? `${promo.discountValue}%` : `${promo.discountValue?.toLocaleString()}đ`}
              </td>
              <td className="p-4 text-[10px] text-[#555] font-mono">
                {new Date(promo.startDate).toLocaleDateString('vi-VN')}
              </td>
              <td className="p-4 text-[10px] text-[#555] font-mono">
                {new Date(promo.endDate).toLocaleDateString('vi-VN')}
              </td>
              {/* 🎯 NÚT GẠT TRẠNG THÁI */}
              <td className="p-4 text-center">
                <div className="flex justify-center">
                  <button 
                    onClick={() => handleToggleStatus(promo._id, promo.status)}
                    className={`relative w-8 h-4 rounded-full transition-all duration-300 border ${promo.status === 'active' ? 'bg-[#c9a84c] border-[#c9a84c]' : 'bg-transparent border-[#222]'}`}
                  >
                    <div className={`absolute top-0.5 left-0.5 w-2.5 h-2.5 rounded-full transition-all duration-300 ${promo.status === 'active' ? 'translate-x-4 bg-black' : 'bg-[#222]'}`}></div>
                  </button>
                </div>
              </td>
              <td className="p-4 text-right">
                <button className="text-[10px] uppercase tracking-widest text-[#333] hover:text-[#c9a84c] transition-colors">Sửa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};