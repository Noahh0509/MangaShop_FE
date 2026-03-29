const STATUS_MAP = {
    pending:    { label: 'Chờ xác nhận', color: '#c9a84c',  bg: 'rgba(201,168,76,.08)',   border: '#8a6d2f' },
    confirmed:  { label: 'Đã xác nhận',  color: '#6495ed',  bg: 'rgba(100,149,237,.08)',  border: 'rgba(100,149,237,.3)' },
    shipping:   { label: 'Đang giao',    color: '#6495ed',  bg: 'rgba(100,149,237,.08)',  border: 'rgba(100,149,237,.3)' },
    completed:  { label: 'Hoàn thành',   color: '#4a9968',  bg: 'rgba(74,153,104,.10)',   border: 'rgba(74,153,104,.3)' },
    cancelled:  { label: 'Đã hủy',       color: '#c0504a',  bg: 'rgba(192,80,74,.08)',    border: 'rgba(192,80,74,.3)' },
};

function formatPrice(amount) {
    return new Intl.NumberFormat('vi-VN').format(amount) + 'đ';
}

function formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString('vi-VN', {
        day: '2-digit', month: 'long', year: 'numeric',
    });
}

export default function OrderCard({ order }) {
    const status = STATUS_MAP[order.status] ?? { label: order.status, color: '#888', bg: 'transparent', border: '#333' };

    return (
        <div className="border border-[#222] hover:border-[#333] transition-colors duration-200 cursor-pointer group">
            {/* Header */}
            <div className="px-6 py-4 border-b border-[#161616] flex items-center justify-between">
                <div>
                    <div className="font-['Cormorant_Garamond'] text-xl text-[#c9a84c] tracking-wide">
                        #{order.orderCode ?? order._id?.slice(-8).toUpperCase()}
                    </div>
                    <div className="text-[11px] text-[#555] mt-0.5">
                        {formatDate(order.createdAt)}
                    </div>
                </div>

                {/* Status badge */}
                <span
                    className="text-[9px] tracking-[.12em] uppercase px-3 py-1 border"
                    style={{ color: status.color, background: status.bg, borderColor: status.border }}
                >
                    {status.label}
                </span>
            </div>

            {/* Body */}
            <div className="px-6 py-4 flex items-center justify-between">
                <div className="text-[12px] text-[#555]">
                    {order.items?.length ?? 0} sản phẩm
                    {order.paymentMethod && <> · {order.paymentMethod}</>}
                </div>

                <div className="text-right">
                    <div className="font-['Cormorant_Garamond'] text-2xl text-white group-hover:text-[#e0bc5f] transition-colors">
                        {formatPrice(order.totalAmount)}
                    </div>
                    {order.note && (
                        <div className="text-[11px] text-[#555] mt-0.5 italic">{order.note}</div>
                    )}
                </div>
            </div>
        </div>
    );
}