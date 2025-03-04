import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthState } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: RegisterData) => Promise<boolean>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => Promise<boolean>;
}

interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

// Mock user data for demo purposes
const MOCK_USER: User = {
  id: "user-1",
  email: "user@example.com",
  firstName: "John",
  lastName: "Doe",
  avatarUrl: "https://api.dicebear.com/6.x/avataaars/svg?seed=John",
  phoneNumber: "555-123-4567",
  createdAt: new Date(),
  address: {
    street: "123 Main St",
    city: "Anytown",
    state: "CA",
    zipCode: "12345",
    country: "United States"
  }
};

// Add mock admin user
const MOCK_ADMIN: User = {
  id: "admin-1",
  email: "admin@example.com",
  firstName: "Admin",
  lastName: "User",
  avatarUrl: "https://api.dicebear.com/6.x/avataaars/svg?seed=Admin",
  phoneNumber: "555-987-6543",
  createdAt: new Date(),
  isAdmin: true,
  address: {
    street: "456 Admin St",
    city: "Adminville",
    state: "CA",
    zipCode: "54321",
    country: "United States"
  }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { toast } = useToast();
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true
  });

  useEffect(() => {
    // Check if user is already logged in (from localStorage)
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setAuthState({
          user: {
            ...userData,
            createdAt: new Date(userData.createdAt)
          },
          isAuthenticated: true,
          isLoading: false
        });
      } catch (error) {
        console.error("Failed to parse stored user data:", error);
        localStorage.removeItem('user');
        setAuthState({ user: null, isAuthenticated: false, isLoading: false });
      }
    } else {
      setAuthState({ user: null, isAuthenticated: false, isLoading: false });
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call delay
    setAuthState(prev => ({ ...prev, isLoading: true }));
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Special case for admin login
      if (email === "admin@example.com" && password === "adminpass") {
        const user = MOCK_ADMIN;
        localStorage.setItem('user', JSON.stringify(user));
        
        setAuthState({
          user,
          isAuthenticated: true,
          isLoading: false
        });
        
        toast({
          title: "Admin login successful",
          description: `Welcome back, ${user.firstName}!`,
        });
        
        return true;
      }
      
      // For demo purposes, accept any email with a password of "password"
      if (password === "password") {
        // Use the mock user data but update the email
        const user = { ...MOCK_USER, email };
        localStorage.setItem('user', JSON.stringify(user));
        
        setAuthState({
          user,
          isAuthenticated: true,
          isLoading: false
        });
        
        toast({
          title: "Login successful",
          description: `Welcome back, ${user.firstName}!`,
        });
        
        return true;
      } else {
        toast({
          title: "Login failed",
          description: "Invalid email or password. Try using 'password' or admin@example.com/adminpass",
          variant: "destructive"
        });
        
        setAuthState(prev => ({ ...prev, isLoading: false }));
        return false;
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
      
      setAuthState(prev => ({ ...prev, isLoading: false }));
      return false;
    }
  };

  const register = async (userData: RegisterData): Promise<boolean> => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create a new user based on registration data
      const newUser: User = {
        id: `user-${Date.now()}`,
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        avatarUrl: `https://api.dicebear.com/6.x/avataaars/svg?seed=${userData.firstName}`,
        createdAt: new Date()
      };
      
      localStorage.setItem('user', JSON.stringify(newUser));
      
      setAuthState({
        user: newUser,
        isAuthenticated: true,
        isLoading: false
      });
      
      toast({
        title: "Registration successful",
        description: `Welcome, ${newUser.firstName}!`,
      });
      
      return true;
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        title: "Registration failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
      
      setAuthState(prev => ({ ...prev, isLoading: false }));
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false
    });
    
    toast({
      title: "Logged out",
      description: "You have been successfully logged out."
    });
  };

  const updateProfile = async (userData: Partial<User>): Promise<boolean> => {
    if (!authState.user) return false;
    
    setAuthState(prev => ({ ...prev, isLoading: true }));
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const updatedUser = {
        ...authState.user,
        ...userData
      };
      
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      setAuthState({
        user: updatedUser,
        isAuthenticated: true,
        isLoading: false
      });
      
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated."
      });
      
      return true;
    } catch (error) {
      console.error("Profile update error:", error);
      toast({
        title: "Update failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
      
      setAuthState(prev => ({ ...prev, isLoading: false }));
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        register,
        logout,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
