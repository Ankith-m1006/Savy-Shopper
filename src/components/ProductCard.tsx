
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Star, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";
import { Product } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  featured?: boolean;
}

const ProductCard = ({ product, onAddToCart, featured = false }: ProductCardProps) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);
  const hasDiscount = product.discountedPrice && product.discountedPrice < product.price;

  useEffect(() => {
    if (imageRef.current && imageRef.current.complete) {
      setIsImageLoaded(true);
    }
  }, []);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart(product);
  };

  return (
    <Link
      to={`/product/${product.id}`}
      className={cn(
        "group flex flex-col overflow-hidden rounded-lg border border-border bg-white transition-all duration-300 hover:shadow-md hover-scale",
        featured ? "md:col-span-2 lg:col-span-3" : ""
      )}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
        {hasDiscount && (
          <Badge variant="destructive" className="absolute top-3 left-3 z-10">
            Sale
          </Badge>
        )}
        <img
          ref={imageRef}
          src={product.image}
          alt={product.name}
          className={cn(
            "h-full w-full object-cover object-center transition-opacity duration-500",
            !isImageLoaded ? "opacity-0" : "opacity-100"
          )}
          onLoad={() => setIsImageLoaded(true)}
        />
        {!product.inStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <Badge variant="secondary" className="text-md px-3 py-1">
              Out of Stock
            </Badge>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex-1 space-y-2">
          <h3 className="font-medium text-primary line-clamp-1">{product.name}</h3>
          <div className="flex items-center text-sm">
            <div className="flex items-center">
              <Star className="h-4 w-4 fill-current text-yellow-500" />
              <span className="ml-1 mr-2">{product.rating.toFixed(1)}</span>
            </div>
            <span className="text-muted-foreground">({product.reviewCount} reviews)</span>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-baseline">
            {hasDiscount ? (
              <>
                <span className="text-lg font-medium text-primary">
                  ${product.discountedPrice?.toFixed(2)}
                </span>
                <span className="ml-2 text-sm text-muted-foreground line-through">
                  ${product.price.toFixed(2)}
                </span>
              </>
            ) : (
              <span className="text-lg font-medium text-primary">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>
          <Button
            size="sm"
            variant="ghost"
            className="rounded-full p-2"
            onClick={handleAddToCart}
            disabled={!product.inStock}
          >
            <ShoppingCart className="h-4 w-4" />
            <span className="sr-only">Add to cart</span>
          </Button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
