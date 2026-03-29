import React, { useState } from 'react';
import AdminSidebar from '../components/admin/AdminSidebar';
import AdminNavbar from '../components/admin/AdminNavbar';
import StatsGrid from '../components/admin/StatsGrid';
import AdminTabs from '../components/admin/AdminTabs';
import { ProductsPanel, UsersPanel, OrdersPanel } from '../components/admin/Panels';
import AddProductModal from '../components/admin/AddProductModal';
import { PromotionsPanel } from '../components/admin/PromotionPanel';


export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('products');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // ✅ Hàm mở Modal để THÊM MỚI
  const handleOpenAdd = () => {
    setEditingProduct(null); // Reset form trắng
    setIsModalOpen(true);
  };

  // ✅ Hàm mở Modal để SỬA
  const handleOpenEdit = (product) => {
    setEditingProduct(product); // Đổ dữ liệu sản phẩm vào để sửa
    setIsModalOpen(true);
  };

  // ✅ Hàm đóng Modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  return (
    <div className="flex min-h-screen bg-[#080808] text-[#e8e2d9] font-['DM_Sans'] font-light relative">
      
      {/* 1. Thanh Sidebar cố định bên trái */}
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* 2. Nội dung chính bên phải */}
      <main className="flex-1 overflow-y-auto">
        <AdminNavbar 
          activeTab={activeTab} 
          onAddProduct={handleOpenAdd} // Nút thêm từ Navbar
          onAddUser={() => { /* Logic thêm user nếu có */ }}
        />

        <div className="p-[32px_40px] animate-[fadeUp_0.5s_ease_both]">
          <StatsGrid />
          
          <AdminTabs activeTab={activeTab} setActiveTab={setActiveTab} />

          {/* HIỂN THỊ CÁC PANEL THEO TAB */}
          <div className="mt-6">
            {activeTab === 'products' && (
              <ProductsPanel onOpenModal={handleOpenEdit} />
            )}

            {activeTab === 'users' && (
              <UsersPanel onOpenModal={() => { }} />
            )}

            {activeTab === 'orders' && <OrdersPanel />}
            
            {activeTab === 'promotions' && <PromotionsPanel />}
          </div>
        </div>
      </main>

      {/* 3. MODAL ĐA NĂNG: Dùng chung cho cả Thêm và Sửa */}
      <AddProductModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        editData={editingProduct} 
        onSuccess={() => {
          // Có thể dùng fetch lại data thay vì reload, nhưng tạm thời reload để cập nhật nhanh
          window.location.reload();
        }}
      />

      {/* 4. AI CHAT: Luôn nổi trên cùng bên phải/dưới */}
      
    </div>
  );
}