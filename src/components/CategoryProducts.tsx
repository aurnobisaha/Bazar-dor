
"use client";

import { useState } from "react";
import { Product } from "@/lib/api";
import ProductCard from "@/components/ProductCard";

type CategoryProductsProps = {
  products: Product[];
};

const CategoryProducts = ({ products }: CategoryProductsProps) => {
  const [sortBy, setSortBy] = useState("default");

  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === "low") {
      return a.today - b.today;
    }

    if (sortBy === "high") {
      return b.today - a.today;
    }

    if (sortBy === "change") {
      return Math.abs(b.change.pct) - Math.abs(a.change.pct);
    }

    return 0;
  });

  return (
    <div className="mt-3">

      <div className="flex items-center justify-end rounded-xl border border-gray-200 bg-white/80 px-4 py-3">
        <div className="flex items-center gap-2 text-sm">
          <label htmlFor="sort" className="text-gray-500">
            সাজান
          </label>

          <select
            id="sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-green-600"
          >
            <option value="default">সাধারণ</option>
            <option value="low">দাম: কম থেকে বেশি</option>
            <option value="high">দাম: বেশি থেকে কম</option>
            <option value="change">দামের পরিবর্তন</option>
          </select>
        </div>
      </div>

      <p className="my-3 text-sm text-gray-500">
        মোট {products.length} টি পণ্য দেখানো হচ্ছে
      </p>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

    </div>
  );
};

export default CategoryProducts;
