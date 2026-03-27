import React, { useState } from 'react';
import AdminSidebar from '../components/admin/AdminSidebar';
import AdminNavbar from '../components/admin/AdminNavbar'; 
import StatsGrid from '../components/admin/StatsGrid';
import AdminTabs from '../components/admin/AdminTabs';
import { ProductsPanel, UsersPanel, OrdersPanel } from '../components/admin/Panels';
import { ProductModal } from '../components/admin/Modals';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('products');
  const [isProductModalOpen, setProductModalOpen] = useState(false);
  const [isUserModalOpen, setUserModalOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#080808] text-[#e8e2d9] font-['DM_Sans'] font-light">
      
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 overflow-y-auto">
        <AdminNavbar 
          activeTab={activeTab} 
          onAddProduct={() => setProductModalOpen(true)}
          onAddUser={() => setUserModalOpen(true)}
        />

        <div className="p-[32px_40px] animate-[fadeUp_0.5s_ease_both]">
          <StatsGrid />
          <AdminTabs activeTab={activeTab} setActiveTab={setActiveTab} />

          {/* Hiển thị Panel tương ứng với Tab đang chọn */}
          {activeTab === 'products' && <ProductsPanel onOpenModal={() => setProductModalOpen(true)} />}
          {activeTab === 'users' && <UsersPanel onOpenModal={() => setUserModalOpen(true)} />}
          {activeTab === 'orders' && <OrdersPanel />}
        </div>
      </main>

      {/* Modals */}
      <ProductModal isOpen={isProductModalOpen} onClose={() => setProductModalOpen(false)} />
      {/* <UserModal isOpen={isUserModalOpen} onClose={() => setUserModalOpen(false)} /> */}
    </div>
  );
}