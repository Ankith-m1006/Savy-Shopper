
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

export function AdminSettings() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  const [storeSettings, setStoreSettings] = useState({
    storeName: 'Savvy Shopper',
    storeEmail: 'contact@savvyshopper.com',
    storePhone: '(555) 123-4567',
    storeAddress: '123 Commerce St, Shopping City, SC 12345',
    currency: 'USD',
    taxRate: '8',
    enableFreeShipping: true,
    freeShippingThreshold: '100',
    enableReviews: true,
    enableWishlist: true,
  });
  
  const handleStoreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStoreSettings(prev => ({ ...prev, [name]: value }));
  };
  
  const handleToggleChange = (name: string, checked: boolean) => {
    setStoreSettings(prev => ({ ...prev, [name]: checked }));
  };
  
  const handleStoreSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Settings saved",
        description: "Your store settings have been updated successfully.",
      });
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground">Configure your store settings</p>
      </div>
      
      <Tabs defaultValue="store">
        <TabsList className="mb-4">
          <TabsTrigger value="store">Store Settings</TabsTrigger>
          <TabsTrigger value="payment">Payment Methods</TabsTrigger>
          <TabsTrigger value="shipping">Shipping</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        
        <TabsContent value="store">
          <Card>
            <CardHeader>
              <CardTitle>Store Information</CardTitle>
              <CardDescription>Manage your store details and preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleStoreSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="storeName">Store Name</Label>
                    <Input
                      id="storeName"
                      name="storeName"
                      value={storeSettings.storeName}
                      onChange={handleStoreChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="storeEmail">Email Address</Label>
                    <Input
                      id="storeEmail"
                      name="storeEmail"
                      type="email"
                      value={storeSettings.storeEmail}
                      onChange={handleStoreChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="storePhone">Phone Number</Label>
                    <Input
                      id="storePhone"
                      name="storePhone"
                      value={storeSettings.storePhone}
                      onChange={handleStoreChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="currency">Currency</Label>
                    <Input
                      id="currency"
                      name="currency"
                      value={storeSettings.currency}
                      onChange={handleStoreChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="storeAddress">Address</Label>
                    <Input
                      id="storeAddress"
                      name="storeAddress"
                      value={storeSettings.storeAddress}
                      onChange={handleStoreChange}
                    />
                  </div>
                </div>
                
                <Separator />
                
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="taxRate">Tax Rate (%)</Label>
                    <Input
                      id="taxRate"
                      name="taxRate"
                      type="number"
                      min="0"
                      step="0.01"
                      value={storeSettings.taxRate}
                      onChange={handleStoreChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="freeShippingThreshold">Free Shipping Threshold ($)</Label>
                    <Input
                      id="freeShippingThreshold"
                      name="freeShippingThreshold"
                      type="number"
                      min="0"
                      value={storeSettings.freeShippingThreshold}
                      onChange={handleStoreChange}
                      disabled={!storeSettings.enableFreeShipping}
                    />
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="enableFreeShipping">Enable Free Shipping</Label>
                      <p className="text-sm text-muted-foreground">
                        Offer free shipping on orders above the threshold
                      </p>
                    </div>
                    <Switch
                      id="enableFreeShipping"
                      checked={storeSettings.enableFreeShipping}
                      onCheckedChange={(checked) => handleToggleChange('enableFreeShipping', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="enableReviews">Enable Product Reviews</Label>
                      <p className="text-sm text-muted-foreground">
                        Allow customers to leave reviews on products
                      </p>
                    </div>
                    <Switch
                      id="enableReviews"
                      checked={storeSettings.enableReviews}
                      onCheckedChange={(checked) => handleToggleChange('enableReviews', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="enableWishlist">Enable Wishlist</Label>
                      <p className="text-sm text-muted-foreground">
                        Allow customers to save products to a wishlist
                      </p>
                    </div>
                    <Switch
                      id="enableWishlist"
                      checked={storeSettings.enableWishlist}
                      onCheckedChange={(checked) => handleToggleChange('enableWishlist', checked)}
                    />
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button type="submit" disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Save Settings
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="payment">
          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>Configure payment gateways and options</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center py-8 text-muted-foreground">
                Payment settings configuration coming soon
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="shipping">
          <Card>
            <CardHeader>
              <CardTitle>Shipping Methods</CardTitle>
              <CardDescription>Configure shipping zones and rates</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center py-8 text-muted-foreground">
                Shipping settings configuration coming soon
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure email and system notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center py-8 text-muted-foreground">
                Notification settings configuration coming soon
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
