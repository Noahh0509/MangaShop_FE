import { StrictMode, useContext } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import './index.css';

import { AuthProvider, AuthContext } from './context/AuthContext';

// Components & Routes bảo vệ
import AdminRoute from './components/admin/AdminRoute';
import SuperAdminPanel from './components/superadmin/SuperAdminPanel';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import ForgotPasswordPage from './pages/ForgotPasswordPage';

import  OrdersPage from "./pages/OrdersPage";


import ProfilePage from './pages/ProfilePage';



import AdminPage from './pages/AdminPage';
// Checkout (Tuấn)
import CartPage from "./components/checkout/cart/CartPage";
import CheckoutPage from "./components/checkout/payment/CheckoutPage";
import PaymentResult from "./components/checkout/payment/PaymentResult";


/**
 * 🛡️ 1. KHIÊN USER THƯỜNG (Thay thế cho file ProtectedRoute đã xóa)
 */
const ProtectedRoute = () => {
    const { user, loading } = useContext(AuthContext);

    if (loading) return (
        <div className="min-h-screen bg-[#0e0e0e] flex items-center justify-center text-[#c9a84c]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-[#c9a84c]"></div>
        </div>
    );

    // Nếu có user thì cho vào trang con (Outlet), không thì đá về trang login
    return user ? <Outlet /> : <Navigate to="/login" replace />;
};

/**
 * 🛡️ 2. KHIÊN SUPER ADMIN
 */
const SuperAdminOnly = ({ children }) => {
    const { user, loading } = useContext(AuthContext);

    if (loading) return <div className="loading-spinner">ĐANG KIỂM TRA QUYỀN...</div>;

    if (!user || user.role !== 'super_admin') {
        return <Navigate to="/admin" replace />;
    }

    return children;
};

/**
 * 🛰️ 3. CẤU HÌNH ROUTER
 */
const router = createBrowserRouter([
    // --- ROUTES CÔNG KHAI ---
    { path: '/', element: <HomePage /> },
    { path: '/login', element: <LoginPage /> },
    { path: '/register', element: <RegisterPage /> },
    { path: "/products", element: <ProductsPage /> },
    { path: "/products/:slug", element: <ProductDetailPage /> },
    { path: '/forgot-password', element: <ForgotPasswordPage /> },
    { path: '/orders', element:<OrdersPage/>},

    // --- ROUTES CẦN ĐĂNG NHẬP (USER THƯỜNG) ---
    {
        element: <ProtectedRoute />, 
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
                index: true,
                element: <AdminPage />,
            },
            {
                path: 'master-control',
                element: (
                    <SuperAdminOnly>
                        <SuperAdminPanel />
                    </SuperAdminOnly>
                )
            },
        ]
    },

]);

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    </StrictMode>
);