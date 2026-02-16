import Link from "next/link";

export function Navbar() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-6 md:px-12 backdrop-blur-sm">
            <Link href="/" className="text-xl font-bold text-white font-heading tracking-tight">
                Meet Shah
            </Link>
            <div className="flex gap-8">
                <Link href="/work" className="text-sm font-medium text-neutral-400 transition-colors hover:text-white">
                    Work
                </Link>
                <Link href="/about" className="text-sm font-medium text-neutral-400 transition-colors hover:text-white">
                    About
                </Link>
                <Link href="mailto:hello@meetshah.design" className="text-sm font-medium text-neutral-400 transition-colors hover:text-white">
                    Contact
                </Link>
            </div>
        </nav>
    );
}
