"use client";

import { useSession, signOut } from "next-auth/react";
import { useEffect, useRef } from "react";

export function GuestSessionManager() {
    const { data: session } = useSession();
    const isProcessing = useRef(false);

    useEffect(() => {
        if (isProcessing.current) return;

        // Only enforce strict session wiping for the Guest user
        if (session?.user?.email === "guest@meetshah.co") {
            // sessionStorage is wiped entirely when the browser tab is closed.
            // This allows us to circumvent NextAuth's persistent cookies exclusively for demo guests.
            const isSessionActive = sessionStorage.getItem("guest_session_active");

            if (!isSessionActive) {
                // This is a brand new tab or a newly re-opened browser. Force a logout.
                isProcessing.current = true;
                signOut({ redirect: true, callbackUrl: "/" });
            } else {
                // If they are just navigating between pages in the same tab, ensure the flag persists
                sessionStorage.setItem("guest_session_active", "true");
            }
        }
    }, [session]);

    return null;
}
