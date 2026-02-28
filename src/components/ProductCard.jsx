import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useNotification } from '../contexts/NotificationContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { showSuccess } = useNotification();

  const handleAddToCart = () => {
    addToCart(product, 1);
    showSuccess(`${product.name} added to cart`);
  };

  return (
    <div className="card relative group cursor-pointer transform transition-all duration-300 hover:-translate-y-2">
      {/* Discount Badge */}
      <span className="discount-badge">
        {product.discount}
      </span>

      {/* Product Image Placeholder */}
      <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-t-lg flex items-center justify-center mb-4 overflow-hidden">
        <div className="w-32 h-32 bg-gray-300 rounded-lg flex items-center justify-center">
          <span className="text-gray-500 text-sm font-medium">Product</span>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-2">
          {product.name}
        </h3>
        
        {/* Features */}
        {product.features && product.features.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {product.features.map((feature, index) => (
              <span 
                key={index}
                className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full"
              >
                {feature}
              </span>
            ))}
          </div>
        )}

        {/* Size */}
        <p className="text-sm text-gray-600 mb-3">
          Size: <span className="font-medium">{product.size}</span>
        </p>

        {/* Price */}
        <div className="flex items-center justify-between mb-4">
          <div className="text-2xl font-bold text-gray-900">
            ₹{product.price.toLocaleString()}
          </div>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 group-hover:bg-blue-700"
        >
          <ShoppingCart className="h-5 w-5" />
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
