import React from 'react';
import { Link } from 'react-router-dom';
import MangaCard from './Mangacard';

const FEATURED = [
    { id: 1, title: 'Naruto — Tập 72',        author: 'Masashi Kishimoto', genre: 'Shounen', price: 35000, oldPrice: 45000, badge: 'Hot' },
    { id: 2, title: 'One Piece — Tập 105',     author: 'Eiichiro Oda',      genre: 'Shounen', price: 35000, badge: 'Hot' },
    { id: 3, title: 'Demon Slayer — Tập 23',   author: 'Koyoharu Gotouge',  genre: 'Shounen', price: 38000, oldPrice: 45000, badge: 'Sale' },
    { id: 4, title: 'Attack on Titan — Final', author: 'Hajime Isayama',    genre: 'Seinen',  price: 42000 },
    { id: 5, title: 'Jujutsu Kaisen — Tập 26', author: 'Gege Akutami',      genre: 'Shounen', price: 35000, badge: 'Hot' },
    { id: 6, title: 'Dragon Ball — Tập 42',    author: 'Akira Toriyama',    genre: 'Shounen', price: 32000, oldPrice: 40000 },
    { id: 7, title: 'Conan — Tập 103',         author: 'Gosho Aoyama',      genre: 'Mystery', price: 30000 },
    { id: 8, title: 'Spy x Family — Tập 12',   author: 'Tatsuya Endo',      genre: 'Comedy',  price: 38000, badge: 'Hot' },
];

export default function FeaturedSection() {
    return (
        <section className="px-12 pb-24">
            <div className="flex items-end justify-between pb-6 border-b border-[#222] mb-0">
                <div>
                    <div className="text-[10px] tracking-[0.22em] uppercase text-[#c9a84c] mb-3">Được yêu thích</div>
                    <h2 className="font-['Cormorant_Garamond'] font-light leading-[1.1]"
                        style={{ fontSize: 'clamp(32px, 4vw, 52px)' }}>
                        Truyện nổi bật
                    </h2>
                </div>
                <Link to="/products?filter=featured"
                    className="text-[11px] tracking-[0.14em] uppercase text-[#555] no-underline
                        border-b border-[#333] pb-px hover:text-[#c9a84c] hover:border-[#c9a84c] transition-all whitespace-nowrap mb-1">
                    Xem tất cả →
                </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 bg-[#222]" style={{ gap: '1px' }}>
                {FEATURED.map(manga => (
                    <MangaCard key={manga.id} manga={manga} />
                ))}
            </div>
        </section>
    );
}