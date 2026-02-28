import React, { useState } from 'react';
import { useCountdown } from '../hooks/useCountdown';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import { useNotification } from '../contexts/NotificationContext';
import { allProducts } from '../constants/products';
import { ShoppingCart, Heart, Eye, Star, Clock, Tag, Gift, Zap } from 'lucide-react';

const Deals = () => {
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist } = useWishlist();
  const { showSuccess } = useNotification();
  
  const [activeTab, setActiveTab] = useState('flash');
  const [appliedCoupons, setAppliedCoupons] = useState([]);

  // Flash sale countdown (ends in 24 hours)
  const flashSaleEnd = new Date();
  flashSaleEnd.setHours(flashSaleEnd.getHours() + 24);
  const { timeLeft: flashTimeLeft, getTimeString: getFlashTimeString } = useCountdown(flashSaleEnd);

  // Daily deals countdown (ends at midnight)
  const dailyDealEnd = new Date();
  dailyDealEnd.setHours(23, 59, 59, 999);
  const { timeLeft: dailyTimeLeft, getTimeString: getDailyTimeString } = useCountdown(dailyDealEnd);

  // Filter products for deals
  const flashSaleProducts = allProducts
    .filter(product => product.discount >= 50)
    .slice(0, 8);

  const dailyDealProducts = allProducts
    .filter(product => product.discount >= 30)
    .slice(0, 12);

  const clearanceProducts = allProducts
    .filter(product => product.discount >= 40)
    .slice(0, 8);

  const coupons = [
    {
      id: 1,
      code: 'MEGA80',
      discount: '80% OFF',
      description: 'On Electronics',
      minOrder: 5000,
      expiry: '2 days',
      category: 'electronics'
    },
    {
      id: 2,
      code: 'FASHION50',
      discount: '50% OFF',
      description: 'On Fashion & Beauty',
      minOrder: 2000,
      expiry: '5 days',
      category: 'fashion'
    },
    {
      id: 3,
      code: 'HOME40',
      discount: '40% OFF',
      description: 'On Home Appliances',
      minOrder: 3000,
      expiry: '3 days',
      category: 'home'
    },
    {
      id: 4,
      code: 'FIRST30',
      discount: '30% OFF',
      description: 'First Order Special',
      minOrder: 1000,
      expiry: '7 days',
      category: 'new'
    },
    {
      id: 5,
      code: 'FREESHIP',
      discount: 'FREE Shipping',
      description: 'On orders above ₹999',
      minOrder: 999,
      expiry: '30 days',
      category: 'shipping'
    }
  ];

  const handleAddToCart = (product) => {
    addToCart(product);
    showSuccess(`${product.name} added to cart!`);
  };

  const handleAddToWishlist = (product) => {
    addToWishlist(product);
    showSuccess(`${product.name} added to wishlist!`);
  };

  const handleApplyCoupon = (coupon) => {
    if (appliedCoupons.find(c => c.id === coupon.id)) {
      showSuccess('Coupon already applied!');
      return;
    }
    setAppliedCoupons([...appliedCoupons, coupon]);
    showSuccess(`Coupon ${coupon.code} applied successfully!`);
  };

  const handleRemoveCoupon = (couponId) => {
    setAppliedCoupons(appliedCoupons.filter(c => c.id !== couponId));
    showSuccess('Coupon removed');
  };

  const ProductCard = ({ product, showTimer = false, timeLeft = null, getTimeString = null }) => (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 group">
      {/* Product Image */}
      <div className="relative aspect-square bg-gray-100 rounded-t-lg overflow-hidden">
        <div className="w-full h-full flex items-center justify-center">
          <span className="text-gray-400">Product Image</span>
        </div>
        
        {/* Discount Badge */}
        <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
          {product.discount}% OFF
        </div>

        {/* Flash Sale Timer */}
        {showTimer && timeLeft && getTimeString && (
          <div className="absolute top-2 left-2 bg-black/80 text-white px-2 py-1 rounded text-xs font-medium flex items-center space-x-1">
            <Clock className="h-3 w-3" />
            <span>{getTimeString()}</span>
          </div>
        )}

        {/* Quick Actions */}
        <div className="absolute top-8 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={() => handleAddToWishlist(product)}
            className="bg-white p-2 rounded-full shadow-md hover:shadow-lg transition-shadow mb-2"
            title="Add to Wishlist"
          >
            <Heart className={`h-4 w-4 ${isInWishlist(product.id) ? 'fill-red-600 text-red-600' : 'text-gray-600'}`} />
          </button>
          <button
            className="bg-white p-2 rounded-full shadow-md hover:shadow-lg transition-shadow"
            title="Quick View"
          >
            <Eye className="h-4 w-4 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center mb-2">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'fill-current' : 'fill-gray-300'}`} />
            ))}
          </div>
          <span className="ml-1 text-sm text-gray-600">
            {product.rating} ({product.reviews})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center space-x-2 mb-3">
          <span className="text-lg font-bold text-gray-900">
            ₹{product.price.toLocaleString()}
          </span>
          <span className="text-sm text-gray-500 line-through">
            ₹{product.originalPrice.toLocaleString()}
          </span>
          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium">
            Save ₹{(product.originalPrice - product.price).toLocaleString()}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <button
            onClick={() => handleAddToCart(product)}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-3 rounded-lg transition-colors duration-200 flex items-center justify-center"
          >
            <ShoppingCart className="h-4 w-4 mr-1" />
            Add
          </button>
          <button
            onClick={() => handleAddToCart(product)}
            className="flex-1 bg-orange-600 hover:bg-orange-700 text-white text-sm font-medium py-2 px-3 rounded-lg transition-colors duration-200"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );

  const CouponCard = ({ coupon }) => (
    <div className="bg-white rounded-lg shadow-md border border-gray-100 p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-100 p-3 rounded-full">
            <Tag className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-gray-900">{coupon.code}</h3>
            <p className="text-sm text-gray-600">{coupon.description}</p>
          </div>
        </div>
        <span className="bg-red-100 text-red-800 text-xs font-semibold px-2 py-1 rounded-full">
          {coupon.discount}
        </span>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Min Order:</span>
          <span className="font-medium">₹{coupon.minOrder.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Expires in:</span>
          <span className="font-medium text-orange-600">{coupon.expiry}</span>
        </div>
      </div>

      <button
        onClick={() => handleApplyCoupon(coupon)}
        disabled={appliedCoupons.find(c => c.id === coupon.id)}
        className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
          appliedCoupons.find(c => c.id === coupon.id)
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700 text-white'
        }`}
      >
        {appliedCoupons.find(c => c.id === coupon.id) ? 'Applied' : 'Apply Coupon'}
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Hot Deals & Offers
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Don't miss out on these amazing deals! Limited time offers on your favorite products.
          </p>
        </div>

        {/* Applied Coupons */}
        {appliedCoupons.length > 0 && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8">
            <h3 className="font-semibold text-green-800 mb-2">Applied Coupons:</h3>
            <div className="flex flex-wrap gap-2">
              {appliedCoupons.map((coupon) => (
                <div key={coupon.id} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-2">
                  <span>{coupon.code}</span>
                  <button
                    onClick={() => handleRemoveCoupon(coupon.id)}
                    className="hover:text-green-600"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Deal Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-8">
          <div className="flex flex-wrap border-b">
            <button
              onClick={() => setActiveTab('flash')}
              className={`flex-1 min-w-[150px] px-6 py-4 font-medium transition-colors ${
                activeTab === 'flash'
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <Zap className="h-5 w-5" />
                <span>Flash Sale</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('daily')}
              className={`flex-1 min-w-[150px] px-6 py-4 font-medium transition-colors ${
                activeTab === 'daily'
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <Clock className="h-5 w-5" />
                <span>Daily Deals</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('clearance')}
              className={`flex-1 min-w-[150px] px-6 py-4 font-medium transition-colors ${
                activeTab === 'clearance'
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <Gift className="h-5 w-5" />
                <span>Clearance</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('coupons')}
              className={`flex-1 min-w-[150px] px-6 py-4 font-medium transition-colors ${
                activeTab === 'coupons'
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <Tag className="h-5 w-5" />
                <span>Coupons</span>
              </div>
            </button>
          </div>

          <div className="p-6">
            {/* Flash Sale */}
            {activeTab === 'flash' && (
              <div>
                <div className="text-center mb-8">
                  <div className="inline-flex items-center space-x-2 bg-red-100 text-red-800 px-6 py-3 rounded-full font-bold">
                    <Clock className="h-5 w-5" />
                    <span>Flash Sale Ends In: {getFlashTimeString()}</span>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {flashSaleProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      showTimer={true}
                      timeLeft={flashTimeLeft}
                      getTimeString={getFlashTimeString}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Daily Deals */}
            {activeTab === 'daily' && (
              <div>
                <div className="text-center mb-8">
                  <div className="inline-flex items-center space-x-2 bg-orange-100 text-orange-800 px-6 py-3 rounded-full font-bold">
                    <Clock className="h-5 w-5" />
                    <span>Daily Deals End In: {getDailyTimeString()}</span>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {dailyDealProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      showTimer={true}
                      timeLeft={dailyTimeLeft}
                      getTimeString={getDailyTimeString}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Clearance */}
            {activeTab === 'clearance' && (
              <div>
                <div className="text-center mb-8">
                  <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-6 py-3 rounded-full font-bold">
                    <Gift className="h-5 w-5" />
                    <span>Clearance Sale - While Stocks Last!</span>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {clearanceProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            )}

            {/* Coupons */}
            {activeTab === 'coupons' && (
              <div>
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Exclusive Coupons</h2>
                  <p className="text-gray-600">Apply these coupons at checkout for extra savings!</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {coupons.map((coupon) => (
                    <CouponCard key={coupon.id} coupon={coupon} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Deal Stats */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-6">Today's Deal Stats</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <div className="text-3xl font-bold mb-2">₹50L+</div>
              <div className="text-blue-100">Saved Today</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">10K+</div>
              <div className="text-blue-100">Happy Customers</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">500+</div>
              <div className="text-blue-100">Active Deals</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">24/7</div>
              <div className="text-blue-100">New Deals</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Deals;
