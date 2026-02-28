import React from 'react';
import { ShoppingCart, Heart, Eye, Star } from 'lucide-react';

const HomeAppliancesDeals = ({ products, onAddToCart, onAddToWishlist, onBuyNow, isInWishlist }) => {
  return (
    <section className="py-16 bg-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Home Appliances Deals
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.slice(0, 8).map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 group">
              {/* Product Image */}
              <div className="relative aspect-square bg-gray-100 rounded-t-lg overflow-hidden">
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-gray-400">Product Image</span>
                </div>
                
                {/* Discount Badge */}
                <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  {product.discount}% OFF
                </div>

                {/* Quick Actions */}
                <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <button
                    onClick={() => onAddToWishlist(product)}
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
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <button
                    onClick={() => onAddToCart(product)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-3 rounded-lg transition-colors duration-200 flex items-center justify-center"
                  >
                    <ShoppingCart className="h-4 w-4 mr-1" />
                    Add
                  </button>
                  <button
                    onClick={() => onBuyNow(product)}
                    className="flex-1 bg-orange-600 hover:bg-orange-700 text-white text-sm font-medium py-2 px-3 rounded-lg transition-colors duration-200"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeAppliancesDeals;
