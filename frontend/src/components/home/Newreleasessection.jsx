import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/api/products`;

export default function NewReleasesSection() {
    const [newReleases, setNewReleases] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNewReleases = async () => {
            try {
                // Sắp xếp theo ngày tạo mới nhất (sort=-createdAt) và lấy 5 cuốn
                const response = await axios.get(`${API_URL}?sort=-createdAt&limit=5`);
                if (response.data.success) {
                    setNewReleases(response.data.data);
                }
            } catch (error) {
                console.error("Lỗi khi tải truyện mới:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchNewReleases();
    }, []);

    return (
        <section className="px-12 pb-24">
            {/* Header */}
            <div className="flex items-end justify-between pb-6 border-b border-[#222] mb-0">
                <div>
                    <div className="text-[10px] tracking-[0.22em] uppercase text-[#c9a84c] mb-3">Vừa cập bến</div>
                    <h2 className="font-serif font-light leading-[1.1]"
                        style={{ fontSize: 'clamp(32px, 4vw, 52px)' }}>
                        Mới ra mắt
                    </h2>
                </div>
                <Link to="/products"
                    className="text-[11px] tracking-[0.14em] uppercase text-[#555] no-underline
                        border-b border-[#333] pb-px hover:text-[#c9a84c] hover:border-[#c9a84c] transition-all whitespace-nowrap mb-1">
                    Xem tất cả →
                </Link>
            </div>

            {/* Editorial list */}
            <div className="flex flex-col">
                {loading ? (
                    <div className="py-6 text-center text-[#555]">Đang tải...</div>
                ) : (
                    newReleases.map((manga, i) => (
                        <Link key={manga._id} to={`/products/${manga.slug}`}
                            className="group grid items-center gap-6 py-5 border-b border-[#222] no-underline
                                hover:pl-3 transition-all duration-250"
                            style={{ gridTemplateColumns: '48px 1fr auto auto', color: 'inherit' }}>

                            {/* Index number */}
                            <span className="font-serif text-[13px] text-[#444] text-right">
                                {String(i + 1).padStart(2, '0')}
                            </span>

                            {/* Title + author */}
                            <div>
                                <div className="font-serif text-[20px] font-normal group-hover:text-[#c9a84c] transition-colors">
                                    {manga.name}
                                </div>
                                <div className="text-[12px] text-[#555] mt-0.5">{manga.attributes?.author || 'Đang cập nhật'}</div>
                            </div>

                            {/* Badge */}
                            <span className="text-[9px] tracking-[0.14em] uppercase px-2 py-1 border border-[#8a6d2f] text-[#c9a84c] hidden md:block">
                                Mới
                            </span>

                            {/* Price */}
                            <span className="text-[14px] font-medium text-[#e8e2d9] min-w-[80px] text-right">
                                {manga.finalPrice?.toLocaleString('vi-VN')}đ
                            </span>
                        </Link>
                    ))
                )}
            </div>

            {/* CTA Banner giữ nguyên... */}
            <div className="mt-16 border border-[#222] p-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none"
                    style={{ background: 'radial-gradient(ellipse 50% 100% at 0% 50%, rgba(201,168,76,0.05), transparent)' }} />
                <div className="relative">
                    <h3 className="font-serif font-light leading-[1.2]"
                        style={{ fontSize: 'clamp(28px, 3vw, 44px)' }}>
                        Không bỏ lỡ<br />
                        <em className="italic text-[#c9a84c]">tập mới nào.</em>
                    </h3>
                    <p className="text-[13px] text-[#555] mt-3 max-w-sm">
                        Đăng ký tài khoản để nhận thông báo sách mới, ưu đãi độc quyền và nhiều hơn nữa.
                    </p>
                </div>
                <Link to="/register"
                    className="relative flex-shrink-0 px-9 py-[14px] bg-[#c9a84c] text-black
                        text-[11px] tracking-[0.16em] uppercase font-medium no-underline
                        hover:bg-[#e0bc5f] hover:-translate-y-px transition-all duration-250">
                    Tạo tài khoản
                </Link>
            </div>
        </section>
    );
}