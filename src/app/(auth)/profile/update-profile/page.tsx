

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession, updateUser } from "@/lib/auth-client";
import toast from "react-hot-toast";

const UpdateProfilePage = () => {
    const { data, isPending } = useSession();
    const router = useRouter();

    const [name, setName] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!name.trim()) {
            toast.error("আপনার নাম লিখুন!");
            return;
        }

        setIsLoading(true);

        try {
            const { error } = await updateUser({
                name: name.trim(),
            });

            if (error) {
                toast.error(error.message || "প্রোফাইল আপডেট করা যায়নি!");
                return;
            }

            toast.success("প্রোফাইল সফলভাবে আপডেট হয়েছে!");

            router.push("/profile");
            router.refresh();

        } catch {
            toast.error("কিছু একটা সমস্যা হয়েছে!");
        } finally {
            setIsLoading(false);
        }
    };

    if (isPending) {
        return <div className="p-10 text-center">Loading...</div>;
    }

    if (!data?.user) {
        return <div className="p-10 text-center">অনুগ্রহ করে Login করুন!</div>;
    }

    return (
        <div className="min-h-screen bg-[#F0F5F0] py-10 px-4">

            <div className="max-w-2xl mx-auto">

                <h1 className="text-xl font-bold text-gray-900">
                    প্রোফাইল আপডেট
                </h1>

                <p className="text-xs text-gray-500 mt-1">
                    আপনার প্রোফাইলের তথ্য পরিবর্তন করুন।
                </p>

                <div className="mt-5 bg-white border border-gray-200 rounded-xl p-5">

                    <h2 className="text-sm font-bold text-gray-800">
                        তথ্য পরিবর্তন
                    </h2>

                    <form onSubmit={handleUpdate} className="mt-5">

                        <label
                            htmlFor="name"
                            className="block text-xs font-medium text-gray-700 mb-2"
                        >
                            নাম
                        </label>

                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder={data.user.name}
                            className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm text-gray-800 outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
                        />

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full mt-4 py-2.5 bg-green-700 text-white text-xs font-bold rounded-md hover:bg-green-800 transition disabled:opacity-60"
                        >
                            {isLoading ? "আপডেট হচ্ছে..." : "আপডেট"}
                        </button>

                        <button
                            type="button"
                            onClick={() => router.push("/profile")}
                            className="w-full mt-2 py-2.5 border border-gray-300 text-gray-700 text-xs font-bold rounded-md hover:bg-gray-50 transition"
                        >
                            ফিরে যান
                        </button>

                    </form>

                </div>

            </div>

        </div>
    );
};

export default UpdateProfilePage;
