import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { CheckCircle, XCircle } from "lucide-react";

export default function PaymentResult() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("loading");

  // Đọc các tham số MoMo trả về trên thanh URL
  const resultCode = searchParams.get("resultCode");
  const orderId = searchParams.get("orderId");
  const message = searchParams.get("message");

  useEffect(() => {
    if (resultCode === "0") {
      setStatus("success");
    } else {
      setStatus("failed");
    }
  }, [resultCode]);

  if (status === "loading")
    return (
      <div className="min-h-screen bg-[#0e0e0e] text-white flex justify-center items-center">
        Đang kiểm tra giao dịch...
      </div>
    );

  return (
    <div className="min-h-screen bg-[#0e0e0e] text-[#e8e2d9] flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-[#141414] p-8 rounded-2xl border border-[#333] text-center shadow-2xl">
        {status === "success" ? (
          <>
            <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-green-500 mb-2">
              Đặt hàng thành công!
            </h1>
            <p className="text-gray-400 mb-6">
              Mã đơn hàng của bạn:{" "}
              <span className="font-bold text-white">{orderId}</span>
            </p>
            {message && (
              <p className="text-sm text-gray-500 italic mb-6">"{message}"</p>
            )}
          </>
        ) : (
          <>
            <XCircle className="w-20 h-20 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-red-500 mb-2">
              Thanh toán thất bại!
            </h1>
            <p className="text-gray-400 mb-6">
              Mã đơn hàng:{" "}
              <span className="font-bold text-white">{orderId}</span>
            </p>
            <p className="text-sm text-gray-500 italic mb-6">
              Lý do: {message || "Giao dịch bị hủy hoặc xảy ra lỗi."}
            </p>
          </>
        )}

        <div className="flex gap-4 justify-center">
          <button
            onClick={() => navigate("/products")}
            className="px-6 py-2 border border-[#c9a84c] text-[#c9a84c] rounded hover:bg-[#c9a84c] hover:text-black transition-colors"
          >
            Tiếp tục mua sắm
          </button>
          <button
            onClick={() => navigate("/orders")} // Trỏ tới trang quản lý đơn hàng của User
            className="px-6 py-2 bg-[#c9a84c] text-black font-bold rounded hover:bg-[#b09341] transition-colors"
          >
            Xem đơn hàng
          </button>
        </div>
      </div>
    </div>
  );
}
