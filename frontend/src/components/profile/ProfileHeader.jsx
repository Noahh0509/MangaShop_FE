import { useState, useEffect } from 'react';

const API = import.meta.env.VITE_API_URL ?? '';

export default function ProfileHeader() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchMe = async () => {
            try {
                const res = await fetch(`${API}/api/users/me`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
                });
                const data = await res.json();
                if (res.ok) setUser(data.data.user);
            } catch (err) {
                console.error(err);
            }
        };
        fetchMe();
    }, []);

    // Lấy chữ cái đầu của fullName hoặc username
    const initial = user?.fullName?.[0] ?? user?.username?.[0] ?? '?';

    // Format ngày tạo tài khoản
    const memberSince = user?.createdAt
        ? new Date(user.createdAt).toLocaleDateString('vi-VN', { month: 'long', year: 'numeric' })
        : null;

    // Tách tên cuối để in nghiêng vàng
    const nameParts  = user?.fullName?.trim().split(' ') ?? [];
    const lastName   = nameParts.at(-1) ?? '';
    const firstName  = nameParts.slice(0, -1).join(' ');

    return (
        <div className="pt-[72px] px-12 py-12 pb-8 border-b border-[#222] flex items-end gap-6">
            {/* Avatar */}
            <div className="w-20 h-20 rounded-full border border-[#8a6d2f] flex items-center justify-center flex-shrink-0">
                <span className="font-['Cormorant_Garamond'] text-3xl text-[#c9a84c] uppercase">
                    {initial}
                </span>
            </div>

            {/* Info */}
            <div>
                <div className="text-[10px] tracking-[.22em] uppercase text-[#c9a84c] mb-2">
                    Tài khoản
                </div>
                <h1 className="font-['Cormorant_Garamond'] font-light text-5xl leading-none m-0 text-white">
                    {user ? (
                        <>
                            {firstName && <>{firstName} </>}
                            <em className="italic text-[#c9a84c]">{lastName}</em>
                        </>
                    ) : (
                        <span className="opacity-20">— — —</span>
                    )}
                </h1>
                <div className="text-xs text-[#555] mt-2">
                    {memberSince && <>Thành viên từ {memberSince} · </>}
                    {user?.email ?? ''}
                </div>
            </div>
        </div>
    );
}