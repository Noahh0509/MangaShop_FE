import React from 'react';
import RegisterLeftPanel from '../components/register/RegisterLeftPanel';
import RegisterForm from '../components/register/RegisterForm';

export default function RegisterPage() {
    return (
        <div className="min-h-screen w-full flex bg-[#0e0e0e] text-[#e8e2d9]">
            {/* Left — perks panel */}
            <RegisterLeftPanel />

            {/* Right — form */}
            <div className="flex-1 flex items-center justify-center px-8 md:px-16 lg:px-20 py-16 overflow-y-auto">
                <RegisterForm />
            </div>
        </div>
    );
}