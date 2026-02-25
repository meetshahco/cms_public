import { LoginForm } from "@/components/auth/LoginForm";

export default function LoginPage() {
    return (
        <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-6">
            {/* Ambient background glow */}
            <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[150px] pointer-events-none" />
            <div className="absolute bottom-1/3 right-1/3 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[150px] pointer-events-none" />

            <div className="w-full max-w-sm relative z-10">
                {/* Logo / Title */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                            <span className="text-sm font-bold text-white">M</span>
                        </div>
                        <span className="text-lg font-semibold text-white tracking-tight">
                            Portfolio CMS
                        </span>
                    </div>
                    <p className="text-sm text-neutral-500">
                        Sign in to manage your content
                    </p>
                </div>

                <LoginForm />

                <p className="text-center text-xs text-neutral-600 mt-8">
                    Protected admin panel · Meet Shah Portfolio
                </p>
            </div>
        </div>
    );
}
