"use client";

import { useEffect } from "react";
import posthog from "posthog-js";

export function GlobalClickTracker() {
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement | null;
            if (!target) return;

            // Find closest element with a data-track attribute
            const trackedElement = target.closest("[data-track]") as HTMLElement | null;

            if (trackedElement) {
                const eventName = trackedElement.getAttribute("data-track");
                const eventPropsRaw = trackedElement.getAttribute("data-track-props");

                if (eventName) {
                    let props = {};
                    if (eventPropsRaw) {
                        try {
                            props = JSON.parse(eventPropsRaw);
                        } catch (err) {
                            console.error("Failed to parse tracking props:", err);
                        }
                    }
                    posthog.capture(eventName, props);
                }
            }
        };

        // Attach to the document so it catches all bubble-up clicks instantly
        document.addEventListener("click", handleClick);

        return () => {
            document.removeEventListener("click", handleClick);
        };
    }, []);

    return null; // Headless utility component
}
