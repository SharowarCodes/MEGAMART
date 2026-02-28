import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
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
  Package
} from 'lucide-react';

const Shop = () => {
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const { filters, updateFilters, clearFilters } = useFilter();
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist } = useWishlist();
  const { showSuccess } = useNotification();
  
  const [viewMode, setViewMode] = useState('grid');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [sortBy, setSortBy] = useState('featured');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  
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
  const searchQuery = searchParams.get('search') || '';

  // Normalize category name
  const normalizeCategory = (cat) => {
    if (!cat) return undefined;
    const categoryMap = {
      'electronics': 'Electronics',
      'beauty': 'Beauty',
      'home-appliances': 'Home Appliances',
      'home-appliance': 'Home Appliances',
      'baby-care': 'Baby Care',
      'sports-fitness': 'Sports & Fitness',
      'sports': 'Sports & Fitness',
      'gifts-accessories': 'Gifts & Accessories',
      'gifts': 'Gifts & Accessories',
      'food-beverages': 'Food & Beverages',
      'daily-essentials': 'Daily Essentials'
    };
    return categoryMap[cat.toLowerCase()] || undefined;
  };

  const normalizedCategory = normalizeCategory(category);

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
          category: normalizedCategory || undefined,
          sortBy: sortBy,
          minPrice: priceRange[0],
          maxPrice: priceRange[1],
          ...filters
        };
        
        let result;
        if (searchQuery) {
          result = await productsAPI.search(searchQuery, searchFilters);
        } else if (normalizedCategory) {
          result = await productsAPI.getByCategory(normalizedCategory);
        } else {
          result = await productsAPI.getAll();
        }
        
        setProducts(result.data || []);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [normalizedCategory, searchQuery, sortBy, priceRange, filters]);

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...products];
    
    // Apply additional client-side filters
    if (filters && filters.brands && filters.brands.length > 0) {
      filtered = filtered.filter(product =>
        filters.brands.includes(product.brand)
      );
    }
    
    if (filters && filters.rating && filters.rating > 0) {
      filtered = filtered.filter(product =>
        product.rating >= filters.rating
      );
    }
    
    if (filters && filters.discount && filters.discount > 0) {
      filtered = filtered.filter(product =>
        product.discount >= filters.discount
      );
    }
    
    if (filters && filters.inStock === true) {
      filtered = filtered.filter(product =>
        product.inStock
      );
    }
    
    if (filters && filters.isNew === true) {
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
  }, [filteredAndSortedProducts, totalPagesCount, currentPage, setCurrentPage]);

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
    const currentBrands = filters && filters.brands ? filters.brands : [];
    const newBrands = currentBrands.includes(brand)
      ? currentBrands.filter(b => b !== brand)
      : [...currentBrands, brand];
    updateFilters({ brands: newBrands });
  };

  const handlePriceRangeChange = (newRange) => {
    setPriceRange(newRange);
    updateFilters({ priceRange: newRange });
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
            onClick={() => addToCart(product)}
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
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {category ? category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'All Products'}
          </h1>
          <p className="text-gray-600">
            {filteredAndSortedProducts.length} products found
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-64">
            {/* Mobile Filter Toggle */}
            <div className="lg:hidden mb-4">
              <button
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 flex items-center justify-between"
              >
                <div className="flex items-center space-x-2">
                  <Filter className="h-5 w-5" />
                  <span>Filters</span>
                </div>
                <ChevronDown className={`h-5 w-5 transition-transform ${showMobileFilters ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {/* Filters */}
            <div className={`bg-white rounded-lg shadow-md p-6 ${showMobileFilters ? 'block' : 'hidden lg:block'}`}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-lg">Filters</h3>
                <button
                  onClick={clearFilters}
                  className="text-blue-600 hover:text-blue-700 text-sm"
                >
                  Clear All
                </button>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Price Range</h4>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-gray-600">Min: ₹{priceRange[0].toLocaleString()}</label>
                    <input
                      type="range"
                      min="0"
                      max="100000"
                      step="1000"
                      value={priceRange[0]}
                      onChange={(e) => handlePriceRangeChange(0, e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Max: ₹{priceRange[1].toLocaleString()}</label>
                    <input
                      type="range"
                      min="0"
                      max="100000"
                      step="1000"
                      value={priceRange[1]}
                      onChange={(e) => handlePriceRangeChange(1, e.target.value)}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              {/* Brands */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Brands</h4>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {uniqueBrands.map((brand) => (
                    <label key={brand} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters && filters.brands && filters.brands.includes(brand)}
                        onChange={() => handleBrandToggle(brand)}
                        className="rounded text-blue-600"
                      />
                      <span className="text-sm">{brand}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Rating */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Minimum Rating</h4>
                <div className="space-y-2">
                  {[4, 3, 2, 1].map((rating) => (
                    <label key={rating} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="rating"
                        checked={filters && filters.rating && filters.rating === rating}
                        onChange={() => updateFilters({ rating })}
                        className="text-blue-600"
                      />
                      <div className="flex items-center space-x-1">
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`h-4 w-4 ${i < rating ? 'fill-current' : 'fill-gray-300'}`} />
                          ))}
                        </div>
                        <span className="text-sm">& up</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Discount */}
              <div>
                <h4 className="font-medium mb-3">Discount</h4>
                <div className="space-y-2">
                  {[50, 40, 30, 20, 10].map((discount) => (
                    <label key={discount} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="discount"
                        checked={filters && filters.discount && filters.discount === discount}
                        onChange={() => updateFilters({ discount })}
                        className="text-blue-600"
                      />
                      <span className="text-sm">{discount}% OFF or more</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Products */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                {/* Sort */}
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                    <option value="discount">Best Discount</option>
                    <option value="name">Name: A to Z</option>
                  </select>
                </div>

                {/* View Mode */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}
                  >
                    <Grid className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}
                  >
                    <List className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                : 'grid-cols-1'
            }`}>
              {filteredAndSortedProducts
                .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                .map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
            </div>

            {/* No Products */}
            {filteredAndSortedProducts.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600">Try adjusting your filters or search terms</p>
              </div>
            )}

            {/* Pagination */}
            {filteredAndSortedProducts.length > itemsPerPage && (
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-sm text-gray-600">
                  Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredAndSortedProducts.length)} of {filteredAndSortedProducts.length} products
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={prevPage}
                    disabled={currentPage === 1}
                    className="px-3 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    Previous
                  </button>
                  
                  <div className="flex space-x-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }
                      
                      return (
                        <button
                          key={pageNum}
                          onClick={() => goToPage(pageNum, totalPages)}
                          className={`px-3 py-2 border rounded-lg ${
                            currentPage === pageNum
                              ? 'bg-blue-600 text-white border-blue-600'
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
                    disabled={currentPage === totalPages}
                    className="px-3 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    Next
                  </button>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Show:</span>
                  <select
                    value={itemsPerPage}
                    onChange={(e) => setItemsPerPage(parseInt(e.target.value))}
                    className="border border-gray-300 rounded px-2 py-1 text-sm"
                  >
                    <option value={12}>12</option>
                    <option value={24}>24</option>
                    <option value={36}>36</option>
                    <option value={48}>48</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
