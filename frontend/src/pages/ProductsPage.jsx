import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import SidebarFilter from '../components/products/SidebarFilter';
import ProductToolbar from '../components/products/ProductToolbar';
import Mangacard from '../components/home/Mangacard'; 

const API_URL = `${import.meta.env.VITE_API_URL}/api/products`;

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 1. Lấy tất cả các tham số từ thanh URL
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryFilter = searchParams.get('category');
  const sortOption = searchParams.get('sort');
  const keyword = searchParams.get('keyword'); // Lấy từ khóa tìm kiếm
  const currentPage = parseInt(searchParams.get('page')) || 1; // Lấy trang hiện tại, mặc định là 1

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        window.scrollTo(0, 0); // Cuộn lên đầu trang khi có thay đổi
        
        // 2. Đóng gói tham số để gửi cho Backend
        const params = {
          page: currentPage,
          limit: 12 // Lấy 12 truyện trên 1 trang
        };
        
        if (categoryFilter) params.category = categoryFilter;
        if (sortOption) params.sort = sortOption;
        if (keyword) params.keyword = keyword; // Gửi keyword xuống BE

        // Gọi axios có kèm params
        const response = await axios.get(API_URL, { params });
        
        if (response.data.success) {
          setProducts(response.data.data);
        } else {
          setError("Gọi API thành công nhưng Backend trả về success: false");
        }
      } catch (err) {
        setError(err.message || 'Có lỗi xảy ra khi lấy dữ liệu');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryFilter, sortOption, keyword, currentPage]); // 3. Cập nhật dependency để React gọi lại API khi các giá trị này đổi

  // 4. Hàm xử lý khi bấm nút chuyển trang
  const handlePageChange = (newPage) => {
    if (newPage < 1) return;
    searchParams.set('page', newPage);
    setSearchParams(searchParams);
  };

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

        {/* Cập nhật ProductToolbar ở tin nhắn trước để ô input search hoạt động */}
        <ProductToolbar />

        {loading && <div className="text-center py-10 text-[#888]">Đang tải dữ liệu truyện tranh...</div>}
        {error && <div className="text-center py-10 text-red-500">Lỗi: {error}</div>}

        {!loading && !error && (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-10 bg-transparent justify-start items-start">
            {products.map(product => {
              let badgeText = null;
              if (product.appliedPromotion) {
                badgeText = product.appliedPromotion.discountType === 'flash_sale' ? 'Hot' : 'Sale';
              } else if (product.isFeatured) {
                badgeText = 'Mới';
              }

              const mangaData = {
                id: product._id,
                slug: product.slug,
                title: product.name,
                author: product.attributes?.author || 'Đang cập nhật',
                genre: product.category?.name || 'Chưa phân loại',
                price: product.finalPrice,
                oldPrice: product.basePrice > product.finalPrice ? product.basePrice : null,
                badge: badgeText,
                cover: product.images && product.images.length > 0 ? product.images[0].url : null 
              };

              return <Mangacard key={product._id} manga={mangaData} />;
            })}
          </div>
        )}

        {/* 5. Giao diện Phân trang đã được kích hoạt */}
        {!loading && !error && products.length > 0 && (
          <div className="flex items-center justify-center gap-2 mt-12 pt-8 border-t border-[#222]">
            {/* Nút lùi */}
            <button 
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="w-9 h-9 border border-[#222] flex items-center justify-center text-xs text-[#555] cursor-pointer hover:border-[#8a6d2f] hover:text-[#c9a84c] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              ‹
            </button>
            
            {/* Trang hiện tại */}
            <div className="w-9 h-9 border border-[#8a6d2f] bg-[#c9a84c]/10 flex items-center justify-center text-xs text-[#c9a84c] cursor-default">
              {currentPage}
            </div>

            {/* Nút tiến */}
            <button 
              onClick={() => handlePageChange(currentPage + 1)}
              // Tạm thời vô hiệu hóa nút Tiến nếu số lượng truyện trả về ít hơn 12 (tức là đã đến trang cuối)
              disabled={products.length < 12} 
              className="w-9 h-9 border border-[#222] flex items-center justify-center text-xs text-[#555] cursor-pointer hover:border-[#8a6d2f] hover:text-[#c9a84c] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              ›
            </button>
          </div>
        )}
      </main>
    </div>
    <Footer />
    </>
  );
};

export default ProductsPage;