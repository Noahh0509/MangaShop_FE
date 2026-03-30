import { useState } from 'react';

const STATUS_MAP = {
    PENDING:    { label: 'Chờ xác nhận', color: '#c9a84c',  bg: 'rgba(201,168,76,.08)',   border: '#8a6d2f' },
    CONFIRMED:  { label: 'Đã xác nhận',  color: '#6495ed',  bg: 'rgba(100,149,237,.08)',  border: 'rgba(100,149,237,.3)' },
    SHIPPING:   { label: 'Đang giao',    color: '#6495ed',  bg: 'rgba(100,149,237,.08)',  border: 'rgba(100,149,237,.3)' },
    DELIVERED:  { label: 'Hoàn thành',   color: '#4a9968',  bg: 'rgba(74,153,104,.10)',   border: 'rgba(74,153,104,.3)' },
    CANCELLED:  { label: 'Đã hủy',       color: '#c0504a',  bg: 'rgba(192,80,74,.08)',    border: 'rgba(192,80,74,.3)' },
    RETURNED:   { label: 'Trả hàng',     color: '#a084c9',  bg: 'rgba(160,132,201,.08)',  border: 'rgba(160,132,201,.3)' },
};

function formatPrice(amount) {
    return new Intl.NumberFormat('vi-VN').format(amount) + 'đ';
}

function formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString('vi-VN', {
        day: '2-digit', month: 'long', year: 'numeric',
    });
}

const API = import.meta.env.VITE_API_URL ?? '';

export default function OrderCard({ order, onStatusChange }) {
    const [loading, setLoading] = useState(false);
    const [rejectReason, setRejectReason] = useState('');
    const [showRejectBox, setShowRejectBox] = useState(false);

    const status = STATUS_MAP[order.status] ?? { label: order.status, color: '#888', bg: 'transparent', border: '#333' };
    const previewItems = order.items?.slice(0, 3) ?? [];
    const remainCount = (order.items?.length ?? 0) - previewItems.length;

    const handleConfirm = async () => {
        if (!window.confirm('Xác nhận đã nhận được hàng?')) return;
        setLoading(true);
        try {
            const token = localStorage.getItem('accessToken');
            const res = await fetch(`${API}/api/orders/confirm/${order.invoiceCode}`, {
                method: 'PUT',
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message);
            onStatusChange?.();
        } catch (err) {
            alert(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleReject = async () => {
        if (!rejectReason.trim()) return;
        setLoading(true);
        try {
            const token = localStorage.getItem('accessToken');
            const res = await fetch(`${API}/api/orders/reject/${order.invoiceCode}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ reason: rejectReason }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message);
            setShowRejectBox(false);
            onStatusChange?.();
        } catch (err) {
            alert(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="border border-[#222] hover:border-[#c9a84c]/30 transition-all duration-200 group">

            {/* ── Header ── */}
            <div className="px-6 py-4 border-b border-[#1a1a1a] flex items-center justify-between">
                <div>
                    <div className="font-['Cormorant_Garamond'] text-2xl text-[#c9a84c] tracking-wide">
                        #{order.invoiceCode ?? order._id?.slice(-8).toUpperCase()}
                    </div>
                    <div className="text-[12px] text-[#666] mt-0.5">
                        {formatDate(order.createdAt)}
                    </div>
                </div>
                <span
                    className="text-[10px] tracking-[.12em] uppercase px-3 py-1.5 border font-medium"
                    style={{ color: status.color, background: status.bg, borderColor: status.border }}
                >
                    {status.label}
                </span>
            </div>

            {/* ── Danh sách sản phẩm ── */}
            <div className="px-6 py-4 flex flex-col gap-3">
                {previewItems.map((item, i) => {
                    const name = item.title ?? item.product?.name ?? 'Sản phẩm';
                    const qty  = item.quantity ?? 1;
                    const price = item.unitPrice ?? item.product?.price ?? 0;
                    const rawImg = String(
                        item.coverImage
                        ?? item.product?.images?.[0]?.url
                        ?? ''
                    );
                    const imgSrc = rawImg.startsWith('http') ? rawImg : rawImg ? `${API}${rawImg}` : null;

                    return (
                        <div key={i} className="flex items-center gap-4">
                            <div className="w-14 h-14 flex-shrink-0 bg-[#111] border border-[#222] overflow-hidden">
                                {imgSrc ? (
                                    <img src={imgSrc} alt={name} className="w-full h-full object-cover"
                                        onError={(e) => { e.target.style.display = 'none'; }} />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-[#333]">
                                        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
                                            <rect x="3" y="3" width="18" height="18" rx="1"/>
                                            <path d="M3 9l4-4 4 4 4-4 4 4"/>
                                        </svg>
                                    </div>
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="text-[13px] text-white font-medium truncate leading-snug">{name}</div>
                                <div className="text-[11px] text-[#666] mt-0.5">x{qty} · {formatPrice(price)}</div>
                            </div>
                        </div>
                    );
                })}
                {remainCount > 0 && (
                    <div className="text-[11px] text-[#555] tracking-wide pl-[72px]">+{remainCount} sản phẩm khác...</div>
                )}
            </div>

            {/* ── Reject box — chỉ hiện khi bấm Từ chối ── */}
            {showRejectBox && (
                <div className="px-6 pb-4 flex gap-2">
                    <input
                        type="text"
                        value={rejectReason}
                        onChange={(e) => setRejectReason(e.target.value)}
                        placeholder="Lý do từ chối..."
                        className="flex-1 bg-[#111] border border-[#333] px-3 py-2 text-[12px] text-white placeholder-[#444] outline-none focus:border-[#c0504a]/60"
                    />
                    <button
                        onClick={handleReject}
                        disabled={loading || !rejectReason.trim()}
                        className="px-4 py-2 text-[10px] tracking-[.1em] uppercase bg-[#c0504a]/10 border border-[#c0504a]/40 text-[#c0504a] hover:bg-[#c0504a] hover:text-white transition-all disabled:opacity-40"
                    >
                        {loading ? '...' : 'Xác nhận'}
                    </button>
                    <button
                        onClick={() => setShowRejectBox(false)}
                        className="px-3 py-2 text-[10px] text-[#555] border border-[#222] hover:text-white transition-colors"
                    >
                        Hủy
                    </button>
                </div>
            )}

            {/* ── Footer ── */}
            <div className="px-6 py-4 border-t border-[#1a1a1a] flex items-center justify-between">
                <div className="text-[12px] text-[#666]">
                    {order.items?.length ?? 0} sản phẩm
                    {order.payment?.method && (
                        <span className="ml-2 px-2 py-0.5 border border-[#2a2a2a] text-[#555] text-[10px] tracking-wide uppercase">
                            {order.payment.method}
                        </span>
                    )}
                </div>

                <div className="flex items-center gap-3">
                    {/* ✅ Chỉ hiện khi SHIPPING */}
                    {order.status === 'SHIPPING' && !showRejectBox && (
                        <>
                            <button
                                onClick={() => setShowRejectBox(true)}
                                disabled={loading}
                                className="px-4 py-2 text-[10px] tracking-[.1em] uppercase border border-[#c0504a]/30 text-[#c0504a]/60 hover:border-[#c0504a] hover:text-[#c0504a] transition-all disabled:opacity-40"
                            >
                                Từ chối
                            </button>
                            <button
                                onClick={handleConfirm}
                                disabled={loading}
                                className="px-4 py-2 text-[10px] tracking-[.1em] uppercase border border-[#4a9968]/40 text-[#4a9968] hover:bg-[#4a9968] hover:text-black transition-all disabled:opacity-40"
                            >
                                {loading ? '...' : 'Đã nhận hàng'}
                            </button>
                        </>
                    )}

                    <div className="font-['Cormorant_Garamond'] text-3xl text-white group-hover:text-[#e0bc5f] transition-colors leading-none">
                        {formatPrice(order.totalAmount)}
                    </div>
                </div>
            </div>

        </div>
    );
}