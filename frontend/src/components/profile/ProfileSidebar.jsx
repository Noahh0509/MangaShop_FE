import { useNavigate } from 'react-router-dom';

const API = import.meta.env.VITE_API_URL ?? '';

const navItems = [
    {
        id: 'info',
        label: 'Thông tin cá nhân',
        icon: (
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
            </svg>
        ),
    },
    {
        id: 'password',
        label: 'Đổi mật khẩu',
        icon: (
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
        ),
    },
];

export default function ProfileSidebar({ activePanel, setActivePanel }) {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await fetch(`${API}/api/auth/logout`, {
                method: 'POST',
                headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
            });
        } catch (err) {
            console.error('Logout error:', err);
        } finally {
            localStorage.removeItem('accessToken');
            navigate('/');
        }
    };

    return (
        <nav className="border-r border-[#222] py-8 flex flex-col">
            {navItems.map((item) => (
                <button
                    key={item.id}
                    onClick={() => setActivePanel(item.id)}
                    className={`flex items-center gap-3 px-7 py-3 text-xs tracking-[.06em] cursor-pointer transition-all duration-200 border-l-2 text-left w-full bg-transparent
                        ${activePanel === item.id
                            ? 'text-[#c9a84c] border-l-[#c9a84c] bg-[rgba(201,168,76,.04)]'
                            : 'text-[#555] border-l-transparent hover:text-[#e8e2d9] hover:bg-[rgba(255,255,255,.02)]'
                        }`}
                >
                    {item.icon}
                    {item.label}
                </button>
            ))}

            {/* Đăng xuất */}
            <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-7 py-3 text-xs tracking-[.06em] cursor-pointer transition-all duration-200 border-l-2 border-l-transparent text-left w-full bg-transparent mt-auto text-[rgba(192,80,74,.4)] hover:text-[#c0504a]"
            >
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
                Đăng xuất
            </button>
        </nav>
    );
}