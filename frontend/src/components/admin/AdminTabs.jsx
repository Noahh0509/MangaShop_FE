import React from 'react';

export default function AdminTabs({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'products', label: 'Sản phẩm' },
    { id: 'promotions', label: 'Khuyến mãi' },
    { id: 'orders', label: 'Đơn hàng' }
  ];

  return (
    <div className="flex border-b border-[#1a1a1a] mb-7">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`px-5 py-3 text-[11px] tracking-[.14em] uppercase -mb-[1px] border-b-2 transition-colors
            ${activeTab === tab.id ? 'text-[#c9a84c] border-[#c9a84c]' : 'text-[#555] border-transparent hover:text-[#e8e2d9]'}`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}