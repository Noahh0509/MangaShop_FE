import { useState, useEffect } from 'react';
import OrderCard from './OrderCard';

const API = import.meta.env.VITE_API_URL ?? '';

const STATUS_FILTERS = [
    { value: 'all',       label: 'Tất cả' },
    { value: 'pending',   label: 'Chờ xác nhận' },
    { value: 'confirmed', label: 'Đã xác nhận' },
    { value: 'shipping',  label: 'Đang giao' },
    { value: 'completed', label: 'Hoàn thành' },
    { value: 'cancelled', label: 'Đã hủy' },
];

export default function OrderList() {
    const [orders, setOrders]   = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError]     = useState('');
    const [filter, setFilter]   = useState('all');

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await fetch(`${API}/api/orders/my-orders`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
                });
                const data = await res.json();
                if (!res.ok) throw new Error(data.message || 'Lỗi tải đơn hàng');
                setOrders(data.data.orders ?? []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    const filtered = filter === 'all'
        ? orders
        : orders.filter((o) => o.status === filter);

    // ── Loading ─────────────────────────────────────────────────
    if (loading) {
        return (
            <div className="px-12 py-16 flex items-center gap-3 text-[#555] text-sm">
                <span className="w-4 h-4 border border-[#555] border-t-[#c9a84c] rounded-full animate-spin" />
                Đang tải đơn hàng...
            </div>
        );
    }

    // ── Error ────────────────────────────────────────────────────
    if (error) {
        return (
            <div className="px-12 py-16 text-xs text-[#c0504a] border border-[#c0504a] mx-12 mt-10 px-4 py-3">
                {error}
            </div>
        );
    }

    return (
        <div className="px-12 py-10">
            {/* Filter tabs */}
            <div className="flex gap-0 mb-8 border-b border-[#222]">
                {STATUS_FILTERS.map((f) => (
                    <button
                        key={f.value}
                        onClick={() => setFilter(f.value)}
                        className={`px-4 py-3 text-[11px] tracking-[.1em] uppercase transition-all duration-200 border-b-2 -mb-px
                            ${filter === f.value
                                ? 'text-[#c9a84c] border-b-[#c9a84c]'
                                : 'text-[#555] border-b-transparent hover:text-[#e8e2d9]'
                            }`}
                    >
                        {f.label}
                    </button>
                ))}
            </div>

            {/* Stats */}
            <div className="text-[11px] text-[#444] mb-6 tracking-wide">
                {filtered.length === 0
                    ? 'Không có đơn hàng nào'
                    : `${filtered.length} đơn hàng`
                }
            </div>

            {/* Empty state */}
            {filtered.length === 0 ? (
                <div className="py-20 text-center">
                    <div className="font-['Cormorant_Garamond'] text-5xl text-[#222] mb-4">空</div>
                    <div className="text-[11px] tracking-[.16em] uppercase text-[#444]">
                        Chưa có đơn hàng nào
                    </div>
                </div>
            ) : (
                <div className="flex flex-col gap-3">
                    {filtered.map((order) => (
                        <OrderCard key={order._id} order={order} />
                    ))}
                </div>
            )}
        </div>
    );
}