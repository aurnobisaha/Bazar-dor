
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductById } from "@/lib/api";
import ProductDetails from "@/components/Products";

export const instant = false;

type ProductPageProps = {
  params: Promise<{
    id: string;
  }>;
};

const ProductPage = async ({ params }: ProductPageProps) => {
  const { id } = await params;

  let product;

  try {
    product = await getProductById(id);
  } catch {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#f0f5f1] px-4 py-6">
      <div className="mx-auto max-w-6xl">

        <div className="mb-5 flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-green-700">
            হোম
          </Link>

          <span>›</span>

          <Link
            href={`/category/${product.category}`}
            className="hover:text-green-700"
          >
            {product.categoryNameBn}
          </Link>

          <span>›</span>

          <span className="font-semibold text-gray-800">
            {product.nameBn}
          </span>
        </div>

        <ProductDetails product={product} />

      </div>
    </main>
  );
};

export default ProductPage;
