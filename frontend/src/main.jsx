import { StrictMode, useContext } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import './index.css';

// Context
import { AuthProvider, AuthContext } from './context/AuthContext';

// Components & Routes bảo vệ
import AdminRoute from './components/admin/AdminRoute';
import { SuperAdminPanel } from './components/superadmin/SuperAdminPanel';

// Pages Chung
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";

// Phần Admin (Của Huy)
import AdminPage from './pages/AdminPage';

// Phần Thanh toán (Của Tuấn)
import CartPage from "./components/checkout/cart/CartPage";
import CheckoutPage from "./components/checkout/payment/CheckoutPage";
import PaymentResult from "./components/checkout/payment/PaymentResult";

/**
 * 🛡️ 1. "KHIÊN" SUPER ADMIN
 * Chỉ cho phép role 'super_admin' truy cập
 */
const SuperAdminOnly = ({ children }) => {
    const { user, loading } = useContext(AuthContext);

    if (loading) return (
        <div className="h-screen bg-black flex items-center justify-center text-[#c9a84c]">
            ĐANG KIỂM TRA QUYỀN TRÙM...
        </div>
    );

    if (!user || user.role !== 'super_admin') {
        return <Navigate to="/admin" replace />;
    }

    return children;
};

/**
 * 🛰️ 2. CẤU HÌNH ROUTER TỔNG HỢP
 */
const router = createBrowserRouter([
    // --- ROUTES CÔNG KHAI ---
    { path: '/', element: <HomePage /> },
    { path: '/login', element: <LoginPage /> },
    { path: '/register', element: <RegisterPage /> },
    { path: "/products", element: <ProductsPage /> },
    { path: "/products/:slug", element: <ProductDetailPage /> },
    
    // --- ROUTES GIỎ HÀNG & THANH TOÁN (TUẤN) ---
    { path: "/cart", element: <CartPage /> },
    { path: "/checkout", element: <CheckoutPage /> },
    { path: "/payment-result", element: <PaymentResult /> },

    // --- ROUTES ADMIN (HUY + SUPER ADMIN) ---
    {
        element: <AdminRoute />, // Cửa 1: Check login & role Admin/SuperAdmin
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

/**
 * 🚀 3. RENDER
 */
createRoot(document.getElementById("root")).render(
    <StrictMode>
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    </StrictMode>
);