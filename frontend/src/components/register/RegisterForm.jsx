import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import RegisterInput from './RegisterInput';

const API_URL = `${import.meta.env.VITE_API_URL}/api/users/register`;

export default function RegisterForm() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        username:        '',
        email:           '',
        fullName:        '',
        phone:           '',
        password:        '',
        confirmPassword: '',
    });
    const [loading, setLoading]   = useState(false);
    const [error, setError]       = useState('');
    const [fieldErr, setFieldErr] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(p => ({ ...p, [name]: value }));
        if (fieldErr[name]) setFieldErr(p => ({ ...p, [name]: '' }));
        if (error) setError('');
    };

    const validate = () => {
        const errs = {};
        if (!form.username)
            errs.username = 'Vui lòng nhập tên đăng nhập.';
        else if (form.username.length < 3)
            errs.username = 'Tên đăng nhập tối thiểu 3 ký tự.';

        if (!form.email)
            errs.email = 'Vui lòng nhập email.';
        else if (!/\S+@\S+\.\S+/.test(form.email))
            errs.email = 'Email không hợp lệ.';

        if (!form.password)
            errs.password = 'Vui lòng nhập mật khẩu.';
        else if (form.password.length < 6)
            errs.password = 'Mật khẩu tối thiểu 6 ký tự.';

        if (!form.confirmPassword)
            errs.confirmPassword = 'Vui lòng xác nhận mật khẩu.';
        else if (form.password !== form.confirmPassword)
            errs.confirmPassword = 'Mật khẩu xác nhận không khớp.';

        return errs;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length) { setFieldErr(errs); return; }

        setLoading(true);
        try {
            const payload = {
                username: form.username,
                email:    form.email,
                password: form.password,
                ...(form.fullName && { fullName: form.fullName }),
                ...(form.phone    && { phone:    form.phone }),
            };

            const res = await fetch(API_URL, {
                method:  'POST',
                headers: { 'Content-Type': 'application/json' },
                body:    JSON.stringify(payload),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.message || 'Đăng ký thất bại.');
                return;
            }

            // Thành công → sang LoginPage
            navigate('/login', { state: { registered: true } });

        } catch {
            setError('Không thể kết nối máy chủ. Vui lòng thử lại.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-[440px]">

            {/* Logo */}
            <Link to="/" className="no-underline block mb-10"
                style={{
                    fontFamily:    '"Cormorant Garamond", serif',
                    fontSize:      '24px',
                    fontWeight:    600,
                    letterSpacing: '0.08em',
                    color:         '#e8e2d9',
                }}>
                Manga<span style={{ color: '#c9a84c' }}>Shop</span>
            </Link>

            <h1 className="mb-3"
                style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '42px', fontWeight: 300 }}>
                Tạo tài khoản
            </h1>
            <p className="text-[15px] text-[#777] mb-9">
                Tham gia cộng đồng manga của chúng tôi
            </p>

            {/* Server error */}
            {error && (
                <div className="mb-6 flex items-center gap-2 pb-3 border-b border-red-400/20 text-[13px] text-red-400">
                    <span>✕</span> {error}
                </div>
            )}

            <form onSubmit={handleSubmit} noValidate>

                {/* Row: username + fullName */}
                <div className="grid grid-cols-2 gap-4">
                    <RegisterInput
                        label="Tên đăng nhập *"
                        name="username"
                        value={form.username}
                        onChange={handleChange}
                        placeholder="manga_fan"
                        error={fieldErr.username}
                        hint="Tối thiểu 3 ký tự"
                    />
                    <RegisterInput
                        label="Họ và tên"
                        name="fullName"
                        value={form.fullName}
                        onChange={handleChange}
                        placeholder="Nguyễn Văn A"
                        error={fieldErr.fullName}
                    />
                </div>

                <RegisterInput
                    label="Email *"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    error={fieldErr.email}
                />

                <RegisterInput
                    label="Số điện thoại"
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="0912 345 678"
                    error={fieldErr.phone}
                />

                {/* Row: password + confirm */}
                <div className="grid grid-cols-2 gap-4">
                    <RegisterInput
                        label="Mật khẩu *"
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder="••••••••"
                        error={fieldErr.password}
                        hint="Tối thiểu 6 ký tự"
                    />
                    <RegisterInput
                        label="Xác nhận mật khẩu *"
                        type="password"
                        name="confirmPassword"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        placeholder="••••••••"
                        error={fieldErr.confirmPassword}
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 text-[13px] tracking-[0.16em] uppercase font-medium border-none transition-all duration-250 mt-2"
                    style={{ background: loading ? '#8a6d2f' : '#c9a84c', color: '#000' }}>
                    {loading ? 'Đang tạo tài khoản...' : 'Đăng ký'}
                </button>
            </form>

            <p className="text-center text-[14px] text-[#777] mt-8">
                Đã có tài khoản?{' '}
                <Link to="/login"
                    className="text-[#c9a84c] no-underline hover:text-[#e0bc5f] transition-colors">
                    Đăng nhập
                </Link>
            </p>
        </div>
    );
}