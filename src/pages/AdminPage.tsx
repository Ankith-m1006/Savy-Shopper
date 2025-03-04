
import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Settings,
  LogOut
} from 'lucide-react';
import { AdminDashboard } from '@/components/admin/AdminDashboard';
import { AdminProducts } from '@/components/admin/AdminProducts';
import { AdminOrders } from '@/components/admin/AdminOrders';
import { AdminUsers } from '@/components/admin/AdminUsers';
import { AdminSettings } from '@/components/admin/AdminSettings';

const AdminPage = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('dashboard');
  
  useEffect(() => {
    // Set active tab based on URL
    const path = location.pathname.split('/').pop() || 'dashboard';
    setActiveTab(path);
  }, [location]);
  
  // Redirect non-admin users
  if (!isAuthenticated || !user?.isAdmin) {
    return (
      <div className="container mx-auto py-12">
        <div className="max-w-md mx-auto bg-card border rounded-lg p-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Admin Access Required</h1>
          <p className="mb-6 text-muted-foreground">
            You need admin privileges to access this area. Please log in with an admin account.
          </p>
          <div className="flex justify-center space-x-4">
            <Button variant="outline" onClick={() => navigate('/')}>
              Back to Home
            </Button>
            {isAuthenticated ? (
              <Button variant="default" onClick={logout}>
                Log Out
              </Button>
            ) : (
              <Button variant="default" onClick={() => navigate('/')}>
                Sign In
              </Button>
            )}
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            Use admin@example.com / adminpass for admin access
          </p>
        </div>
      </div>
    );
  }
  
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
    { id: 'products', label: 'Products', icon: Package, path: '/admin/products' },
    { id: 'orders', label: 'Orders', icon: ShoppingCart, path: '/admin/orders' },
    { id: 'users', label: 'Users', icon: Users, path: '/admin/users' },
    { id: 'settings', label: 'Settings', icon: Settings, path: '/admin/settings' },
  ];
  
  return (
    <div className="container mx-auto py-4">
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-64 shrink-0">
          <div className="p-4 bg-primary text-primary-foreground rounded-lg mb-4">
            <h2 className="font-bold text-xl">Admin Panel</h2>
            <p className="text-sm opacity-80">{user.email}</p>
          </div>
          
          <nav className="space-y-1">
            {navItems.map(item => (
              <Link
                key={item.id}
                to={item.path}
                className={`flex items-center px-4 py-3 rounded-md transition-colors ${
                  activeTab === item.id
                    ? 'bg-secondary text-secondary-foreground font-medium'
                    : 'hover:bg-secondary/50 text-foreground/80'
                }`}
              >
                <item.icon className="h-5 w-5 mr-3" />
                {item.label}
              </Link>
            ))}
            
            <Separator className="my-2" />
            
            <button
              onClick={logout}
              className="w-full flex items-center px-4 py-3 rounded-md hover:bg-secondary/50 text-foreground/80 transition-colors"
            >
              <LogOut className="h-5 w-5 mr-3" />
              Log Out
            </button>
          </nav>
        </aside>
        
        <main className="flex-1 bg-card border rounded-lg p-6">
          <Routes>
            <Route index element={<AdminDashboard />} />
            <Route path="products/*" element={<AdminProducts />} />
            <Route path="orders/*" element={<AdminOrders />} />
            <Route path="users/*" element={<AdminUsers />} />
            <Route path="settings/*" element={<AdminSettings />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default AdminPage;
