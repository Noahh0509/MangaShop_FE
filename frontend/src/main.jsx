import { StrictMode, useContext } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import './index.css';

// Context & Routes
import { AuthProvider, AuthContext } from './context/AuthContext';
import AdminRoute from './components/admin/AdminRoute';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import AdminPage from './pages/AdminPage';

// Components
import { SuperAdminPanel } from './components/superadmin/SuperAdminPanel';
import CartPage from "./components/checkout/cart/CartPage";
import CheckoutPage from "./components/checkout/payment/CheckoutPage";
import PaymentResult from "./components/checkout/payment/PaymentResult";

// 🛡️ 1. "KHIÊN" SUPER ADMIN (BỎ OUTLET, DÙNG CHILDREN)
const SuperAdminOnly = ({ children }) => {
    const { user, loading } = useContext(AuthContext);

    if (loading) return (
        <div className="h-screen bg-black flex items-center justify-center text-[#c9a84c]">
            ĐANG KIỂM TRA QUYỀN TRÙM...
        </div>
    );

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
        path: "/cart",
        element: <CartPage />,
    },
    {
        path: "/products",
        element: <ProductsPage />,
    },
    {
        path: "/products/:slug",
        element: <ProductDetailPage />,
    },
    {
        path: "/checkout",
        element: <CheckoutPage />,
    },
    {
        path: "/payment-result",
        element: <PaymentResult />,
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

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    </StrictMode>,
);