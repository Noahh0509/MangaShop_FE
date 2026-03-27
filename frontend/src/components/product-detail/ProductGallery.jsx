import React, { useState } from 'react';

const ProductGallery = ({ images }) => {
  const [activeThumb, setActiveThumb] = useState(0);
  const displayImages = images && images.length > 0 ? images : [{ url: null }];

  return (
    <div>
      <div className="aspect-[3/4] bg-[#161616] flex items-center justify-center relative overflow-hidden mb-4 border border-[#222]">
        {displayImages[activeThumb]?.url ? (
          <img src={displayImages[activeThumb].url} alt="Cover" className="w-full h-full object-cover" />
        ) : (
          <span className="text-[80px] opacity-20">📖</span>
        )}
      </div>
      
      {/* Chỉ hiện dải ảnh nhỏ nếu có từ 2 ảnh trở lên */}
      {displayImages.length > 1 && (
        <div className="flex gap-2">
          {displayImages.map((img, idx) => (
            <div 
              key={idx} 
              onClick={() => setActiveThumb(idx)}
              className={`w-16 aspect-[3/4] bg-[#1a1a1a] flex items-center justify-center text-lg opacity-60 border cursor-pointer transition-all hover:opacity-100 ${activeThumb === idx ? 'border-[#8a6d2f] opacity-100' : 'border-[#222] hover:border-[#8a6d2f]'}`}
            >
              {img.url ? <img src={img.url} alt={`thumb-${idx}`} className="w-full h-full object-cover" /> : '📖'}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGallery;