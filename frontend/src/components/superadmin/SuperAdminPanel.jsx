// components/admin/SuperAdminPanel.jsx
import React, { useState, useEffect } from 'react';

export const SuperAdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [logs, setLogs] = useState([]);
  const [activeSubTab, setActiveSubTab] = useState('users'); // 'users' hoặc 'logs'

  return (
    <div className="animate-fade-in">
      {/* Tab con để chuyển đổi giữa User và Log */}
      <div className="flex gap-8 mb-8 border-b border-[#111] pb-2">
        {['users', 'logs'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveSubTab(tab)}
            className={`text-[10px] tracking-[0.2em] uppercase transition-all pb-2 ${
              activeSubTab === tab ? 'text-[#c9a84c] border-b border-[#c9a84c]' : 'text-[#444] hover:text-[#888]'
            }`}
          >
            {tab === 'users' ? 'Quản lý Nhân sự' : 'Nhật ký Hệ thống (Logs)'}
          </button>
        ))}
      </div>

      {activeSubTab === 'users' ? (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[11px]">
            <thead>
              <tr className="text-[#333] uppercase tracking-widest border-b border-[#111]">
                <th className="p-4">Tên / Email</th>
                <th className="p-4">Vai trò</th>
                <th className="p-4">Ngày gia nhập</th>
                <th className="p-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {/* Map danh sách user ở đây, cho phép đổi role từ Customer <-> Admin */}
              <tr className="border-b border-[#0a0a0a] hover:bg-[#0c0c0c]">
                <td className="p-4 text-[#e8e2d9]">Nguyen Van A <br/><span className="text-[#444]">a@example.com</span></td>
                <td className="p-4"><span className="px-2 py-0.5 bg-[#1a1a1a] text-[#888] rounded">ADMIN</span></td>
                <td className="p-4 text-[#555]">27/03/2026</td>
                <td className="p-4 text-right">
                    <button className="text-[#c9a84c] hover:underline">Hạ cấp</button>
                    <button className="text-red-900 ml-4 hover:underline">Khóa</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <div className="space-y-2 font-mono text-[10px]">
          {/* Danh sách Logs */}
          <div className="p-3 bg-[#0c0c0c] border-l-2 border-[#c9a84c] text-[#888]">
             <span className="text-[#555]">[2026-03-27 12:00:00]</span> 
             <span className="text-[#c9a84c] ml-2">ADMIN_LOGIN:</span> 
             Tài khoản <b className="text-[#aaa]">admin_pro</b> vừa đăng nhập từ IP 1.2.3.4
          </div>
          {/* ... thêm log khác ... */}
        </div>
      )}
    </div>
  );
};