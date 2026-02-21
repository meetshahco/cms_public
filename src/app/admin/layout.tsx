"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
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
    { path: "/", label: "Dashboard", icon: LayoutDashboard },
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
    const onSubdomain = isAdminSubdomain();

    // Don't show sidebar on login page
    const loginPath = onSubdomain ? "/login" : "/admin/login";
    if (pathname === loginPath) {
        return <>{children}</>;
    }

    return (
        <div className="min-h-screen bg-[#0a0a0a] flex">
            {/* Sidebar — narrow, centered icons */}
            <aside className="w-[72px] border-r border-white/[0.06] flex flex-col items-center bg-[#0a0a0a] fixed h-screen">
                {/* Logo */}
                <div className="pt-5 pb-4 border-b border-white/[0.06] w-full flex justify-center">
                    <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
                        <span className="text-sm font-bold text-white">M</span>
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
                        onClick={() => signOut({ callbackUrl: adminPath("/login") })}
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
            <main className="flex-1 ml-[72px]">
                <div className="p-8">{children}</div>
            </main>
        </div>
    );
}
