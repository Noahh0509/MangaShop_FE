import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../services/axiosInstance'; 

export const SuperAdminPanel = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeSubTab, setActiveSubTab] = useState('users');
  const [logs, setLogs] = useState([]); // Giữ nguyên state logs sếp đã khai báo

  // 1. LẤY DANH SÁCH USER (Giữ nguyên của sếp)
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get('/api/users');
      setUsers(res.data.data.users);
    } catch (err) {
      console.error("Lỗi fetch users:", err);
      alert("Không thể tải danh sách thành viên!");
    } finally {
      setLoading(false);
    }
  };

  // 🕵️‍♂️ 2. LẤY NHẬT KÝ HỆ THỐNG (Hàm mới cho sếp)
  const fetchLogs = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get('/api/logs'); // Gọi đến route log ở backend
      setLogs(res.data.data.logs);
    } catch (err) {
      console.error("Lỗi fetch logs:", err);
    } finally {
      setLoading(false);
    }
  };

  // Tự động load data dựa trên Tab đang chọn
  useEffect(() => {
    if (activeSubTab === 'users') fetchUsers();
    if (activeSubTab === 'logs') fetchLogs();
  }, [activeSubTab]);

  // 3. HÀM ĐỔI VAI TRÒ (Giữ nguyên của sếp)
  const handleRoleChange = async (userId, newRole) => {
    try {
      await axiosInstance.patch(`/api/users/${userId}`, { role: newRole });
      setUsers(prev => prev.map(u => u._id === userId ? { ...u, role: newRole } : u));
      alert("Cập nhật quyền hạn thành công!");
    } catch (err) {
      alert("Lỗi: " + (err.response?.data?.message || "Không thể đổi vai trò"));
    }
  };

  // 4. HÀM XÓA USER (Giữ nguyên của sếp)
  const handleDeleteUser = async (userId) => {
    if (window.confirm("Bạn có chắc muốn xoá thành viên này không ?")) {
      try {
        await axiosInstance.delete(`/api/users/${userId}`);
        setUsers(prev => prev.filter(u => u._id !== userId));
        alert("Đã xóa vĩnh viễn thành viên.");
      } catch (err) {
        alert("Lỗi: " + (err.response?.data?.message || "Không thể xóa"));
      }
    }
  };

  return (
    <div className="animate-fade-in p-12 bg-[#080808] min-h-screen text-[#e8e2d9]">
      {/* Header - Giữ nguyên */}
      <div className="flex justify-between items-center mb-16">
        <div>
          <h1 className="text-5xl font-black tracking-tighter text-[#c9a84c] uppercase italic leading-none">Hệ thống quản trị</h1>
        </div>
        <button onClick={() => navigate('/')} className="flex items-center gap-3 px-8 py-4 border border-[#333] hover:border-[#c9a84c] text-xs uppercase tracking-[0.2em] text-[#888] hover:text-[#c9a84c] transition-all duration-500 bg-transparent rounded-sm group">
          <span className="text-lg group-hover:-translate-x-2 transition-transform">←</span> Quay lại cửa hàng
        </button>
      </div>

      {/* Tab Selector - Giữ nguyên */}
      <div className="flex gap-12 mb-12 border-b border-[#111] pb-4">
        <button onClick={() => setActiveSubTab('users')} className={`text-sm tracking-[0.25em] uppercase font-bold transition-all pb-4 ${activeSubTab === 'users' ? 'text-[#c9a84c] border-b-2 border-[#c9a84c]' : 'text-[#333] hover:text-[#666]'}`}>Quản lý Nhân sự</button>
        <button onClick={() => setActiveSubTab('logs')} className={`text-sm tracking-[0.25em] uppercase font-bold transition-all pb-4 ${activeSubTab === 'logs' ? 'text-[#c9a84c] border-b-2 border-[#c9a84c]' : 'text-[#333] hover:text-[#666]'}`}>Nhật ký Hệ thống</button>
      </div>

      {activeSubTab === 'users' ? (
        <div className="overflow-x-auto bg-[#0a0a0a] rounded-xl border border-[#111] shadow-2xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-[#444] uppercase tracking-[0.2em] text-[12px] border-b border-[#111] bg-[#0d0d0d]">
                <th className="p-6 font-bold">Thành viên</th>
                <th className="p-6 font-bold">Liên hệ</th>
                <th className="p-6 font-bold text-center">Vai trò (Role)</th>
                <th className="p-6 font-bold">Ngày gia nhập</th>
                <th className="p-6 text-right font-bold">Hành động</th>
              </tr>
            </thead>
            <tbody className="text-[14px]">
              {loading ? (
                <tr><td colSpan="5" className="p-20 text-center text-[#c9a84c] animate-pulse uppercase tracking-widest">Đang tải dữ liệu từ vệ tinh...</td></tr>
              ) : users.map((u) => (
                <tr key={u._id} className="border-b border-[#0f0f0f] hover:bg-[#111] transition-all duration-300">
                  <td className="p-8">
                    <div className="flex flex-col">
                      <span className="text-lg font-bold text-[#f2f2f2]">{u.fullName || u.username}</span>
                      <span className="text-[#444] text-[10px] uppercase font-mono mt-1">ID: {u._id.substring(0, 8)}...</span>
                    </div>
                  </td>
                  <td className="p-8">
                    <div className="flex flex-col gap-1">
                      <span className="text-[#aaa] font-mono">{u.email}</span>
                      <span className="text-[#555] font-mono text-xs">{u.phone || "Chưa cập nhật"}</span>
                    </div>
                  </td>
                  <td className="p-8 text-center">
                    <select
                      value={u.role}
                      onChange={(e) => handleRoleChange(u._id, e.target.value)}
                      className="bg-[#080808] text-[#c9a84c] border border-[#333] px-3 py-2 text-xs font-bold uppercase tracking-widest focus:outline-none focus:border-[#c9a84c] rounded cursor-pointer transition-colors"
                    >
                      <option value="customer">Customer</option>
                      <option value="admin">Admin</option>
                      <option value="super_admin">Super Admin</option>
                    </select>
                  </td>
                  <td className="p-8 text-[#666] font-mono">
                    {new Date(u.createdAt).toLocaleDateString('vi-VN')}
                  </td>
                  <td className="p-8 text-right">
                    <button
                      onClick={() => handleDeleteUser(u._id)}
                      className="text-[#444] hover:text-red-600 transition-colors p-2 group"
                      title="Xóa tài khoản"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block">
                        <path d="M3 6h18m-2 0v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2m-6 9l4-4m0 4l-4-4" />
                      </svg>
                      <span className="ml-2 font-bold uppercase text-[10px] tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Xóa</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        /* TAB NHẬT KÝ HỆ THỐNG - ĐÃ CẤY CODE XỊN */
        <div className="space-y-4 animate-fade-in">
          {loading ? (
             <div className="p-20 text-center text-[#c9a84c] animate-pulse uppercase tracking-[0.3em]">Đang giải mã nhật ký...</div>
          ) : logs.length === 0 ? (
            <div className="p-20 text-center text-[#444] italic uppercase tracking-[0.3em] bg-[#0a0a0a] rounded-xl border border-[#111]">
              Hệ thống chưa ghi nhận biến động nào...
            </div>
          ) : (
            logs.map((log) => (
              <div key={log._id} className="group p-6 bg-[#0a0a0a] border-l-2 border-[#111] hover:border-[#c9a84c] transition-all duration-500 rounded-sm shadow-xl">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[#444] font-mono text-[11px] tracking-tighter">
                    [{new Date(log.createdAt).toLocaleString('vi-VN')}]
                  </span>
                  <span className="text-[9px] uppercase tracking-[0.2em] px-2 py-1 bg-[#080808] text-[#333] group-hover:text-[#c9a84c] transition-colors">
                    LOG_ID: {log._id.slice(-6)}
                  </span>
                </div>
                
                <div className="flex items-center gap-4">
                  <span className={`px-2 py-0.5 text-[10px] font-black border uppercase ${
                    log.action.includes('DELETE') ? 'border-red-900/50 text-red-500' : 
                    log.action.includes('ROLE') ? 'border-blue-900/50 text-blue-500' : 
                    'border-[#c9a84c]/50 text-[#c9a84c]'
                  }`}>
                    {log.action}
                  </span>

                  <div className="text-sm tracking-wide">
                    <span className="text-[#f2f2f2] font-bold uppercase text-[12px]">
                      {log.userId?.fullName || log.userId?.username || "Hệ thống"}
                    </span>
                    <span className="mx-3 text-[#111]">|</span>
                    <span className="text-[#888] italic">
                      {log.details}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};