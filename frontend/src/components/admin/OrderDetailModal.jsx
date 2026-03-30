import React, { useState, useEffect } from 'react';
import api from '../../services/axiosInstance';

const OrderDetailModal = ({ orderId, onClose, onRefresh }) => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await api.get(`/api/invoices/${orderId}`);
        if (res.data.success) setOrder(res.data.data);
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    };
    fetchDetail();
  }, [orderId]);

  const handleUpdateStatus = async (nextStatus) => {
    if (!window.confirm(`Sếp muốn chuyển đơn sang trạng thái ${nextStatus}?`)) return;
    try {
      const res = await api.patch(`/api/invoices/${orderId}/status`, { status: nextStatus });
      if (res.data.success) {
        alert(res.data.message);
        onRefresh(); // Load lại danh sách bên ngoài
        onClose();   // Đóng modal
      }
    } catch (err) {
      alert("Lỗi cập nhật rồi sếp!");
    }
  };

  const handleStatusChange = async (action) => {
    if (!window.confirm(`Sếp chắc chắn muốn ${action === 'approve' ? 'Duyệt' : 'Hủy'} đơn này?`)) return;
    try {
      const url = `/api/invoices/${orderId}/${action}`;
      const res = await api.patch(url);
      if (res.data.success) {
        alert(res.data.message);
        onRefresh();
        onClose();
      }
    } catch (err) { alert("Lỗi xử lý đơn sếp ơi!"); }
  };

  if (loading || !order) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 text-left">
      <div className="bg-[#0a0a0a] border border-[#c9a84c]/20 w-full max-w-2xl p-8 animate-fade-in relative shadow-[0_0_50px_rgba(201,168,76,0.05)]">
        <button onClick={onClose} className="absolute top-6 right-6 text-[#444] hover:text-white transition-all text-xl">✕</button>

        <h3 className="font-['Cormorant_Garamond'] text-[24px] text-[#c9a84c] uppercase tracking-widest mb-8 border-b border-[#1a1a1a] pb-4">
          Hóa đơn {order.invoiceCode}
        </h3>

        {/* --- TRONG FILE OrderDetailModal.jsx --- */}

        {/* 🛠️ SỬA ĐOẠN NÀY: Thông tin khách */}
        <div className="grid grid-cols-2 gap-8 mb-8 text-[12px]">
          <div className="space-y-2">
            <p className="text-[#444] uppercase tracking-widest font-bold">Thông tin nhận hàng</p>

            {/* 🎯 Lấy tên đầy đủ từ shippingAddress thay vì user.name */}
            <p className="text-[#e8e2d9] text-[14px] font-medium">
              {order.shippingAddress?.fullName || "N/A"}
            </p>

            {/* 🎯 Lấy Số điện thoại */}
            <p className="text-[#c9a84c]">
              SĐT: {order.shippingAddress?.phone || "N/A"}
            </p>

            {/* 🎯 Nối các trường địa chỉ lại cho gọn */}
            <p className="italic leading-relaxed">
              <span className="text-[#c9a84c]">Đ/c: {order.shippingAddress?.street}, </span>
              <span className="text-[#c9a84c] font-bold">Phường {order.shippingAddress?.ward}</span>
              <span className="text-[#c9a84c]">, </span>
              <span className="text-[#c9a84c] font-bold">Quận {order.shippingAddress?.district}</span>
              <span className="text-[#c9a84c]">, {order.shippingAddress?.province}</span>
            </p>

            {/* ✨ Bonus: Hiện luôn cái Note "nguy hiểm" kia nhen sếp */}
            {order.shippingAddress?.note && (
              <p className="text-red-500 bg-red-500/10 px-2 py-1 mt-2 inline-block">
                Lưu ý: {order.shippingAddress.note}
              </p>
            )}
          </div>

          {/* Phần Thanh toán bên phải sếp giữ nguyên nhen... */}
          <div className="space-y-2 text-right">
            {/* ... code cũ của sếp ... */}
          </div>
        </div>

        {/* --- TRONG FILE OrderDetailModal.jsx --- */}

        <div className="border-t border-b border-[#1a1a1a] py-6 mb-8 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
          {order.items.map((item, idx) => (
            <div key={idx} className="flex justify-between items-center mb-5 last:mb-0 border-b border-[#111] pb-3 last:border-0 last:pb-0">
              <div className="flex items-center gap-4">
                {/* Số lượng: item.quantity */}
                <span className="text-[#c9a84c] font-mono text-[15px] w-8 text-center bg-[#c9a84c]/10 py-1">
                  {item.quantity}x
                </span>

                <div>
                  {/* Tên truyện: item.title */}
                  <p className="text-[#e8e2d9] text-[14px] mb-1 font-medium">
                    {item.title}
                  </p>
                  {/* 🎯 GIÁ TỪNG MÓN (Đơn giá): item.unitPrice */}
                  <p className="text-[#555] text-[11px]">
                    Đơn giá: {item.unitPrice?.toLocaleString()}đ
                  </p>
                </div>
              </div>

              {/* 🎯 THÀNH TIỀN CỦA MÓN ĐÓ: item.subtotal */}
              <div className="text-right">
                <p className="text-[#e8e2d9] font-bold text-[15px]">
                  {item.subtotal?.toLocaleString()}đ
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-end mb-10">
          <div>
            <p className="text-[#444] text-[10px] uppercase tracking-widest mb-1">Phương thức ship</p>
            <p className="text-[#e8e2d9] text-[13px]">Giao hàng tiêu chuẩn (Manga Express)</p>
          </div>
          <div className="text-right">
            <p className="text-[#444] text-[10px] uppercase tracking-widest mb-1">Tổng thanh toán</p>
            <p className="text-3xl text-[#c9a84c] font-bold font-['Cormorant_Garamond']">{order.totalAmount?.toLocaleString()}đ</p>
          </div>
        </div>

        {/* --- PHẦN RENDER NÚT BẤM TRONG OrderDetailModal.jsx --- */}
        <div className="flex gap-4">

          {/* 1️⃣ GIAI ĐOẠN 1: Đơn mới đặt (PENDING) -> Bấm để đóng gói */}
          {order.status === "PENDING" && (
            <button
              onClick={() => handleUpdateStatus("PREPARING")}
              className="flex-1 bg-[#c9a84c] text-black py-4 text-[11px] font-black uppercase tracking-[0.2em] hover:bg-white transition-all shadow-[0_10px_30px_rgba(201,168,76,0.1)]"
            >
              Xác nhận & Chuẩn bị hàng
            </button>
          )}

          {/* 2️⃣ GIAI ĐOẠN 2: Đang đóng gói (PREPARING) -> Bấm để giao Shipper */}
          {order.status === "PREPARING" && (
            <button
              onClick={() => handleUpdateStatus("SHIPPING")}
              className="flex-1 bg-blue-600 text-white py-4 text-[11px] font-black uppercase tracking-[0.2em] hover:bg-blue-500 transition-all shadow-[0_10px_30px_rgba(37,99,235,0.2)]"
            >
              Giao hàng cho Shipper
            </button>
          )}

          {order.status === "SHIPPING" && (
            <div className="flex-1 bg-[#111] border border-green-900/30 text-green-500 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-center italic">
              🚚 Đơn hàng đang trên đường giao đến khách...
            </div>
          )}

          {/* ❌ NÚT HỦY ĐƠN: Cho phép hủy nếu đơn chưa hoàn thành */}
          {["PENDING", "PREPARING"].includes(order.status) && (
            <button
              onClick={() => handleUpdateStatus("CANCELLED")}
              className="px-8 border border-red-900/30 text-red-800 py-4 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-red-900/10 hover:text-red-500 transition-all"
            >
              Hủy đơn
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderDetailModal;