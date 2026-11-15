
"use client";

import Image from "next/image";
import Link from "next/link";
import { useSyncExternalStore } from "react";

const getDate = () => {
    return new Date().toLocaleDateString("bn-BD", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    });
};

const subscribe = () => {
    return () => {};
};

const getServerDate = () => "";

const Banner = () => {
    const date = useSyncExternalStore(
        subscribe,
        getDate,
        getServerDate
    );

    return (
        <section className="bg-[#f0f5f0] py-5 px-4">
            <div className="max-w-4xl mx-auto bg-[#fafcfb] border border-[#e2ebe3] rounded-2xl px-6 py-7 md:px-8 md:py-8 flex flex-col md:flex-row items-center justify-between gap-6">

                <div className="flex-1">
                    <p className="inline-block bg-[#e1f3e7] text-[#26945a] text-xs font-medium px-3 py-1 rounded-full mb-3">
                        {date}
                    </p>

                    <h1 className="text-2xl md:text-3xl font-bold text-[#202b24] mb-3">
                        আজকের বাজারের দাম এক নজরে
                    </h1>

                    <p className="text-sm text-gray-500 leading-relaxed max-w-lg mb-5">
                        চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তৃত, গড়, সর্বনিম্ন-সর্বোচ্চ এবং দামের পরিবর্তন এক জায়গায়।
                    </p>

                    <Link
                        href="#সব-পণ্য"
                        className="inline-block bg-[#078b46] text-white text-sm font-medium px-5 py-2 rounded-lg shadow-md hover:bg-[#06783d] transition"
                    >
                        সব পণ্য দেখুন
                    </Link>
                </div>

                <div className="shrink-0">
                    <Image
                        src="/Images/bazar-hero.png"
                        alt="বাজারের পণ্যের ঝুড়ি"
                        width={200}
                        height={170}
                        priority
                        className="w-40 h-36 md:w-52 md:h-44 object-contain"
                    />
                </div>

            </div>
        </section>
    );
};

export default Banner;







