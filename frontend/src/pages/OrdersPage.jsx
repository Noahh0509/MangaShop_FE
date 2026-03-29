import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import OrderList from '../components/orders/OrderList';

export default function OrdersPage() {
    return (
        <div className="min-h-screen flex flex-col bg-[#0e0e0e] text-[#e8e2d9]">
            <Header />
            <main className="flex-1 pt-[72px]">
                <div className="px-12 py-12 pb-8 border-b border-[#222]">
                    <div className="text-[10px] tracking-[.22em] uppercase text-[#c9a84c] mb-2">
                        Tài khoản
                    </div>
                    <h1 className="font-['Cormorant_Garamond'] font-light text-5xl leading-none text-white">
                        Đơn hàng <em className="italic text-[#c9a84c]">của tôi</em>
                    </h1>
                </div>
                <OrderList />
            </main>
            <Footer />
        </div>
    );
}