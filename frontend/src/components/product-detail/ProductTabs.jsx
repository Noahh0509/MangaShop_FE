import React, { useState } from 'react';

const ProductTabs = ({ product }) => {
  const [activeTab, setActiveTab] = useState('desc');

  return (
    <div className="px-6 md:px-12 pb-16 mt-8">
      <div className="flex border-b border-[#222] mb-8">
        <button onClick={() => setActiveTab('desc')} className={`py-3 px-6 text-[11px] tracking-[0.14em] uppercase -mb-px border-b-2 transition-all ${activeTab === 'desc' ? 'text-[#c9a84c] border-[#c9a84c]' : 'text-[#555] border-transparent hover:text-[#e8e2d9]'}`}>Mô tả</button>
        <button onClick={() => setActiveTab('details')} className={`py-3 px-6 text-[11px] tracking-[0.14em] uppercase -mb-px border-b-2 transition-all ${activeTab === 'details' ? 'text-[#c9a84c] border-[#c9a84c]' : 'text-[#555] border-transparent hover:text-[#e8e2d9]'}`}>Thông tin chi tiết</button>
      </div>
      <div className="max-w-[800px] text-sm text-[#888] leading-[1.9] whitespace-pre-line">
        {activeTab === 'desc' && (
          <p>{product.description || product.shortDescription || 'Chưa có bài viết mô tả cho sản phẩm này.'}</p>
        )}
        {activeTab === 'details' && (
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Tác giả:</strong> {product.attributes?.author || 'Đang cập nhật'}</li>
            <li><strong>Nhà xuất bản:</strong> {product.attributes?.publisher || 'Đang cập nhật'}</li>
            <li><strong>Số trang:</strong> {product.attributes?.pages || 'Đang cập nhật'} trang</li>
            <li><strong>Năm xuất bản:</strong> {product.attributes?.publishYear || 'Đang cập nhật'}</li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default ProductTabs;