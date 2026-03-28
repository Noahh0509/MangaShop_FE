import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import api from '../../services/axiosInstance';
import { registerLocale } from "react-datepicker";
import vi from 'date-fns/locale/vi';
registerLocale('vi', vi);

const CreatePromotionModal = ({ onClose, onSuccess }) => {
    const [formData, setFormData] = useState({
        name: '',
        code: '',
        discountType: 'percentage',
        discountValue: 0,
        startDate: new Date(),
        endDate: null,
        minOrderValue: 0,
        status: 'active'
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.discountValue <= 0) return alert("Mức giảm phải > 0 sếp ơi!");
        if (!formData.endDate) return alert("Sếp chưa chọn ngày kết thúc!");
        if (formData.endDate <= formData.startDate) return alert("Ngày kết thúc phải sau ngày bắt đầu!");

        try {
            const res = await api.post('/api/promotions', formData);
            if (res.data.success) {
                alert("Đã tạo khuyến mãi thành công!");
                onSuccess();
            }
        } catch (err) {
            alert("Lỗi: " + (err.response?.data?.message || err.message));
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 text-left">
            <div className="bg-[#0a0a0a] border border-[#c9a84c]/30 w-full max-w-2xl overflow-hidden shadow-2xl animate-fade-in text-left">

                {/* Header - Chữ bự 24px */}
                <div className="p-6 border-b border-[#1a1a1a] flex justify-between items-center">
                    <h3 className="font-['Cormorant_Garamond'] text-[24px] text-[#c9a84c] uppercase tracking-widest font-bold">Tạo Chiến Dịch Mới</h3>
                    <button onClick={onClose} className="text-[#444] hover:text-white text-xl transition-all">✕</button>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    {/* ─── PHẦN NHẬP LIỆU 2 CỘT CỦA SẾP ─── */}
                    <div className="grid grid-cols-2 gap-8 text-left">
                        {/* Cột 1: Tên, Mã, Loại/Giá trị */}
                        <div className="space-y-5">
                            <div>
                                <label className="text-[11px] uppercase tracking-widest text-[#555] block mb-2 font-bold">Tên chiến dịch</label>
                                <input type="text" required className="w-full bg-[#111] border border-[#222] text-[#e8e2d9] text-[15px] p-4 outline-none focus:border-[#c9a84c] transition-all" onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Sale sập sàn" />
                            </div>
                            <div>
                                <label className="text-[11px] uppercase tracking-widest text-[#555] block mb-2 font-bold">Mã Code</label>
                                <input type="text" className="w-full bg-[#111] border border-[#222] text-[#c9a84c] font-mono text-[15px] p-4 outline-none focus:border-[#c9a84c] uppercase" onChange={(e) => setFormData({ ...formData, code: e.target.value })} placeholder="AUTO" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-[11px] uppercase tracking-widest text-[#555] block mb-2 font-bold">Loại</label>
                                    <select className="w-full bg-[#111] border border-[#222] text-[14px] p-4 outline-none text-[#e8e2d9] appearance-none" onChange={(e) => setFormData({ ...formData, discountType: e.target.value })}>
                                        <option value="percentage">%</option>
                                        <option value="fixed">đ</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-[11px] uppercase tracking-widest text-[#555] block mb-2 font-bold">Giá trị</label>
                                    <input type="number" required className="w-full bg-[#111] border border-[#222] text-[#e8e2d9] text-[15px] p-4 outline-none focus:border-[#c9a84c]" onChange={(e) => setFormData({ ...formData, discountValue: Number(e.target.value) })} />
                                </div>
                            </div>
                        </div>

                        {/* Cột 2: Lịch & Điều kiện */}
                        <div className="space-y-5">
                            <div>
                                <label className="text-[11px] uppercase tracking-widest text-[#555] block mb-2 font-bold">Ngày bắt đầu</label>
                                <DatePicker
                                    selected={formData.startDate}
                                    onChange={(date) => setFormData({ ...formData, startDate: date })}
                                    minDate={new Date()}
                                    dateFormat="dd/MM/yyyy"
                                    locale="vi"
                                    className="w-full bg-[#111] border border-[#222] text-[#e8e2d9] text-[15px] p-4 outline-none focus:border-[#c9a84c] cursor-pointer"
                                />
                            </div>
                            <div>
                                <label className="text-[11px] uppercase tracking-widest text-[#555] block mb-2 font-bold">Ngày kết thúc</label>
                                <DatePicker
                                    selected={formData.endDate}
                                    onChange={(date) => setFormData({ ...formData, endDate: date })}
                                    minDate={formData.startDate}
                                    dateFormat="dd/MM/yyyy"
                                    locale="vi"
                                    placeholderText="Chọn ngày kết thúc"
                                    className="w-full bg-[#111] border border-[#222] text-[#e8e2d9] text-[15px] p-4 outline-none focus:border-[#c9a84c] cursor-pointer"
                                />
                            </div>
                            <div>
                                <label className="text-[11px] uppercase tracking-widest text-[#555] block mb-2 font-bold">Đơn tối thiểu (đ)</label>
                                <input type="number" className="w-full bg-[#111] border border-[#222] text-[#e8e2d9] text-[15px] p-4 outline-none focus:border-[#c9a84c]" onChange={(e) => setFormData({ ...formData, minOrderValue: Number(e.target.value) })} />
                            </div>
                        </div>
                    </div>

                    {/* ─── HÀNG NÚT XÁC NHẬN (Cái sếp đang thiếu nè) ─── */}
                    <div className="pt-8 mt-4 border-t border-[#1a1a1a] flex justify-end gap-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-10 py-4 text-[11px] uppercase tracking-[0.2em] text-[#444] hover:text-[#c9a84c] transition-all duration-300"
                        >
                            Hủy bỏ
                        </button>
                        <button
                            type="submit"
                            className="px-12 py-4 text-[11px] uppercase tracking-[0.2em] bg-[#c9a84c] text-black font-black hover:bg-[#e8e2d9] transition-all duration-300 shadow-[0_10px_30px_rgba(201,168,76,0.15)] active:scale-95"
                        >
                            Kích hoạt ngay
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreatePromotionModal;