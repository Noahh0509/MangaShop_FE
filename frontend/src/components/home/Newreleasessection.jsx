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