
import { getProductsByCategory } from "@/lib/api";
import CategoryProducts from "@/components/CategoryProducts";

export const instant = false;

type CategoryPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const CategoryPage = async ({ params }: CategoryPageProps) => {
  const { slug } = await params;
  const products = await getProductsByCategory(slug);

  const categoryName = products[0]?.categoryNameBn || "পণ্য";
  const categoryIcon = products[0]?.categoryIcon || "🛒";

  return (
    <main className="min-h-[calc(100vh-180px)] bg-[#f0f5f1] px-4 py-8">
      <div className="mx-auto max-w-6xl">

        <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white/80 px-4 py-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-3xl">
            {categoryIcon}
          </div>

          <div>
            <h1 className="text-xl font-bold text-gray-800">
              {categoryName}
            </h1>

            <p className="text-sm text-gray-500">
              আজকের বাজারদর এবং দামের পরিবর্তন
            </p>
          </div>
        </div>

        <CategoryProducts products={products} />

      </div>
    </main>
  );
};

export default CategoryPage;

