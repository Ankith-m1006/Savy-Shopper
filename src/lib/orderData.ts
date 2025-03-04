
import { Order, OrderStatus } from './types';

export const orders: Order[] = [
  {
    id: 'ord-1',
    userId: 'user-1',
    items: [
      {
        productId: 'p1',
        productName: 'Premium Wireless Headphones',
        productImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        quantity: 1,
        price: 249.99
      },
      {
        productId: 'p3',
        productName: 'Smart Fitness Watch',
        productImage: 'https://images.unsplash.com/photo-1575311373937-040b8e3fd243?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        quantity: 1,
        price: 169.99
      }
    ],
    status: 'delivered',
    shippingAddress: {
      street: '123 Main St',
      city: 'Anytown',
      state: 'CA',
      zipCode: '12345',
      country: 'United States'
    },
    paymentMethod: 'Credit Card',
    totalAmount: 419.98,
    createdAt: new Date('2023-07-15'),
    updatedAt: new Date('2023-07-20'),
    trackingNumber: 'TRK123456789',
    estimatedDelivery: new Date('2023-07-22')
  },
  {
    id: 'ord-2',
    userId: 'user-1',
    items: [
      {
        productId: 'p5',
        productName: 'Handcrafted Ceramic Dinnerware Set',
        productImage: 'https://images.unsplash.com/photo-1610701596061-2ecf227e85b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        quantity: 1,
        price: 189.99
      }
    ],
    status: 'shipped',
    shippingAddress: {
      street: '123 Main St',
      city: 'Anytown',
      state: 'CA',
      zipCode: '12345',
      country: 'United States'
    },
    paymentMethod: 'PayPal',
    totalAmount: 189.99,
    createdAt: new Date('2023-09-01'),
    updatedAt: new Date('2023-09-03'),
    trackingNumber: 'TRK987654321',
    estimatedDelivery: new Date('2023-09-08')
  },
  {
    id: 'ord-3',
    userId: 'user-1',
    items: [
      {
        productId: 'p2',
        productName: 'Ultra-Slim Laptop',
        productImage: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        quantity: 1,
        price: 1299.99
      }
    ],
    status: 'processing',
    shippingAddress: {
      street: '123 Main St',
      city: 'Anytown',
      state: 'CA',
      zipCode: '12345',
      country: 'United States'
    },
    paymentMethod: 'Credit Card',
    totalAmount: 1299.99,
    createdAt: new Date('2023-10-15'),
    updatedAt: new Date('2023-10-16')
  }
];

export const getOrdersByUserId = (userId: string): Order[] => {
  return orders.filter(order => order.userId === userId);
};

export const getOrderById = (orderId: string): Order | undefined => {
  return orders.find(order => order.id === orderId);
};

export const getOrderStatusLabel = (status: OrderStatus): string => {
  switch (status) {
    case 'pending':
      return 'Pending';
    case 'processing':
      return 'Processing';
    case 'shipped':
      return 'Shipped';
    case 'delivered':
      return 'Delivered';
    case 'cancelled':
      return 'Cancelled';
    default:
      return 'Unknown';
  }
};

export const getOrderStatusColor = (status: OrderStatus): string => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'processing':
      return 'bg-blue-100 text-blue-800';
    case 'shipped':
      return 'bg-purple-100 text-purple-800';
    case 'delivered':
      return 'bg-green-100 text-green-800';
    case 'cancelled':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};
