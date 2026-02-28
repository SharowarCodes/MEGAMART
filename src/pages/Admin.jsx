import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  ShoppingCart, 
  Package, 
  TrendingUp, 
  DollarSign, 
  Eye, 
  Edit, 
  Trash2, 
  Plus,
  BarChart3,
  Settings,
  LogOut,
  Bell,
  Search,
  Filter,
  Download,
  Upload,
  AlertCircle,
  CheckCircle,
  Clock,
  Star
} from 'lucide-react';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProducts, setSelectedProducts] = useState(new Set());
  const [showAddProduct, setShowAddProduct] = useState(false);

  // Mock data
  const stats = {
    totalRevenue: 2458900,
    totalOrders: 12456,
    totalCustomers: 8934,
    totalProducts: 2341,
    avgOrderValue: 197.3,
    conversionRate: 3.2
  };

  const recentOrders = [
    {
      id: 'MM123456',
      customer: 'John Doe',
      amount: 1299,
      status: 'delivered',
      date: '2024-02-28',
      items: 3
    },
    {
      id: 'MM123457',
      customer: 'Jane Smith',
      amount: 899,
      status: 'processing',
      date: '2024-02-28',
      items: 2
    },
    {
      id: 'MM123458',
      customer: 'Bob Johnson',
      amount: 2499,
      status: 'shipped',
      date: '2024-02-27',
      items: 5
    }
  ];

  const products = [
    {
      id: 1,
      name: 'iPhone 15 Pro',
      brand: 'Apple',
      price: 99999,
      stock: 45,
      category: 'Electronics',
      rating: 4.8,
      status: 'active'
    },
    {
      id: 2,
      name: 'Samsung Galaxy S24',
      brand: 'Samsung',
      price: 79999,
      stock: 23,
      category: 'Electronics',
      rating: 4.6,
      status: 'active'
    },
    {
      id: 3,
      name: 'Nike Air Max',
      brand: 'Nike',
      price: 8999,
      stock: 0,
      category: 'Footwear',
      rating: 4.4,
      status: 'out_of_stock'
    }
  ];

  const customers = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+91 9876543210',
      orders: 12,
      totalSpent: 45678,
      joinDate: '2024-01-15'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '+91 9876543211',
      orders: 8,
      totalSpent: 23456,
      joinDate: '2024-02-01'
    }
  ];

  const tabs = [
    { id: 'dashboard', name: 'Dashboard', icon: <BarChart3 className="h-5 w-5" /> },
    { id: 'products', name: 'Products', icon: <Package className="h-5 w-5" /> },
    { id: 'orders', name: 'Orders', icon: <ShoppingCart className="h-5 w-5" /> },
    { id: 'customers', name: 'Customers', icon: <Users className="h-5 w-5" /> },
    { id: 'analytics', name: 'Analytics', icon: <TrendingUp className="h-5 w-5" /> },
    { id: 'settings', name: 'Settings', icon: <Settings className="h-5 w-5" /> }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered': return 'text-green-600 bg-green-100';
      case 'shipped': return 'text-blue-600 bg-blue-100';
      case 'processing': return 'text-yellow-600 bg-yellow-100';
      case 'pending': return 'text-gray-600 bg-gray-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      case 'active': return 'text-green-600 bg-green-100';
      case 'out_of_stock': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-blue-600" />
            </div>
            <span className="text-sm text-green-600 font-medium">+12.5%</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">₹{(stats.totalRevenue / 100000).toFixed(1)}L</h3>
          <p className="text-gray-600 text-sm">Total Revenue</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <ShoppingCart className="h-6 w-6 text-green-600" />
            </div>
            <span className="text-sm text-green-600 font-medium">+8.2%</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{stats.totalOrders.toLocaleString()}</h3>
          <p className="text-gray-600 text-sm">Total Orders</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <span className="text-sm text-green-600 font-medium">+15.3%</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{stats.totalCustomers.toLocaleString()}</h3>
          <p className="text-gray-600 text-sm">Total Customers</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Package className="h-6 w-6 text-orange-600" />
            </div>
            <span className="text-sm text-red-600 font-medium">-2.1%</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{stats.totalProducts.toLocaleString()}</h3>
          <p className="text-gray-600 text-sm">Total Products</p>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
          <Link
            to="/admin/orders"
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            View All
          </Link>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Order ID</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Customer</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Amount</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Status</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Date</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} className="border-b">
                  <td className="py-3 px-4">
                    <span className="font-medium text-gray-900">{order.id}</span>
                  </td>
                  <td className="py-3 px-4 text-gray-600">{order.customer}</td>
                  <td className="py-3 px-4 font-medium text-gray-900">₹{order.amount.toLocaleString()}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-600">{order.date}</td>
                  <td className="py-3 px-4">
                    <button className="text-blue-600 hover:text-blue-700">
                      <Eye className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderProducts = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Products Management</h3>
        <button
          onClick={() => setShowAddProduct(true)}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <Plus className="h-4 w-4" />
          <span>Add Product</span>
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex items-center space-x-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button className="flex items-center space-x-2 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50">
          <Filter className="h-4 w-4" />
          <span>Filter</span>
        </button>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="text-left py-3 px-4">
                <input
                  type="checkbox"
                  checked={selectedProducts.size === products.length}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedProducts(new Set(products.map(p => p.id)));
                    } else {
                      setSelectedProducts(new Set());
                    }
                  }}
                  className="rounded text-blue-600"
                />
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Product</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Category</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Price</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Stock</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Rating</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Status</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b">
                <td className="py-3 px-4">
                  <input
                    type="checkbox"
                    checked={selectedProducts.has(product.id)}
                    onChange={(e) => {
                      const newSelected = new Set(selectedProducts);
                      if (e.target.checked) {
                        newSelected.add(product.id);
                      } else {
                        newSelected.delete(product.id);
                      }
                      setSelectedProducts(newSelected);
                    }}
                    className="rounded text-blue-600"
                  />
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                      <span className="text-gray-500 text-xs">Img</span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{product.name}</div>
                      <div className="text-sm text-gray-500">{product.brand}</div>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4 text-gray-600">{product.category}</td>
                <td className="py-3 px-4 font-medium text-gray-900">₹{product.price.toLocaleString()}</td>
                <td className="py-3 px-4">
                  <span className={`text-sm font-medium ${
                    product.stock > 10 ? 'text-green-600' : product.stock > 0 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {product.stock}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-current text-yellow-400" />
                    <span className="text-sm text-gray-600">{product.rating}</span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}>
                    {product.status.replace('_', ' ')}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center space-x-2">
                    <button className="text-blue-600 hover:text-blue-700">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="text-red-600 hover:text-red-700">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderOrders = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Orders Management</h3>
      
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">156</div>
            <div className="text-sm text-gray-600">Pending</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">89</div>
            <div className="text-sm text-gray-600">Processing</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">234</div>
            <div className="text-sm text-gray-600">Shipped</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">1245</div>
            <div className="text-sm text-gray-600">Delivered</div>
          </div>
        </div>

        <div className="space-y-4">
          {recentOrders.map((order) => (
            <div key={order.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-900">{order.id}</div>
                  <div className="text-sm text-gray-600">{order.customer} • {order.items} items</div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-gray-900">₹{order.amount.toLocaleString()}</div>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderCustomers = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Customers Management</h3>
      
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Customer</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Contact</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Orders</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Total Spent</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Join Date</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id} className="border-b">
                <td className="py-3 px-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-gray-600">
                        {customer.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{customer.name}</div>
                      <div className="text-sm text-gray-500">ID: CUST{customer.id.toString().padStart(6, '0')}</div>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="text-sm">
                    <div className="text-gray-900">{customer.email}</div>
                    <div className="text-gray-600">{customer.phone}</div>
                  </div>
                </td>
                <td className="py-3 px-4 text-gray-900">{customer.orders}</td>
                <td className="py-3 px-4 font-medium text-gray-900">₹{customer.totalSpent.toLocaleString()}</td>
                <td className="py-3 px-4 text-gray-600">{customer.joinDate}</td>
                <td className="py-3 px-4">
                  <button className="text-blue-600 hover:text-blue-700">
                    <Eye className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Analytics & Reports</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h4 className="font-medium text-gray-900 mb-4">Sales Overview</h4>
          <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
            <span className="text-gray-500">Sales Chart</span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h4 className="font-medium text-gray-900 mb-4">Top Products</h4>
          <div className="space-y-3">
            {products.slice(0, 5).map((product, index) => (
              <div key={product.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium text-gray-600">#{index + 1}</span>
                  <span className="text-sm text-gray-900">{product.name}</span>
                </div>
                <span className="text-sm font-medium text-gray-900">₹{(product.price * 45).toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-medium text-gray-900">Export Reports</h4>
          <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700">
            <Download className="h-4 w-4" />
            <span>Export All</span>
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center justify-center space-x-2 border border-gray-300 px-4 py-3 rounded-lg hover:bg-gray-50">
            <Download className="h-4 w-4" />
            <span>Sales Report</span>
          </button>
          <button className="flex items-center justify-center space-x-2 border border-gray-300 px-4 py-3 rounded-lg hover:bg-gray-50">
            <Download className="h-4 w-4" />
            <span>Inventory Report</span>
          </button>
          <button className="flex items-center justify-center space-x-2 border border-gray-300 px-4 py-3 rounded-lg hover:bg-gray-50">
            <Download className="h-4 w-4" />
            <span>Customer Report</span>
          </button>
        </div>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Admin Settings</h3>
      
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h4 className="font-medium text-gray-900 mb-4">Store Settings</h4>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Store Name</label>
            <input
              type="text"
              defaultValue="MegaMart"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Store Email</label>
            <input
              type="email"
              defaultValue="admin@megamart.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tax Rate (%)</label>
            <input
              type="number"
              defaultValue="18"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h4 className="font-medium text-gray-900 mb-4">Notification Settings</h4>
        <div className="space-y-3">
          <label className="flex items-center justify-between">
            <span className="text-gray-700">New order notifications</span>
            <input type="checkbox" defaultChecked className="rounded text-blue-600" />
          </label>
          <label className="flex items-center justify-between">
            <span className="text-gray-700">Low stock alerts</span>
            <input type="checkbox" defaultChecked className="rounded text-blue-600" />
          </label>
          <label className="flex items-center justify-between">
            <span className="text-gray-700">Customer registration</span>
            <input type="checkbox" defaultChecked className="rounded text-blue-600" />
          </label>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-lg min-h-screen">
          <div className="p-6 border-b">
            <h1 className="text-xl font-bold text-gray-900">MegaMart Admin</h1>
            <p className="text-sm text-gray-600">Management Panel</p>
          </div>
          
          <nav className="p-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {tab.icon}
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>

          <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
            <button className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg">
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 capitalize">{activeTab}</h2>
              <p className="text-gray-600">Manage your {activeTab}</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-600 hover:text-gray-900">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-600 rounded-full"></span>
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-600">A</span>
                </div>
                <span className="text-sm font-medium text-gray-900">Admin</span>
              </div>
            </div>
          </div>

          {/* Content */}
          {activeTab === 'dashboard' && renderDashboard()}
          {activeTab === 'products' && renderProducts()}
          {activeTab === 'orders' && renderOrders()}
          {activeTab === 'customers' && renderCustomers()}
          {activeTab === 'analytics' && renderAnalytics()}
          {activeTab === 'settings' && renderSettings()}
        </div>
      </div>
    </div>
  );
};

export default Admin;
