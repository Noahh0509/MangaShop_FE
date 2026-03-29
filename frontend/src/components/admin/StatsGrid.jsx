import React from 'react';

const StatsGrid = () => {
  return (
    <div className="grid grid-cols-4 gap-4 mb-8">
      {[
        { label: 'Tổng sản phẩm', val: '5,248', trend: '↑ +12 tuần này', isUp: true },
        { label: 'Đơn hàng hôm nay', val: '47', trend: '↑ +8 so với hôm qua', isUp: true },
        { label: 'Doanh thu tháng', val: <>18.4<span className="text-[20px]">M</span></>, trend: '↑ +23% tháng trước', isUp: true },
        { label: 'Người dùng', val: '1,203', trend: '↑ +34 tuần này', isUp: true }
      ].map((stat, idx) => (
        <div key={idx} className="border border-[#1a1a1a] p-6 bg-[#0a0a0a]">
          <div className="text-[10px] tracking-[.18em] uppercase text-[#444] mb-3">{stat.label}</div>
          <div className="font-['Cormorant_Garamond'] text-[36px] font-light text-[#e8e2d9] mb-1">{stat.val}</div>
          <div className={`text-[11px] ${stat.isUp ? 'text-[#4a9968]' : 'text-[#c0504a]'}`}>{stat.trend}</div>
        </div>
      ))}
    </div>
  );
};

export default StatsGrid;