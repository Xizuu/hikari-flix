export default function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-8 mt-12">
            <div className="container mx-auto px-4 text-center">
                <p className="text-sm text-gray-400">
                    © {new Date().getFullYear()} HikariFlix. All rights reserved.
                </p>
            </div>
        </footer>
    )
}