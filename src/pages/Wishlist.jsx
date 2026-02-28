import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../contexts/WishlistContext';
import { useCart } from '../contexts/CartContext';
import { useNotification } from '../contexts/NotificationContext';
import { Heart, ShoppingCart, Trash2, Star, ArrowRight, Package } from 'lucide-react';

const Wishlist = () => {
  const { items, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { showSuccess } = useNotification();
  const [selectedItems, setSelectedItems] = useState(new Set());

  const handleAddToCart = (item) => {
    addToCart(item);
    showSuccess(`${item.name} added to cart!`);
  };

  const handleRemoveFromWishlist = (item) => {
    removeFromWishlist(item.id);
    showSuccess(`${item.name} removed from wishlist`);
  };

  const handleAddSelectedToCart = () => {
    const selectedItemsData = items.filter(item => selectedItems.has(item.id));
    selectedItemsData.forEach(item => {
      addToCart(item);
    });
    showSuccess(`${selectedItemsData.length} items added to cart!`);
    setSelectedItems(new Set());
  };

  const handleSelectItem = (id) => {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedItems(newSelected);
  };

  const handleSelectAll = () => {
    if (selectedItems.size === items.length) {
      setSelectedItems(new Set());
    } else {
      setSelectedItems(new Set(items.map(item => item.id)));
    }
  };

  const handleClearWishlist = () => {
    if (window.confirm('Are you sure you want to clear your entire wishlist?')) {
      clearWishlist();
      showSuccess('Wishlist cleared successfully');
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-200 rounded-full mb-6">
              <Heart className="h-12 w-12 text-gray-400" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Wishlist is Empty</h1>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Start adding items to your wishlist to keep track of products you love!
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              <span>Start Shopping</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Wishlist</h1>
            <p className="text-gray-600">{items.length} items saved</p>
          </div>
          <div className="flex items-center space-x-4">
            {selectedItems.size > 0 && (
              <button
                onClick={handleAddSelectedToCart}
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <ShoppingCart className="h-4 w-4" />
                <span>Add Selected to Cart ({selectedItems.size})</span>
              </button>
            )}
            <button
              onClick={handleClearWishlist}
              className="text-red-600 hover:text-red-700 font-medium"
            >
              Clear Wishlist
            </button>
          </div>
        </div>

        {/* Select All */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={selectedItems.size === items.length && items.length > 0}
              onChange={handleSelectAll}
              className="rounded text-blue-600"
            />
            <span className="font-medium">Select All Items</span>
          </label>
        </div>

        {/* Wishlist Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300">
              {/* Product Image */}
              <div className="relative">
                <div className="w-full h-48 bg-gray-200 rounded-t-lg flex items-center justify-center">
                  <span className="text-gray-500 text-sm">Image</span>
                </div>
                
                {/* Checkbox */}
                <div className="absolute top-3 left-3">
                  <input
                    type="checkbox"
                    checked={selectedItems.has(item.id)}
                    onChange={() => handleSelectItem(item.id)}
                    className="rounded text-blue-600 bg-white shadow-sm"
                  />
                </div>
                
                {/* Discount Badge */}
                {item.discount > 0 && (
                  <div className="absolute top-3 right-3 bg-red-600 text-white px-2 py-1 rounded-full text-xs font-bold">
                    {item.discount}% OFF
                  </div>
                )}
              </div>

              {/* Product Details */}
              <div className="p-4">
                <div className="mb-3">
                  <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">{item.name}</h3>
                  <p className="text-sm text-gray-500">{item.brand}</p>
                </div>

                {/* Rating */}
                <div className="flex items-center space-x-1 mb-3">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`h-4 w-4 ${i < item.rating ? 'fill-current' : 'fill-gray-300'}`} />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">({item.reviews || 0})</span>
                </div>

                {/* Price */}
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-lg font-bold text-gray-900">₹{item.price}</span>
                  <span className="text-sm text-gray-500 line-through">₹{item.originalPrice}</span>
                </div>

                {/* Actions */}
                <div className="space-y-2">
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    <span>Add to Cart</span>
                  </button>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleRemoveFromWishlist(item)}
                      className="flex-1 border border-red-600 text-red-600 py-2 rounded-lg font-medium hover:bg-red-50 transition-colors flex items-center justify-center space-x-1"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span>Remove</span>
                    </button>
                    
                    <Link
                      to={`/shop/${item.id}`}
                      className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center space-x-1"
                    >
                      <Package className="h-4 w-4" />
                      <span>View</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Wishlist Summary */}
        <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-900">Wishlist Summary</h3>
              <p className="text-sm text-gray-600 mt-1">
                Total value: ₹{items.reduce((sum, item) => sum + item.price, 0).toLocaleString()}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/shop"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Continue Shopping
              </Link>
              {selectedItems.size > 0 && (
                <button
                  onClick={handleAddSelectedToCart}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center space-x-2"
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span>Add {selectedItems.size} to Cart</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
