import { useState, useEffect } from 'react';

const API = import.meta.env.VITE_API_URL ?? '';

const emptyForm = {
    fullName: '',
    email: '',
    username: '',
    phone: '',
    address: { province: '', district: '', ward: '', street: '' },
};

export default function ProfileInfoPanel() {
    const [form, setForm]       = useState(emptyForm);
    const [original, setOriginal] = useState(emptyForm);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving]   = useState(false);
    const [error, setError]     = useState('');
    const [success, setSuccess] = useState('');

    // ── Lấy thông tin user ──────────────────────────────────────
    useEffect(() => {
        const fetchMe = async () => {
            try {
                const res = await fetch(`${API}/api/users/me`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
                });
                const data = await res.json();
                if (!res.ok) throw new Error(data.message || 'Lỗi tải thông tin');

                const u = data.data.user;
                const filled = {
                    fullName: u.fullName  || '',
                    email:    u.email     || '',
                    username: u.username  || '',
                    phone:    u.phone     || '',
                    address: {
                        province: u.address?.province || '',
                        district: u.address?.district || '',
                        ward:     u.address?.ward     || '',
                        street:   u.address?.street   || '',
                    },
                };
                setForm(filled);
                setOriginal(filled);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchMe();
    }, []);

    // ── Handlers ────────────────────────────────────────────────
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        setError(''); setSuccess('');
    };

    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, address: { ...prev.address, [name]: value } }));
        setError(''); setSuccess('');
    };

    const handleCancel = () => {
        setForm(original);
        setError(''); setSuccess('');
    };

    const handleSave = async () => {
        setSaving(true); setError(''); setSuccess('');
        try {
            const res = await fetch(`${API}/api/users/me`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
                body: JSON.stringify({
                    fullName: form.fullName,
                    phone:    form.phone,
                    address:  form.address,
                }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || 'Cập nhật thất bại');
            setOriginal(form);
            setSuccess('Cập nhật thông tin thành công!');
        } catch (err) {
            setError(err.message);
        } finally {
            setSaving(false);
        }
    };

    // ── UI ──────────────────────────────────────────────────────
    if (loading) {
        return (
            <div className="flex items-center gap-3 text-[#555] text-sm pt-10">
                <span className="w-4 h-4 border border-[#555] border-t-[#c9a84c] rounded-full animate-spin" />
                Đang tải thông tin...
            </div>
        );
    }

    return (
        <div>
            {/* Section title */}
            <div className="font-['Cormorant_Garamond'] text-2xl font-normal mb-6 pb-4 border-b border-[#222] text-white">
                Thông tin cá nhân
            </div>

            {/* Alert */}
            {error   && <div className="mb-5 px-4 py-3 border border-[#c0504a] text-[#c0504a] text-xs tracking-wide">{error}</div>}
            {success && <div className="mb-5 px-4 py-3 border border-[#4a9968] text-[#4a9968] text-xs tracking-wide">{success}</div>}

            {/* Form grid */}
            <div className="grid grid-cols-2 gap-5 mb-5">
                <Field label="Họ và tên *"    name="fullName" value={form.fullName} onChange={handleChange} />
                <Field label="Email"           name="email"    value={form.email}    readOnly />
                <Field label="Tên đăng nhập"   name="username" value={form.username} readOnly />
                <Field label="Số điện thoại"   name="phone"    value={form.phone}    onChange={handleChange} type="tel" />
            </div>

            {/* Address */}
            <div className="font-['Cormorant_Garamond'] text-lg font-normal mb-4 pb-3 border-b border-[#1a1a1a] text-white">
                Địa chỉ giao hàng
            </div>
            <div className="grid grid-cols-2 gap-5 mb-6">
                <Field label="Tỉnh / Thành phố" name="province" value={form.address.province} onChange={handleAddressChange} />
                <Field label="Quận / Huyện"      name="district" value={form.address.district} onChange={handleAddressChange} />
                <Field label="Phường / Xã"        name="ward"     value={form.address.ward}     onChange={handleAddressChange} />
                <Field label="Số nhà, đường"      name="street"   value={form.address.street}   onChange={handleAddressChange} />
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="px-8 py-3 bg-[#c9a84c] text-black font-['DM_Sans'] text-[11px] tracking-[.16em] uppercase font-medium border-none cursor-pointer transition-all hover:bg-[#e0bc5f] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {saving ? 'Đang lưu...' : 'Lưu thay đổi'}
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
    );
}

// ── Reusable input ────────────────────────────────────────────────
function Field({ label, name, value, onChange, type = 'text', readOnly = false }) {
    return (
        <div className="flex flex-col gap-1.5">
            <label className="text-[10px] tracking-[.18em] uppercase text-[#555]">{label}</label>
            <input
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                readOnly={readOnly}
                className={`bg-transparent border border-[#222] font-['DM_Sans'] text-sm px-3.5 py-3 outline-none transition-colors placeholder-[#333]
                    ${readOnly
                        ? 'text-[#555] cursor-not-allowed'
                        : 'text-white focus:border-[#8a6d2f]'
                    }`}
            />
        </div>
    );
}