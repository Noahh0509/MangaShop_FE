import { StrictMode, useContext } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import './index.css';

import { AuthProvider, AuthContext } from './context/AuthContext';

// Components & Routes bảo vệ
import AdminRoute from './components/admin/AdminRoute';
import ProtectedRoute from './components/auth/ProtectedRoute'; // Nên có thêm cái này
import { SuperAdminPanel } from './components/superadmin/SuperAdminPanel';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ProfilePage from './pages/ProfilePage';
import AdminPage from './pages/AdminPage';

// Checkout (Tuấn)
import CartPage from "./components/checkout/cart/CartPage";
import CheckoutPage from "./components/checkout/payment/CheckoutPage";
import PaymentResult from "./components/checkout/payment/PaymentResult";

/**
 * 🛡️ 1. KHIÊN SUPER ADMIN (Sửa lại logic điều hướng)
 */
const SuperAdminOnly = ({ children }) => {
    const { user, loading } = useContext(AuthContext);

    if (loading) return <div className="loading-spinner">ĐANG KIỂM TRA QUYỀN...</div>;

    // Nếu không phải trùm, đá về trang admin chính thay vì trang chủ
    if (!user || user.role !== 'super_admin') {
        return <Navigate to="/admin" replace />;
    }

    return children;
};

/**
 * 🛰️ 2. CẤU HÌNH ROUTER
 */
const router = createBrowserRouter([
    // --- ROUTES CÔNG KHAI ---
    { path: '/', element: <HomePage /> },
    { path: '/login', element: <LoginPage /> },
    { path: '/register', element: <RegisterPage /> },
    { path: "/products", element: <ProductsPage /> },
    { path: "/products/:slug", element: <ProductDetailPage /> },
    { path: '/forgot-password', element: <ForgotPasswordPage /> },

    // --- ROUTES CẦN ĐĂNG NHẬP (USER THƯỜNG) ---
    {
        element: <ProtectedRoute />, // Bạn nên tạo component này để bọc các trang riêng tư
        children: [
            { path: "/profile", element: <ProfilePage /> },
            { path: "/cart", element: <CartPage /> },
            { path: "/checkout", element: <CheckoutPage /> },
            { path: "/payment-result", element: <PaymentResult /> },
        ]
    },

    // --- ROUTES ADMIN (HUY + SUPER ADMIN) ---
    {
        path: '/admin',
        element: <AdminRoute />, 
        children: [
            {
                index: true, // Đây sẽ là trang mặc định khi vào /admin
                element: <AdminPage />,
            },
            {
                path: 'master-control', // Đường dẫn sẽ là /admin/master-control
                element: (
                    <SuperAdminOnly>
                        <SuperAdminPanel />
                    </SuperAdminOnly>
                )
            },
        ]
    },
    
    // --- ROUTE 404 (Nên thêm) ---
    { path: '*', element: <Navigate to="/" replace /> }
]);

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    </StrictMode>
);