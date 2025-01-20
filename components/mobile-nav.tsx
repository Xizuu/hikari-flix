'use client'

import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Menu } from 'lucide-react'
import Link from "next/link"
import { useState } from "react"
import Image from "next/image";

export function MobileNav() {
    const [open, setOpen] = useState(false)

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            {/* Burger Button */}
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle menu</span>
                </Button>
            </SheetTrigger>

            {/* Sidebar Content */}
            <SheetContent side="right">
                <SheetHeader>
                    <SheetTitle className="text-left text-2xl font-bold text-blue-600 dark:text-blue-400">
                        <Image
                            src="/apa.png"
                            alt="HikariFlix"
                            width="100"
                            height="100"
                            className="object-contain"
                        />
                    </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col space-y-4 mt-4">
                    <Link
                        href="/"
                        className="text-lg font-medium hover:text-blue-600 dark:hover:text-blue-400"
                        onClick={() => setOpen(false)}
                    >
                        Home
                    </Link>
                    <Link
                        href="/#genres"
                        className="text-lg font-medium hover:text-blue-600 dark:hover:text-blue-400"
                        onClick={() => setOpen(false)}
                    >
                        Genres
                    </Link>
                    <Link
                        href="/latest"
                        className="text-lg font-medium hover:text-blue-600 dark:hover:text-blue-400"
                        onClick={() => setOpen(false)}
                    >
                        Latest
                    </Link>
                    <Link
                        href="/profile"
                        className="text-lg font-medium hover:text-blue-600 dark:hover:text-blue-400"
                        onClick={() => setOpen(false)}
                    >
                        Profile
                    </Link>
                </nav>
            </SheetContent>
        </Sheet>

    )
}