import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

const isProduction = process.env.NODE_ENV === "production";
// Only use the root domain cookie in production when on the actual live domain
const cookieDomain = isProduction ? ".meetshah.co" : undefined;

export const { handlers, signIn, signOut, auth } = NextAuth({
    trustHost: true,
    providers: [
        Credentials({
            name: "Admin Login",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const email = credentials?.email as string;
                const password = credentials?.password as string;

                if (
                    email === process.env.CMS_ADMIN_EMAIL &&
                    password === process.env.CMS_ADMIN_PASSWORD
                ) {
                    return {
                        id: "1",
                        name: "Meet Shah",
                        email: email,
                    };
                }

                // Guest Login (admin/admin)
                if (email === "admin" && password === "admin") {
                    return {
                        id: "guest",
                        name: "Guest User",
                        email: "guest@meetshah.co",
                    };
                }

                return null;
            },
        }),
    ],
    pages: {
        signIn: "/admin/login",
    },
    session: {
        strategy: "jwt",
    },
    cookies: isProduction ? {
        sessionToken: {
            name: `__Secure-meet-auth-session`,
            options: {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                // Only set domain if on the main production domain to avoid issues in Vercel previews
                domain: cookieDomain,
                secure: true,
            },
        },
        callbackUrl: {
            name: `__Secure-meet-auth-callback`,
            options: {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                domain: cookieDomain,
                secure: true,
            },
        },
        csrfToken: {
            name: `__Host-meet-auth-csrf`,
            options: {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                secure: true,
            },
        },
    } : undefined,
});
