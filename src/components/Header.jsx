import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ChevronDown,
  Globe,
  Heart,
  Mail,
  Menu,
  Phone,
  Search,
  ShoppingCart,
  User,
  X
} from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import { useUser } from '../contexts/UserContext';
import { useNotification } from '../contexts/NotificationContext';
import { categories } from '../constants/products';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState('EN');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);

  const searchRef = useRef(null);
  const navigate = useNavigate();

  const { getCartCount, items, removeFromCart, updateQuantity, getSubtotal, getTax, getShipping, getTotal } = useCart();
  const { getWishlistCount, addToWishlist } = useWishlist();
  const { isAuthenticated, user, logout } = useUser();
  const { showSuccess } = useNotification();

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

  useEffect(() => {
    if (searchQuery.length > 2) {
      const baseSuggestions = [
        'Samsung Galaxy S23',
        'iPhone 14 Pro',
        'OnePlus 11',
        'Mi 13 Pro',
        'Realme GT 2',
        'Vivo X80',
        'Oppo Find X5',
        'Google Pixel 7'
      ];

      const filtered = baseSuggestions
        .filter((item) => item.toLowerCase().includes(searchQuery.toLowerCase()))
        .slice(0, 5);

      setSearchSuggestions(filtered);
    } else {
      setSearchSuggestions([]);
    }
  }, [searchQuery]);

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
      setIsMenuOpen(false);
    }
  };

  const handleCategoryClick = (category) => {
    navigate(`/shop/${category.toLowerCase().replace(/\s+/g, '-')}`);
    setIsMegaMenuOpen(false);
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    setIsAccountOpen(false);
  };

  const moveToWishlist = (item) => {
    addToWishlist(item);
    removeFromCart(item.id);
    showSuccess(`${item.name} moved to wishlist!`);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-3 border-b">
          <div className="flex items-center space-x-6">
            <Link to="/" className="text-2xl font-bold text-blue-600">
              MegaMart
            </Link>

            <div ref={searchRef} className="hidden lg:flex relative flex-1 max-w-lg">
              <div className="relative w-full">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch(searchQuery)}
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

              {searchSuggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg mt-1 max-h-60 overflow-y-auto">
                  {searchSuggestions.map((suggestion) => (
                    <button
                      key={suggestion}
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
            <div className="relative">
              <button
                onClick={() => {
                  setIsLanguageOpen(!isLanguageOpen);
                  setIsAccountOpen(false);
                }}
                className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors"
              >
                <Globe className="h-5 w-5" />
                <span className="text-sm font-medium">{selectedLanguage}</span>
                <ChevronDown className="h-4 w-4" />
              </button>

              {isLanguageOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
                  <div className="py-2">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setSelectedLanguage(lang.code);
                          setIsLanguageOpen(false);
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

            <div className="relative">
              <button
                onClick={() => {
                  setIsAccountOpen(!isAccountOpen);
                  setIsLanguageOpen(false);
                }}
                className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors"
              >
                <User className="h-5 w-5" />
                <span className="text-sm font-medium hidden sm:inline">
                  {isAuthenticated ? user?.name : 'Account'}
                </span>
                <ChevronDown className="h-4 w-4" />
              </button>

              {isAccountOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
                  <div className="py-2">
                    {isAuthenticated ? (
                      <>
                        <Link
                          to="/account"
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                          onClick={() => setIsAccountOpen(false)}
                        >
                          My Account
                        </Link>
                        <Link
                          to="/account?tab=orders"
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                          onClick={() => setIsAccountOpen(false)}
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
                          to="/login"
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                          onClick={() => setIsAccountOpen(false)}
                        >
                          Login
                        </Link>
                        <Link
                          to="/signup"
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                          onClick={() => setIsAccountOpen(false)}
                        >
                          Sign Up
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>

            <Link to="/wishlist" className="relative text-gray-600 hover:text-blue-600 transition-colors">
              <Heart className="h-5 w-5" />
              {getWishlistCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {getWishlistCount()}
                </span>
              )}
            </Link>

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

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden text-gray-600 hover:text-blue-600 transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        <nav className="hidden lg:flex items-center justify-between py-3">
          <div className="flex items-center space-x-8">
            <div className="relative">
              <button
                onMouseEnter={() => setIsMegaMenuOpen(true)}
                onMouseLeave={() => setIsMegaMenuOpen(false)}
                className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                <span>All Categories</span>
                <ChevronDown className="h-4 w-4" />
              </button>

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

        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t">
            <div className="mb-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch(searchQuery)}
                placeholder="Search products..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

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

            <div className="mt-6 pt-6 border-t">
              <h3 className="font-semibold text-gray-800 mb-3">Categories</h3>
              <div className="grid grid-cols-2 gap-3">
                {categories.slice(0, 6).map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryClick(category.name)}
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
                  <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                    {items.map((item) => (
                      <div key={item.id} className="flex items-center space-x-3 pb-4 border-b">
                        <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                          <span className="text-xs text-gray-500">Image</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{item.name}</h4>
                          <p className="text-gray-500 text-xs">{item.brand}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className="font-semibold">₹{item.price}</span>
                            <span className="text-gray-500 line-through text-xs">₹{item.originalPrice}</span>
                          </div>
                          
                          {/* Quantity Controls */}
                          <div className="flex items-center space-x-2 mt-2">
                            <button
                              onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                              className="w-6 h-6 bg-gray-200 rounded flex items-center justify-center hover:bg-gray-300"
                            >
                              -
                            </button>
                            <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-6 h-6 bg-gray-200 rounded flex items-center justify-center hover:bg-gray-300"
                            >
                              +
                            </button>
                          </div>
                        </div>
                        
                        {/* Actions */}
                        <div className="flex flex-col space-y-2">
                          <button
                            onClick={() => moveToWishlist(item)}
                            className="p-1 text-red-600 hover:bg-red-50 rounded"
                            title="Move to Wishlist"
                          >
                            <Heart className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="p-1 text-gray-600 hover:bg-gray-100 rounded"
                            title="Remove"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Coupon Section */}
                  <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        placeholder="Coupon code"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button className="px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">
                        Apply
                      </button>
                    </div>
                  </div>

                  {/* Price Breakdown */}
                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal:</span>
                      <span>₹{getSubtotal()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Shipping:</span>
                      <span>₹{getShipping()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Tax:</span>
                      <span>₹{getTax()}</span>
                    </div>
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total:</span>
                      <span>₹{getTotal()}</span>
                    </div>
                  </div>

                  <div className="mt-4 space-y-2">
                    <Link
                      to="/checkout"
                      onClick={() => setIsCartOpen(false)}
                      className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-center block"
                    >
                      Proceed to Checkout
                    </Link>
                    <Link
                      to="/cart"
                      onClick={() => setIsCartOpen(false)}
                      className="w-full bg-gray-200 text-gray-800 py-2 rounded-lg font-medium hover:bg-gray-300 transition-colors text-center block"
                    >
                      View Cart Details
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

export default Header;
