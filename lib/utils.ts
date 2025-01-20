import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function encodeWatchId(url: string) {
    const slug = url.replace(/ /g, "-");
    return btoa(slug)
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}

export function decodeWatchId(encoded: string) {
    const base64 = encoded
        .replace(/-/g, '+')
        .replace(/_/g, '/');

    return atob(base64);
}
