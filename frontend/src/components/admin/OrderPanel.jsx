import React, { useState, useEffect } from 'react';
import api from '../../services/axiosInstance';
import OrderDetailModal from './OrderDetailModal';

export const OrderPanel = () => {
    const [invoices, setInvoices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const res = await api.get('/api/invoices/pending');
            if (res.data.success) setInvoices(res.data.data);
        } catch (err) {
            console.error("Lỗi lấy đơn hàng:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchOrders(); }, []);

    if (loading) return <div className="p-20 text-center text-[#444] text-[10px] uppercase tracking-widest">Đang soạn đơn...</div>;

    return (
        <div className="animate-[fadeUp_0.5s_ease_both]">
            <div className="mb-8">
                <h2 className="font-['Cormorant_Garamond'] text-[24px] text-[#e8e2d9]">Đơn hàng chờ xử lý</h2>
                <p className="text-[9px] text-[#444] uppercase tracking-[0.2em] mt-2">Duyệt và quản lý các đơn hàng PENDING</p>
            </div>

            <table className="w-full border-collapse">
                <thead>
                    <tr className="border-b border-[#1a1a1a]">
                        <th className="text-left text-[10px] tracking-widest uppercase text-[#444] px-4 pb-4">Mã đơn</th>
                        <th className="text-left text-[10px] tracking-widest uppercase text-[#444] px-4 pb-4">Khách hàng</th>
                        <th className="text-left text-[10px] tracking-widest uppercase text-[#444] px-4 pb-4">Tổng tiền</th>
                        <th className="text-left text-[10px] tracking-widest uppercase text-[#444] px-4 pb-4">Ngày đặt</th>
                        <th className="text-center text-[10px] tracking-widest uppercase text-[#444] px-4 pb-4">Tình trạng</th>
                        <th className="text-right text-[10px] tracking-widest uppercase text-[#444] px-4 pb-4">Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {invoices.map((order) => (
                        <tr key={order._id} className="hover:bg-[#0c0c0c] transition-colors border-b border-[#111]">
                            <td className="p-4 font-mono text-[12px] text-[#c9a84c]">{order.invoiceCode}</td>
                            <td className="p-4">
                                <div className="text-[14px] text-[#e8e2d9]">
                                    {order.shippingAddress?.fullName || order.user?.name || "N/A"}
                                </div>
                                <div className="text-[10px] text-[#c9a84c]">{order.user?.email}</div>
                            </td>
                            <td className="p-4 text-[13px] text-[#e8e2d9] font-bold">{order.totalAmount?.toLocaleString()}đ</td>
                            <td className="p-4 text-[10px] text-[#555]">{new Date(order.createdAt).toLocaleString('vi-VN')}</td>
                            <td className="p-4 text-center">
                                {/* 1. CHỜ DUYỆT (Màu Cam) */}
                                {order.status === "PENDING" && (
                                    <span className="text-[9px] px-2 py-1 bg-orange-500/10 text-orange-500 border border-orange-500/20 uppercase tracking-tighter">
                                        Chờ duyệt
                                    </span>
                                )}

                                {/* 2. ĐANG ĐÓNG GÓI (Màu Xanh Dương) */}
                                {order.status === "PREPARING" && (
                                    <span className="text-[9px] px-2 py-1 bg-blue-500/10 text-blue-500 border border-blue-500/20 uppercase tracking-tighter font-bold animate-pulse">
                                        Đang chuẩn bị
                                    </span>
                                )}

                                {/* 3. ĐANG GIAO HÀNG (Màu Xanh Lá) - 🎯 ĐÂY LÀ CHỖ SẾP CẦN BỔ SUNG */}
                                {order.status === "SHIPPING" && (
                                    <span className="text-[9px] px-2 py-1 bg-green-500/10 text-green-500 border border-green-500/20 uppercase tracking-tighter font-bold">
                                        Đang giao hàng
                                    </span>
                                )}
                            </td>
                            <td className="p-4 text-right">
                                <button
                                    onClick={() => setSelectedOrder(order)}
                                    className="text-[10px] uppercase tracking-widest text-[#c9a84c] border border-[#c9a84c]/20 px-4 py-1.5 hover:bg-[#c9a84c] hover:text-black transition-all"
                                >Chi tiết</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {selectedOrder && (
                <OrderDetailModal
                    orderId={selectedOrder._id}
                    onClose={() => setSelectedOrder(null)}
                    onRefresh={fetchOrders}
                />
            )}
        </div>
    );
};