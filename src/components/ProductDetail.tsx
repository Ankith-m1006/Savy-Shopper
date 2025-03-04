
import { useState } from "react";
import { Star, ShoppingCart, Heart, Share2, Check, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Product } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ProductGrid from "./ProductGrid";
import { getRelatedProducts } from "@/lib/data";

interface ProductDetailProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number) => void;
}

const ProductDetail = ({ product, onAddToCart }: ProductDetailProps) => {
  const [quantity, setQuantity] = useState(1);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const navigate = useNavigate();
  const hasDiscount = product.discountedPrice && product.discountedPrice < product.price;
  const relatedProducts = getRelatedProducts(product.id);

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    setIsAddedToCart(true);
    
    setTimeout(() => {
      setIsAddedToCart(false);
    }, 2000);
  };

  return (
    <div className="animate-fade-in">
      <Button 
        variant="ghost" 
        className="mb-6 flex items-center text-muted-foreground hover:text-primary"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Product Image */}
        <div className="overflow-hidden rounded-lg border border-border bg-white">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover object-center transition-all duration-300"
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <div>
            <h1 className="text-2xl font-semibold md:text-3xl">{product.name}</h1>
            
            <div className="mt-4 flex items-center space-x-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating)
                        ? "fill-yellow-500 text-yellow-500"
                        : "text-muted"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.rating.toFixed(1)} ({product.reviewCount} reviews)
              </span>
            </div>

            <div className="mt-6">
              {hasDiscount ? (
                <div className="flex items-baseline space-x-3">
                  <span className="text-3xl font-semibold text-primary">
                    ${product.discountedPrice?.toFixed(2)}
                  </span>
                  <span className="text-xl text-muted-foreground line-through">
                    ${product.price.toFixed(2)}
                  </span>
                  <Badge variant="destructive">
                    {Math.round(((product.price - (product.discountedPrice || 0)) / product.price) * 100)}% OFF
                  </Badge>
                </div>
              ) : (
                <span className="text-3xl font-semibold text-primary">
                  ${product.price.toFixed(2)}
                </span>
              )}
            </div>

            <Separator className="my-6" />

            <p className="text-muted-foreground">{product.description}</p>

            <div className="mt-6 flex items-center space-x-2">
              <Badge variant={product.inStock ? "secondary" : "outline"} className="px-3 py-1">
                {product.inStock ? "In Stock" : "Out of Stock"}
              </Badge>
              <div className="flex items-center space-x-1">
                {product.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="capitalize">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col space-y-4">
            <div className="flex items-center">
              <Button
                variant="outline"
                size="icon"
                disabled={quantity <= 1}
                onClick={() => handleQuantityChange(quantity - 1)}
              >
                -
              </Button>
              <span className="w-16 text-center">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleQuantityChange(quantity + 1)}
              >
                +
              </Button>
            </div>

            <div className="flex space-x-3">
              <Button
                size="lg"
                className="flex-1"
                disabled={!product.inStock || isAddedToCart}
                onClick={handleAddToCart}
              >
                {isAddedToCart ? (
                  <>
                    <Check className="mr-2 h-5 w-5" /> Added to Cart
                  </>
                ) : (
                  <>
                    <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
                  </>
                )}
              </Button>
              <Button size="lg" variant="outline">
                <Heart className="h-5 w-5" />
                <span className="sr-only">Add to wishlist</span>
              </Button>
              <Button size="lg" variant="outline">
                <Share2 className="h-5 w-5" />
                <span className="sr-only">Share</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <Tabs defaultValue="description">
          <TabsList className="mb-6 w-full justify-start">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="animate-fade-in">
            <div className="prose prose-sm max-w-none text-muted-foreground">
              <p>{product.description}</p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in
                tortor at nisi interdum consequat. Integer tincidunt nisi sit amet
                justo malesuada, vel tempor magna suscipit. Vivamus ac libero auctor,
                hendrerit nunc in, ultrices nisi.
              </p>
              <ul>
                <li>Premium materials</li>
                <li>Designed for everyday use</li>
                <li>Perfect for gifting</li>
                <li>1-year warranty</li>
              </ul>
            </div>
          </TabsContent>
          <TabsContent value="reviews" className="animate-fade-in">
            <div className="text-muted-foreground">
              <p>Customer reviews will be displayed here.</p>
            </div>
          </TabsContent>
          <TabsContent value="shipping" className="animate-fade-in">
            <div className="text-muted-foreground">
              <p>
                We offer free standard shipping on all orders over $50. Orders are
                typically processed within 1-2 business days. Delivery times vary
                depending on your location, but usually take 3-5 business days.
              </p>
              <p className="mt-4">
                If you're not completely satisfied with your purchase, you can return
                it within 30 days for a full refund or exchange. Please note that
                items must be unused and in their original packaging.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="mb-6 text-2xl font-medium">You May Also Like</h2>
          <ProductGrid 
            products={relatedProducts} 
            onAddToCart={(product) => onAddToCart(product, 1)} 
          />
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
