// components/superadmin/SuperAdminPanel.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const SuperAdminPanel = () => {
  const navigate = useNavigate();
  const [activeSubTab, setActiveSubTab] = useState('users');

  return (
    <div className="animate-fade-in p-12 bg-[#080808] min-h-screen text-[#e8e2d9]">
      
      {/* 🚪 HEADER TỐI CAO - TĂNG SIZE TIÊU ĐỀ */}
      <div className="flex justify-between items-center mb-16">
        <div>
          <h1 className="text-5xl font-black tracking-tighter text-[#c9a84c] uppercase italic leading-none">
            Quản lý
          </h1>
          <p className="text-[#555] text-sm uppercase tracking-[0.4em] mt-4 font-medium">
            
          </p>
        </div>

        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-3 px-8 py-4 border border-[#333] hover:border-[#c9a84c] text-xs uppercase tracking-[0.2em] text-[#888] hover:text-[#c9a84c] transition-all duration-500 bg-transparent rounded-sm group"
        >
          <span className="text-lg group-hover:-translate-x-2 transition-transform">←</span>
          Quay lại cửa hàng
        </button>
      </div>

      {/* TĂNG SIZE TAB CHỌN */}
      <div className="flex gap-12 mb-12 border-b border-[#111] pb-4">
        {['users', 'logs'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveSubTab(tab)}
            className={`text-sm tracking-[0.25em] uppercase font-bold transition-all pb-4 ${
              activeSubTab === tab 
                ? 'text-[#c9a84c] border-b-2 border-[#c9a84c]' 
                : 'text-[#333] hover:text-[#666]'
            }`}
          >
            {tab === 'users' ? 'Quản lý Nhân sự' : 'Nhật ký Hệ thống (Logs)'}
          </button>
        ))}
      </div>

      {activeSubTab === 'users' ? (
        <div className="overflow-x-auto bg-[#0a0a0a] rounded-xl border border-[#111] shadow-2xl">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[#444] uppercase tracking-[0.2em] text-[12px] border-b border-[#111] bg-[#0d0d0d]">
                <th className="p-6 font-bold">Tên / Email</th>
                <th className="p-6 font-bold">Vai trò</th>
                <th className="p-6 font-bold">Ngày gia nhập</th>
                <th className="p-6 text-right font-bold">Thao tác</th>
              </tr>
            </thead>
            <tbody className="text-[14px]">
              {/* Dòng dữ liệu mẫu với size to hơn */}
              <tr className="border-b border-[#0f0f0f] hover:bg-[#111] transition-all duration-300">
                <td className="p-8">
                  <span className="text-lg font-bold text-[#f2f2f2]">Nguyen Van A</span>
                  <br/>
                  <span className="text-[#555] font-mono mt-1 block">a@example.com</span>
                </td>
                <td className="p-8">
                  <span className="px-4 py-1.5 bg-[#c9a84c]/10 text-[#c9a84c] border border-[#c9a84c]/30 rounded text-xs font-black tracking-widest">
                    ADMIN
                  </span>
                </td>
                <td className="p-8 text-[#666] font-mono tracking-tighter">27/03/2026</td>
                <td className="p-8 text-right space-x-8">
                    <button className="text-[#c9a84c] font-bold hover:text-white transition-colors border-b border-transparent hover:border-[#c9a84c] pb-1">Hạ cấp</button>
                    <button className="text-red-800 font-bold hover:text-red-500 transition-colors border-b border-transparent hover:border-red-500 pb-1">Khóa tài khoản</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <div className="space-y-4 font-mono">
          {/* Tăng size Logs */}
          <div className="p-6 bg-[#0c0c0c] border-l-4 border-[#c9a84c] text-[#aaa] text-sm hover:bg-[#111] transition-all">
             <span className="text-[#444] font-bold">[2026-03-27 12:00:00]</span> 
             <span className="text-[#c9a84c] mx-4 font-black italic underline decoration-1">ADMIN_LOGIN:</span> 
             Tài khoản <b className="text-[#fff]">admin_pro</b> vừa thâm nhập hệ thống từ IP 1.2.3.4
          </div>
        </div>
      )}
    </div>
  );
};