import { useState } from 'react';

const API = import.meta.env.VITE_API_URL ?? '';

function checkStrength(val) {
    if (!val) return { score: 0, color: '', label: '—', width: '0%' };
    let score = 0;
    if (val.length >= 8)          score++;
    if (/[A-Z]/.test(val))        score++;
    if (/[0-9]/.test(val))        score++;
    if (/[^A-Za-z0-9]/.test(val)) score++;

    const colors = ['#c0504a', '#e6a23c', '#c9a84c', '#4a9968'];
    const labels = ['Yếu', 'Trung bình', 'Khá tốt', 'Mạnh'];
    return {
        score,
        color: colors[score - 1] || colors[0],
        label: labels[score - 1] || 'Yếu',
        width: `${score * 25}%`,
    };
}

export default function ChangePasswordPanel() {
    const [form, setForm] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });
    const [saving, setSaving]   = useState(false);
    const [error, setError]     = useState('');
    const [success, setSuccess] = useState('');

    const strength = checkStrength(form.newPassword);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        setError(''); setSuccess('');
    };

    const handleCancel = () => {
        setForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
        setError(''); setSuccess('');
    };

    const handleSubmit = async () => {
        setError(''); setSuccess('');

        if (form.newPassword !== form.confirmPassword) {
            setError('Mật khẩu xác nhận không khớp!');
            return;
        }
        if (strength.score < 2) {
            setError('Mật khẩu mới quá yếu, vui lòng chọn mật khẩu mạnh hơn.');
            return;
        }

        setSaving(true);
        try {
            const res = await fetch(`${API}/api/users/me/change-password`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
                body: JSON.stringify({
                    currentPassword: form.currentPassword,
                    newPassword:     form.newPassword,
                }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || 'Đổi mật khẩu thất bại');

            setSuccess('Đổi mật khẩu thành công!');
            setForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
        } catch (err) {
            setError(err.message);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div>
            <div className="font-['Cormorant_Garamond'] text-2xl font-normal mb-6 pb-4 border-b border-[#222] text-white">
                Đổi mật khẩu
            </div>

            <div className="max-w-md">
                {/* Alert */}
                {error   && <div className="mb-5 px-4 py-3 border border-[#c0504a] text-[#c0504a] text-xs tracking-wide">{error}</div>}
                {success && <div className="mb-5 px-4 py-3 border border-[#4a9968] text-[#4a9968] text-xs tracking-wide">{success}</div>}

                {/* Current password */}
                <div className="flex flex-col gap-1.5 mb-5">
                    <label className="text-[10px] tracking-[.18em] uppercase text-[#555]">Mật khẩu hiện tại *</label>
                    <input
                        name="currentPassword"
                        type="password"
                        value={form.currentPassword}
                        onChange={handleChange}
                        placeholder="••••••••"
                        className="bg-transparent border border-[#222] text-white font-['DM_Sans'] text-sm px-3.5 py-3 outline-none transition-colors focus:border-[#8a6d2f] placeholder-[#333]"
                    />
                </div>

                {/* New password + strength */}
                <div className="flex flex-col gap-1.5 mb-5">
                    <label className="text-[10px] tracking-[.18em] uppercase text-[#555]">Mật khẩu mới *</label>
                    <input
                        name="newPassword"
                        type="password"
                        value={form.newPassword}
                        onChange={handleChange}
                        placeholder="Tối thiểu 8 ký tự"
                        className="bg-transparent border border-[#222] text-white font-['DM_Sans'] text-sm px-3.5 py-3 outline-none transition-colors focus:border-[#8a6d2f] placeholder-[#333]"
                    />
                    <div className="h-0.5 bg-[#222] relative overflow-hidden mt-1">
                        <div
                            className="h-full transition-all duration-300"
                            style={{ width: strength.width, background: strength.color }}
                        />
                    </div>
                    <div className="text-[10px] tracking-[.1em] uppercase text-[#555]">
                        Độ mạnh: <span style={{ color: strength.score > 0 ? strength.color : undefined }}>{strength.label}</span>
                    </div>
                </div>

                {/* Confirm password */}
                <div className="flex flex-col gap-1.5 mb-5">
                    <label className="text-[10px] tracking-[.18em] uppercase text-[#555]">Xác nhận mật khẩu mới *</label>
                    <input
                        name="confirmPassword"
                        type="password"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        placeholder="Nhập lại mật khẩu mới"
                        className="bg-transparent border border-[#222] text-white font-['DM_Sans'] text-sm px-3.5 py-3 outline-none transition-colors focus:border-[#8a6d2f] placeholder-[#333]"
                    />
                    {form.confirmPassword && (
                        <div className={`text-[10px] tracking-[.1em] uppercase ${form.newPassword === form.confirmPassword ? 'text-[#4a9968]' : 'text-[#c0504a]'}`}>
                            {form.newPassword === form.confirmPassword ? '✓ Mật khẩu khớp' : '✗ Mật khẩu không khớp'}
                        </div>
                    )}
                </div>

                {/* Requirements notice */}
                <div className="p-4 bg-[#111] border border-[#1a1a1a] text-xs text-[#555] mb-6 leading-loose">
                    Mật khẩu phải có:<br />
                    · Ít nhất 8 ký tự<br />
                    · Ít nhất 1 chữ hoa và 1 số<br />
                    · Ít nhất 1 ký tự đặc biệt (@, #, $, ...)
                </div>

                {/* Buttons */}
                <div className="flex gap-3">
                    <button
                        onClick={handleSubmit}
                        disabled={saving}
                        className="px-8 py-3 bg-[#c9a84c] text-black font-['DM_Sans'] text-[11px] tracking-[.16em] uppercase font-medium border-none cursor-pointer transition-all hover:bg-[#e0bc5f] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {saving ? 'Đang cập nhật...' : 'Cập nhật mật khẩu'}
                    </button>
                    <button
                        onClick={handleCancel}
                        disabled={saving}
                        className="px-6 py-3 bg-transparent border border-[#222] text-[#888] font-['DM_Sans'] text-[11px] tracking-[.14em] uppercase cursor-pointer transition-all hover:border-[#8a6d2f] hover:text-[#c9a84c] disabled:opacity-50"
                    >
                        Hủy
                    </button>
                </div>
            </div>
        </div>
    );
}