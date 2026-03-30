import React, { useState, useEffect } from 'react';
import api from '../../services/axiosInstance';
import { ShoppingBag, Users, DollarSign, BookOpen } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const DashboardPanel = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get('/api/stats/summary');
        setStats(res.data.data);
      } catch (err) {
        console.error("Lỗi lấy dashboard:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <div className="p-10 text-[#c9a84c]">Đang tải dữ liệu...</div>;

  return (
    <div className="animate-in fade-in duration-500">
      
      {/* 1. Biểu đồ Doanh thu */}
      <div className="bg-[#111] border border-[#1a1a1a] p-8 mb-10">
        <div className="text-[12px] tracking-[.2em] uppercase text-[#444] mb-8">Phân tích doanh thu 7 ngày qua</div>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={stats?.chartData || []}>
              <CartesianGrid strokeDasharray="3 3" stroke="#b2ee8fe7" vertical={false} />
              <XAxis 
                dataKey="_id" 
                stroke="#1fec41" 
                fontSize={10} 
                tickLine={false} 
                axisLine={false}
              />
              <YAxis 
                stroke="#f1d010" 
                fontSize={10} 
                tickLine={false} 
                axisLine={false}
                tickFormatter={(value) => value >= 1000000 
                  ? `${(value / 1000000).toFixed(1)}M` 
                  : `${(value / 1000).toFixed(0)}K`
                }
              />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0a0a0a', border: '1px solid #8dec20', fontSize: '12px' }}
                itemStyle={{ color: '#c9a84c' }}
                formatter={(value) => [`${value.toLocaleString()}đ`, "Tổng số tiền"]} // Hiển thị định dạng tiền Việt
              />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="#c9a84c" 
                strokeWidth={2} 
                dot={{ fill: '#c9a84c', strokeWidth: 2 }} 
                activeDot={{ r: 6, fill: '#e8e2d9' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 2. Bảng đơn hàng gần đây */}
      <div className="bg-[#111] border border-[#1a1a1a] p-6">
        <h3 className="text-[#c9a84c] text-[12px] tracking-[0.2em] uppercase mb-6">Đơn hàng mới nhất</h3>
        <table className="w-full text-left text-[13px]">
          <thead>
            <tr className="text-[#444] border-b border-[#1a1a1a]">
              <th className="pb-4 font-medium uppercase tracking-wider text-[10px]">Mã đơn</th>
              <th className="pb-4 font-medium uppercase tracking-wider text-[10px]">Khách hàng</th>
              <th className="pb-4 font-medium uppercase tracking-wider text-[10px]">Tổng tiền</th>
              <th className="pb-4 font-medium uppercase tracking-wider text-[10px]">Trạng thái</th>
            </tr>
          </thead>
          <tbody className="text-[#888]">
            {stats?.recentInvoices?.map(inv => (
              <tr key={inv._id} className="border-b border-[#0a0a0a] hover:bg-[#0c0c0c] transition-colors">
                <td className="py-4 font-mono text-[#c9a84c]">{inv.invoiceCode}</td>
                <td className="py-4">{inv.user?.fullName || 'Khách vãng lai'}</td>
                <td className="py-4 text-[#e8e2d9]">{inv.totalAmount?.toLocaleString()}đ</td>
                <td className="py-4">
                   <span className="px-2 py-1 bg-[#1a1a1a] text-[10px] rounded uppercase">{inv.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Component con cho các thẻ chỉ số
const StatCard = ({ title, value, icon }) => (
  <div className="bg-[#111] border border-[#1a1a1a] p-6 hover:border-[#c9a84c]/30 transition-all group">
    <div className="flex justify-between items-start mb-4">
      <div className="text-[#444] text-[10px] uppercase tracking-[0.2em]">{title}</div>
      <div className="opacity-50 group-hover:opacity-100 transition-opacity">{icon}</div>
    </div>
    <div className="text-2xl font-light text-[#e8e2d9] tracking-tight">{value}</div>
  </div>
);