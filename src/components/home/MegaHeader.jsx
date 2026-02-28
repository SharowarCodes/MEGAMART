import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, 
  ShoppingCart, 
  User, 
  Heart, 
  Menu, 
  X, 
  ChevronDown,
  Globe,
  Phone,
  Mail
} from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { useWishlist } from '../../contexts/WishlistContext';
import { useUser } from '../../contexts/UserContext';
import { categories } from '../../constants/products';

const MegaHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState('EN');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  const searchRef = useRef(null);
  const navigate = useNavigate();
  
  const { getCartCount, items } = useCart();
  const { getWishlistCount } = useWishlist();
  const { isAuthenticated, user, logout } = useUser();

  const menuItems = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Categories', path: '/categories' },
    { name: 'Deals', path: '/deals' },
    { name: 'Contact', path: '/contact' }
  ];

  const languages = [
    { code: 'EN', name: 'English' },
    { code: 'HI', name: 'हिंदी' },
    { code: 'BN', name: 'বাংলা' },
    { code: 'TA', name: 'தமிழ்' },
    { code: 'TE', name: 'తెలుగు' }
  ];

  // Mock search suggestions
  useEffect(() => {
    if (searchQuery.length > 2) {
      // Simulate API call for search suggestions
      const mockSuggestions = [
        'Samsung Galaxy S23',
        'iPhone 14 Pro',
        'OnePlus 11',
        'Mi 13 Pro',
        'Realme GT 2',
        'Vivo X80',
        'Oppo Find X5',
        'Google Pixel 7'
      ].filter(item => 
        item.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5);
      
      setSearchSuggestions(mockSuggestions);
    } else {
      setSearchSuggestions([]);
    }
  }, [searchQuery]);

  // Close search suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchSuggestions([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (query) => {
    if (query.trim()) {
      navigate(`/shop?search=${encodeURIComponent(query.trim())}`);
      setSearchSuggestions([]);
      setSearchQuery('');
    }
  };

  const handleCategoryClick = (category) => {
    navigate(`/shop/${category.toLowerCase().replace(/\s+/g, '-')}`);
    setIsMegaMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-40">
      <div className="container mx-auto px-4">
        {/* Top Bar */}
        <div className="flex items-center justify-between py-3 border-b">
          <div className="flex items-center space-x-6">
            <Link to="/" className="text-2xl font-bold text-blue-600">
              MegaMart
            </Link>
            
            {/* Desktop Search Bar */}
            <div ref={searchRef} className="hidden lg:flex relative flex-1 max-w-lg">
              <div className="relative w-full">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch(searchQuery)}
                  placeholder="Search products, brands, categories..."
                  className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  onClick={() => handleSearch(searchQuery)}
                  className="absolute right-2 top-2.5 text-gray-400 hover:text-blue-600"
                >
                  <Search className="h-5 w-5" />
                </button>
              </div>
              
              {/* Search Suggestions Dropdown */}
              {searchSuggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg mt-1 max-h-60 overflow-y-auto">
                  {searchSuggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSearch(suggestion)}
                      className="w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors flex items-center space-x-2"
                    >
                      <Search className="h-4 w-4 text-gray-400" />
                      <span>{suggestion}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors"
              >
                <Globe className="h-5 w-5" />
                <span className="text-sm font-medium">{selectedLanguage}</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
                  <div className="py-2">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setSelectedLanguage(lang.code);
                          setIsProfileOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors ${
                          selectedLanguage === lang.code ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                        }`}
                      >
                        {lang.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* User Account */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors"
              >
                <User className="h-5 w-5" />
                <span className="text-sm font-medium hidden sm:inline">
                  {isAuthenticated ? user?.name : 'Account'}
                </span>
                <ChevronDown className="h-4 w-4" />
              </button>
              
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
                  <div className="py-2">
                    {isAuthenticated ? (
                      <>
                        <Link
                          to="/account"
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          My Account
                        </Link>
                        <Link
                          to="/account?tab=orders"
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          Orders
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          Logout
                        </button>
                      </>
                    ) : (
                      <>
                        <Link
                          to="/account"
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          Login
                        </Link>
                        <Link
                          to="/account"
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          Sign Up
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="relative text-gray-600 hover:text-blue-600 transition-colors"
            >
              <Heart className="h-5 w-5" />
              {getWishlistCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {getWishlistCount()}
                </span>
              )}
            </Link>

            {/* Shopping Cart */}
            <button
              onClick={() => setIsCartOpen(!isCartOpen)}
              className="relative text-gray-600 hover:text-blue-600 transition-colors"
            >
              <ShoppingCart className="h-5 w-5" />
              {getCartCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {getCartCount()}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden text-gray-600 hover:text-blue-600 transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="hidden lg:flex items-center justify-between py-3">
          <div className="flex items-center space-x-8">
            {/* Categories Dropdown */}
            <div className="relative">
              <button
                onMouseEnter={() => setIsMegaMenuOpen(true)}
                onMouseLeave={() => setIsMegaMenuOpen(false)}
                className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                <span>All Categories</span>
                <ChevronDown className="h-4 w-4" />
              </button>

              {/* Mega Menu */}
              {isMegaMenuOpen && (
                <div
                  onMouseEnter={() => setIsMegaMenuOpen(true)}
                  onMouseLeave={() => setIsMegaMenuOpen(false)}
                  className="absolute top-full left-0 w-screen max-w-6xl bg-white border border-gray-200 rounded-lg shadow-xl mt-1 z-50"
                >
                  <div className="grid grid-cols-4 gap-8 p-8">
                    {categories.slice(0, 8).map((category) => (
                      <div key={category.id} className="space-y-3">
                        <button
                          onClick={() => handleCategoryClick(category.name)}
                          className="flex items-center space-x-2 text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors"
                        >
                          <span className="text-2xl">{category.icon}</span>
                          <span>{category.name}</span>
                        </button>
                        <div className="space-y-2">
                          {category.subcategories.slice(0, 3).map((sub) => (
                            <button
                              key={sub.name}
                              onClick={() => handleCategoryClick(sub.name)}
                              className="block text-left text-sm text-gray-600 hover:text-blue-600 transition-colors"
                            >
                              {sub.name} ({sub.count})
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Main Navigation */}
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Contact Info */}
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <Phone className="h-4 w-4" />
              <span>+91 123 456 7890</span>
            </div>
            <div className="flex items-center space-x-1">
              <Mail className="h-4 w-4" />
              <span>support@megamart.com</span>
            </div>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t">
            {/* Mobile Search */}
            <div className="mb-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch(searchQuery)}
                placeholder="Search products..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Mobile Navigation */}
            <div className="space-y-3">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-gray-700 hover:text-blue-600 font-medium transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Mobile Categories */}
            <div className="mt-6 pt-6 border-t">
              <h3 className="font-semibold text-gray-800 mb-3">Categories</h3>
              <div className="grid grid-cols-2 gap-3">
                {categories.slice(0, 6).map((category) => (
                  <button
                    key={category.id}
                    onClick={() => {
                      handleCategoryClick(category.name);
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center space-x-2 text-sm text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    <span>{category.icon}</span>
                    <span>{category.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Slide-out Cart */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setIsCartOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-96 bg-white shadow-xl overflow-y-auto">
            <div className="p-4 border-b flex items-center justify-between">
              <h2 className="text-lg font-semibold">Shopping Cart ({getCartCount()} items)</h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-4">
              {items.length === 0 ? (
                <p className="text-gray-500 text-center py-8">Your cart is empty</p>
              ) : (
                <>
                  <div className="space-y-4 mb-6">
                    {items.slice(0, 3).map((item) => (
                      <div key={item.id} className="flex items-center space-x-3 pb-4 border-b">
                        <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                          <span className="text-xs text-gray-500">Image</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{item.name}</h4>
                          <p className="text-gray-500 text-sm">Qty: {item.quantity}</p>
                          <p className="font-semibold">₹{item.price * item.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {items.length > 3 && (
                    <p className="text-center text-sm text-gray-500 mb-4">
                      And {items.length - 3} more items
                    </p>
                  )}
                  
                  <div className="border-t pt-4">
                    <div className="flex justify-between mb-4">
                      <span className="font-semibold">Total:</span>
                      <span className="font-bold text-lg">₹{items.reduce((sum, item) => sum + (item.price * item.quantity), 0)}</span>
                    </div>
                    <Link
                      to="/checkout"
                      onClick={() => setIsCartOpen(false)}
                      className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-center block"
                    >
                      Proceed to Checkout
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default MegaHeader;
