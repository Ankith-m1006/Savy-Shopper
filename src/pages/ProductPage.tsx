
import { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { Product } from "@/lib/types";
import { getProductById } from "@/lib/data";
import ProductDetail from "@/components/ProductDetail";

interface ProductPageProps {
  onAddToCart: (product: Product, quantity: number) => void;
}

const ProductPage = ({ onAddToCart }: ProductPageProps) => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call with a small delay
    const timer = setTimeout(() => {
      if (id) {
        const foundProduct = getProductById(id);
        setProduct(foundProduct || null);
      }
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-pulse">Loading product...</div>
      </div>
    );
  }

  if (!product) {
    return <Navigate to="/not-found" />;
  }

  return (
    <div className="container mx-auto px-4 py-8 md:px-6">
      <ProductDetail product={product} onAddToCart={onAddToCart} />
    </div>
  );
};

export default ProductPage;
