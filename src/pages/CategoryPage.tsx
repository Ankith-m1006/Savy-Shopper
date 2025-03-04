
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "@/lib/types";
import { products, categories } from "@/lib/data";
import ProductGrid from "@/components/ProductGrid";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Check, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface CategoryPageProps {
  onAddToCart: (product: Product) => void;
}

const sortOptions = [
  { label: "Newest", value: "newest" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Rating: High to Low", value: "rating" },
];

const CategoryPage = ({ onAddToCart }: CategoryPageProps) => {
  const { slug } = useParams<{ slug: string }>();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedSort, setSelectedSort] = useState("newest");
  const [isLoading, setIsLoading] = useState(true);

  const category = categories.find((c) => c.slug === slug);

  useEffect(() => {
    setIsLoading(true);
    
    // Simulate API call with delay
    const timer = setTimeout(() => {
      let filtered = [...products];
      
      // If not "all" category, filter by category
      if (slug !== "all") {
        const categoryId = categories.find((c) => c.slug === slug)?.id;
        if (categoryId) {
          filtered = filtered.filter((p) => p.category === categoryId);
        }
      }
      
      // Apply sorting
      filtered = sortProducts(filtered, selectedSort);
      
      setFilteredProducts(filtered);
      setIsLoading(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [slug, selectedSort]);

  const sortProducts = (productsToSort: Product[], sortOption: string) => {
    const sorted = [...productsToSort];
    
    switch (sortOption) {
      case "price-asc":
        return sorted.sort((a, b) => (a.discountedPrice || a.price) - (b.discountedPrice || b.price));
      case "price-desc":
        return sorted.sort((a, b) => (b.discountedPrice || b.price) - (a.discountedPrice || a.price));
      case "rating":
        return sorted.sort((a, b) => b.rating - a.rating);
      case "newest":
      default:
        return sorted; // Assuming the original order is by newest
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-pulse">Loading products...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 animate-fade-in md:px-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">
          {slug === "all" ? "All Products" : category?.name || "Products"}
        </h1>
        <p className="mt-2 text-muted-foreground">
          {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""} available
        </p>
      </header>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Filters - for desktop */}
        <div className="hidden w-64 shrink-0 md:block">
          <div className="space-y-6">
            <div>
              <h3 className="mb-3 text-lg font-medium">Categories</h3>
              <div className="space-y-2">
                <Button
                  variant={slug === "all" ? "default" : "ghost"}
                  className="w-full justify-start"
                  size="sm"
                  asChild
                >
                  <a href="/category/all">All Products</a>
                </Button>
                {categories.map((c) => (
                  <Button
                    key={c.id}
                    variant={slug === c.slug ? "default" : "ghost"}
                    className="w-full justify-start"
                    size="sm"
                    asChild
                  >
                    <a href={`/category/${c.slug}`}>{c.name}</a>
                  </Button>
                ))}
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="mb-3 text-lg font-medium">Price Range</h3>
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <div className="rounded-md border border-input overflow-hidden">
                    <input
                      type="text"
                      placeholder="Min"
                      className="h-8 w-full border-0 bg-transparent px-2 focus:outline-none"
                    />
                  </div>
                  <div className="rounded-md border border-input overflow-hidden">
                    <input
                      type="text"
                      placeholder="Max"
                      className="h-8 w-full border-0 bg-transparent px-2 focus:outline-none"
                    />
                  </div>
                </div>
                <Button size="sm" className="w-full">Apply</Button>
              </div>
            </div>
          </div>
        </div>

        {/* Products grid */}
        <div className="flex-1">
          <div className="mb-6 flex items-center justify-between">
            <Button variant="outline" className="md:hidden">
              <ChevronDown className="mr-2 h-4 w-4" />
              Filters
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto">
                  Sort by
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuRadioGroup
                  value={selectedSort}
                  onValueChange={setSelectedSort}
                >
                  {sortOptions.map((option) => (
                    <DropdownMenuRadioItem key={option.value} value={option.value}>
                      {option.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <ProductGrid products={filteredProducts} onAddToCart={onAddToCart} />
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
