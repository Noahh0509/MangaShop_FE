import React from 'react';

export const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center"
            onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
            <div className="bg-[#0e0e0e] border border-[#222] p-9 w-full max-w-[500px] animate-[fadeUp_0.3s_ease]">
                <div className="font-['Cormorant_Garamond'] text-2xl mb-6 pb-4 border-b border-[#222]">{title}</div>
                {children}
            </div>
        </div>
    );
};

export const ProductModal = ({ isOpen, onClose }) => (
    <Modal isOpen={isOpen} onClose={onClose} title="Thêm / Sửa sản phẩm">
        <div className="flex flex-col gap-1.5 mb-4">
            <label className="text-[10px] tracking-[.18em] uppercase text-[#555]">Tên sản phẩm *</label>
            <input type="text" placeholder="Tên truyện" className="bg-transparent border border-[#222] text-[#e8e2d9] text-[13px] p-[11px_14px] outline-none focus:border-[#8a6d2f]" />
        </div>
        {/* Thêm các form group khác... */}
        <div className="flex gap-3 justify-end mt-6 pt-5 border-t border-[#222]">
            <button onClick={onClose} className="px-6 py-2.5 border border-[#222] text-[#888] text-[11px] uppercase tracking-[.12em] hover:border-[#8a6d2f] hover:text-[#c9a84c] transition-colors">Hủy</button>
            <button className="px-6 py-2.5 bg-[#c9a84c] border border-[#c9a84c] text-black text-[11px] uppercase tracking-[.12em] hover:bg-[#e0bc5f] transition-colors">Lưu sản phẩm</button>
        </div>
    </Modal>
);