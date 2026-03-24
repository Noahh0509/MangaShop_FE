import React, { useState } from 'react';

export default function RegisterInput({
    label, type = 'text', name, value, onChange,
    placeholder, error, hint
}) {
    const [focused, setFocused] = useState(false);
    const [showPass, setShowPass] = useState(false);
    const isPassword = type === 'password';
    const inputType  = isPassword ? (showPass ? 'text' : 'password') : type;

    const borderColor = error ? '#f87171' : focused ? '#c9a84c' : '#3a3a3a';

    return (
        <div className="mb-7">
            <label className="block text-[12px] tracking-[0.14em] uppercase text-[#888] mb-3 font-medium">
                {label}
            </label>
            <div className="relative">
                <input
                    type={inputType}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    className="w-full py-3 bg-transparent text-[16px] text-[#e8e2d9] placeholder-[#444]
                        outline-none border-b transition-colors duration-200"
                    style={{ borderBottomColor: borderColor, paddingRight: isPassword ? '32px' : '0' }}
                />
                {isPassword && (
                    <button type="button" onClick={() => setShowPass(!showPass)}
                        className="absolute right-0 top-1/2 -translate-y-1/2 text-[#666]
                            hover:text-[#aaa] transition-colors bg-transparent border-none p-0">
                        {showPass ? (
                            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                <path d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                            </svg>
                        ) : (
                            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                        )}
                    </button>
                )}
            </div>
            {error && <p className="text-[13px] text-red-400 mt-2">{error}</p>}
            {hint && !error && <p className="text-[12px] text-[#666] mt-2">{hint}</p>}
        </div>
    );
}