import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import { useNotification } from '../contexts/NotificationContext';
import { ShoppingCart, Heart, Trash2, Plus, Minus, ArrowRight, Tag, Truck, Shield, Lock, Zap } from 'lucide-react';

const Cart = () => {
  const navigate = useNavigate();
  const { items, removeFromCart, updateQuantity, clearCart, getSubtotal, getTax, getShipping, getTotal } = useCart();
  const { addToWishlist } = useWishlist();
  const { showSuccess, showError } = useNotification();
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) return;
    updateQuantity(id, newQuantity);
  };

  const handleRemoveItem = (item) => {
    removeFromCart(item.id);
    showSuccess(`${item.name} removed from cart`);
  };

  const handleMoveToWishlist = (item) => {
    addToWishlist(item);
    removeFromCart(item.id);
    showSuccess(`${item.name} moved to wishlist`);
  };

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) {
      showError('Please enter a coupon code');
      return;
    }
    
    if (couponCode.toUpperCase() === 'MEGA10') {
      setAppliedCoupon({ code: couponCode.toUpperCase(), discount: 10 });
      showSuccess('Coupon applied successfully!');
      setCouponCode('');
    } else {
      showError('Invalid coupon code');
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    showSuccess('Coupon removed');
  };

  const subtotal = getSubtotal();
  const discount = appliedCoupon ? (subtotal * appliedCoupon.discount) / 100 : 0;
  const finalSubtotal = subtotal - discount;
  const tax = getTax();
  const shipping = getShipping();
  const total = getTotal() - discount;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-[1170px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-28 h-28 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full mb-8">
              <ShoppingCart className="h-14 w-14 text-blue-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-8 max-w-md mx-auto text-lg">
              Looks like you haven't added anything to your cart yet. Start shopping to fill it up with amazing deals!
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-[1170px] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
            <p className="text-gray-600">{items.length} {items.length === 1 ? 'item' : 'items'} in your cart</p>
          </div>
          {items.length > 0 && (
            <button
              onClick={clearCart}
              className="text-red-600 hover:text-red-700 font-medium px-4 py-2 hover:bg-red-50 rounded-lg transition-colors"
            >
              Clear Cart
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 overflow-hidden">
                <div className="p-6">
                  <div className="flex items-start space-x-4">
                    {/* Product Image */}
                    <div className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                      <div className="text-center">
                        <ShoppingCart className="h-8 w-8 text-gray-400 mx-auto mb-1" />
                        <span className="text-gray-500 text-xs">Product Image</span>
                      </div>
                    </div>

                    {/* Product Details */}
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-bold text-lg text-gray-900">{item.name}</h3>
                          <p className="text-gray-500 text-sm">{item.brand || 'Generic Brand'}</p>
                        </div>
                        <button
                          onClick={() => handleRemoveItem(item)}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Remove from cart"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="flex items-center space-x-3 mb-4">
                        <span className="text-2xl font-bold text-gray-900">₹{item.price.toLocaleString()}</span>
                        <span className="text-sm text-gray-500 line-through">₹{(item.originalPrice || item.price * 1.3).toLocaleString()}</span>
                        <span className="text-sm font-semibold text-red-600 bg-red-50 px-2 py-1 rounded">
                          {item.discount || 20}% OFF
                        </span>
                      </div>

                      {/* Quantity & Actions */}
                      <div className="flex items-center justify-between">
                        {/* Quantity Controls */}
                        <div className="flex items-center space-x-3 bg-gray-100 rounded-lg p-1">
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            className="w-8 h-8 bg-white rounded flex items-center justify-center hover:bg-gray-200 transition-colors"
                          >
                            <Minus className="h-4 w-4 text-gray-600" />
                          </button>
                          <span className="font-semibold w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            className="w-8 h-8 bg-white rounded flex items-center justify-center hover:bg-gray-200 transition-colors"
                          >
                            <Plus className="h-4 w-4 text-gray-600" />
                          </button>
                        </div>

                        {/* Move to Wishlist */}
                        <button
                          onClick={() => handleMoveToWishlist(item)}
                          className="flex items-center space-x-2 text-red-600 hover:text-red-700 hover:bg-red-50 px-4 py-2 rounded-lg transition-colors font-medium"
                        >
                          <Heart className="h-4 w-4" />
                          <span className="text-sm">Wishlist</span>
                        </button>

                        {/* Total Price */}
                        <div className="text-right">
                          <p className="text-xs text-gray-600 mb-1">Total</p>
                          <p className="text-xl font-bold text-gray-900">₹{(item.price * item.quantity).toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden sticky top-8">
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
                <h2 className="text-2xl font-bold flex items-center space-x-2">
                  <Zap className="h-6 w-6" />
                  <span>Order Summary</span>
                </h2>
              </div>

              <div className="p-6 space-y-6">
                {/* Coupon Code */}
                <div>
                  {appliedCoupon ? (
                    <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4 flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-green-800">{appliedCoupon.code}</p>
                        <p className="text-sm text-green-600">{appliedCoupon.discount}% OFF applied</p>
                      </div>
                      <button
                        onClick={handleRemoveCoupon}
                        className="text-green-600 hover:text-green-700 font-bold"
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="Enter coupon code"
                        className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                      />
                      <button
                        onClick={handleApplyCoupon}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                      >
                        Apply
                      </button>
                    </div>
                  )}
                  <p className="text-xs text-gray-500 mt-2">Try: MEGA10</p>
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3 border-t pt-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold">₹{subtotal.toLocaleString()}</span>
                  </div>
                  
                  {discount > 0 && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Discount</span>
                      <span className="font-semibold">-₹{discount.toLocaleString()}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-semibold">
                      {shipping === 0 ? (
                        <span className="text-green-600 font-bold">FREE</span>
                      ) : (
                        `₹${shipping.toLocaleString()}`
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax (18% GST)</span>
                    <span className="font-semibold">₹{tax.toLocaleString()}</span>
                  </div>

                  <div className="border-t pt-3">
                    <div className="flex justify-between">
                      <span className="font-bold text-gray-900">Total Amount</span>
                      <span className="text-2xl font-bold text-blue-600">₹{total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div className="bg-blue-50 rounded-lg p-4 space-y-3">
                  <div className="flex items-start space-x-3">
                    <Truck className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium text-gray-900">Free Shipping</p>
                      <p className="text-gray-600 text-xs">On orders above ₹999</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Shield className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium text-gray-900">100% Secure</p>
                      <p className="text-gray-600 text-xs">SSL encrypted payments</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Lock className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium text-gray-900">Safe Checkout</p>
                      <p className="text-gray-600 text-xs">Multiple payment options</p>
                    </div>
                  </div>
                </div>

                {/* Buttons */}
                <div className="space-y-3 pt-4">
                  <button
                    onClick={() => navigate('/checkout')}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-bold hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="h-5 w-5" />
                  </button>
                  <Link
                    to="/shop"
                    className="w-full bg-gray-100 text-gray-800 py-2.5 rounded-lg font-semibold hover:bg-gray-200 transition-colors text-center block"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
