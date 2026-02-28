import React from 'react';

export default function LoginLeftPanel() {
    return (
        <div className="hidden lg:flex flex-1 relative bg-[#161616] border-r border-[#222] items-center justify-center p-20 overflow-hidden">

            {/* Radial glow */}
            <div className="absolute inset-0 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse 80% 80% at 30% 70%, rgba(201,168,76,0.07), transparent)' }} />

            {/* Corner decorations */}
            <div className="absolute top-12 left-12 w-12 h-12 border-t border-l border-[#2a2a2a]" />
            <div className="absolute bottom-12 right-12 w-12 h-12 border-b border-r border-[#2a2a2a]" />

            {/* Quote */}
            <div className="relative text-center max-w-sm">
                <div className="text-[10px] tracking-[0.22em] uppercase text-[#444] mb-10 flex items-center justify-center gap-4">
                    <span className="w-8 h-px bg-[#2a2a2a] block" />
                    MangaShop
                    <span className="w-8 h-px bg-[#2a2a2a] block" />
                </div>

                <h2 style={{
                    fontFamily: '"Cormorant Garamond", serif',
                    fontSize: 'clamp(36px, 4vw, 56px)',
                    fontWeight: 300,
                    lineHeight: 1.1,
                }}>
                    Thế giới<br />
                    <em style={{ fontStyle: 'italic', color: '#c9a84c' }}>không giới hạn</em><br />
                    trong từng<br />trang sách.
                </h2>

                <div className="mt-10 text-[12px] tracking-[0.16em] uppercase text-[#333]">
                    — since 2026
                </div>
            </div>
        </div>
    );
}