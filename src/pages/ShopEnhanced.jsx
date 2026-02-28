import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { useFilter } from '../contexts/FilterContext';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import { useNotification } from '../contexts/NotificationContext';
import { usePagination } from '../hooks/usePagination';
import productsAPI from '../api/products';
import { 
  ShoppingCart, 
  Heart, 
  Eye, 
  Star, 
  Filter, 
  Grid, 
  List, 
  ChevronDown, 
  ChevronRight, 
  Search,
  SlidersHorizontal,
  X,
  Package,
  Sparkles,
  TrendingUp,
  Clock,
  Loader2,
  RefreshCw,
  ArrowUpDown
} from 'lucide-react';

const ShopEnhanced = () => {
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const { filters, updateFilters, clearFilters } = useFilter();
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist } = useWishlist();
  const { showSuccess, showError } = useNotification();
  
  const [viewMode, setViewMode] = useState('grid');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [sortBy, setSortBy] = useState('featured');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  const {
    currentPage,
    itemsPerPage,
    totalPages,
    goToPage,
    nextPage,
    prevPage,
    setItemsPerPage,
    setCurrentPage
  } = usePagination(12);

  // Get search query from URL
  const urlSearchQuery = searchParams.get('search') || '';

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        // Load categories and brands
        const [categoriesRes, brandsRes] = await Promise.all([
          productsAPI.getCategories(),
          productsAPI.getBrands()
        ]);
        
        setCategories(categoriesRes.data || []);
        setBrands(brandsRes.data || []);
        
        // Load products
        const searchFilters = {
          category: category || undefined,
          sortBy: sortBy,
          minPrice: priceRange[0],
          maxPrice: priceRange[1],
          ...filters
        };
        
        let result;
        if (urlSearchQuery || searchQuery) {
          result = await productsAPI.search(urlSearchQuery || searchQuery, searchFilters);
        } else if (category) {
          result = await productsAPI.getByCategory(category);
        } else {
          result = await productsAPI.getAll();
        }
        
        setProducts(result.data || []);
      } catch (error) {
        console.error('Error loading products:', error);
        showError('Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [category, urlSearchQuery, sortBy, priceRange, filters]);

  // Handle search with suggestions
  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (query.length > 2) {
      try {
        const result = await productsAPI.search(query, { 
          category: category || undefined,
          sortBy: sortBy,
          minPrice: priceRange[0],
          maxPrice: priceRange[1],
          ...filters
        });
        setSuggestions(result.data?.slice(0, 5) || []);
        setShowSuggestions(true);
      } catch (error) {
        console.error('Search error:', error);
      }
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...products];
    
    // Apply additional client-side filters
    if (filters.brands && filters.brands.length > 0) {
      filtered = filtered.filter(product =>
        filters.brands.includes(product.brand)
      );
    }
    
    if (filters.rating && filters.rating > 0) {
      filtered = filtered.filter(product =>
        product.rating >= filters.rating
      );
    }
    
    if (filters.discount && filters.discount > 0) {
      filtered = filtered.filter(product =>
        product.discount >= filters.discount
      );
    }
    
    if (filters.inStock === true) {
      filtered = filtered.filter(product =>
        product.inStock
      );
    }
    
    if (filters.isNew === true) {
      filtered = filtered.filter(product =>
        product.isNew
      );
    }
    
    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'reviews':
        filtered.sort((a, b) => b.reviews - a.reviews);
        break;
      case 'newest':
        filtered.sort((a, b) => b.id.localeCompare(a.id));
        break;
      case 'discount':
        filtered.sort((a, b) => b.discount - a.discount);
        break;
      case 'name-asc':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        // Featured: sort by rating and discount
        filtered.sort((a, b) => (b.rating * b.discount) - (a.rating * a.discount));
        break;
    }
    
    return filtered;
  }, [products, sortBy, filters]);

  // Calculate total pages from filtered products
  const totalPagesCount = Math.ceil(filteredAndSortedProducts.length / itemsPerPage);

  // Update pagination when filtered products change
  useEffect(() => {
    if (currentPage > totalPagesCount) {
      setCurrentPage(1);
    }
  }, [filteredAndSortedProducts, totalPagesCount, currentPage]);

  // Get current page products
  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredAndSortedProducts.slice(startIndex, endIndex);
  }, [filteredAndSortedProducts, currentPage, itemsPerPage]);

  // Get unique brands for filter
  const uniqueBrands = useMemo(() => {
    const brandCounts = {};
    products.forEach(product => {
      brandCounts[product.brand] = (brandCounts[product.brand] || 0) + 1;
    });
    return Object.entries(brandCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([brand]) => brand);
  }, [products]);

  // Get price range stats
  const priceStats = useMemo(() => {
    const prices = products.map(p => p.price);
    return {
      min: Math.min(...prices),
      max: Math.max(...prices),
      avg: prices.reduce((sum, price) => sum + price, 0) / prices.length
    };
  }, [products]);

  const handleAddToCart = (product) => {
    addToCart(product);
    showSuccess(`${product.name} added to cart!`);
  };

  const handleAddToWishlist = (product) => {
    addToWishlist(product);
    showSuccess(`${product.name} added to wishlist!`);
  };

  const handleBuyNow = (product) => {
    addToCart(product);
    showSuccess(`${product.name} added to cart! Redirecting to checkout...`);
    setTimeout(() => {
      window.location.href = '/checkout';
    }, 1000);
  };

  const handleBrandToggle = (brand) => {
    const newBrands = filters.brands && filters.brands.includes(brand)
      ? filters.brands.filter(b => b !== brand)
      : [...(filters.brands || []), brand];
    updateFilters({ brands: newBrands });
  };

  const handlePriceRangeChange = (newRange) => {
    setPriceRange(newRange);
    updateFilters({ priceRange: newRange });
  };

  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
    updateFilters({ sortBy: newSortBy });
  };

  const handleClearAllFilters = () => {
    setPriceRange([0, 50000]);
    setSortBy('featured');
    clearFilters();
    setCurrentPage(1);
    setSearchQuery('');
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const handleRefresh = async () => {
    setLoading(true);
    try {
      const searchFilters = {
        category: category || undefined,
        sortBy: sortBy,
        minPrice: priceRange[0],
        maxPrice: priceRange[1],
        ...filters
      };
      
      let result;
      if (searchQuery) {
        result = await productsAPI.search(searchQuery, searchFilters);
      } else if (category) {
        result = await productsAPI.getByCategory(category);
      } else {
        result = await productsAPI.getAll();
      }
      
      setProducts(result.data || []);
      showSuccess('Products refreshed successfully!');
    } catch (error) {
      console.error('Error refreshing products:', error);
      showError('Failed to refresh products');
    } finally {
      setLoading(false);
    }
  };

  const ProductCard = ({ product }) => (
    <div className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 card-animate overflow-hidden group border border-gray-100">
      {/* Product Image */}
      <div className="relative aspect-square bg-gray-100 rounded-t-xl overflow-hidden">
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
          <Package className="w-16 h-16 text-gray-400" />
        </div>
        
        {/* Badges */}
        {product.isNew && (
          <div className="absolute top-3 left-3 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">
            NEW
          </div>
        )}
        {product.badge && (
          <div className="absolute top-3 right-3 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
            {product.badge}
          </div>
        )}
        {product.discount > 0 && (
          <div className="absolute bottom-3 left-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
            -{product.discount}%
          </div>
        )}
        
        {/* Quick Actions */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex flex-col space-y-2">
            <button
              onClick={() => handleAddToWishlist(product)}
              className="w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-red-50 transition-colors"
              title="Add to Wishlist"
            >
              <Heart className={`w-4 h-4 ${isInWishlist(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
            </button>
            <button
              className="w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-50 transition-colors"
              title="Quick View"
            >
              <Eye className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Product Info */}
      <div className="p-4">
        <div className="mb-3">
          <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
          <p className="text-xs text-gray-500 mb-2">{product.brand}</p>
          <p className="text-xs text-gray-600 line-clamp-2">{product.description || 'High quality product with premium features and excellent customer reviews.'}</p>
        </div>
        
        {/* Rating */}
        <div className="flex items-center space-x-2 mb-3">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'fill-current' : 'fill-gray-300'}`} />
            ))}
          </div>
          <span className="text-xs text-gray-600">({product.reviews || 0})</span>
          {product.rating && (
            <span className="text-xs font-medium text-gray-900 ml-1">
              {product.rating.toFixed(1)}
            </span>
          )}
        </div>
        
        {/* Features */}
        {product.features && product.features.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {product.features.slice(0, 2).map((feature, index) => (
              <span key={index} className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full">
                {feature}
              </span>
            ))}
          </div>
        )}
        
        {/* Price */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-sm text-gray-500 line-through">₹{product.originalPrice.toLocaleString()}</span>
            )}
            {product.discount > 0 && (
              <span className="text-sm text-red-600 font-medium bg-red-50 px-2 py-1 rounded-full">
                {product.discount}% OFF
              </span>
            )}
          </div>
          
          {/* Stock Status */}
          <div className="text-right">
            {product.inStock ? (
              <span className="text-xs text-green-600 font-medium">In Stock</span>
            ) : (
              <span className="text-xs text-red-600 font-medium">Out of Stock</span>
            )}
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex space-x-2">
          <button
            onClick={() => handleAddToCart(product)}
            disabled={!product.inStock}
            className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg font-medium hover:bg-blue-700 transition-all duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed btn-animate text-sm"
          >
            <ShoppingCart className="h-4 w-4 mr-1" />
            Add to Cart
          </button>
          <button
            onClick={() => handleBuyNow(product)}
            disabled={!product.inStock}
            className="flex-1 bg-orange-600 hover:bg-orange-700 text-white text-sm font-medium py-2 px-3 rounded-lg transition-all duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed btn-animate"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Enhanced Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-[1170px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                {category ? (
                  <>
                    <span className="text-blue-600">{category.charAt(0).toUpperCase() + category.slice(1)}</span>
                    <ChevronRight className="w-5 h-5 ml-2 text-gray-400" />
                  </>
                ) : (
                  <>
                    <Sparkles className="w-6 h-6 mr-2 text-blue-600" />
                    All Products
                  </>
                )}
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                {loading ? 'Loading...' : `${filteredAndSortedProducts.length} products found`}
              </p>
            </div>
            
            {/* View Toggle */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded transition-colors ${viewMode === 'grid' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded transition-colors ${viewMode === 'list' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1170px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-8">
          {/* Enhanced Filters Sidebar */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                  <SlidersHorizontal className="w-5 h-5 mr-2" />
                  Filters
                </h2>
                <button
                  onClick={handleClearAllFilters}
                  className="text-sm text-red-600 hover:text-red-700 font-medium flex items-center"
                >
                  <X className="w-4 h-4 mr-1" />
                  Clear All
                </button>
              </div>

              {/* Enhanced Search */}
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    onFocus={() => setShowSuggestions(true)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {showSuggestions && suggestions.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl z-50 max-h-60 overflow-y-auto">
                      {suggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setSearchQuery(suggestion.name);
                            setShowSuggestions(false);
                            handleSearch(suggestion.name);
                          }}
                          className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors flex items-center space-x-3"
                        >
                          <Package className="w-4 h-4 text-gray-400" />
                          <div>
                            <div className="font-medium text-gray-900">{suggestion.name}</div>
                            <div className="text-xs text-gray-500">{suggestion.category}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-3">Categories</h3>
                <div className="space-y-2">
                  {categories.slice(0, 6).map((cat) => (
                    <label key={cat.name} className="flex items-center space-x-2 cursor-pointer hover:text-blue-600 transition-colors">
                      <input
                        type="radio"
                        name="category"
                        checked={category === cat.name}
                        onChange={() => window.location.href = `/shop/${cat.name.toLowerCase().replace(/\s+/g, '-')}`}
                        className="text-blue-600"
                      />
                      <span className="text-sm">{cat.name}</span>
                      <span className="text-xs text-gray-500">({cat.count})</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Brands */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-3">Top Brands</h3>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {uniqueBrands.map((brand) => (
                    <label key={brand} className="flex items-center space-x-2 cursor-pointer hover:text-blue-600 transition-colors">
                      <input
                        type="checkbox"
                        checked={filters.brands && filters.brands.includes(brand)}
                        onChange={() => handleBrandToggle(brand)}
                        className="rounded text-blue-600"
                      />
                      <span className="text-sm">{brand}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-3">Price Range</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">₹{priceRange[0].toLocaleString()}</span>
                    <span className="text-sm text-gray-600">₹{priceRange[1].toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="50000"
                    value={priceRange[1]}
                    onChange={(e) => handlePriceRangeChange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full accent-blue-600"
                  />
                </div>
              </div>

              {/* Rating */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-3">Minimum Rating</h3>
                <div className="space-y-2">
                  {[4, 3, 2, 1].map((rating) => (
                    <label key={rating} className="flex items-center space-x-2 cursor-pointer hover:text-blue-600 transition-colors">
                      <input
                        type="radio"
                        name="rating"
                        checked={filters.rating && filters.rating === rating}
                        onChange={() => updateFilters({ rating })}
                        className="text-blue-600"
                      />
                      <span className="text-sm flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-3 h-3 ${i < rating ? 'fill-current text-yellow-400' : 'fill-gray-300'}`} />
                        ))}
                        <span className="ml-1">& up</span>
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Special Filters */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-3">Special Filters</h3>
                <div className="space-y-3">
                  <label className="flex items-center space-x-2 cursor-pointer hover:text-blue-600 transition-colors">
                    <input
                      type="checkbox"
                      checked={filters.inStock === true}
                      onChange={(e) => updateFilters({ inStock: e.target.checked })}
                      className="rounded text-blue-600"
                    />
                    <span className="text-sm">In Stock Only</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer hover:text-blue-600 transition-colors">
                    <input
                      type="checkbox"
                      checked={filters.isNew === true}
                      onChange={(e) => updateFilters({ isNew: e.target.checked })}
                      className="rounded text-blue-600"
                    />
                    <span className="text-sm">New Arrivals</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Enhanced Sort Bar */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => handleSortChange(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="featured">
                      <TrendingUp className="inline w-4 h-4 mr-2" />
                      Featured
                    </option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                    <option value="reviews">Most Reviewed</option>
                    <option value="newest">Newest First</option>
                    <option value="discount">Biggest Discount</option>
                    <option value="name-asc">Name: A-Z</option>
                    <option value="name-desc">Name: Z-A</option>
                  </select>
                </div>
                
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">Show:</span>
                  <select
                    value={itemsPerPage}
                    onChange={(e) => {
                      setItemsPerPage(parseInt(e.target.value));
                      setCurrentPage(1);
                    }}
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value={12}>12</option>
                    <option value={24}>24</option>
                    <option value={36}>36</option>
                    <option value={48}>48</option>
                  </select>
                </div>

                <button
                  onClick={handleRefresh}
                  disabled={loading}
                  className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <RefreshCw className="w-4 h-4" />
                  )}
                  <span className="ml-2">Refresh</span>
                </button>
              </div>
            </div>

            {/* Loading State */}
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="text-center">
                  <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Loading Products</h3>
                  <p className="text-gray-600">Please wait while we fetch the best products for you...</p>
                </div>
              </div>
            ) : (
              <>
                {/* Products Grid/List */}
                {paginatedItems.length > 0 ? (
                  <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'space-y-4'}>
                    {paginatedItems.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20">
                    <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
                    <p className="text-gray-600 mb-6">Try adjusting your filters or search terms</p>
                    <div className="space-x-4">
                      <button
                        onClick={handleClearAllFilters}
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                      >
                        Clear Filters
                      </button>
                      <button
                        onClick={() => window.location.href = '/shop'}
                        className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                      >
                        Browse All Products
                      </button>
                    </div>
                  </div>
                )}

                {/* Enhanced Pagination */}
                {totalPagesCount > 1 && (
                  <div className="flex items-center justify-center space-x-2 mt-8">
                    <button
                      onClick={prevPage}
                      disabled={currentPage === 1}
                      className="p-3 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Previous
                    </button>
                    
                    <div className="flex items-center space-x-1">
                      {[...Array(totalPagesCount)].map((_, index) => {
                        const pageNum = index + 1;
                        return (
                          <button
                            key={pageNum}
                            onClick={() => goToPage(pageNum, totalPagesCount)}
                            className={`w-10 h-10 rounded-lg border transition-colors ${
                              currentPage === pageNum
                                ? 'bg-blue-600 text-white border-blue-600 shadow-lg'
                                : 'border-gray-300 hover:bg-gray-50'
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                    </div>
                    
                    <button
                      onClick={nextPage}
                      disabled={currentPage === totalPagesCount}
                      className="p-3 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Next
                    </button>
                  </div>
                )}

                {/* Results Info */}
                <div className="text-center mt-8 text-sm text-gray-600">
                  Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredAndSortedProducts.length)} of {filteredAndSortedProducts.length} products
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopEnhanced;
