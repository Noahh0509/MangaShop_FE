import { StrictMode, useContext } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom'; // Thêm Outlet ở đây
import './index.css';

import { AuthProvider, AuthContext } from './context/AuthContext';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminPage from './pages/AdminPage';
import AdminRoute from './components/admin/AdminRoute';
import { SuperAdminPanel } from './components/superadmin/SuperAdminPanel';

// 🛡️ 1. SỬA LẠI "KHIÊN" SUPER ADMIN (BỎ OUTLET, DÙNG CHILDREN)
const SuperAdminOnly = ({ children }) => {
    const { user, loading } = useContext(AuthContext);

    if (loading) return <div className="h-screen bg-black flex items-center justify-center text-[#c9a84c]">ĐANG KIỂM TRA QUYỀN TRÙM...</div>;

    // CHỈ cho phép đúng role "super_admin" vào đây
    if (!user || user.role !== 'super_admin') {
        return <Navigate to="/admin" replace />;
    }

    // Trả về cái Panel nằm bên trong nó
    return children;
};

// 🛰️ 2. CẤU HÌNH ROUTER
const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />,
    },
    {
        path: '/login',
        element: <LoginPage />,
    },
    {
        path: '/register',
        element: <RegisterPage />,
    },
    {
        element: <AdminRoute />, // Cửa 1: Cho cả Admin và Super Admin vào
        children: [
            {
                path: '/admin',
                element: <AdminPage />,
            },
            {
                path: '/admin/master-control',
                element: (
                    <SuperAdminOnly>
                        <SuperAdminPanel />
                    </SuperAdminOnly>
                )
            },
        ]
    },
]);

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    </StrictMode>
);