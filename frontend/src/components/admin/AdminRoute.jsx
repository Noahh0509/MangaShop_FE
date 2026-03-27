import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

export default function AdminRoute() {
  const { user, loading } = useContext(AuthContext);

  // 1. PHẢI ĐỢI LOADING XONG HOÀN TOÀN
  // Nếu không có cái này, React sẽ chạy xuống bước 2, thấy user = null (do chưa load xong) 
  // rồi đá sếp về /login hoặc / ngay lập tức.
  if (loading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-[#080808]">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#c9a84c]"></div>
      </div>
    );
  }

  // 2. SAU KHI LOADING XONG MỚI KIỂM TRA USER
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 3. KIỂM TRA QUYỀN QUẢN TRỊ
  const isManagement = user.role === 'admin' || user.role === 'super_admin';
  if (!isManagement) {
    console.warn("Truy cập bị từ chối!");
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}