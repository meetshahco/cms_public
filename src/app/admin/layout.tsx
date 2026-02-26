"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { adminPath, isAdminSubdomain } from "@/lib/admin-utils";
import {
    LayoutDashboard,
    FolderKanban,
    Settings,
    LogOut,
    Image as ImageIcon,
    FileText,
} from "lucide-react";

const navItems = [
    { path: "/", label: "Home", icon: LayoutDashboard },
    { path: "/projects", label: "Projects", icon: FolderKanban },
    { path: "/pages", label: "Pages", icon: FileText },
    { path: "/media", label: "Media", icon: ImageIcon },
    { path: "/settings", label: "Settings", icon: Settings },
];

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const { data: session } = useSession();
    const onSubdomain = isAdminSubdomain();
    const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);

    const isGuest = session?.user?.email === "guest@meetshah.co";

    // Don't show sidebar on login page
    const loginPath = onSubdomain ? "/login" : "/admin/login";
    if (pathname === loginPath) {
        return <>{children}</>;
    }

    return (
        <div className="min-h-screen bg-[#0a0a0a] flex flex-col md:flex-row">
            {/* Mobile Header */}
            <header className="md:hidden fixed top-0 left-0 right-0 h-14 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/[0.06] flex items-center justify-between px-4 z-40">
                <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center">
                    <span className="text-xs font-bold text-white">{isGuest ? "G" : "M"}</span>
                </div>
                <button
                    onClick={() => signOut({ callbackUrl: adminPath("/") })}
                    className="p-2 text-neutral-500 hover:text-red-400 transition-colors"
                >
                    <LogOut className="w-5 h-5" />
                </button>
            </header>

            {/* Desktop Sidebar (Hide on mobile) */}
            <aside className="hidden md:flex w-[72px] border-r border-white/[0.06] flex-col items-center bg-[#0a0a0a] fixed h-screen z-40">
                {/* Logo */}
                <div className="pt-5 pb-4 border-b border-white/[0.06] w-full flex justify-center">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-white/20 to-white/5 flex items-center justify-center shadow-lg border border-white/10">
                        <span className="text-sm font-bold text-white">{isGuest ? "G" : "M"}</span>
                    </div>
                </div>

                {/* Navigation — centered vertically */}
                <nav className="flex-1 flex flex-col items-center justify-center gap-4 w-full px-2">
                    {navItems.map((item) => {
                        const href = adminPath(item.path);
                        // Determine active state based on the actual pathname
                        const adminRoot = onSubdomain ? "/" : "/admin";
                        const itemFullPath = onSubdomain
                            ? item.path
                            : `/admin${item.path === "/" ? "" : item.path}`;
                        const isActive =
                            item.path === "/"
                                ? pathname === adminRoot
                                : pathname.startsWith(itemFullPath);
                        return (
                            <Link
                                key={item.path}
                                href={href}
                                className={`flex flex-col items-center justify-center gap-1 w-14 h-14 rounded-xl text-center transition-all ${isActive
                                    ? "bg-white/10 text-white"
                                    : "text-neutral-500 hover:text-neutral-300 hover:bg-white/5"
                                    }`}
                            >
                                <item.icon className="w-[18px] h-[18px]" />
                                <span className="text-[9px] font-medium tracking-wide leading-none">
                                    {item.label}
                                </span>
                            </Link>
                        );
                    })}
                </nav>

                {/* Footer */}
                <div className="pb-4 w-full flex justify-center">
                    <button
                        onClick={() => signOut({ callbackUrl: adminPath("/") })}
                        className="flex flex-col items-center justify-center gap-1 w-14 h-14 rounded-xl text-neutral-500 hover:text-red-400 hover:bg-red-500/5 transition-all"
                        title="Sign Out"
                    >
                        <LogOut className="w-[18px] h-[18px]" />
                        <span className="text-[9px] font-medium tracking-wide leading-none">
                            Sign Out
                        </span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 w-full md:ml-[72px] pt-14 pb-[72px] md:pt-0 md:pb-0">
                <div className="p-4 md:p-8">{children}</div>
            </main>

            {/* Mobile Bottom Navigation */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 h-[72px] bg-[#0a0a0a]/90 backdrop-blur-lg border-t border-white/[0.06] flex items-center justify-around px-2 z-50 pb-safe">
                {navItems.slice(0, 3).map((item) => {
                    const href = adminPath(item.path);
                    const adminRoot = onSubdomain ? "/" : "/admin";
                    const itemFullPath = onSubdomain ? item.path : `/admin${item.path === "/" ? "" : item.path}`;
                    const isActive = item.path === "/" ? pathname === adminRoot : pathname.startsWith(itemFullPath);

                    return (
                        <Link
                            key={item.path}
                            href={href}
                            onClick={() => setIsMoreMenuOpen(false)}
                            className={`flex flex-col items-center justify-center gap-1 w-16 h-12 rounded-xl transition-all ${isActive ? "text-white" : "text-neutral-500"}`}
                        >
                            <item.icon className={`w-5 h-5 ${isActive ? 'opacity-100' : 'opacity-70'}`} />
                            <span className="text-[10px] font-medium tracking-wide">{item.label}</span>
                        </Link>
                    );
                })}

                {/* Mobile "More" Button */}
                <button
                    onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)}
                    className={`flex flex-col items-center justify-center gap-1 w-16 h-12 rounded-xl transition-all ${isMoreMenuOpen ? "text-white" : "text-neutral-500"}`}
                >
                    <div className="flex gap-0.5 items-center justify-center w-5 h-5 opacity-70">
                        <div className="w-1 h-1 rounded-full bg-current" />
                        <div className="w-1 h-1 rounded-full bg-current" />
                        <div className="w-1 h-1 rounded-full bg-current" />
                    </div>
                    <span className="text-[10px] font-medium tracking-wide">More</span>
                </button>
            </nav>

            {/* Mobile "More" Bottom Sheet Overlay */}
            {isMoreMenuOpen && (
                <div className="md:hidden fixed inset-0 z-40 flex flex-col justify-end">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsMoreMenuOpen(false)} />
                    <div className="relative bg-[#111] border-t border-white/[0.06] rounded-t-2xl p-6 pb-[96px] shadow-2xl animate-in slide-in-from-bottom-full duration-200">
                        <div className="grid grid-cols-4 gap-4">
                            {navItems.slice(3).map((item) => {
                                const href = adminPath(item.path);
                                const adminRoot = onSubdomain ? "/" : "/admin";
                                const itemFullPath = onSubdomain ? item.path : `/admin${item.path === "/" ? "" : item.path}`;
                                const isActive = item.path === "/" ? pathname === adminRoot : pathname.startsWith(itemFullPath);

                                return (
                                    <Link
                                        key={item.path}
                                        href={href}
                                        onClick={() => setIsMoreMenuOpen(false)}
                                        className={`flex flex-col items-center justify-center gap-2 p-3 rounded-xl border transition-all ${isActive ? "bg-white/10 border-white/20 text-white" : "bg-white/[0.02] border-white/5 text-neutral-400"}`}
                                    >
                                        <item.icon className="w-5 h-5" />
                                        <span className="text-[10px] uppercase tracking-wider font-semibold">{item.label}</span>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
