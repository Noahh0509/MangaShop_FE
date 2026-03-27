import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from "lucide-react";
import axiosInstance from "../../../services/axiosInstance"; // Sử dụng file bạn đã gửi
import Header from "../../layout/Header";
import Footer from "../../layout/Footer";

export default function CartPage() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // 1. Lấy dữ liệu giỏ hàng từ Backend
  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/api/cart");
      if (response.data.success) {
        setCart(response.data.cart);
      }
    } catch (error) {
      console.error("Lỗi lấy giỏ hàng:", error);
    } finally {
      setLoading(false);
    }
  };

  // 2. Cập nhật số lượng sản phẩm (Tăng/Giảm)
  // Tìm hàm handleUpdateQuantity trong CartPage.jsx và sửa lại:
  const handleUpdateQuantity = async (
    productId,
    currentQty,
    adjustment,
    stock,
  ) => {
    const newQuantity = currentQty + adjustment;

    // SỬA TẠI ĐÂY: Nếu bấm giảm khi đang là 1, newQuantity sẽ là 0.
    // Thay vì return, hãy xác nhận với người dùng.
    if (newQuantity === 0) {
      if (window.confirm("Bạn có muốn xóa sản phẩm này khỏi giỏ hàng?")) {
        handleRemoveItem(productId); // Gọi hàm xóa đã có sẵn của bạn
      }
      return;
    }

    if (newQuantity > stock) {
      alert(`Rất tiếc, chỉ còn ${stock} sản phẩm trong kho.`);
      return;
    }

    try {
      const response = await axiosInstance.put("/api/cart/update", {
        productId,
        quantity: newQuantity,
      });
      if (response.data.success) {
        setCart(response.data.cart);
      }
    } catch (error) {
      alert(error.response?.data?.message || "Không thể cập nhật số lượng");
    }
  };

  // 3. Xóa một sản phẩm khỏi giỏ
  const handleRemoveItem = async (productId) => {
    if (!window.confirm("Bạn có chắc muốn xóa sản phẩm này?")) return;

    try {
      const response = await axiosInstance.delete(
        `/api/cart/remove/${productId}`,
      );
      if (response.data.success) {
        setCart(response.data.cart);
      }
    } catch (error) {
      alert("Lỗi khi xóa sản phẩm");
    }
  };

  // 4. Làm trống toàn bộ giỏ hàng
  const handleClearCart = async () => {
    if (!window.confirm("Bạn muốn xóa toàn bộ giỏ hàng?")) return;
    try {
      const response = await axiosInstance.delete("/api/cart/clear");
      if (response.data.success) {
        setCart({ items: [], totalPrice: 0, totalItems: 0, discount: 0 });
      }
    } catch (error) {
      alert("Lỗi khi dọn dẹp giỏ hàng");
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0e0e0e] flex items-center justify-center text-[#c9a84c]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#c9a84c]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#0e0e0e] text-[#e8e2d9]">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Thêm mt-8 để đẩy toàn bộ khối tiêu đề này xuống dưới */}
        <div className="flex items-center justify-between mt-8 mb-8 border-b border-[#333] pb-4">
          <h1 className="text-3xl font-bold text-[#c9a84c] flex items-center gap-3">
            <ShoppingBag /> GIỎ HÀNG
          </h1>
          {cart?.items?.length > 0 && (
            <button
              onClick={handleClearCart}
              className="text-sm text-gray-400 hover:text-red-500 transition-colors"
            >
              Xóa tất cả
            </button>
          )}
        </div>

        {!cart || cart.items.length === 0 ? (
          <div className="text-center py-20 bg-[#1a1a1a] rounded-xl border border-[#333]">
            <ShoppingBag size={64} className="mx-auto text-gray-600 mb-4" />
            <p className="text-xl text-gray-400">Giỏ hàng của bạn đang trống</p>
            <Link
              to="/products"
              className="mt-6 inline-flex items-center gap-2 bg-[#c9a84c] text-[#0e0e0e] px-6 py-3 rounded-full font-bold hover:bg-[#b09341] transition-all"
            >
              <ArrowLeft size={18} /> TIẾP TỤC MUA SẮM
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cột trái: Danh sách sản phẩm */}
            <div className="lg:col-span-2 space-y-4">
              {cart.items.map((item) => (
                <div
                  key={item.product._id}
                  className="flex flex-col sm:flex-row gap-4 bg-[#141414] p-4 rounded-lg border border-[#222] hover:border-[#444] transition-all"
                >
                  {/* Ảnh sản phẩm */}
                  <img
                    src={
                      item.product.images?.[0]?.url ||
                      "https://via.placeholder.com/150"
                    }
                    alt={item.product.name}
                    className="w-full sm:w-24 h-36 object-cover rounded shadow-lg"
                    onClick={() => navigate(`/product/${item.product.slug}`)}
                  />

                  {/* Thông tin sản phẩm */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3
                          className="font-bold text-lg hover:text-[#c9a84c] cursor-pointer"
                          onClick={() =>
                            navigate(`/product/${item.product.slug}`)
                          }
                        >
                          {item.product.name}
                        </h3>

                        {/* LOGIC HIỂN THỊ GIÁ KHUYẾN MÃI TỪ DATABASE */}
                        <div className="mt-1 flex items-end gap-2">
                          {/* Luôn hiển thị giá hiện tại đang được tính (thường là displayPrice) */}
                          <span className="text-[#c9a84c] font-bold text-lg">
                            {item.price.toLocaleString("vi-VN")}đ
                          </span>

                          {/* So sánh: Nếu có salePrice VÀ giá đang bán (item.price) thấp hơn basePrice thì hiện giá gốc bị gạch ngang */}
                          {item.product.salePrice &&
                            item.price < item.product.basePrice && (
                              <span className="text-sm text-gray-500 line-through mb-[2px]">
                                {item.product.basePrice.toLocaleString("vi-VN")}
                                đ
                              </span>
                            )}
                        </div>
                      </div>
                      <button
                        onClick={() => handleRemoveItem(item.product._id)}
                        className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded-full transition-all"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      {/* Bộ tăng giảm số lượng */}
                      <div className="flex items-center bg-[#0e0e0e] border border-[#333] rounded-lg overflow-hidden">
                        <button
                          onClick={() =>
                            handleUpdateQuantity(
                              item.product._id,
                              item.quantity,
                              -1,
                              item.product.stock,
                            )
                          }
                          className="p-2 hover:bg-[#c9a84c] hover:text-[#0e0e0e] transition-colors"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-12 text-center font-bold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            handleUpdateQuantity(
                              item.product._id,
                              item.quantity,
                              1,
                              item.product.stock,
                            )
                          }
                          className="p-2 hover:bg-[#c9a84c] hover:text-[#0e0e0e] transition-colors"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500 uppercase tracking-wider">
                          Thành tiền
                        </p>
                        <p className="font-bold text-white">
                          {(item.price * item.quantity).toLocaleString("vi-VN")}
                          đ
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Cột phải: Thanh toán */}
            <div className="lg:col-span-1">
              <div className="bg-[#141414] p-6 rounded-xl border border-[#c9a84c]/30 sticky top-24 shadow-2xl">
                <h2 className="text-xl font-bold mb-6 border-b border-[#333] pb-2">
                  HÓA ĐƠN TẠM TÍNH
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-400">
                    <span>Số lượng:</span>
                    <span>{cart.totalItems} sản phẩm</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Tạm tính:</span>
                    <span>
                      {(cart.totalPrice + (cart.discount || 0)).toLocaleString(
                        "vi-VN",
                      )}
                      đ
                    </span>
                  </div>
                  {cart.discount > 0 && (
                    <div className="flex justify-between text-green-500 italic">
                      <span>Giảm giá:</span>
                      <span>-{cart.discount.toLocaleString("vi-VN")}đ</span>
                    </div>
                  )}
                </div>

                <div className="border-t border-[#333] pt-4 mb-8">
                  <div className="flex justify-between items-end">
                    <span className="font-bold">TỔNG TIỀN:</span>
                    <span className="text-2xl font-black text-[#c9a84c]">
                      {cart.totalPrice.toLocaleString("vi-VN")}đ
                    </span>
                  </div>
                  <p className="text-[10px] text-gray-500 text-right mt-1">
                    (Đã bao gồm VAT nếu có)
                  </p>
                </div>

                <button
                  onClick={() => navigate("/checkout")}
                  className="w-full bg-[#c9a84c] text-[#0e0e0e] py-4 rounded-lg font-black text-lg hover:bg-[#d4b55c] hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg"
                >
                  TIẾN HÀNH ĐẶT HÀNG
                </button>

                <div className="mt-6 flex flex-wrap justify-center gap-4 opacity-30 grayscale">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png"
                    alt="MoMo"
                    className="h-6"
                  />
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
                    alt="PayPal"
                    className="h-6"
                  />
                  <img
                    src="https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-VNPAY-QR.png"
                    alt="VNPay"
                    className="h-6"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
