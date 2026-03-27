import React from 'react';

const Breadcrumb = ({ items }) => (
  <div className="px-6 md:px-12 py-5 flex items-center gap-2 text-xs text-[#555] border-b border-[#161616]">
    {items.map((item, index) => (
      <React.Fragment key={index}>
        {item.link ? (
          <a href={item.link} className="hover:text-[#c9a84c] transition-colors">{item.label}</a>
        ) : (
          <span className="text-[#e8e2d9]">{item.label}</span>
        )}
        {index < items.length - 1 && <span className="text-[#333]">›</span>}
      </React.Fragment>
    ))}
  </div>
);

export default Breadcrumb;