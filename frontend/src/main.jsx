import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

// Context
import { AuthProvider } from "./context/AuthContext";

// Pages & Components (Gộp của cả 2 anh em)
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";

// Phần Admin (Của Huy)
import AdminPage from "./pages/AdminPage";
import AdminRoute from "./components/admin/AdminRoute";

// Phần Thanh toán (Của Tuấn)
import CartPage from "./components/checkout/cart/CartPage";
import CheckoutPage from "./components/checkout/payment/CheckoutPage";
import PaymentResult from "./components/checkout/payment/PaymentResult";

const router = createBrowserRouter([
  // --- ROUTES CHUNG ---
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
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
    path: "/cart",
    element: <CartPage />,
  },
  {
    path: "/checkout",
    element: <CheckoutPage />,
  },
  {
    path: "/payment-result",
    element: <PaymentResult />,
  },

  // --- ROUTES ADMIN (Đã bọc bảo vệ bằng AdminRoute) ---
  {
    element: <AdminRoute />, 
    children: [
      {
        path: "/admin",
        element: <AdminPage />,
      },
      // Nếu sau này Huy thêm trang /admin/products thì cho vào đây nhé
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);