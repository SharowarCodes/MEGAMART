import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { useNotification } from '../contexts/NotificationContext';
import { User, MapPin, CreditCard, Package, Settings, LogOut, Edit, Plus, Trash2, Eye, Download, Star, Clock, CheckCircle, XCircle } from 'lucide-react';

const Account = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout, updateProfile, addAddress, updateAddress, deleteAddress, addPaymentMethod, orders } = useUser();
  const { showSuccess, showError } = useNotification();
  
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState(null);
  
  const [profileForm, setProfileForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    dateOfBirth: user?.dateOfBirth || '',
    gender: user?.gender || ''
  });
  
  const [addressForm, setAddressForm] = useState({
    type: 'home',
    fullName: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    landmark: '',
    isDefault: false
  });

  const tabs = [
    { id: 'profile', name: 'Profile', icon: <User className="h-5 w-5" /> },
    { id: 'addresses', name: 'Addresses', icon: <MapPin className="h-5 w-5" /> },
    { id: 'payment', name: 'Payment Methods', icon: <CreditCard className="h-5 w-5" /> },
    { id: 'orders', name: 'Orders', icon: <Package className="h-5 w-5" /> },
    { id: 'settings', name: 'Settings', icon: <Settings className="h-5 w-5" /> }
  ];

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    
    // Validate form
    if (!profileForm.name || !profileForm.email) {
      showError('Name and email are required');
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(profileForm.email)) {
      showError('Please enter a valid email address');
      return;
    }
    
    updateProfile(profileForm);
    setIsEditingProfile(false);
    showSuccess('Profile updated successfully');
  };

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    if (!addressForm.fullName || !addressForm.phone || !addressForm.address || 
        !addressForm.city || !addressForm.state || !addressForm.pincode) {
      showError('Please fill in all required fields');
      return;
    }
    
    // Phone validation
    if (!/^\d{10}$/.test(addressForm.phone.replace(/\D/g, ''))) {
      showError('Please enter a valid 10-digit phone number');
      return;
    }
    
    // Pincode validation
    if (!/^\d{6}$/.test(addressForm.pincode)) {
      showError('Please enter a valid 6-digit pincode');
      return;
    }
    
    if (editingAddressId) {
      updateAddress(editingAddressId, addressForm);
      setEditingAddressId(null);
      showSuccess('Address updated successfully');
    } else {
      addAddress(addressForm);
      showSuccess('Address added successfully');
    }
    
    setAddressForm({
      type: 'home',
      fullName: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      landmark: '',
      isDefault: false
    });
    setIsAddingAddress(false);
  };

  const handleEditAddress = (address) => {
    setAddressForm(address);
    setEditingAddressId(address.id);
    setIsAddingAddress(true);
  };

  const handleDeleteAddress = (addressId) => {
    if (window.confirm('Are you sure you want to delete this address?')) {
      deleteAddress(addressId);
      showSuccess('Address deleted successfully');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    showSuccess('Logged out successfully');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered': return 'text-green-600 bg-green-100';
      case 'shipped': return 'text-blue-600 bg-blue-100';
      case 'processing': return 'text-yellow-600 bg-yellow-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered': return <CheckCircle className="h-4 w-4" />;
      case 'shipped': return <Package className="h-4 w-4" />;
      case 'processing': return <Clock className="h-4 w-4" />;
      case 'cancelled': return <XCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-200 rounded-full mb-6">
              <User className="h-12 w-12 text-gray-400" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Please Login</h1>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              You need to be logged in to access your account. Please login or create an account to continue.
            </p>
            <div className="space-x-4">
              <Link
                to="/login"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="inline-block bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
              >
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const renderProfileTab = () => (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Profile Information</h2>
        {!isEditingProfile && (
          <button
            onClick={() => setIsEditingProfile(true)}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
          >
            <Edit className="h-4 w-4" />
            <span>Edit</span>
          </button>
        )}
      </div>
      
      {!isEditingProfile ? (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm text-gray-500">Full Name</label>
              <p className="font-medium">{user?.name || 'Not provided'}</p>
            </div>
            <div>
              <label className="text-sm text-gray-500">Email Address</label>
              <p className="font-medium">{user?.email || 'Not provided'}</p>
            </div>
            <div>
              <label className="text-sm text-gray-500">Phone Number</label>
              <p className="font-medium">{user?.phone || 'Not provided'}</p>
            </div>
            <div>
              <label className="text-sm text-gray-500">Date of Birth</label>
              <p className="font-medium">{user?.dateOfBirth || 'Not provided'}</p>
            </div>
            <div>
              <label className="text-sm text-gray-500">Gender</label>
              <p className="font-medium capitalize">{user?.gender || 'Not provided'}</p>
            </div>
            <div>
              <label className="text-sm text-gray-500">Member Since</label>
              <p className="font-medium">{new Date(user?.createdAt || Date.now()).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      ) : (
        <form onSubmit={handleProfileUpdate} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                value={profileForm.name}
                onChange={(e) => setProfileForm({...profileForm, name: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                value={profileForm.email}
                onChange={(e) => setProfileForm({...profileForm, email: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                value={profileForm.phone}
                onChange={(e) => setProfileForm({...profileForm, phone: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="10-digit mobile number"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date of Birth
              </label>
              <input
                type="date"
                value={profileForm.dateOfBirth}
                onChange={(e) => setProfileForm({...profileForm, dateOfBirth: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gender
              </label>
              <select
                value={profileForm.gender}
                onChange={(e) => setProfileForm({...profileForm, gender: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => {
                setIsEditingProfile(false);
                setProfileForm({
                  name: user?.name || '',
                  email: user?.email || '',
                  phone: user?.phone || '',
                  dateOfBirth: user?.dateOfBirth || '',
                  gender: user?.gender || ''
                });
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      )}
    </div>
  );

  const renderAddressesTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Saved Addresses</h2>
          <button
            onClick={() => setIsAddingAddress(true)}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            <Plus className="h-4 w-4" />
            <span>Add Address</span>
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {user?.addresses?.map((address) => (
            <div key={address.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded capitalize mb-2">
                    {address.type}
                  </span>
                  {address.isDefault && (
                    <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded ml-2">
                      Default
                    </span>
                  )}
                  <h3 className="font-medium">{address.fullName}</h3>
                  <p className="text-gray-600 text-sm">{address.phone}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditAddress(address)}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteAddress(address.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="text-sm text-gray-600">
                <p>{address.address}</p>
                <p>{address.city}, {address.state} - {address.pincode}</p>
                {address.landmark && <p>Landmark: {address.landmark}</p>}
              </div>
            </div>
          ))}
          
          {(!user?.addresses || user.addresses.length === 0) && (
            <div className="col-span-2 text-center py-8">
              <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No saved addresses</p>
              <button
                onClick={() => setIsAddingAddress(true)}
                className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
              >
                Add your first address
              </button>
            </div>
          )}
        </div>
      </div>
      
      {isAddingAddress && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-6">
            {editingAddressId ? 'Edit Address' : 'Add New Address'}
          </h3>
          
          <form onSubmit={handleAddressSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address Type *
                </label>
                <select
                  value={addressForm.type}
                  onChange={(e) => setAddressForm({...addressForm, type: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="home">Home</option>
                  <option value="work">Work</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={addressForm.fullName}
                  onChange={(e) => setAddressForm({...addressForm, fullName: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={addressForm.phone}
                  onChange={(e) => setAddressForm({...addressForm, phone: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="10-digit mobile number"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pincode *
                </label>
                <input
                  type="text"
                  value={addressForm.pincode}
                  onChange={(e) => setAddressForm({...addressForm, pincode: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="6-digit pincode"
                  maxLength={6}
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Street Address *
              </label>
              <input
                type="text"
                value={addressForm.address}
                onChange={(e) => setAddressForm({...addressForm, address: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="House number, street name"
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City *
                </label>
                <input
                  type="text"
                  value={addressForm.city}
                  onChange={(e) => setAddressForm({...addressForm, city: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  State *
                </label>
                <input
                  type="text"
                  value={addressForm.state}
                  onChange={(e) => setAddressForm({...addressForm, state: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Landmark (Optional)
              </label>
              <input
                type="text"
                value={addressForm.landmark}
                onChange={(e) => setAddressForm({...addressForm, landmark: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nearby landmark, building name, etc."
              />
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="isDefault"
                checked={addressForm.isDefault}
                onChange={(e) => setAddressForm({...addressForm, isDefault: e.target.checked})}
                className="rounded text-blue-600"
              />
              <label htmlFor="isDefault" className="ml-2 text-sm text-gray-700">
                Set as default address
              </label>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => {
                  setIsAddingAddress(false);
                  setEditingAddressId(null);
                  setAddressForm({
                    type: 'home',
                    fullName: '',
                    phone: '',
                    address: '',
                    city: '',
                    state: '',
                    pincode: '',
                    landmark: '',
                    isDefault: false
                  });
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                {editingAddressId ? 'Update Address' : 'Add Address'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );

  const renderOrdersTab = () => (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Order History</h2>
      
      <div className="space-y-4">
        {orders?.map((order) => (
          <div key={order.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="flex items-center space-x-3">
                  <h3 className="font-medium">Order #{order.id}</h3>
                  <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                    {getStatusIcon(order.status)}
                    <span className="capitalize">{order.status}</span>
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  Placed on {new Date(order.date).toLocaleDateString()}
                </p>
              </div>
              <div className="text-right">
                <p className="font-bold">₹{order.total.toLocaleString()}</p>
                <p className="text-sm text-gray-600">{order.items.length} items</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Link
                  to={`/account/orders/${order.id}`}
                  className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm"
                >
                  <Eye className="h-4 w-4" />
                  <span>View Details</span>
                </Link>
                <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-700 text-sm">
                  <Download className="h-4 w-4" />
                  <span>Invoice</span>
                </button>
              </div>
              
              {order.status === 'delivered' && (
                <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm">
                  <Star className="h-4 w-4" />
                  <span>Rate Product</span>
                </button>
              )}
            </div>
          </div>
        ))}
        
        {(!orders || orders.length === 0) && (
          <div className="text-center py-8">
            <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No orders yet</p>
            <Link
              to="/shop"
              className="mt-4 inline-block text-blue-600 hover:text-blue-700 font-medium"
            >
              Start Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  );

  const renderPaymentTab = () => (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Payment Methods</h2>
        <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          <Plus className="h-4 w-4" />
          <span>Add Payment Method</span>
        </button>
      </div>
      
      <div className="space-y-4">
        <div className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-blue-400 rounded"></div>
              <div>
                <p className="font-medium">Visa ending in 4242</p>
                <p className="text-sm text-gray-600">Expires 12/24</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
                Default
              </span>
              <button className="text-red-600 hover:text-red-700">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
        
        <div className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-8 bg-gradient-to-r from-orange-600 to-orange-400 rounded"></div>
              <div>
                <p className="font-medium">Mastercard ending in 8888</p>
                <p className="text-sm text-gray-600">Expires 09/25</p>
              </div>
            </div>
            <button className="text-red-600 hover:text-red-700">
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSettingsTab = () => (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Account Settings</h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="font-medium text-gray-900 mb-4">Notifications</h3>
          <div className="space-y-3">
            <label className="flex items-center justify-between">
              <span className="text-gray-700">Email notifications</span>
              <input type="checkbox" defaultChecked className="rounded text-blue-600" />
            </label>
            <label className="flex items-center justify-between">
              <span className="text-gray-700">SMS notifications</span>
              <input type="checkbox" defaultChecked className="rounded text-blue-600" />
            </label>
            <label className="flex items-center justify-between">
              <span className="text-gray-700">Push notifications</span>
              <input type="checkbox" className="rounded text-blue-600" />
            </label>
          </div>
        </div>
        
        <div>
          <h3 className="font-medium text-gray-900 mb-4">Privacy</h3>
          <div className="space-y-3">
            <label className="flex items-center justify-between">
              <span className="text-gray-700">Profile visibility</span>
              <select className="px-3 py-2 border border-gray-300 rounded-lg">
                <option>Public</option>
                <option>Private</option>
              </select>
            </label>
            <label className="flex items-center justify-between">
              <span className="text-gray-700">Order history visibility</span>
              <select className="px-3 py-2 border border-gray-300 rounded-lg">
                <option>Public</option>
                <option>Private</option>
              </select>
            </label>
          </div>
        </div>
        
        <div className="border-t pt-6">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 text-red-600 hover:text-red-700 font-medium"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Account</h1>
          <p className="text-gray-600">Manage your profile, orders, and settings</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex items-center space-x-3 mb-6 pb-6 border-b">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{user?.name}</h3>
                  <p className="text-sm text-gray-600">{user?.email}</p>
                </div>
              </div>
              
              <nav className="space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
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
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'profile' && renderProfileTab()}
            {activeTab === 'addresses' && renderAddressesTab()}
            {activeTab === 'payment' && renderPaymentTab()}
            {activeTab === 'orders' && renderOrdersTab()}
            {activeTab === 'settings' && renderSettingsTab()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
