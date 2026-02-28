import React, { useEffect, useRef } from 'react';
import LoginLeftPanel from '../components/login/LoginLeftPanel';
import LoginForm from '../components/login/LoginForm';

export default function LoginPage() {

    return (
        <div className="min-h-screen w-full flex bg-[#0e0e0e] text-[#e8e2d9]">
            {/* Left — quote panel */}
            <LoginLeftPanel />

            {/* Right — form */}
            <div className="flex-1 flex items-center justify-center px-8 md:px-16 lg:px-20 py-16">
                <LoginForm />
            </div>
        </div>
    );
}