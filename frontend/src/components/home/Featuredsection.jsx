import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import MangaCard from './Mangacard';

const API_URL = `${import.meta.env.VITE_API_URL}/api/products`;

export default function FeaturedSection() {
    const [featuredManga, setFeaturedManga] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFeatured = async () => {
            try {
                // Gọi API lấy 8 truyện nổi bật
                const response = await axios.get(`${API_URL}?limit=8`);
                if (response.data.success) {
                    const formattedData = response.data.data.map(product => {
                        let badgeText = null;
                        if (product.appliedPromotion) {
                            badgeText = product.appliedPromotion.discountType === 'flash_sale' ? 'Hot' : 'Sale';
                        } else if (product.isFeatured) {
                            badgeText = 'Mới';
                        }

                        return {
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
                    });
                    setFeaturedManga(formattedData);
                }
            } catch (error) {
                console.error("Lỗi khi tải truyện nổi bật:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchFeatured();
    }, []);

    return (
        <section className="px-12 pb-24">
            <div className="flex items-end justify-between pb-6 border-b border-[#222] mb-0">
                <div>
                    <div className="text-[10px] tracking-[0.22em] uppercase text-[#c9a84c] mb-3">Được yêu thích</div>
                    <h2 className="font-serif font-light leading-[1.1]"
                        style={{ fontSize: 'clamp(32px, 4vw, 52px)' }}>
                        Truyện nổi bật
                    </h2>
                </div>
                <Link to="/products"
                    className="text-[11px] tracking-[0.14em] uppercase text-[#555] no-underline
                        border-b border-[#333] pb-px hover:text-[#c9a84c] hover:border-[#c9a84c] transition-all whitespace-nowrap mb-1">
                    Xem tất cả →
                </Link>
            </div>

            {loading ? (
                <div className="py-10 text-center text-[#555]">Đang tải truyện...</div>
            ) : (
                // ĐÃ FIX: Thay đổi class div bọc Grid bên dưới để bỏ khung xám thừa
                <div className="grid grid-cols-2 md:grid-cols-4 bg-transparent gap-0 justify-start items-start">
                    {featuredManga.map(manga => (
                        <MangaCard key={manga.id} manga={manga} />
                    ))}
                </div>
            )}
        </section>
    );
}