
"use client";

import Image from "next/image";
import Link from "next/link";
import NavLinks from "./NavLinks";
import { useSession, signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useState } from "react";

const HeaderClient = () => {
    const { data, isPending } = useSession();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    const date = new Intl.DateTimeFormat("bn-BD", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    }).format(new Date());

    const handleSignOut = async () => {
        const { error } = await signOut();

        if (error) {
            toast.error(error.message || "Sign out করা যায়নি!");
            return;
        }

        setIsOpen(false);
        toast.success("সফলভাবে Sign out হয়েছে!");
        router.push("/");
        router.refresh();
    };

    const isLoggedIn = !isPending && !!data?.user?.id;

    return (
        <header className="w-full bg-[#F8FAF9] border border-gray-200">
            <div className="max-w-5xl mx-auto px-4 py-2 flex items-center justify-between">

                <div className="flex items-center gap-2">
                    <div className="w-7 h-7 bg-green-700 rounded-lg flex items-center justify-center">
                        <Image
                            src="/Images/logo-icon.png"
                            alt="Logo"
                            width={19}
                            height={19}
                            className="object-contain"
                        />
                    </div>

                    <div>
                        <h2 className="text-sm font-bold text-gray-900">
                            বাজার দর
                        </h2>

                        <p
                            className="text-[9px] text-gray-600"
                            suppressHydrationWarning
                        >
                            {date}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2">

                    {isPending ? (
                        <span className="text-xs text-gray-500">
                            Loading...
                        </span>
                    ) : isLoggedIn ? (

                        <div className="relative">

                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-gray-100 transition"
                            >

                                {data.user.image ? (
                                    <Image
                                        src={data.user.image}
                                        alt="Profile"
                                        width={38}
                                        height={38}
                                        className="rounded-full object-cover"
                                    />
                                ) : (
                                    <div className="w-[38px] h-[38px] rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold">
                                        {data.user.name?.charAt(0).toUpperCase()}
                                    </div>
                                )}

                                <span className="text-sm font-semibold text-gray-800">
                                    {data.user.name}
                                </span>

                                <span className="text-gray-500 text-xs">
                                    {isOpen ? "▲" : "▼"}
                                </span>

                            </button>

                            {isOpen && (
                                <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden">

                                    <Link
                                        href="/profile"
                                        onClick={() => setIsOpen(false)}
                                        className="flex items-center gap-2 px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition"
                                    >
                                        <span></span>
                                        প্রোফাইল
                                    </Link>

                                    <div className="border-t border-gray-200"></div>

                                    <button
                                        onClick={handleSignOut}
                                        className="w-full flex items-center gap-2 text-left px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 transition"
                                    >
                                        <span>↪</span>
                                        সাইন আউট
                                    </button>

                                </div>
                            )}

                        </div>

                    ) : (

                        <>
                            <Link
                                href="/sign-in"
                                className="px-3 py-2 rounded-md text-xs font-bold text-gray-800 hover:text-green-700 transition"
                            >
                                সাইন ইন
                            </Link>

                            <Link
                                href="/sign-up"
                                className="px-3 py-2 rounded-md text-xs font-bold bg-green-700 text-white shadow-md hover:bg-green-800 transition"
                            >
                                সাইন আপ
                            </Link>
                        </>

                    )}

                </div>
            </div>

            <div className="border-t border-gray-200">
                <div className="max-w-5xl mx-auto px-4">
                    <NavLinks />
                </div>
            </div>
        </header>
    );
};

export default HeaderClient;


