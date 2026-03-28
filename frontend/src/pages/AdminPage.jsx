import React, { useState } from 'react';
import AdminSidebar from '../components/admin/AdminSidebar';
import AdminNavbar from '../components/admin/AdminNavbar';
import StatsGrid from '../components/admin/StatsGrid';
import AdminTabs from '../components/admin/AdminTabs';
import { ProductsPanel, UsersPanel, OrdersPanel } from '../components/admin/Panels';
<<<<<<< HEAD
import AddProductModal from '../components/admin/AddProductModal';
import { PromotionsPanel} from '../components/admin/PromotionPanel';
=======
import { ProductModal } from '../components/admin/Modals';

// --- BƯỚC 1: IMPORT KHUNG CHAT AI ---
import AdminAIChat from '../components/admin/AdminAIChat'; 

>>>>>>> 0d418b90be00ab12674aa073def17770b0d36c8b
export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('products');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null); // Giữ dữ liệu khi sửa

  // ✅ Hàm mở Modal để THÊM MỚI
  const handleOpenAdd = () => {
    setEditingProduct(null); // Reset về null để form trắng
    setIsAddModalOpen(true);
  };

  // ✅ Hàm mở Modal để SỬA (Clone của nút thêm)
  const handleOpenEdit = (product) => {
    setEditingProduct(product); // Đổ dữ liệu bộ truyện vào State
    setIsAddModalOpen(true);
  };

  // ✅ Hàm đóng Modal
  const handleCloseModal = () => {
    setIsAddModalOpen(false);
    setEditingProduct(null);
  };

  return (
<<<<<<< HEAD
    <div className="flex min-h-screen bg-[#080808] text-[#e8e2d9] font-['DM_Sans'] font-light">
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1">
        <AdminNavbar
          activeTab={activeTab}
          onAddProduct={handleOpenAdd} // Dùng hàm handleOpenAdd mới
          onAddUser={() => { }}
=======
    <div className="flex min-h-screen bg-[#080808] text-[#e8e2d9] font-['DM_Sans'] font-light relative">
      
      {/* Thanh Sidebar bên trái */}
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Nội dung chính bên phải */}
      <main className="flex-1 overflow-y-auto">
        <AdminNavbar 
          activeTab={activeTab} 
          onAddProduct={() => setProductModalOpen(true)}
          onAddUser={() => setUserModalOpen(true)}
>>>>>>> 0d418b90be00ab12674aa073def17770b0d36c8b
        />

        <div className="p-[32px_40px] animate-[fadeUp_0.5s_ease_both]">
          <StatsGrid />
          <AdminTabs activeTab={activeTab} setActiveTab={setActiveTab} />

          {/* TRUYỀN HÀM handleOpenEdit VÀO PANEL */}
          {activeTab === 'products' && (
            <ProductsPanel onOpenModal={handleOpenEdit} />
          )}

          {activeTab === 'users' && <UsersPanel onOpenModal={() => { }} />}
          {activeTab === 'orders' && <OrdersPanel />}
          {activeTab === 'promotions' && <PromotionsPanel />}
        </div>
      </main>

<<<<<<< HEAD
      {/* MODAL ĐA NĂNG: VỪA THÊM VỪA SỬA */}
      <AddProductModal
        isOpen={isAddModalOpen}
        onClose={handleCloseModal}
        editData={editingProduct} // ✅ Truyền data sửa vào đây nè sếp
        onSuccess={() => {
          // Thay vì reload sếp có thể fetch lại data, 
          // nhưng tạm thời reload cho lẹ cũng được
          window.location.reload();
        }}
      />
=======
      {/* --- BƯỚC 2: ĐẶT KHUNG CHAT AI Ở ĐÂY --- */}
      {/* Nó sẽ luôn nằm cố định ở góc dưới bên phải màn hình */}
      <AdminAIChat />

      {/* Các Modals quản trị */}
      <ProductModal isOpen={isProductModalOpen} onClose={() => setProductModalOpen(false)} />
      {/* <UserModal isOpen={isUserModalOpen} onClose={() => setUserModalOpen(false)} /> */}
      
>>>>>>> 0d418b90be00ab12674aa073def17770b0d36c8b
    </div>
  );
}