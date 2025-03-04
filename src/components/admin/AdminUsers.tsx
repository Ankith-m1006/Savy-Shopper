
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { User, UserCircle, Search, Mail, Lock } from 'lucide-react';

// Mock users for demo
const mockUsers = [
  {
    id: "user-1",
    email: "user@example.com",
    firstName: "John",
    lastName: "Doe",
    createdAt: new Date("2023-01-15"),
    ordersCount: 5,
    isAdmin: false
  },
  {
    id: "admin-1",
    email: "admin@example.com",
    firstName: "Admin",
    lastName: "User",
    createdAt: new Date("2022-11-10"),
    ordersCount: 0,
    isAdmin: true
  },
  {
    id: "user-2",
    email: "jane@example.com",
    firstName: "Jane",
    lastName: "Smith",
    createdAt: new Date("2023-03-22"),
    ordersCount: 2,
    isAdmin: false
  },
  {
    id: "user-3",
    email: "robert@example.com",
    firstName: "Robert",
    lastName: "Johnson",
    createdAt: new Date("2023-05-05"),
    ordersCount: 8,
    isAdmin: false
  },
  {
    id: "user-4",
    email: "sarah@example.com",
    firstName: "Sarah",
    lastName: "Williams",
    createdAt: new Date("2023-07-18"),
    ordersCount: 1,
    isAdmin: false
  }
];

export function AdminUsers() {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter users based on search query
  const filteredUsers = mockUsers.filter(user => 
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) || 
    `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">Users</h1>
        <p className="text-muted-foreground">Manage user accounts and permissions</p>
      </div>
      
      <div className="flex items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <Card>
        <CardHeader className="p-4">
          <CardTitle className="text-lg">User List</CardTitle>
          <CardDescription>
            {filteredUsers.length} {filteredUsers.length === 1 ? 'user' : 'users'} found
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead>Orders</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <UserCircle className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">{user.firstName} {user.lastName}</div>
                        <div className="text-sm text-muted-foreground">ID: {user.id}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>{user.ordersCount}</TableCell>
                  <TableCell>
                    {user.isAdmin ? (
                      <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">
                        Admin
                      </Badge>
                    ) : (
                      <Badge variant="outline">
                        Customer
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="icon">
                        <Mail className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <Lock className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
