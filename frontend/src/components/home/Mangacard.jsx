import React from 'react';
import { Link } from 'react-router-dom';

export default function MangaCard({ manga }) {
    const { id, slug, title, author, genre, price, oldPrice, badge, cover } = manga;

    return (
        <Link to={`/products/${slug}`}
            className="group relative bg-[#0e0e0e] p-6 flex flex-col no-underline color-inherit
                       border border-transparent hover:border-[#8a6d2f]
                       transition-all duration-300 hover:bg-[#161616]"
            style={{ color: 'inherit' }}>

            {/* Cover */}
            <div className="aspect-[3/4] bg-[#161616] overflow-hidden mb-5 relative">
                {cover ? (
                    <img src={cover} alt={title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
                ) : (
                    <div className="w-full h-full flex items-center justify-center"
                        style={{ background: 'linear-gradient(135deg,#1a1a1a 0%,#222 50%,#1a1a1a 100%)' }}>
                        <span className="text-5xl opacity-[0.15]">📖</span>
                    </div>
                )}

                {/* Badge */}
                {badge && (
                    <span className={`absolute top-3 left-3 text-[9px] tracking-[0.14em] uppercase px-2 py-1 font-medium
                        ${badge === 'Sale'
                            ? 'border border-[#8a6d2f] text-[#c9a84c] bg-transparent'
                            : 'bg-[#c9a84c] text-black'}`}>
                        {badge}
                    </span>
                )}
            </div>

            {/* Info */}
            <div className="text-[10px] tracking-[0.16em] uppercase text-[#8a6d2f] mb-2">{genre}</div>
            <div className="font-['Cormorant_Garamond'] text-[18px] font-normal leading-[1.3] mb-1.5
                group-hover:text-[#c9a84c] transition-colors">
                {title}
            </div>
            <div className="text-[12px] text-[#555]">{author}</div>

            <div className="mt-4 text-[14px] font-medium text-[#e8e2d9]">
                {price?.toLocaleString('vi-VN')}đ
                {oldPrice && (
                    <span className="text-[11px] text-[#444] line-through ml-2">
                        {oldPrice?.toLocaleString('vi-VN')}đ
                    </span>
                )}
            </div>

            {/* Hover arrow */}
            <div className="absolute bottom-6 right-6 w-9 h-9 border border-[#222] flex items-center justify-center
                text-[#c9a84c] text-sm opacity-0 translate-x-1 translate-y-1
                group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-250">
                →
            </div>
        </Link>
    );
}