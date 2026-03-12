import Link from "next/link"
import { ModeToggle } from "@/components/mode-toggle"

export function Navbar() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 max-w-screen-2xl items-center px-4 md:px-8">
                <div className="mr-4 hidden md:flex">
                    <Link href="/" className="mr-6 flex items-center space-x-2">
                        <span className="hidden font-bold sm:inline-block">DevLog.</span>
                    </Link>
                    <nav className="flex items-center gap-6 text-sm font-medium">
                        <Link
                            href="/blog"
                            className="transition-colors hover:text-foreground/80 text-foreground/60"
                        >
                            Blog
                        </Link>
                        <Link
                            href="/projects"
                            className="transition-colors hover:text-foreground/80 text-foreground/60"
                        >
                            Projects
                        </Link>
                        <Link
                            href="/about"
                            className="transition-colors hover:text-foreground/80 text-foreground/60"
                        >
                            About
                        </Link>
                        <Link
                            href="/admin"
                            className="transition-colors font-bold text-primary hover:text-primary/80"
                        >
                            Admin
                        </Link>
                    </nav>
                </div>
                <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                    <div className="w-full flex-1 md:w-auto md:flex-none">
                        {/* Search Placeholder */}
                    </div>
                    <nav className="flex items-center">
                        <ModeToggle />
                    </nav>
                </div>
            </div>
        </header>
    )
}
