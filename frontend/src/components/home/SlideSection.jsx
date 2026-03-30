import { useState, useEffect, useRef } from 'react';
import dragonball from '../../assets/dragonball.jpg';
import jojo from '../../assets/jojo.jpg';
import slamdunk from '../../assets/slamdunk.jpg';
import yourname from '../../assets/yourname.jpg';

const SLIDES = [
    {
        img: dragonball,
        label: 'Phổ biến nhất',
        title: 'Dragon Ball',
        sub: 'Akira Toriyama',
        desc: 'Hành trình của Son Goku từ một cậu bé có đuôi khỉ đến chiến binh bảo vệ vũ trụ — bộ manga định nghĩa lại thể loại shōnen suốt nhiều thập kỷ.',
        tag: '01',
    },
    {
        img: jojo,
        label: 'Kinh điển',
        title: "JoJo's Bizarre Adventure",
        sub: 'Hirohiko Araki',
        desc: 'Dòng máu Joestar chảy qua nhiều thế hệ, mỗi arc là một thế giới riêng — gothic, hành động, bí ẩn — không bao giờ đoán được điều gì tiếp theo.',
        tag: '02',
    },
    {
        img: slamdunk,
        label: 'Huyền thoại',
        title: 'Slam Dunk',
        sub: 'Takehiko Inoue',
        desc: 'Từ kẻ côn đồ đến trái tim của đội bóng rổ — Slam Dunk không chỉ là thể thao, đó là câu chuyện về sự trưởng thành và đam mê thuần túy.',
        tag: '03',
    },
    {
        img: yourname,
        label: 'Cảm xúc',
        title: 'Your Name',
        sub: 'Makoto Shinkai',
        desc: 'Hai tâm hồn hoán đổi thân xác, kết nối qua giấc ngủ và thời gian — một tình yêu vượt qua không gian mà không bao giờ kịp nói lời từ biệt.',
        tag: '04',
    },
];

const DURATION = 5000;

export default function FeaturedSection() {
    const [active, setActive] = useState(0);
    const [prevIdx, setPrevIdx] = useState(null);
    const [transitioning, setTransitioning] = useState(false);
    const [progress, setProgress] = useState(0);
    const progressTimer = useRef(null);
    const autoTimer = useRef(null);

    const goTo = (idx) => {
        if (transitioning || idx === active) return;
        setPrevIdx(active);
        setTransitioning(true);
        setActive(idx);
        setProgress(0);
        setTimeout(() => {
            setPrevIdx(null);
            setTransitioning(false);
        }, 750);
    };

    useEffect(() => {
        setProgress(0);
        let elapsed = 0;
        progressTimer.current = setInterval(() => {
            elapsed += 80;
            setProgress(Math.min((elapsed / DURATION) * 100, 100));
        }, 80);
        autoTimer.current = setTimeout(() => {
            goTo((active + 1) % SLIDES.length);
        }, DURATION);
        return () => {
            clearInterval(progressTimer.current);
            clearTimeout(autoTimer.current);
        };
    }, [active]);

    const cur = SLIDES[active];

    return (
        <section style={{
            width: '100%',
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#080810',
            padding: '100px 80px 80px',
            boxSizing: 'border-box',
            position: 'relative',
            overflow: 'hidden',
        }}>

            {/* ── Ambient background glow ── */}
            <div key={`bg-${active}`} style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `url(${cur.img})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'blur(60px) saturate(1.8)',
                opacity: 0.3,
                transform: 'scale(1.1)',
                transition: 'all 1.2s ease-in-out',
                zIndex: 0,
            }} />

            {/* ── Overlay tối ── */}
            <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(135deg, rgba(8,8,16,0.85) 0%, rgba(8,8,16,0.6) 100%)',
                zIndex: 1,
            }} />

            {/* ── Main grid: LEFT text | RIGHT image ── */}
            <div style={{
                width: '100%',
                maxWidth: 1600,
                display: 'grid',
                gridTemplateColumns: '420px 1fr',  /* left cố định, right chiếm hết phần còn lại */
                gap: 48,
                alignItems: 'center',
                position: 'relative',
                zIndex: 2,
            }}>

                {/* ════ LEFT: Glass text card ════ */}
                <div style={{
                    background: 'rgba(255,255,255,0.04)',
                    backdropFilter: 'blur(24px)',
                    WebkitBackdropFilter: 'blur(24px)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 20,
                    padding: '48px 44px',
                    position: 'relative',
                    overflow: 'hidden',
                    minWidth: 0,
                }}>

                    {/* Glass inner highlight */}
                    <div style={{
                        position: 'absolute',
                        top: 0, left: 0, right: 0,
                        height: 1,
                        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)',
                        pointerEvents: 'none',
                    }} />

                    {/* Label */}
                    <div key={`label-${active}`} style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 10,
                        marginBottom: 22,
                        animation: 'fUp 0.55s ease 0.05s both',
                    }}>
                        <span style={{ width: 20, height: 1, background: '#c9a84c', display: 'inline-block' }} />
                        <span style={{
                            fontSize: 9,
                            letterSpacing: '0.22em',
                            textTransform: 'uppercase',
                            color: '#c9a84c',
                            fontFamily: 'DM Sans, sans-serif',
                            fontWeight: 500,
                        }}>
                            {cur.label}
                        </span>
                        <span style={{
                            fontSize: 9,
                            letterSpacing: '0.12em',
                            color: 'rgba(255,255,255,0.2)',
                            fontFamily: 'DM Sans, sans-serif',
                        }}>
                            — {cur.tag}
                        </span>
                    </div>

                    {/* Title */}
                    <h2 key={`title-${active}`} style={{
                        fontFamily: 'Cormorant Garamond, serif',
                        fontSize: 'clamp(36px, 3.5vw, 60px)',
                        fontWeight: 300,
                        lineHeight: 1.06,
                        color: '#ffffff',
                        margin: '0 0 8px',
                        animation: 'fUp 0.55s ease 0.12s both',
                    }}>
                        {cur.title}
                    </h2>

                    {/* Author */}
                    <div key={`sub-${active}`} style={{
                        fontFamily: 'DM Sans, sans-serif',
                        fontSize: 11,
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        color: 'rgba(255,255,255,0.35)',
                        marginBottom: 24,
                        animation: 'fUp 0.55s ease 0.19s both',
                    }}>
                        {cur.sub}
                    </div>

                    {/* Divider */}
                    <div key={`line-${active}`} style={{
                        width: 36, height: 1,
                        background: 'rgba(201,168,76,0.4)',
                        marginBottom: 20,
                        animation: 'fUp 0.55s ease 0.23s both',
                    }} />

                    {/* Desc */}
                    <p key={`desc-${active}`} style={{
                        fontFamily: 'DM Sans, sans-serif',
                        fontWeight: 300,
                        fontSize: 14,
                        lineHeight: 1.9,
                        color: 'rgba(255,255,255,0.65)',
                        margin: '0 0 36px',
                        animation: 'fUp 0.55s ease 0.28s both',
                    }}>
                        {cur.desc}
                    </p>

                    {/* CTA */}
                    <div key={`cta-${active}`} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 28,
                        marginBottom: 48,
                        animation: 'fUp 0.55s ease 0.34s both',
                    }}>
                        <a href="/products" style={{
                            padding: '11px 30px',
                            background: 'linear-gradient(135deg, #c9a84c, #e4c46a)',
                            color: '#0e0e0e',
                            fontSize: 10,
                            letterSpacing: '0.18em',
                            textTransform: 'uppercase',
                            textDecoration: 'none',
                            fontFamily: 'DM Sans, sans-serif',
                            fontWeight: 600,
                            borderRadius: 6,
                            boxShadow: '0 4px 20px rgba(201,168,76,0.3)',
                            transition: 'all 0.25s',
                        }}
                            onMouseEnter={e => {
                                e.currentTarget.style.opacity = '0.85';
                                e.currentTarget.style.transform = 'translateY(-1px)';
                                e.currentTarget.style.boxShadow = '0 8px 28px rgba(201,168,76,0.45)';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.opacity = '1';
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 4px 20px rgba(201,168,76,0.3)';
                            }}
                        >
                            Xem ngay
                        </a>
                        <a href="/products" style={{
                            fontSize: 10,
                            letterSpacing: '0.16em',
                            textTransform: 'uppercase',
                            color: 'rgba(255,255,255,0.3)',
                            textDecoration: 'none',
                            fontFamily: 'DM Sans, sans-serif',
                            transition: 'color 0.25s',
                        }}
                            onMouseEnter={e => e.currentTarget.style.color = '#ffffff'}
                            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.3)'}
                        >
                            Tất cả truyện →
                        </a>
                    </div>

                    {/* Progress bar + counter */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                        <span style={{
                            fontFamily: 'Cormorant Garamond, serif',
                            fontSize: 12,
                            color: 'rgba(255,255,255,0.25)',
                            minWidth: 20,
                        }}>
                            {String(active + 1).padStart(2, '0')}
                        </span>
                        <div style={{ display: 'flex', gap: 5, flex: 1, maxWidth: 200 }}>
                            {SLIDES.map((_, idx) => (
                                <div
                                    key={idx}
                                    onClick={() => goTo(idx)}
                                    style={{
                                        flex: 1,
                                        height: 2,
                                        background: 'rgba(255,255,255,0.08)',
                                        cursor: 'pointer',
                                        position: 'relative',
                                        overflow: 'hidden',
                                        borderRadius: 2,
                                    }}
                                >
                                    <div style={{
                                        position: 'absolute',
                                        left: 0, top: 0, height: '100%',
                                        background: 'linear-gradient(90deg, #c9a84c, #e4c46a)',
                                        width: idx < active ? '100%' : idx === active ? `${progress}%` : '0%',
                                        transition: idx === active ? 'width 0.08s linear' : 'none',
                                        borderRadius: 2,
                                    }} />
                                </div>
                            ))}
                        </div>
                        <span style={{
                            fontFamily: 'Cormorant Garamond, serif',
                            fontSize: 12,
                            color: 'rgba(255,255,255,0.25)',
                        }}>
                            {String(SLIDES.length).padStart(2, '0')}
                        </span>
                    </div>
                </div>

                {/* ════ RIGHT: Image + Thumbnails ════ */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 12,
                    minWidth: 0,  /* quan trọng: cho phép co lại trong grid */
                }}>

                    {/* Main image frame — chiếm toàn bộ width của cột phải */}
                    <div style={{
                        position: 'relative',
                        width: '100%',       /* luôn bằng cột phải */
                        height: 620,
                        borderRadius: 16,
                        overflow: 'hidden',
                        border: '1px solid rgba(255,255,255,0.08)',
                        boxShadow: '0 32px 64px rgba(0,0,0,0.5)',
                    }}>
                        {/* Viền decor lệch */}
                        <div style={{
                            position: 'absolute',
                            top: 10, right: -10,
                            width: '100%', height: '100%',
                            border: '1px solid rgba(201,168,76,0.12)',
                            borderRadius: 16,
                            pointerEvents: 'none',
                            zIndex: 0,
                        }} />

                        {/* Prev image */}
                        {prevIdx !== null && (
                            <div key={`prev-${prevIdx}`} style={{
                                position: 'absolute', inset: 0,
                                zIndex: 1,
                                animation: 'imgOut 0.75s ease forwards',
                            }}>
                                <img
                                    src={SLIDES[prevIdx].img}
                                    alt=""
                                    style={{
                                        width: '100%', height: '100%',
                                        objectFit: 'cover',
                                        objectPosition: 'center center',
                                        display: 'block',
                                    }}
                                />
                            </div>
                        )}

                        {/* Current image */}
                        <div key={`img-${active}`} style={{
                            position: 'absolute', inset: 0,
                            zIndex: 2,
                            animation: 'imgIn 0.75s ease forwards',
                        }}>
                            <img
                                src={cur.img}
                                alt={cur.title}
                                style={{
                                    width: '100%', height: '100%',
                                    objectFit: 'cover',
                                    objectPosition: 'center center',
                                    display: 'block',
                                }}
                            />
                        </div>

                        {/* Bottom gradient fade */}
                        <div style={{
                            position: 'absolute',
                            bottom: 0, left: 0, right: 0,
                            height: 100,
                            background: 'linear-gradient(to top, rgba(8,8,16,0.6), transparent)',
                            zIndex: 3,
                            pointerEvents: 'none',
                        }} />

                        {/* Glass badge top-right */}
                        <div style={{
                            position: 'absolute',
                            top: 14, right: 14,
                            zIndex: 4,
                            background: 'rgba(8,8,16,0.5)',
                            backdropFilter: 'blur(12px)',
                            WebkitBackdropFilter: 'blur(12px)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: 20,
                            padding: '5px 12px',
                            fontSize: 9,
                            letterSpacing: '0.18em',
                            textTransform: 'uppercase',
                            color: '#c9a84c',
                            fontFamily: 'DM Sans, sans-serif',
                            fontWeight: 500,
                        }}>
                            {cur.tag} / {String(SLIDES.length).padStart(2, '0')}
                        </div>
                    </div>

                    {/* ── Thumbnail strip — cũng width: 100% ── */}
                    <div style={{
                        display: 'flex',
                        gap: 10,
                        width: '100%',
                    }}>
                        {SLIDES.map((slide, idx) => (
                            <div
                                key={idx}
                                onClick={() => goTo(idx)}
                                style={{
                                    flex: 1,
                                    height: 64,
                                    borderRadius: 10,
                                    overflow: 'hidden',
                                    cursor: 'pointer',
                                    position: 'relative',
                                    border: idx === active
                                        ? '1.5px solid rgba(201,168,76,0.7)'
                                        : '1.5px solid rgba(255,255,255,0.07)',
                                    transition: 'all 0.3s ease',
                                    transform: idx === active ? 'scale(1.04)' : 'scale(1)',
                                    boxShadow: idx === active
                                        ? '0 4px 16px rgba(201,168,76,0.25)'
                                        : 'none',
                                }}
                                onMouseEnter={e => {
                                    if (idx !== active) {
                                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
                                        e.currentTarget.style.transform = 'scale(1.02)';
                                    }
                                }}
                                onMouseLeave={e => {
                                    if (idx !== active) {
                                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
                                        e.currentTarget.style.transform = 'scale(1)';
                                    }
                                }}
                            >
                                <img
                                    src={slide.img}
                                    alt={slide.title}
                                    style={{
                                        width: '100%', height: '100%',
                                        objectFit: 'cover',
                                        objectPosition: 'center center',
                                        display: 'block',
                                        filter: idx === active ? 'none' : 'brightness(0.45)',
                                        transition: 'filter 0.35s ease',
                                    }}
                                />
                                {idx === active && (
                                    <div style={{
                                        position: 'absolute',
                                        inset: 0,
                                        background: 'linear-gradient(135deg, rgba(201,168,76,0.12), transparent)',
                                        pointerEvents: 'none',
                                    }} />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400&family=DM+Sans:wght@300;400;500;600&display=swap');

                @keyframes fUp {
                    from { opacity: 0; transform: translateY(16px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                @keyframes imgIn {
                    from { opacity: 0; transform: scale(1.06); }
                    to   { opacity: 1; transform: scale(1); }
                }
                @keyframes imgOut {
                    from { opacity: 1; transform: scale(1); }
                    to   { opacity: 0; transform: scale(0.97); }
                }
            `}</style>
        </section>
    );
}