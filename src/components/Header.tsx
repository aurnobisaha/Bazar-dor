
import Image from "next/image";
import Link from "next/link";
import NavLinks from "./NavLinks";
import { connection } from "next/server";
import { useSession } from "@/lib/auth-client";

const Header = async () => {
    await connection();

    const date = new Date().toLocaleDateString("bn-BD", {
       weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    });
    //const {data,isPending}=useSession();
    // const handleSignOut=async()=>{};
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
                        <p className="text-[9px] text-gray-600">
                            {date}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
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

export default Header;






