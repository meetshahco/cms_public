import Link from "next/link";
import { Navbar } from "@/components/Navbar";

export default function PublicHome() {
    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center p-6 text-center">
            <div className="max-w-2xl space-y-8">
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">
                    Studio CMS
                </h1>
                <p className="text-xl text-gray-400 leading-relaxed font-light">
                    A modern, high-performance Headless CMS built with Next.js 16, Vercel KV, and Tiptap.
                    Designed for designers who code.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                    <Link
                        href="/admin"
                        className="px-8 py-4 bg-white text-black font-medium rounded-full hover:bg-gray-200 transition-all transform hover:scale-105"
                    >
                        Go to Admin Dashboard
                    </Link>
                    <Link
                        href="https://github.com/meetshahco/cms_public"
                        target="_blank"
                        className="px-8 py-4 bg-[#1a1a1a] border border-white/10 text-white font-medium rounded-full hover:bg-[#222] transition-all"
                    >
                        View on GitHub
                    </Link>
                </div>

                <div className="pt-12 border-t border-white/5">
                    <div className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-4">
                        Guest Demo Enabled
                    </div>
                    <p className="text-sm text-gray-500">
                        Login with <span className="text-white font-mono">admin / admin</span> to try out the editor.<br />
                        All data is volatile and isolated for safety.
                    </p>
                </div>
            </div>
        </div>
    );
}
