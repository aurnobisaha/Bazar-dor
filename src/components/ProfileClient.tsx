
"use client";

import Image from "next/image";
import { signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type ProfileClientProps = {
    user: {
        name: string;
        email: string;
        image?: string | null;
    };
};

const ProfileClient = ({ user }: ProfileClientProps) => {
    const router = useRouter();

    const handleSignOut = async () => {
        const { error } = await signOut();

        if (error) {
            toast.error(error.message || "Sign out করা যায়নি!");
            return;
        }

        toast.success("সফলভাবে Sign out হয়েছে!");
        router.push("/");
        router.refresh();
    };

    return (
        <div className="min-h-screen bg-[#F0F5F0] py-10 px-4">

            <div className="max-w-2xl mx-auto">

                <h1 className="text-xl font-bold text-gray-900">
                    আমার প্রোফাইল
                </h1>

                <p className="text-xs text-gray-500 mt-1">
                    আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
                </p>

                <div className="mt-5 bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-between gap-3">

                    <div className="flex items-center gap-3 min-w-0">

                        {user.image ? (
                            <Image
                                src={user.image}
                                alt="Profile"
                                width={48}
                                height={48}
                                className="rounded-full object-cover"
                            />
                        ) : (
                            <div className="w-12 h-12 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold text-xl">
                                {user.name.charAt(0).toUpperCase()}
                            </div>
                        )}

                        <div className="min-w-0">
                            <h2 className="text-sm font-bold text-gray-800">
                                {user.name}
                            </h2>

                            <p className="text-xs text-gray-500 mt-1 truncate">
                                {user.email}
                            </p>
                        </div>

                    </div>

                    <button
                        onClick={handleSignOut}
                        className="shrink-0 px-3 py-2 border border-red-400 rounded-md text-xs font-semibold text-red-500 hover:bg-red-50 transition"
                    >
                        ↪ সাইন আউট
                    </button>

                </div>

                <div className="mt-5 bg-white border border-gray-200 rounded-xl p-5">

                    <h2 className="text-sm font-bold text-gray-800">
                        তথ্য
                    </h2>

                    <div className="mt-5">

                        <label className="block text-xs font-medium text-gray-700 mb-2">
                            নাম
                        </label>

                        <input
                            type="text"
                            value={user.name}
                            readOnly
                            className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm text-gray-700 bg-gray-50 outline-none"
                        />

                    </div>

                    <button
                        onClick={() => router.push("/profile/update-profile")}
                        className="w-full mt-3 py-2.5 bg-green-700 text-white text-xs font-bold rounded-md hover:bg-green-800 transition"
                    >
                         আপডেট
                    </button>

                </div>

            </div>

        </div>
    );
};

export default ProfileClient;
