
import { Product } from "@/lib/api";

type ProductDetailsProps = {
  product: Product;
};

const formatNumber = (value: number) =>
  new Intl.NumberFormat("bn-BD", {
    maximumFractionDigits: 2,
  }).format(value);

const ProductDetails = ({ product }: ProductDetailsProps) => {
  const markets = product.markets || [];

  const minPrice = markets.length
    ? Math.min(...markets.map((market) => market.min))
    : 0;

  const maxPrice = markets.length
    ? Math.max(...markets.map((market) => market.max))
    : 0;

  const averagePrice = markets.length
    ? markets.reduce(
        (total, market) => total + (market.min + market.max) / 2,
        0
      ) / markets.length
    : 0;

  return (
    <div className="space-y-4">

      <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f0f5f1] text-3xl">
            {product.image}
          </div>

          <div>
            <h1 className="text-xl font-bold text-gray-800">
              {product.nameBn}
            </h1>

            <p className="text-sm text-gray-500">
              প্রতি {product.unit} · {product.categoryNameBn}
            </p>

            <p className="text-xs text-gray-500">
              আজকের বাজারদর এবং দামের পরিবর্তন · {product.categoryNameBn}
            </p>
          </div>
        </div>

        <div className="rounded-xl bg-[#f0f5f1] px-4 py-3 text-center">
          <p className="text-xs text-gray-500">আজকের বাজারদর</p>
          <p className="text-2xl font-bold text-gray-800">
            {formatNumber(product.today)}
          </p>
          <p className="text-xs text-gray-500">
            টাকা / {product.unit}
          </p>
          <p className={`text-xs font-semibold ${
            product.change.dir === "up"
              ? "text-red-500"
              : product.change.dir === "down"
                ? "text-green-600"
                : "text-gray-500"
          }`}>
            {product.change.dir === "up" ? "▲" : product.change.dir === "down" ? "▼" : "—"}
            {" "}{formatNumber(product.change.pct)}%
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-4">
        <h2 className="mb-3 font-bold text-gray-800">
          দামের সারসংক্ষেপ
        </h2>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-gray-200 bg-[#f8fbf9] p-3">
            <p className="text-xs text-gray-500">সর্বনিম্ন দাম</p>
            <p className="mt-1 font-bold text-green-600">
              {formatNumber(minPrice)} টাকা
            </p>
            <p className="text-xs text-gray-500">বাজারের সর্বনিম্ন দাম</p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-[#f8fbf9] p-3">
            <p className="text-xs text-gray-500">সর্বোচ্চ দাম</p>
            <p className="mt-1 font-bold text-red-500">
              {formatNumber(maxPrice)} টাকা
            </p>
            <p className="text-xs text-gray-500">বাজারের সর্বোচ্চ দাম</p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-[#f8fbf9] p-3">
            <p className="text-xs text-gray-500">গড় দাম</p>
            <p className="mt-1 font-bold text-gray-800">
              {formatNumber(averagePrice)} টাকা
            </p>
            <p className="text-xs text-gray-500">বাজারের গড় দাম</p>
          </div>
        </div>

        <h2 className="mb-3 mt-5 font-bold text-gray-800">
          বাজারভিত্তিক আজকের দাম
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-[#f8fbf9] text-gray-600">
                <th className="p-3 text-left">বাজার</th>
                <th className="p-3 text-left">বিভাগ</th>
                <th className="p-3 text-right">সর্বনিম্ন</th>
                <th className="p-3 text-right">সর্বোচ্চ</th>
                <th className="p-3 text-right">গড়</th>
              </tr>
            </thead>

            <tbody>
              {markets.map((market, index) => (
                <tr
                  key={`${market.market}-${index}`}
                  className="border-b border-gray-200 even:bg-[#f8fbf9]"
                >
                  <td className="p-3">{market.market}</td>
                  <td className="p-3">{market.division}</td>
                  <td className="p-3 text-right">
                    {formatNumber(market.min)} টাকা
                  </td>
                  <td className="p-3 text-right">
                    {formatNumber(market.max)} টাকা
                  </td>
                  <td className="p-3 text-right font-semibold">
                    {formatNumber((market.min + market.max) / 2)} টাকা
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default ProductDetails;
