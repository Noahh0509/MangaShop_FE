import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import SidebarFilter from '../components/products/SidebarFilter';
import ProductToolbar from '../components/products/ProductToolbar';
import Mangacard from '../components/home/Mangacard'; 

// Khai báo API_URL đồng bộ với file .env của bạn
const API_URL = `${import.meta.env.VITE_API_URL}/api/products`;

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // console.log("Đang gọi API tới đường dẫn:", API_URL); 
        const response = await axios.get(API_URL);
        // console.log("Kết quả từ Backend trả về:", response.data); 
        
        if (response.data.success) {
          setProducts(response.data.data);
        } else {
          setError("Gọi API thành công nhưng Backend trả về success: false");
        }
      } catch (err) {
        // console.error("Lỗi khi gọi API:", err); 
        setError(err.message || 'Có lỗi xảy ra khi lấy dữ liệu');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
    <Header />
    <div className="pt-[72px] flex min-h-screen bg-[#0e0e0e] text-[#e8e2d9]">
      <SidebarFilter />
      
      <main className="flex-1 p-8 lg:p-12 animate-[fadeUp_0.6s_ease_both]">
        <div className="mb-8 pb-6 border-b border-[#222]">
          <div className="text-[10px] tracking-[0.22em] uppercase text-[#c9a84c] mb-3">Bộ sưu tập</div>
          <h1 className="font-serif font-light text-[clamp(32px,4vw,52px)] leading-[1.1] mb-2">Truyện tranh</h1>
          <p className="text-[13px] text-[#555] m-0">Khám phá hơn 5,000 đầu sách được tuyển chọn kỹ lưỡng</p>
        </div>

        <ProductToolbar />

        {/* Trạng thái Loading hoặc Error */}
        {loading && <div className="text-center py-10 text-[#888]">Đang tải dữ liệu truyện tranh...</div>}
        {error && <div className="text-center py-10 text-red-500">Lỗi: {error}</div>}

        {/* Render danh sách sản phẩm từ backend */}
        {!loading && !error && (
          // ĐÃ FIX: Thay đổi class div bọc Grid bên dưới để bỏ khung xám thừa
          <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-10 bg-transparent justify-start items-start">
            {products.map(product => {
              // Xử lý tem nhãn (Badge) based on Backend structure
              let badgeText = null;
              
              if (product.appliedPromotion) {
                if (product.appliedPromotion.discountType === 'flash_sale') {
                  badgeText = 'Hot';
                } else {
                  badgeText = 'Sale';
                }
              } else if (product.isFeatured) {
                badgeText = 'Mới';
              }

              // Gói data chuẩn props mà MangaCard yêu cầu
              const mangaData = {
                id: product._id,
                slug: product.slug,
                title: product.name,
                author: product.attributes?.author || 'Đang cập nhật',
                genre: product.category?.name || 'Chưa phân loại',
                price: product.finalPrice, // MangaCard sẽ tự format số thành tiền Việt
                oldPrice: product.basePrice > product.finalPrice ? product.basePrice : null,
                badge: badgeText, // Chỉ truyền text 'Sale', 'Hot', 'Mới'
                cover: product.images && product.images.length > 0 ? product.images[0].url : null 
              };

              return (
                <Mangacard 
                  key={product._id} 
                  manga={mangaData} 
                />
              );
            })}
          </div>
        )}

        {/* Phân trang (Tạm thời giữ giao diện cứng) */}
        {!loading && !error && products.length > 0 && (
          <div className="flex items-center justify-center gap-2 mt-12 pt-8 border-t border-[#222]">
            <div className="w-9 h-9 border border-[#222] flex items-center justify-center text-xs text-[#555] cursor-pointer hover:border-[#8a6d2f] hover:text-[#c9a84c] transition-colors">‹</div>
            <div className="w-9 h-9 border border-[#8a6d2f] bg-[#c9a84c]/10 flex items-center justify-center text-xs text-[#c9a84c] cursor-pointer">1</div>
            <div className="w-9 h-9 border border-[#222] flex items-center justify-center text-xs text-[#555] cursor-pointer hover:border-[#8a6d2f] hover:text-[#c9a84c] transition-colors">2</div>
            <div className="w-9 h-9 flex items-center justify-center text-xs text-[#555] tracking-[0.1em]">…</div>
            <div className="w-9 h-9 border border-[#222] flex items-center justify-center text-xs text-[#555] cursor-pointer hover:border-[#8a6d2f] hover:text-[#c9a84c] transition-colors">›</div>
          </div>
        )}
      </main>
    </div>
    <Footer />
    </>
  );
};

export default ProductsPage;