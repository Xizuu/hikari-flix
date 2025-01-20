import {MobileNav} from "@/components/mobile-nav";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
    return (
        <header className="bg-white dark:bg-gray-800 shadow sticky top-0 z-10">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                {/* Logo Section */}
                <div className="flex items-center space-x-3">
                    <Link href="/" className="flex items-center space-x-2">
                        <Image
                            src="/logo.png"
                            alt="HikariFlix"
                            width="100"
                            height="100"
                            className="object-contain"
                        />
                    </Link>
                </div>
                <MobileNav />

                {/* Navigation Links */}
                <nav className="hidden md:flex space-x-6">
                    <Link
                        href="/"
                        className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                    >
                        Home
                    </Link>
                    <Link
                        href="/#genres"
                        className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                    >
                        Genres
                    </Link>
                    <Link
                        href="/latest"
                        className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                    >
                        Latest
                    </Link>
                    <Link
                        href="/profile"
                        className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                    >
                        Profile
                    </Link>
                </nav>
            </div>
        </header>

    )
}