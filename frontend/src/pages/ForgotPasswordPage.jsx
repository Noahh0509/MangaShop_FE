import { useState } from 'react';
import ForgotHeader from '../components/forgot-password/ForgotHeader';
import StepDots from '../components/forgot-password/StepDots';
import StepEmail from '../components/forgot-password/StepEmail';
import StepOtp from '../components/forgot-password/StepOtp';
import StepNewPassword from '../components/forgot-password/StepNewPassword';
import StepSuccess from '../components/forgot-password/StepSuccess';

export default function ForgotPasswordPage() {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');
    const [verifyToken, setVerifyToken] = useState('');

    return (
        <div className="min-h-screen w-full flex flex-col bg-[#0e0e0e] text-[#e8e2d9] relative overflow-x-hidden">

            {/* Background glows */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute w-[600px] h-[600px] rounded-full -top-[100px] -right-[100px]"
                    style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.04) 0%, transparent 70%)' }} />
                <div className="absolute w-[400px] h-[400px] rounded-full -bottom-[50px] -left-[50px]"
                    style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.03) 0%, transparent 70%)' }} />
            </div>

            {/* Header */}
            <ForgotHeader />

            {/* Main */}
            <main className="flex-1 flex items-center justify-center px-6 py-16 relative z-10">
                <div className="w-full max-w-[420px]" style={{ animation: 'fadeUp 0.6s ease both' }}>

                    {/* Step dots — ẩn ở step 4 */}
                    {step < 4 && <StepDots current={step} total={3} />}

                    {step === 1 && (
                        <StepEmail
                            email={email}
                            setEmail={setEmail}
                            onNext={() => setStep(2)}
                        />
                    )}
                    {step === 2 && (
                        <StepOtp
                            email={email}
                            onNext={(token) => { setVerifyToken(token); setStep(3); }}
                            onBack={() => setStep(1)}
                        />
                    )}
                    {step === 3 && (
                        <StepNewPassword
                            email={email}
                            verifyToken={verifyToken}
                            onNext={() => setStep(4)}
                        />
                    )}
                    {step === 4 && <StepSuccess />}
                </div>
            </main>

            {/* Footer */}
            <footer className="relative z-10 px-12 py-6 border-t border-[#161616] flex items-center justify-between">
                <span className="text-[11px] text-[#444]">© 2025 MangaShop</span>
                <div className="flex gap-6">
                    <a href="#" className="text-[11px] text-[#444] tracking-wider hover:text-[#c9a84c] transition-colors">Điều khoản</a>
                    <a href="#" className="text-[11px] text-[#444] tracking-wider hover:text-[#c9a84c] transition-colors">Bảo mật</a>
                </div>
            </footer>

            <style>{`
                @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(24px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                @keyframes float {
                    0%, 100% { transform: translateY(0); }
                    50%      { transform: translateY(-8px); }
                }
            `}</style>
        </div>
    );
}