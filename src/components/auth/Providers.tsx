"use client";

import { SessionProvider } from "next-auth/react";
import { GuestSessionManager } from "./GuestSessionManager";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <GuestSessionManager />
            {children}
        </SessionProvider>
    );
}
