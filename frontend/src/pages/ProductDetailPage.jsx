import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Breadcrumb from '../components/common/Breadcrumb';
import ProductGallery from '../components/product-detail/ProductGallery';
import ProductInfo from '../components/product-detail/ProductInfo';
import ProductTabs from '../components/product-detail/ProductTabs';

const API_URL = `${import.meta.env.VITE_API_URL}/api/products`;

const ProductDetailPage = () => {
  const { slug } = useParams(); // Lấy slug từ thanh URL
  const [productData, setProductData] = useState(null);
  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        setLoading(true);
        window.scrollTo(0, 0); // Tự động cuộn lên đầu trang khi chuyển link
        
        const response = await axios.get(`${API_URL}/${slug}`);
        
        if (response.data.success) {
          setProductData(response.data.data);
          setPromotions(response.data.activePromotions || []);
        } else {
          setError("Không tìm thấy sản phẩm");
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Có lỗi xảy ra khi lấy chi tiết sản phẩm');
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchProductDetail();
  }, [slug]);

  if (loading) return <div className="min-h-screen bg-[#0e0e0e] pt-32 text-center text-[#888]">Đang tải thông tin sản phẩm...</div>;
  if (error) return <div className="min-h-screen bg-[#0e0e0e] pt-32 text-center text-red-500">{error}</div>;
  if (!productData) return null;

  // Cấu hình Breadcrumb động
  const breadcrumbItems = [
    { label: 'Trang chủ', link: '/' },
    { label: 'Truyện tranh', link: '/products' },
    { label: productData.name }
  ];

  return (
    <>
    <Header />
    <div className="pt-[72px] bg-[#0e0e0e] text-[#e8e2d9] min-h-screen">
      <Breadcrumb items={breadcrumbItems} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 p-6 md:p-12 animate-[fadeUp_0.7s_ease_both]">
        {/* Truyền mảng ảnh vào Gallery */}
        <ProductGallery images={productData.images} />
        
        {/* Truyền dữ liệu và mảng khuyến mãi vào phần Info */}
        <ProductInfo product={productData} promotions={promotions} />
      </div>

      {/* Truyền mô tả vào Tabs */}
      <ProductTabs product={productData} />

    </div>
    <Footer />
    </>
  );
};

export default ProductDetailPage;