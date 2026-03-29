import React from 'react';

const StatsGrid = ({ data, loading }) => {
  // Nếu đang tải dữ liệu, có thể hiện hiệu ứng loading nhẹ
  if (loading) {
    return (
      <div className="grid grid-cols-4 gap-4 mb-8 opacity-50">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="border border-[#1a1a1a] p-6 bg-[#0a0a0a] animate-pulse">
            <div className="h-4 w-20 bg-[#1a1a1a] mb-3"></div>
            <div className="h-8 w-24 bg-[#1a1a1a]"></div>
          </div>
        ))}
      </div>
    );
  }

  // Map dữ liệu từ API vào mảng hiển thị
  const statsItems = [
    { 
      label: 'Tổng doanh thu', 
      val: `${data?.totalRevenue?.toLocaleString() || 0}đ`, 
      trend: 'Đã giao thành công', 
      isUp: true 
    },
    { 
      label: 'Tổng đơn hàng', 
      val: data?.totalOrders || 0, 
      trend: 'Tất cả trạng thái', 
      isUp: true 
    },
    { 
      label: 'Sản phẩm', 
      val: data?.totalProducts || 0, 
      trend: 'Trong kho', 
      isUp: true 
    },
    { 
      label: 'Khách hàng', 
      val: data?.totalUsers || 0, 
      trend: 'Tài khoản customer', 
      isUp: true 
    }
  ];

  return (
    <div className="grid grid-cols-4 gap-4 mb-8">
      {statsItems.map((stat, idx) => (
        <div key={idx} className="border border-[#1a1a1a] p-6 bg-[#0a0a0a] hover:border-[#c9a84c]/50 transition-colors">
          <div className="text-[10px] tracking-[.18em] uppercase text-[#444] mb-3">{stat.label}</div>
          <div className="font-['Cormorant_Garamond'] text-[36px] font-light text-[#e8e2d9] mb-1">
            {stat.val}
          </div>
          <div className={`text-[11px] ${stat.isUp ? 'text-[#4a9968]' : 'text-[#c0504a]'}`}>
            {stat.trend}
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsGrid;