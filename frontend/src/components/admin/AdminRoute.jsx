import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

export default function AdminRoute() {
  const { user, loading } = useContext(AuthContext);

  // 1. Khi đang check xem user đã đăng nhập chưa (loading từ AuthContext)
  // Hiển thị một màn hình chờ nhỏ để tránh bị văng ra Login nhầm
  if (loading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-[#080808]">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#c9a84c]"></div>
      </div>
    );
  }

  // 2. Nếu không có user (chưa đăng nhập) -> Đá về Login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 3. Nếu đã đăng nhập nhưng role KHÔNG PHẢI admin -> Đá về trang chủ
  if (user.role !== 'admin') {
    console.warn("Truy cập bị từ chối: Bạn không có quyền Admin!");
    return <Navigate to="/" replace />;
  }

  // 4. Nếu là Admin xịn -> Cho phép đi vào các route con (Outlet)
  return <Outlet />;
}