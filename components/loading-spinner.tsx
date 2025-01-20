"use client"
import { Loader2 } from 'lucide-react'

export function LoadingSpinner() {
    return (
        <div className="flex justify-center items-center h-screen">
            <Loader2 className="w-10 h-10 animate-spin text-blue-600 dark:text-blue-400" />
            <p>Tunggu bentar yaa:3</p>
        </div>
    )
}