"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

interface Category {
    id: string;
    slug: string;
    nameBn: string;
    icon: string;
}

const NavLinks = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [active, setActive] = useState("");

    useEffect(() => {
        const getCategories = async () => {
            const res = await fetch("/categories.json");
            const data = await res.json();
            setCategories(data);
        };

        getCategories();
    }, []);

    return (
        <nav className="flex items-center justify-center gap-6 py-3">
            {categories.map((category) => (
                <Link
                    key={category.id}
                    href={`/category/${category.slug}`}
                    onClick={() => setActive(category.slug)}
                    className={`flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-medium transition ${
                        active === category.slug
                            ? "bg-green-700 text-white"
                            : "text-gray-700 hover:bg-green-100 hover:text-green-700"
                    }`}
                >
                    <span>{category.icon}</span>
                    <span>{category.nameBn}</span>
                </Link>
            ))}
        </nav>
    );
};

export default NavLinks;
