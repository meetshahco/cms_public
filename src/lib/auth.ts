import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
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
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            // After the proxy rewrites, the internal pathname is always /admin/*
            const isOnAdmin = nextUrl.pathname.startsWith("/admin");
            const isOnLogin = nextUrl.pathname === "/admin/login";

            if (isOnAdmin && !isOnLogin && !isLoggedIn) {
                return false; // Redirect to signIn page (/admin/login)
            }
            if (isOnLogin && isLoggedIn) {
                return Response.redirect(new URL("/admin", nextUrl));
            }
            return true;
        },
    },
});
