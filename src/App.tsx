import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from '@/components/Navbar';
import Cart from '@/components/Cart';
import { useToast } from '@/hooks/use-toast';
import { CartItem, Product } from '@/lib/types';
import { Toaster } from '@/components/ui/toaster';
import { products } from '@/lib/data';
import IndexPage from '@/pages/Index';
import CategoryPage from '@/pages/CategoryPage';
import ProductPage from '@/pages/ProductPage';
import CheckoutPage from '@/pages/CheckoutPage';
import NotFound from '@/pages/NotFound';
import { AuthProvider } from '@/contexts/AuthContext';
import OrderHistoryPage from '@/pages/OrderHistoryPage';
import AdminPage from '@/pages/AdminPage';
import { useAuth } from '@/contexts/AuthContext';

function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const { toast } = useToast();

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        console.error('Error loading cart from localStorage:', e);
      }
    }
  }, []);

  // Save cart to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product: Product, quantity = 1) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.product.id === product.id);
      
      if (existingItem) {
        return prev.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prev, { product, quantity }];
      }
    });

    toast({
      title: 'Added to cart',
      description: `${product.name} has been added to your cart.`,
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setCartItems(prev => 
      prev.map(item => 
        item.product.id === productId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const removeItem = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
    
    toast({
      title: 'Item removed',
      description: 'The item has been removed from your cart.',
    });
  };

  const clearCart = () => {
    setCartItems([]);
    toast({
      title: 'Cart cleared',
      description: 'All items have been removed from your cart.',
    });
  };

  const toggleCart = () => {
    setCartOpen(!cartOpen);
  };

  const getPurchasableProduct = (productId: string) => {
    return products.find(p => p.id === productId) || null;
  };

  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar 
            cartItemsCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
            onCartToggle={toggleCart}
          />
          
          <main className="flex-1 pt-16">
            <Routes>
              <Route path="/" element={<IndexPage onAddToCart={addToCart} />} />
              <Route 
                path="/category/:slug" 
                element={<CategoryPage onAddToCart={addToCart} />} 
              />
              <Route 
                path="/product/:id" 
                element={
                  <ProductPage 
                    onAddToCart={addToCart}
                  />
                } 
              />
              <Route 
                path="/checkout" 
                element={
                  <CheckoutPage 
                    cartItems={cartItems}
                    onClearCart={clearCart}
                  />
                } 
              />
              <Route path="/orders" element={<OrderHistoryPage />} />
              <Route path="/admin/*" element={<AdminPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          
          <Cart 
            isOpen={cartOpen}
            onClose={() => setCartOpen(false)}
            cartItems={cartItems}
            onUpdateQuantity={updateQuantity}
            onRemoveItem={removeItem}
            onClearCart={clearCart}
          />
          
          <Toaster />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
