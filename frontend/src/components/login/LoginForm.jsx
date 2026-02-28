import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../context/useAuth';
import LoginInput from './Logininput';

export default function LoginForm() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [form, setForm]         = useState({ email: '', password: '' });
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
        if (!form.email)    errs.email    = 'Vui lòng nhập email.';
        else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Email không hợp lệ.';
        if (!form.password) errs.password = 'Vui lòng nhập mật khẩu.';
        return errs;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length) { setFieldErr(errs); return; }

        setLoading(true);
        try {
            const user = await login(form.email, form.password);
            // Redirect theo role
            navigate(user.role === 'admin' ? '/admin' : '/');
        } catch (err) {
            const msg = err.response?.data?.message || 'Đăng nhập thất bại.';
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-[360px]">

            {/* Logo */}
            <Link to="/" className="no-underline block mb-12"
                style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '20px', fontWeight: 600, letterSpacing: '0.08em', color: '#e8e2d9' }}>
                Manga<span style={{ color: '#c9a84c' }}>Shop</span>
            </Link>

            <h1 className="mb-2" style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '36px', fontWeight: 300 }}>
                Chào mừng trở lại
            </h1>
            <p className="text-[13px] text-[#555] mb-10">Đăng nhập để tiếp tục mua sắm</p>

            {/* Server error */}
            {error && (
                <div className="mb-6 flex items-center gap-2 pb-3 border-b border-red-400/20 text-[12px] text-red-400">
                    <span>✕</span> {error}
                </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
                <LoginInput
                    label="Email" type="email" name="email"
                    value={form.email} onChange={handleChange}
                    placeholder="you@example.com" error={fieldErr.email}
                />
                <LoginInput
                    label="Mật khẩu" type="password" name="password"
                    value={form.password} onChange={handleChange}
                    placeholder="••••••••" error={fieldErr.password}
                />

                <div className="flex justify-end mb-8">
                    <Link to="/forgot-password"
                        className="text-[11px] text-[#555] no-underline hover:text-[#c9a84c] transition-colors">
                        Quên mật khẩu?
                    </Link>
                </div>

                <button type="submit" disabled={loading}
                    className="w-full py-4 text-[11px] tracking-[0.16em] uppercase font-medium border-none transition-all duration-250"
                    style={{ background: loading ? '#8a6d2f' : '#c9a84c', color: '#000'}}>
                    {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
                </button>
            </form>

            <p className="text-center text-[12px] text-[#555] mt-8">
                Chưa có tài khoản?{' '}
                <Link to="/register" className="text-[#c9a84c] no-underline hover:text-[#e0bc5f] transition-colors">
                    Đăng ký ngay
                </Link>
            </p>
        </div>
    );
}