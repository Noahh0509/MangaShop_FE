import { StrictMode, useContext } from 'react'; // Thêm useContext
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'; // Thêm Navigate
import './index.css';

import { AuthProvider, AuthContext } from './context/AuthContext'; // Import thêm AuthContext
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminPage from './pages/AdminPage';
import AdminRoute from './components/admin/AdminRoute';
import { SuperAdminPanel } from './components/superadmin/SuperAdminPanel';

// 🛡️ 1. PHẢI CÓ ĐOẠN NÀY THÌ MỚI HẾT LỖI "NOT DEFINED"
const SuperAdminOnly = ({ children }) => {
    const { user, loading } = useContext(AuthContext);

    // Đang kiểm tra token thì hiện màn hình chờ, không được đá văng sếp
    if (loading) return <div className="h-screen bg-[#080808]"></div>;

    // Nếu không phải super_admin (Trùm) thì mời về trang admin thường
    if (!user || user.role !== 'super_admin') {
        return <Navigate to="/admin" replace />;
  }

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
        element: <AdminRoute />, // Lớp bảo vệ 1 (Admin & Super Admin đều qua được)
        children: [
            {
                path: '/admin',
                element: <AdminPage />,
            },
            {
                path: '/admin/master-control', // Lớp bảo vệ 2 (Chỉ Super Admin)
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