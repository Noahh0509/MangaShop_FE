import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../services/axiosInstance";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // State lưu trữ thông tin địa chỉ giao hàng
  const [shippingAddress, setShippingAddress] = useState({
    fullName: "",
    phone: "",
    province: "",
    district: "",
    ward: "",
    street: "",
    note: "",
  });

  // State lưu phương thức thanh toán (COD hoặc MOMO)
  const [paymentMethod, setPaymentMethod] = useState("COD");

  // Xử lý khi bấm nút "ĐẶT HÀNG"
  const handlePlaceOrder = async (e) => {
    e.preventDefault(); // Ngăn load lại trang nếu dùng trong form

    // Validate cơ bản (bạn có thể làm kỹ hơn)
    if (
      !shippingAddress.fullName ||
      !shippingAddress.phone ||
      !shippingAddress.street
    ) {
      return alert("Vui lòng điền đầy đủ thông tin giao hàng!");
    }

    try {
      setLoading(true);
      const payload = {
        shippingAddress,
        paymentMethod,
      };

      const response = await axiosInstance.post(
        "/api/checkout/create-order",
        payload,
      );

      if (response.data.success) {
        if (response.data.paymentType === "MOMO" && response.data.payUrl) {
          // CHUYỂN HƯỚNG SANG CỔNG THANH TOÁN MOMO
          window.location.href = response.data.payUrl;
        } else {
          // NẾU LÀ COD, CHUYỂN SANG TRANG THÀNH CÔNG LUÔN
          navigate(
            `/payment-result?resultCode=0&orderId=${response.data.invoice.invoiceCode}`,
          );
        }
      }
    } catch (error) {
      console.error("Lỗi đặt hàng:", error);
      alert(error.response?.data?.message || "Có lỗi xảy ra khi đặt hàng.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0e0e0e] text-[#e8e2d9] p-8">
      <div className="max-w-3xl mx-auto bg-[#141414] p-8 rounded-xl border border-[#333]">
        <h1 className="text-2xl font-bold text-[#c9a84c] mb-6">Thanh Toán</h1>

        <form onSubmit={handlePlaceOrder} className="space-y-6">
          {/* Form điền địa chỉ (Làm mẫu vài field) */}
          {/* Form điền địa chỉ đầy đủ */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Họ và tên"
              required
              value={shippingAddress.fullName}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  fullName: e.target.value,
                })
              }
              className="w-full bg-transparent border border-[#333] p-3 rounded text-white focus:border-[#c9a84c] outline-none"
            />
            <input
              type="text"
              placeholder="Số điện thoại"
              required
              value={shippingAddress.phone}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  phone: e.target.value,
                })
              }
              className="w-full bg-transparent border border-[#333] p-3 rounded text-white focus:border-[#c9a84c] outline-none"
            />
            <input
              type="text"
              placeholder="Tỉnh / Thành phố"
              required
              value={shippingAddress.province}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  province: e.target.value,
                })
              }
              className="w-full bg-transparent border border-[#333] p-3 rounded text-white focus:border-[#c9a84c] outline-none"
            />
            <input
              type="text"
              placeholder="Quận / Huyện"
              required
              value={shippingAddress.district}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  district: e.target.value,
                })
              }
              className="w-full bg-transparent border border-[#333] p-3 rounded text-white focus:border-[#c9a84c] outline-none"
            />
            <input
              type="text"
              placeholder="Phường / Xã"
              required
              value={shippingAddress.ward}
              onChange={(e) =>
                setShippingAddress({ ...shippingAddress, ward: e.target.value })
              }
              className="w-full bg-transparent border border-[#333] p-3 rounded text-white focus:border-[#c9a84c] outline-none"
            />
            <input
              type="text"
              placeholder="Số nhà, tên đường"
              required
              value={shippingAddress.street}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  street: e.target.value,
                })
              }
              className="w-full bg-transparent border border-[#333] p-3 rounded text-white focus:border-[#c9a84c] outline-none"
            />
            <textarea
              placeholder="Ghi chú giao hàng (không bắt buộc)"
              value={shippingAddress.note}
              onChange={(e) =>
                setShippingAddress({ ...shippingAddress, note: e.target.value })
              }
              className="md:col-span-2 w-full bg-transparent border border-[#333] p-3 rounded text-white focus:border-[#c9a84c] outline-none min-h-[100px]"
            ></textarea>
          </div>

          {/* Chọn phương thức thanh toán */}
          <div className="space-y-3 mt-6">
            <h3 className="text-lg font-bold">Phương thức thanh toán</h3>
            <label className="flex items-center gap-3 p-4 border border-[#333] rounded cursor-pointer hover:border-[#c9a84c]">
              <input
                type="radio"
                name="payment"
                value="COD"
                checked={paymentMethod === "COD"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="accent-[#c9a84c]"
              />
              <span>Thanh toán khi nhận hàng (COD)</span>
            </label>
            <label className="flex items-center gap-3 p-4 border border-[#333] rounded cursor-pointer hover:border-[#c9a84c]">
              <input
                type="radio"
                name="payment"
                value="MOMO"
                checked={paymentMethod === "MOMO"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="accent-[#c9a84c]"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png"
                alt="MoMo"
                className="h-6"
              />
              <span>Thanh toán qua ví MoMo</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#c9a84c] text-black font-bold py-4 rounded hover:bg-[#b09341] transition-colors disabled:opacity-50"
          >
            {loading ? "Đang xử lý..." : "XÁC NHẬN ĐẶT HÀNG"}
          </button>
        </form>
      </div>
    </div>
  );
}
