import React, { useState, useEffect } from 'react';
import api from '../../services/axiosInstance'; 
import CreatePromotionModal from './CreatePromotionModal';
import { toast } from 'react-hot-toast'; // Sếp nhớ import toast nếu dùng nhen

export const PromotionsPanel = () => {
  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // 🎯 1. CHỖ NÀY QUAN TRỌNG: Dùng để truyền dữ liệu sửa vào Modal
  const [editingPromo, setEditingPromo] = useState(null); 

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

  // ⚡ 2. XỬ LÝ GẠT CÔNG TẮC
  const handleToggleStatus = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
      const res = await api.patch(`/api/promotions/${id}/toggle`, { status: newStatus });

      if (res.data.success) {
        setPromotions(prev =>
          prev.map(p => p._id === id ? { ...p, status: newStatus } : p)
        );
      }
    } catch (err) {
      alert("Lỗi gạt công tắc: " + (err.response?.data?.message || err.message));
    }
  };

  // 🗑️ 3. XỬ LÝ XOÁ
  const handleDelete = async (id) => {
    if (window.confirm("Sếp Tuan chắc chắn muốn xóa mã này chứ? Không hồi lại được đâu nhé!")) {
      try {
        // 🎯 Đổi axiosInstance thành api cho đồng bộ với bên trên của sếp
        await api.delete(`/api/promotions/${id}`);
        setPromotions(prev => prev.filter(p => p._id !== id));
        toast.success("Đã xóa sạch sẽ!");
      } catch (err) {
        toast.error("Lỗi xóa rồi sếp ơi!");
      }
    }
  };

  // 📝 4. XỬ LÝ SỬA (Mượn Modal của Thêm mới)
  const handleEditClick = (promo) => {
    setEditingPromo(promo); // Lưu data của mã muốn sửa vào đây
    setIsModalOpen(true);   // Mở cái modal mà sếp đang dùng cho Thêm mới lên
  };

  // ➕ 5. HÀM MỞ MODAL KHI BẤM NÚT "THÊM KHUYẾN MÃI"
  const handleAddClick = () => {
    setEditingPromo(null); // Reset về null để Modal hiểu là đang Thêm mới
    setIsModalOpen(true);
  };

  if (loading) return <div className="p-20 text-center text-[#444] text-[10px] uppercase tracking-widest">Đang truy xuất kho mã...</div>;

  return (
    <div className="animate-[fadeUp_0.5s_ease_both] relative">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="font-['Cormorant_Garamond'] text-[24px] text-[#e8e2d9] leading-none">Chương trình ưu đãi</h2>
          <p className="text-[9px] text-[#444] uppercase tracking-[0.2em] mt-2">Thiết lập mã giảm giá và chiến dịch Flash Sale</p>
        </div>

        {/* 🚀 NÚT THÊM MỚI - Đã đổi sang dùng handleAddClick */}
        <button
          onClick={handleAddClick}
          className="group relative overflow-hidden bg-[#c9a84c] px-6 py-2.5 transition-all hover:bg-[#b09340] flex items-center gap-2"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-black">Thêm khuyến mãi</span>
          <div className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-all duration-500 group-hover:left-[100%]"></div>
        </button>
      </div>

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
              {/* 🎯 NÚT SỬA & XOÁ ĐÃ ĐƯỢC GẮN DÂY */}
              <td className="p-4 text-right flex justify-end items-center gap-6">
                <button
                  onClick={() => handleEditClick(promo)}
                  className="text-[10px] uppercase tracking-widest text-[#333] hover:text-[#c9a84c] transition-colors"
                >Sửa</button>

                <button
                  onClick={() => handleDelete(promo._id)}
                  className="text-[10px] uppercase tracking-widest text-[#333] hover:text-red-500 transition-colors"
                >Xoá</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ─── MODAL DÙNG CHUNG CHO CẢ THÊM VÀ SỬA ─── */}
      {isModalOpen && (
        <CreatePromotionModal
          editData={editingPromo} // 🎯 Truyền data của promo đang sửa vào đây
          onClose={() => {
            setIsModalOpen(false);
            setEditingPromo(null); // Đóng modal xong thì xóa rác đi
          }}
          onSuccess={() => {
            setIsModalOpen(false);
            setEditingPromo(null);
            fetchPromotions(); 
          }}
        />
      )}
    </div>
  );
};