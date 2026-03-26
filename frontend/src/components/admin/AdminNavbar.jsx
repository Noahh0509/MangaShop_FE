import React from 'react';

export default function AdminNavbar({ activeTab, onAddProduct, onAddUser }) {
  // Hàm để đổi tên Tab cho chuyên nghiệp
  const getTabTitle = (tab) => {
    switch (tab) {
      case 'products': return 'QUẢN LÝ SẢN PHẨM';
      case 'users': return 'QUẢN LÝ NGƯỜI DÙNG';
      case 'orders': return 'QUẢN LÝ ĐƠN HÀNG';
      default: return 'BẢNG ĐIỀU KHIỂN';
    }
  };

  return (
    <header className="flex items-center justify-between p-[24px_40px] border-b border-[#222] bg-[#080808] sticky top-0 z-10">
      {/* Bên trái: Chỉ hiện tiêu đề trang hiện tại, KHÔNG CÓ LOGO TRẮNG */}
      <div>
        <h2 className="text-[14px] font-medium uppercase tracking-[0.2em] text-[#c9a84c]">
          Admin Panel
        </h2>
        <h1 className="text-[20px] font-light mt-1 text-[#e8e2d9] font-['Cormorant_Garamond']">
          {getTabTitle(activeTab)}
        </h1>
      </div>

      {/* Bên phải: Các nút bấm hành động nhanh */}
      <div className="flex items-center gap-4">
        {activeTab === 'products' && (
          <button 
            onClick={onAddProduct}
            className="px-6 py-2.5 text-[12px] uppercase tracking-[0.1em] border border-[#c9a84c] text-[#c9a84c] hover:bg-[#c9a84c] hover:text-black transition-all duration-300"
          >
            + Thêm sản phẩm mới
          </button>
        )}
        
        {activeTab === 'users' && (
          <button 
            onClick={onAddUser}
            className="px-6 py-2.5 text-[12px] uppercase tracking-[0.1em] border border-[#c9a84c] text-[#c9a84c] hover:bg-[#c9a84c] hover:text-black transition-all duration-300"
          >
            + Thêm thành viên
          </button>
        )}

        {/* Nút Logout (Nếu bạn muốn) */}
        <div className="w-10 h-10 rounded-full border border-[#222] flex items-center justify-center cursor-pointer hover:border-[#c9a84c] transition-colors">
          <span className="text-[12px]">👤</span>
        </div>
      </div>
    </header>
  );
}