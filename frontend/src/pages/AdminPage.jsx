import React, { useState, useEffect } from 'react';
import AdminSidebar from '../components/admin/AdminSidebar';
import AdminNavbar from '../components/admin/AdminNavbar';
import StatsGrid from '../components/admin/StatsGrid';
import AdminTabs from '../components/admin/AdminTabs';
import { ProductsPanel, UsersPanel, OrdersPanel } from '../components/admin/Panels';
import AddProductModal from '../components/admin/AddProductModal';
import { PromotionsPanel } from '../components/admin/PromotionPanel';
import { DashboardPanel } from '../components/admin/DashboardPanel';
import api from '../services/axiosInstance';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [stats, setStats] = useState(null);
  const [loadingStats, setLoadingStats] = useState(true);

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

  // Fetch dữ liệu thống kê dùng chung cho cả trang Admin
  const fetchStats = async () => {
    try {
      setLoadingStats(true);
      const res = await api.get('/api/stats/summary');
      setStats(res.data.data);
    } catch (err) {
      console.error("Lỗi lấy stats tổng:", err);
    } finally {
      setLoadingStats(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

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
          <StatsGrid data={stats} loading={loadingStats} />
          
          <AdminTabs activeTab={activeTab} setActiveTab={setActiveTab} />

          {/* HIỂN THỊ CÁC PANEL THEO TAB */}
          <div className="mt-6">

            {activeTab === 'dashboard' && <DashboardPanel stats={stats} loading={loadingStats} />}

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