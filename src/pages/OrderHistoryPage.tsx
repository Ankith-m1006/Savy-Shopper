
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { getOrdersByUserId, getOrderStatusLabel, getOrderStatusColor } from '@/lib/orderData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Order } from '@/lib/types';
import { PackageOpen, TruckIcon, CheckCircle, Clock, AlertTriangle } from 'lucide-react';

const OrderHistoryPage = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  
  if (!isAuthenticated) {
    return (
      <div className="container mx-auto py-12">
        <Card className="mx-auto max-w-3xl">
          <CardHeader>
            <CardTitle>Order History</CardTitle>
            <CardDescription>Please log in to view your order history</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center py-8">
            <Button onClick={() => navigate('/')}>
              Back to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  const userOrders = user ? getOrdersByUserId(user.id) : [];
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'processing':
        return <Clock className="h-5 w-5 text-blue-500" />;
      case 'shipped':
        return <TruckIcon className="h-5 w-5 text-purple-500" />;
      case 'delivered':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'cancelled':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      default:
        return <PackageOpen className="h-5 w-5 text-yellow-500" />;
    }
  };
  
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Order History</h1>
      
      {userOrders.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>No Orders Found</CardTitle>
            <CardDescription>You haven't placed any orders yet.</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center py-8">
            <Button onClick={() => navigate('/')}>
              Start Shopping
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Your Orders</CardTitle>
                <CardDescription>
                  {userOrders.length} {userOrders.length === 1 ? 'order' : 'orders'} placed
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userOrders.map((order) => (
                    <div 
                      key={order.id}
                      className={`p-4 rounded-lg cursor-pointer transition-all duration-200 ${
                        selectedOrder?.id === order.id
                          ? 'bg-primary/10 border border-primary/30'
                          : 'bg-card hover:bg-primary/5 border border-border'
                      }`}
                      onClick={() => setSelectedOrder(order)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm font-medium">Order #{order.id}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <Badge className={getOrderStatusColor(order.status)}>
                          {getOrderStatusLabel(order.status)}
                        </Badge>
                      </div>
                      <p className="mt-2 text-sm font-medium">
                        ${order.totalAmount.toFixed(2)} • {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-2">
            {selectedOrder ? (
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>Order #{selectedOrder.id}</CardTitle>
                      <CardDescription>
                        Placed on {new Date(selectedOrder.createdAt).toLocaleDateString()}
                      </CardDescription>
                    </div>
                    <Badge className={getOrderStatusColor(selectedOrder.status)}>
                      {getOrderStatusLabel(selectedOrder.status)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="items">
                    <TabsList className="mb-4">
                      <TabsTrigger value="items">Items</TabsTrigger>
                      <TabsTrigger value="shipping">Shipping Info</TabsTrigger>
                      <TabsTrigger value="tracking">Tracking</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="items" className="space-y-4">
                      {selectedOrder.items.map((item) => (
                        <div key={item.productId} className="flex items-center space-x-4">
                          <div className="h-16 w-16 rounded-md overflow-hidden bg-secondary">
                            <img
                              src={item.productImage}
                              alt={item.productName}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium">{item.productName}</h4>
                            <p className="text-sm text-muted-foreground">
                              Qty: {item.quantity} × ${item.price.toFixed(2)}
                            </p>
                          </div>
                          <div className="font-medium">
                            ${(item.quantity * item.price).toFixed(2)}
                          </div>
                        </div>
                      ))}
                      
                      <Separator className="my-4" />
                      
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Subtotal</span>
                          <span>${selectedOrder.totalAmount.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Shipping</span>
                          <span>Free</span>
                        </div>
                        <div className="flex justify-between font-bold">
                          <span>Total</span>
                          <span>${selectedOrder.totalAmount.toFixed(2)}</span>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="shipping">
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium mb-2">Shipping Address</h4>
                          <div className="text-sm space-y-1">
                            <p>{user?.firstName} {user?.lastName}</p>
                            <p>{selectedOrder.shippingAddress.street}</p>
                            <p>
                              {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} {selectedOrder.shippingAddress.zipCode}
                            </p>
                            <p>{selectedOrder.shippingAddress.country}</p>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium mb-2">Payment Method</h4>
                          <p className="text-sm">{selectedOrder.paymentMethod}</p>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="tracking">
                      <div className="space-y-6">
                        {selectedOrder.trackingNumber ? (
                          <>
                            <div>
                              <h4 className="font-medium mb-2">Tracking Number</h4>
                              <p className="text-sm font-mono bg-secondary p-2 rounded inline-block">
                                {selectedOrder.trackingNumber}
                              </p>
                            </div>
                            
                            <div className="space-y-3">
                              <h4 className="font-medium">Shipment Status</h4>
                              <div className="relative">
                                <div className="absolute top-0 bottom-0 left-[7px] w-[2px] bg-border"></div>
                                <div className="space-y-8">
                                  <div className="relative flex items-start pl-6">
                                    <div className="absolute left-0 rounded-full bg-primary h-4 w-4 mt-0.5"></div>
                                    <div>
                                      <p className="font-medium">Order Placed</p>
                                      <p className="text-sm text-muted-foreground">
                                        {new Date(selectedOrder.createdAt).toLocaleDateString()}
                                      </p>
                                    </div>
                                  </div>
                                  
                                  <div className="relative flex items-start pl-6">
                                    <div className={`absolute left-0 rounded-full h-4 w-4 mt-0.5 ${
                                      ['processing', 'shipped', 'delivered'].includes(selectedOrder.status)
                                        ? 'bg-primary'
                                        : 'bg-border'
                                    }`}></div>
                                    <div>
                                      <p className="font-medium">Processing</p>
                                      <p className="text-sm text-muted-foreground">
                                        {['processing', 'shipped', 'delivered'].includes(selectedOrder.status)
                                          ? new Date(selectedOrder.updatedAt).toLocaleDateString()
                                          : 'Pending'}
                                      </p>
                                    </div>
                                  </div>
                                  
                                  <div className="relative flex items-start pl-6">
                                    <div className={`absolute left-0 rounded-full h-4 w-4 mt-0.5 ${
                                      ['shipped', 'delivered'].includes(selectedOrder.status)
                                        ? 'bg-primary'
                                        : 'bg-border'
                                    }`}></div>
                                    <div>
                                      <p className="font-medium">Shipped</p>
                                      <p className="text-sm text-muted-foreground">
                                        {['shipped', 'delivered'].includes(selectedOrder.status)
                                          ? new Date(selectedOrder.updatedAt).toLocaleDateString()
                                          : 'Pending'}
                                      </p>
                                    </div>
                                  </div>
                                  
                                  <div className="relative flex items-start pl-6">
                                    <div className={`absolute left-0 rounded-full h-4 w-4 mt-0.5 ${
                                      selectedOrder.status === 'delivered'
                                        ? 'bg-primary'
                                        : 'bg-border'
                                    }`}></div>
                                    <div>
                                      <p className="font-medium">Delivered</p>
                                      <p className="text-sm text-muted-foreground">
                                        {selectedOrder.status === 'delivered'
                                          ? new Date(selectedOrder.updatedAt).toLocaleDateString()
                                          : selectedOrder.estimatedDelivery
                                            ? `Estimated: ${new Date(selectedOrder.estimatedDelivery).toLocaleDateString()}`
                                            : 'Pending'}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </>
                        ) : (
                          <div className="py-8 text-center">
                            <PackageOpen className="mx-auto h-12 w-12 text-muted-foreground" />
                            <h3 className="mt-4 text-lg font-medium">No tracking information yet</h3>
                            <p className="mt-2 text-sm text-muted-foreground">
                              Tracking details will appear once your order ships.
                            </p>
                          </div>
                        )}
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            ) : (
              <Card className="h-full flex items-center justify-center">
                <CardContent className="py-12 text-center">
                  <PackageOpen className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">Select an order</h3>
                  <p className="mt-2 text-sm text-muted-foreground max-w-xs mx-auto">
                    Choose an order from the list to view its details, track shipping, and more.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderHistoryPage;
