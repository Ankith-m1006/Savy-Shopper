import { useState, useEffect } from "react";
// import Footer from "../components/Footer"; // Importing the Footer component

import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Product } from "../lib/types";
import { categories, products, getFeaturedProducts } from "../lib/data";
import ProductGrid from "../components/ProductGrid";
import { Button } from "../components/ui/button";
import { Separator } from "../components/ui/separator";

interface IndexProps {
  onAddToCart: (product: Product) => void;
}

const Index = ({ onAddToCart }: IndexProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const featuredProducts = getFeaturedProducts();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  const categoryImages = {
    electronics: "https://media.istockphoto.com/id/492991622/photo/home-appliances-in-the-shopping-cart-e-commerce-or-online-shopp.jpg?s=2048x2048&w=is&k=20&c=rdDqoqYWBy7UXNOhYvT4ULayQ44Z4X0CW1C83z9Zhso=",
    clothing: "https://plus.unsplash.com/premium_photo-1664202526475-8f43ee70166d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDF8fENsb3RoaW5nfGVufDB8fDB8fHww",
    "home-kitchen": "https://images.unsplash.com/photo-1556911220-bff31c812dba?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    books: "https://images.unsplash.com/photo-1608099269227-82de5da1e4a8?q=80&w=1970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  };

  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="space-y-16 animate-fade-in">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/90 to-primary">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600269452121-4f2416e55c28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-20"></div>
        <div className="container relative z-10 mx-auto px-4 py-16 md:py-24 lg:py-32 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
              Discover Curated Products for Your Lifestyle
            </h1>
            <p className="mt-6 text-lg leading-8 text-white/90">
              Shop our intelligent recommendations tailored just for you. Quality products, seamless experience.
            </p>
            <div className="mt-10 flex items-center justify-center gap-4">
              <Button size="lg" className="rounded-full bg-white text-primary hover:bg-white/90">
                Shop Now
              </Button>
              <Button variant="outline" size="lg" className="rounded-full text-white border-white hover:bg-white/10">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section>
        <h2 className="text-2xl font-semibold tracking-tight">Shop by Category</h2>
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.slug}`}
              className="group relative overflow-hidden rounded-lg border hover-scale"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
              <img
                src={categoryImages[category.slug]} // Use the mapped image URL
                alt={category.name}
                className="h-60 w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-end p-6 z-20">
                <h3 className="text-xl font-medium text-white">{category.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section>
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold tracking-tight">Featured Products</h2>
          <Link to="/category/all" className="flex items-center text-sm font-medium text-primary product-link">
            View all products
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        <div className="mt-6">
          <ProductGrid products={featuredProducts} onAddToCart={onAddToCart} featuredLayout />
        </div>
      </section>

      {/* New Arrivals */}
      <section>
        <h2 className="text-2xl font-semibold tracking-tight">New Arrivals</h2>
        <div className="mt-6">
          <ProductGrid
            products={products.slice(0, 4)}
            onAddToCart={onAddToCart}
          />
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-muted rounded-2xl">
        <div className="py-16 px-6 text-center">
          <h2 className="text-2xl font-semibold">Stay Updated</h2>
          <p className="mt-2 text-muted-foreground">
            Subscribe to our newsletter for the latest products and exclusive offers.
          </p>
          <div className="mt-6 flex max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 rounded-l-md border border-input bg-background px-4 py-2"
            />
            <Button className="rounded-l-none">Subscribe</Button>
          </div>
        </div>
      </section>

      {/* <Footer /> Adding the Footer component */}
    </div>
  );
};

export default Index;
