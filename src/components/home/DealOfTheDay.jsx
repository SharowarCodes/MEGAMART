import React, { useState, useEffect } from 'react';
import { ShoppingCart, Heart, Eye, Clock } from 'lucide-react';

const DealOfTheDay = ({ product, timeLeft, getTimeString, onAddToCart, onAddToWishlist, onBuyNow }) => {
  const [soldCount, setSoldCount] = useState(45);
  const [stock] = useState(100);

  useEffect(() => {
    // Simulate real-time stock updates
    const interval = setInterval(() => {
      setSoldCount(prev => Math.min(prev + 1, stock));
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, [stock]);

  const stockPercentage = (soldCount / stock) * 100;
  const isAlmostSoldOut = stockPercentage > 80;

  return (
    <section className="py-16 bg-gradient-to-r from-red-50 to-orange-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Deal of the Day
          </h2>
          <div className="flex items-center justify-center space-x-2">
            <Clock className="h-6 w-6 text-red-600" />
            <span className="text-2xl font-bold text-red-600">{getTimeString()}</span>
            <span className="text-gray-600">left</span>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="grid md:grid-cols-2 gap-8 p-8">
              {/* Product Image */}
              <div className="relative">
                <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center">
                  <span className="text-gray-400 text-lg">Product Image</span>
                </div>
                
                {/* Discount Badge */}
                <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                  {product.discount}% OFF
                </div>

                {/* Quick Actions */}
                <div className="absolute top-4 right-4 flex flex-col space-y-2">
                  <button
                    onClick={() => onAddToWishlist(product)}
                    className="bg-white p-2 rounded-full shadow-md hover:shadow-lg transition-shadow"
                    title="Add to Wishlist"
                  >
                    <Heart className="h-5 w-5 text-gray-600 hover:text-red-600" />
                  </button>
                  <button
                    className="bg-white p-2 rounded-full shadow-md hover:shadow-lg transition-shadow"
                    title="Quick View"
                  >
                    <Eye className="h-5 w-5 text-gray-600 hover:text-blue-600" />
                  </button>
                </div>
              </div>

              {/* Product Details */}
              <div className="flex flex-col justify-between">
                <div>
                  <div className="mb-4">
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full">
                      {product.category}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {product.name}
                  </h3>
                  
                  <p className="text-gray-600 mb-4">
                    {product.description}
                  </p>

                  {/* Rating */}
                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'fill-current' : 'fill-gray-300'}`} viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="ml-2 text-gray-600">
                      {product.rating} ({product.reviews} reviews)
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center space-x-3 mb-6">
                    <span className="text-3xl font-bold text-gray-900">
                      ₹{product.price.toLocaleString()}
                    </span>
                    <span className="text-xl text-gray-500 line-through">
                      ₹{product.originalPrice.toLocaleString()}
                    </span>
                    <span className="bg-red-100 text-red-800 text-sm font-semibold px-2 py-1 rounded">
                      Save ₹{(product.originalPrice - product.price).toLocaleString()}
                    </span>
                  </div>

                  {/* Stock Progress */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">
                        {isAlmostSoldOut && <span className="text-red-600 font-bold">⚠️ Almost Sold Out!</span>}
                        {!isAlmostSoldOut && <span>{soldCount}/{stock} sold</span>}
                      </span>
                      <span className="text-sm text-gray-500">
                        {stock - soldCount} left
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className={`h-3 rounded-full transition-all duration-500 ${
                          isAlmostSoldOut ? 'bg-red-600' : 'bg-green-600'
                        }`}
                        style={{ width: `${stockPercentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={() => onAddToCart(product)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    <span>Add to Cart</span>
                  </button>
                  
                  <button
                    onClick={() => onBuyNow(product)}
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DealOfTheDay;
