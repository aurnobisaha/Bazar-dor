
import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-[70vh] flex items-center justify-center px-4">
            <div className="text-center max-w-md">
                <h1 className="text-8xl font-bold text-green-600">
                    404
                </h1>

                <h2 className="text-2xl font-bold mt-4">
                    পেজটি খুঁজে পাওয়া যায়নি!
                </h2>

                <p className="text-gray-500 mt-3">
                    দুঃখিত! আপনি যে পেজটি খুঁজছেন সেটি পাওয়া যাচ্ছে না।
                </p>

                <Link
                    href="/"
                    className="btn bg-green-600 hover:bg-green-700 text-white border-none mt-6"
                >
                    হোম পেজে ফিরে যান
                </Link>
            </div>
        </div>
    );
}

