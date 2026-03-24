import React from 'react';

export default function RegisterLeftPanel() {
    return (
        <div className="hidden lg:flex flex-1 relative bg-[#161616] border-r border-[#222] items-center justify-center p-20 overflow-hidden">

            {/* Radial glow */}
            <div className="absolute inset-0 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse 80% 80% at 70% 30%, rgba(201,168,76,0.07), transparent)' }} />

            {/* Corner decorations */}
            <div className="absolute top-12 left-12 w-12 h-12 border-t border-l border-[#2a2a2a]" />
            <div className="absolute bottom-12 right-12 w-12 h-12 border-b border-r border-[#2a2a2a]" />

            {/* Steps */}
            <div className="relative w-full max-w-sm">
                <div className="text-[11px] tracking-[0.22em] uppercase text-[#666] mb-10 flex items-center gap-4">
                    <span className="w-8 h-px bg-[#2a2a2a] block" />
                    MangaShop
                    <span className="w-8 h-px bg-[#2a2a2a] block" />
                </div>

                <h2 style={{
                    fontFamily: '"Cormorant Garamond", serif',
                    fontSize:   'clamp(32px, 3.5vw, 50px)',
                    fontWeight: 300,
                    lineHeight: 1.1,
                    marginBottom: '40px',
                }}>
                    Một tài khoản,<br />
                    <em style={{ fontStyle: 'italic', color: '#c9a84c' }}>ngàn cuốn truyện</em><br />
                    chờ bạn khám phá.
                </h2>

                {/* Perks */}
                <div className="flex flex-col gap-5">
                    {[
                        { icon: '✦', text: 'Theo dõi đơn hàng realtime' },
                        { icon: '✦', text: 'Lưu danh sách yêu thích' },
                        { icon: '✦', text: 'Nhận thông báo manga mới' },
                        { icon: '✦', text: 'Ưu đãi độc quyền thành viên' },
                    ].map(({ icon, text }) => (
                        <div key={text} className="flex items-center gap-4">
                            <span className="text-[#c9a84c] text-[10px]">{icon}</span>
                            <span className="text-[14px] tracking-[0.04em] text-[#777]">{text}</span>
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-[12px] tracking-[0.16em] uppercase text-[#555]">
                    — since 2026
                </div>
            </div>
        </div>
    );
}