import React, { useEffect, useState } from 'react';

//const API_URL = 'https://mangashop-rnfc.onrender.com/api/users/public-users';
const API_URL = 'http://localhost:5000/api/users/public-users';
const BACKEND_URL = 'https://mangashop-rnfc.onrender.com/api/users/public-users';
const BE_API='https://mangashop-rnfc.onrender.com/api-docs/';
export default function UserListSection() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch(API_URL);
                if (!res.ok) throw new Error('HTTP error: ' + res.status);
                const data = await res.json();
                setUsers(data.data.users);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    return (
        <section className="relative px-12 py-20 overflow-hidden">
            {/* Subtle background glow */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background:
                        'radial-gradient(ellipse 50% 50% at 20% 50%, rgba(201,168,76,0.04) 0%, transparent 70%)',
                }}
            />

            {/* Section Header */}
            <div className="mb-10">
                <div className="flex items-center gap-3 mb-4">
                    <span className="w-8 h-px bg-[#c9a84c] block" />
                    <span className="text-[11px] tracking-[0.2em] uppercase text-[#c9a84c]">
                        Cộng đồng
                    </span>
                </div>
                <h2
                    className="font-['Cormorant_Garamond'] font-light leading-tight tracking-[-0.02em] text-[#e8e2d9]"
                    style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}
                >
                    Table <em className="italic text-[#c9a84c]"> Users</em>
                </h2>
            </div>

            {/* Notice box */}
            <div className="mb-8 flex items-start gap-3 border border-[#222] bg-[#111] px-5 py-4 max-w-2xl">
                <span className="text-[#c9a84c] text-[18px] leading-none mt-0.5">ℹ</span>
                <p className="text-[18px] text-[#666] leading-[1.8]">
                    Nếu không thấy danh sách user, vui lòng{' '}
                    <a
                        href={BE_API}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#c9a84c] border-b border-[#c9a84c33] hover:border-[#c9a84c] transition-all"
                    >
                        chuyển qua link backend
                    </a>{' '}
                    và đợi hiện danh sách API để{' '}
                    <span className="text-[#888]">đánh thức backend</span> (server ngủ sau khi không dùng).
                </p>
            </div>

            {/* States */}
            {loading && (
                <div className="flex items-center gap-3 text-[#555] text-[13px] py-10">
                    <span className="w-4 h-4 border border-[#c9a84c33] border-t-[#c9a84c] rounded-full animate-spin inline-block" />
                    Đang tải danh sách...
                </div>
            )}

            {error && (
                <div className="border border-[#3a1a1a] bg-[#1a0e0e] px-5 py-4 text-[13px] text-[#c0504a] max-w-md">
                    Không thể tải dữ liệu: {error}
                </div>
            )}

            {!loading && !error && (
                <div className="max-w-3xl">
                    {/* Table */}
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="border-b border-[#222]">
                                <th className="text-left text-[10px] tracking-[0.2em] uppercase text-[#444] pb-3 pr-8 font-normal w-12">
                                    #
                                </th>
                                <th className="text-left text-[10px] tracking-[0.2em] uppercase text-[#444] pb-3 pr-8 font-normal">
                                    Tên thành viên
                                </th>
                                <th className="text-left text-[10px] tracking-[0.2em] uppercase text-[#444] pb-3 font-normal hidden md:table-cell">
                                    ID
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr
                                    key={user.Id}
                                    className="border-b border-[#161616] group hover:bg-[#111] transition-colors duration-150"
                                >
                                    <td className="py-4 pr-8 text-[#333] text-[13px] font-['Cormorant_Garamond'] group-hover:text-[#555] transition-colors">
                                        {String(index + 1).padStart(2, '0')}
                                    </td>
                                    <td className="py-4 pr-8">
                                        <span className="text-[14px] text-[#e8e2d9] group-hover:text-[#c9a84c] transition-colors duration-200">
                                            {user.name}
                                        </span>
                                    </td>
                                    <td className="py-4 hidden md:table-cell">
                                        <span className="text-[11px] text-[#333] font-mono group-hover:text-[#444] transition-colors">
                                            {user.Id}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Footer count */}
                    <div className="mt-5 flex items-center gap-3">
                        <span className="w-4 h-px bg-[#333]" />
                        <span className="text-[11px] tracking-[0.14em] uppercase text-[#444]">
                            {users.length} thành viên
                        </span>
                    </div>
                </div>
            )}
        </section>
    );
}