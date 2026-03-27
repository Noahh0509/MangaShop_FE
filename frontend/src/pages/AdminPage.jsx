import React, { useState } from 'react';
import AdminSidebar from '../components/admin/AdminSidebar';
import AdminNavbar from '../components/admin/AdminNavbar';
import StatsGrid from '../components/admin/StatsGrid';
import AdminTabs from '../components/admin/AdminTabs';
import { ProductsPanel, UsersPanel, OrdersPanel } from '../components/admin/Panels';
import AddProductModal from '../components/admin/AddProductModal'; 

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
    <div className="flex min-h-screen bg-[#080808] text-[#e8e2d9] font-['DM_Sans'] font-light">
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1">
        <AdminNavbar
          activeTab={activeTab}
          onAddProduct={handleOpenAdd} // Dùng hàm handleOpenAdd mới
          onAddUser={() => {}}
        />

        <div className="p-[32px_40px] animate-[fadeUp_0.5s_ease_both]">
          <StatsGrid />
          <AdminTabs activeTab={activeTab} setActiveTab={setActiveTab} />

          {/* TRUYỀN HÀM handleOpenEdit VÀO PANEL */}
          {activeTab === 'products' && (
            <ProductsPanel onOpenModal={handleOpenEdit} /> 
          )}
          
          {activeTab === 'users' && <UsersPanel onOpenModal={() => {}} />}
          {activeTab === 'orders' && <OrdersPanel />}
        </div>
      </main>

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
    </div>
  );
}