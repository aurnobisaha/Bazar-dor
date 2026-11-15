
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Product = {
    id: number;
    slug: string;
    nameBn: string;
    category: string;
    categoryNameBn: string;
    categoryIcon: string;
    unit: string;
    image: string;
    today: number;
    yesterday: number;
    lastWeek: number;
    lastMonth: number;
    change: {
        dir: "up" | "down" | "flat";
        pct: number;
    };
};

const ProductSections = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/products`
                );

                if (!res.ok) {
                    throw new Error("পণ্য লোড করা যায়নি!");
                }

                const data = await res.json();

                if (!Array.isArray(data)) {
                    throw new Error("API data সঠিক নয়!");
                }

                setProducts(data);
            } catch (error) {
                console.error(error);
                setError("পণ্য লোড করতে সমস্যা হয়েছে!");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // দাম বেড়েছে এমন Top 6 Product
    const risers = [...products]
        .filter((product) => product.change.dir === "up")
        .sort((a, b) => b.change.pct - a.change.pct)
        .slice(0, 6);

    // দাম কমেছে এমন Top 6 Product
    const fallers = [...products]
        .filter((product) => product.change.dir === "down")
        .sort((a, b) => b.change.pct - a.change.pct)
        .slice(0, 6);

    const formatPrice = (price: number) => {
        return price.toLocaleString("bn-BD");
    };

    const getUnit = (unit: string) => {
        const units: Record<string, string> = {
            kg: "কেজি",
            liter: "লিটার",
            piece: "টি",
            dozen: "ডজন",
            gram: "গ্রাম",
        };

        return units[unit] || unit;
    };

    const ProductCard = ({ product }: { product: Product }) => {
        return (
            <Link
                href={`/product/${product.slug}`}
                className="block bg-white border border-gray-200 rounded-xl p-4 hover:shadow-lg hover:border-green-500 transition duration-300"
            >
                <div className="flex items-center justify-between">
                    <span className="text-3xl">
                        {product.image}
                    </span>

                    <span
                        className={`text-xs font-bold px-2 py-1 rounded-full ${
                            product.change.dir === "up"
                                ? "bg-green-100 text-green-700"
                                : product.change.dir === "down"
                                ? "bg-red-100 text-red-600"
                                : "bg-gray-100 text-gray-600"
                        }`}
                    >
                        {product.change.dir === "up"
                            ? "▲"
                            : product.change.dir === "down"
                            ? "▼"
                            : "●"}{" "}
                        {formatPrice(product.change.pct)}%
                    </span>
                </div>

                <h3 className="font-bold text-gray-900 mt-4">
                    {product.nameBn}
                </h3>

                <p className="text-xs text-gray-500 mt-1">
                    {product.categoryNameBn} • প্রতি {getUnit(product.unit)}
                </p>

                <div className="mt-4">
                    <p className="text-xs text-gray-500">
                        বর্তমান দাম
                    </p>

                    <p className="text-xl font-bold text-green-700">
                        ৳{formatPrice(product.today)}
                    </p>
                </div>
            </Link>
        );
    };

    if (loading) {
        return (
            <div className="max-w-5xl mx-auto px-4 py-10 text-center">
                <p className="text-gray-500">পণ্য লোড হচ্ছে...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-5xl mx-auto px-4 py-10 text-center">
                <p className="text-red-600">{error}</p>
            </div>
        );
    }

    return (
        <section className="max-w-5xl mx-auto px-4 py-10 space-y-12">

            {/* Section A: Price Increased */}
            <div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                    আজ দাম বেড়েছে <span className="text-green-600">▲</span>
                </h2>

                <p className="text-sm text-gray-500 mt-1 mb-5">
                    যেসব পণ্যের দাম আজ বেড়েছে
                </p>

                {risers.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {risers.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                            />
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">দাম বাড়েনি এমন কোনো পণ্য নেই।</p>
                )}
            </div>

            {/* Section B: Price Decreased */}
            <div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                    আজ দাম কমেছে <span className="text-red-600">▼</span>
                </h2>

                <p className="text-sm text-gray-500 mt-1 mb-5">
                    যেসব পণ্যের দাম আজ কমেছে
                </p>

                {fallers.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {fallers.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                            />
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">দাম কমেছে এমন কোনো পণ্য নেই।</p>
                )}
            </div>

            {/* Section C: All Products */}
            <div id="সব-পণ্য">
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                    সব পণ্য
                </h2>

                <p className="text-sm text-gray-500 mt-1 mb-5">
                    প্রয়োজনীয় সব পণ্যের আজকের বাজারদর এক জায়গায়
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {products.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                        />
                    ))}
                </div>
            </div>

        </section>
    );
};

export default ProductSections;

