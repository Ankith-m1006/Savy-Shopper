
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, ShoppingCart, Menu, X, User } from "lucide-react";
import { categories } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar } from "@/components/ui/avatar";
import Auth from "@/components/Auth";
import UserProfile from "@/components/UserProfile";

interface NavbarProps {
  cartItemsCount: number;
  onCartToggle: () => void;
}

const Navbar = ({ cartItemsCount, onCartToggle }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const handleAuthClick = () => {
    setIsAuthOpen(true);
  };

  const handleProfileClick = () => {
    setIsProfileOpen(true);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-md shadow-sm py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="text-xl font-semibold tracking-tight transition-colors hover:text-primary/80"
          >
            Savvy Shopper
          </Link>

          {!isMobile && (
            <nav className="mx-6 hidden lg:flex items-center space-x-6 text-sm">
              <Link
                to="/"
                className={`product-link transition-colors ${
                  location.pathname === "/" ? "text-primary" : "text-muted-foreground"
                }`}
              >
                Home
              </Link>
              {categories.map((category) => (
                <Link
                  key={category.id}
                  to={`/category/${category.slug}`}
                  className={`product-link transition-colors ${
                    location.pathname === `/category/${category.slug}`
                      ? "text-primary"
                      : "text-muted-foreground"
                  }`}
                >
                  {category.name}
                </Link>
              ))}
            </nav>
          )}

          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={onCartToggle}
            >
              <ShoppingCart className="h-5 w-5" />
              {cartItemsCount > 0 && (
                <Badge
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                  variant="destructive"
                >
                  {cartItemsCount}
                </Badge>
              )}
              <span className="sr-only">Cart</span>
            </Button>

            {isAuthenticated ? (
              <Button
                variant="ghost"
                size="icon"
                onClick={handleProfileClick}
                className="relative"
              >
                <Avatar className="h-8 w-8">
                  <img 
                    src={user?.avatarUrl} 
                    alt={user?.firstName} 
                    className="h-full w-full object-cover"
                  />
                </Avatar>
              </Button>
            ) : (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={handleAuthClick}
                className="hidden md:flex"
              >
                <User className="h-5 w-5 mr-2" />
                Sign In
              </Button>
            )}

            {isMobile && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
                <span className="sr-only">Menu</span>
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobile && (
        <div
          className={`fixed inset-0 z-40 bg-background/95 backdrop-blur-sm transform transition-transform duration-300 ease-in-out ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="container mx-auto px-4 py-24">
            <nav className="flex flex-col space-y-6 text-lg">
              <Link
                to="/"
                className={`transition-colors ${
                  location.pathname === "/" ? "text-primary font-medium" : "text-muted-foreground"
                }`}
              >
                Home
              </Link>
              {categories.map((category) => (
                <Link
                  key={category.id}
                  to={`/category/${category.slug}`}
                  className={`transition-colors ${
                    location.pathname === `/category/${category.slug}`
                      ? "text-primary font-medium"
                      : "text-muted-foreground"
                  }`}
                >
                  {category.name}
                </Link>
              ))}
              <div className="pt-4">
                <Button className="w-full" variant="outline" size="lg">
                  <Search className="mr-2 h-4 w-4" />
                  Search Products
                </Button>
              </div>
              {!isAuthenticated && (
                <Button 
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsAuthOpen(true);
                  }}
                  className="w-full"
                >
                  <User className="mr-2 h-4 w-4" />
                  Sign In / Create Account
                </Button>
              )}
            </nav>
          </div>
        </div>
      )}

      {/* Auth Modal */}
      <Auth isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
      
      {/* User Profile Modal */}
      <UserProfile isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
    </header>
  );
};

export default Navbar;
