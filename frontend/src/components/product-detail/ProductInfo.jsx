import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// Nhớ điều chỉnh lại đường dẫn import axiosInstance cho đúng với thư mục của file này nhé
import axiosInstance from "../../services/axiosInstance";

const ProductInfo = ({ product, promotions }) => {
  const [qty, setQty] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const navigate = useNavigate();

  const formatPrice = (price) =>
    new Intl.NumberFormat("vi-VN").format(price) + "đ";

  const title = product.name || "";
  const category = product.category?.name || "Chưa phân loại";
  const author = product.attributes?.author || "Đang cập nhật";
  const publisher = product.attributes?.publisher || "Đang cập nhật";
  const pages = product.attributes?.pages || "Đang cập nhật";
  const publishYear = product.attributes?.publishYear || "Đang cập nhật";

  let basePrice = product.basePrice || 0;
  let finalPrice = product.salePrice || basePrice;
  let badgeText = null;

  if (promotions && promotions.length > 0) {
    const bestPromo = promotions[0];
    let discountAmount = 0;

    if (bestPromo.discountType === "percentage") {
      discountAmount = (basePrice * bestPromo.discountValue) / 100;
      if (bestPromo.maxDiscount)
        discountAmount = Math.min(discountAmount, bestPromo.maxDiscount);
      badgeText = "Sale";
    } else if (bestPromo.discountType === "fixed") {
      discountAmount = bestPromo.discountValue;
      badgeText = "Sale";
    } else if (bestPromo.discountType === "flash_sale") {
      const flashItem = bestPromo.flashSaleItems?.find(
        (item) => item.product === product._id,
      );
      if (flashItem && flashItem.soldCount < flashItem.stockLimit) {
        discountAmount = basePrice - flashItem.flashPrice;
        badgeText = "Hot";
      }
    }

    finalPrice = Math.max(0, basePrice - discountAmount);
  }

  const hasDiscount = finalPrice < basePrice;
  const totalSaved = basePrice - finalPrice;

  // ─── SỬ DỤNG AXIOS INSTANCE ĐỂ GỌI API THÊM VÀO GIỎ HÀNG ───
  const handleAddToCart = async () => {
    try {
      setIsAdding(true);

      // Sử dụng axiosInstance tương tự như cách bạn gọi ở CartPage
      // Route "/api/cart/add" là route giả định, hãy đổi lại nếu BE của bạn dùng tên khác
      const response = await axiosInstance.post("/api/cart/add", {
        productId: product._id,
        quantity: qty,
      });

      if (response.data.success) {
        // Chuyển hướng sang giỏ hàng nếu API trả về thành công
        navigate("/cart");
      }
    } catch (error) {
      console.error("Lỗi khi thêm vào giỏ hàng:", error);
      // Hiển thị lỗi từ BE gửi về, giống cách bạn xử lý trong handleUpdateQuantity
      alert(error.response?.data?.message || "Không thể thêm vào giỏ hàng");
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div>
      <span className="inline-block text-[10px] tracking-[0.16em] uppercase text-[#8a6d2f] mb-3">
        {category}
      </span>
      <h1 className="font-serif font-light text-[clamp(32px,4vw,52px)] leading-[1.1] mb-2">
        {title}
      </h1>
      <div className="text-[13px] text-[#555] mb-6">
        Tác giả: {author} · NXB {publisher}
      </div>

      <div className="flex items-center gap-2 text-xs text-[#555] mb-6">
        <div
          className={`w-1.5 h-1.5 rounded-full ${product.stock > 0 ? "bg-[#4a9968]" : "bg-red-500"}`}
        ></div>
        <span>
          {product.stock > 0 ? `Còn hàng (${product.stock} cuốn)` : "Hết hàng"}
        </span>
      </div>

      <div className="flex items-baseline gap-3 mb-2">
        <span className="text-2xl font-medium text-[#e8e2d9]">
          {formatPrice(finalPrice)}
        </span>
        {hasDiscount && (
          <span className="text-base text-[#444] line-through">
            {formatPrice(basePrice)}
          </span>
        )}
        {badgeText && (
          <span
            className={`inline-block text-[9px] tracking-[0.14em] uppercase py-1 px-2.5 ml-2 align-middle font-medium ${badgeText === "Sale" ? "border border-[#8a6d2f] text-[#c9a84c]" : "bg-[#c9a84c] text-black"}`}
          >
            {badgeText}
          </span>
        )}
      </div>
      {hasDiscount && (
        <div className="text-xs text-[#555] mb-1">
          Tiết kiệm {formatPrice(totalSaved)}
        </div>
      )}

      <div className="h-px bg-[#222] my-7"></div>

      <div className="border border-[#222]">
        <div className="flex border-b border-[#222]">
          <div className="flex-1 p-4 md:p-5 border-r border-[#222]">
            <div className="text-[10px] tracking-[0.18em] uppercase text-[#555] mb-1">
              Thể loại
            </div>
            <div className="text-[13px] text-[#e8e2d9]">{category}</div>
          </div>
          <div className="flex-1 p-4 md:p-5">
            <div className="text-[10px] tracking-[0.18em] uppercase text-[#555] mb-1">
              Nhà xuất bản
            </div>
            <div className="text-[13px] text-[#e8e2d9]">{publisher}</div>
          </div>
        </div>
        <div className="flex">
          <div className="flex-1 p-4 md:p-5 border-r border-[#222]">
            <div className="text-[10px] tracking-[0.18em] uppercase text-[#555] mb-1">
              Số trang
            </div>
            <div className="text-[13px] text-[#e8e2d9]">{pages}</div>
          </div>
          <div className="flex-1 p-4 md:p-5">
            <div className="text-[10px] tracking-[0.18em] uppercase text-[#555] mb-1">
              Lượt xem
            </div>
            <div className="text-[13px] text-[#e8e2d9]">
              {product.viewCount || 0} lượt
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 mt-7 mb-4">
        <div className="flex items-center border border-[#222]">
          <button
            onClick={() => setQty(Math.max(1, qty - 1))}
            className="w-10 h-10 text-[#888] text-lg hover:text-[#c9a84c] transition-colors"
          >
            −
          </button>
          <input
            type="number"
            value={qty}
            onChange={(e) => setQty(Number(e.target.value))}
            className="w-12 h-10 bg-transparent border-x border-[#222] text-[#e8e2d9] text-sm text-center outline-none"
            min="1"
            max={product.stock}
          />
          <button
            onClick={() => setQty(Math.min(product.stock, qty + 1))}
            className="w-10 h-10 text-[#888] text-lg hover:text-[#c9a84c] transition-colors"
          >
            +
          </button>
        </div>

        <button
          onClick={handleAddToCart}
          className="flex-1 py-3.5 px-6 bg-[#c9a84c] text-black text-[11px] tracking-[0.16em] uppercase font-medium hover:bg-[#e0bc5f] hover:-translate-y-px transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={product.stock <= 0 || isAdding}
        >
          {product.stock <= 0
            ? "Tạm hết hàng"
            : isAdding
              ? "Đang xử lý..."
              : "Thêm vào giỏ hàng"}
        </button>
      </div>
    </div>
  );
};

export default ProductInfo;
