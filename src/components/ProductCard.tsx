import { Product } from "@/lib/api";
import Link from "next/link";

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const toBanglaNumber = (value: number) =>
    new Intl.NumberFormat("bn-BD", {
      maximumFractionDigits: 2,
    }).format(value);

  return (
    <Link
      href={`/product/${product.id}`}
      className="block rounded-xl border border-gray-200 bg-white p-3 shadow-sm transition hover:shadow-md"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f0f5f1] text-2xl">
          {product.image}
        </div>

        <div>
          <h2 className="font-semibold text-gray-800">
            {product.nameBn}
          </h2>

          <p className="text-xs text-gray-500">
            প্রতি {product.unit}
          </p>
        </div>
      </div>

      <div className="mt-3">
        <p className="text-xs text-gray-500">
          আজকের দাম
        </p>

        <div className="flex items-center justify-between">
          <p className="text-lg font-bold text-gray-800">
            {toBanglaNumber(product.today)} টাকা
          </p>

          <span
            className={`rounded-full px-2 py-1 text-xs font-semibold ${
              product.change.dir === "up"
                ? "bg-red-50 text-red-500"
                : product.change.dir === "down"
                  ? "bg-green-50 text-green-600"
                  : "bg-gray-100 text-gray-500"
            }`}
          >
            {product.change.dir === "up"
              ? "▲"
              : product.change.dir === "down"
                ? "▼"
                : "—"}{" "}
            {toBanglaNumber(Math.abs(product.change.pct))}%
          </span>
        </div>

        <p className="mt-1 text-xs text-gray-500">
          গতকাল: ৳{toBanglaNumber(product.yesterday)}
        </p>
      </div>
    </Link>
  );
};

export default ProductCard;



