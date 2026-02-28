import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useUser } from '../contexts/UserContext';
import { useNotification } from '../contexts/NotificationContext';
import { CreditCard, Smartphone, Truck, MapPin, Lock, ArrowRight, ArrowLeft, Check } from 'lucide-react';

const Checkout = () => {
  const location = useLocation();
  const { items, clearCart } = useCart();
  const { user, addOrder } = useUser();
  const { showSuccess, showError } = useNotification();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');
  
  // Form states
  const [shippingAddress, setShippingAddress] = useState({
    fullName: user?.name || '',
    phone: user?.phone || '',
    email: user?.email || '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    landmark: ''
  });
  
  const [billingAddress, setBillingAddress] = useState({
    sameAsShipping: true,
    fullName: user?.name || '',
    phone: user?.phone || '',
    email: user?.email || '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    landmark: ''
  });
  
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: ''
  });
  
  const [upiDetails, setUpiDetails] = useState({
    upiId: ''
  });

  // Get selected items from location state or use all cart items
  const selectedItems = location.state?.selectedItems || items;
  const subtotal = selectedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = Math.round(subtotal * 0.18);
  const shipping = subtotal > 999 ? 0 : 50;
  const total = subtotal + tax + shipping;

  const steps = [
    { id: 1, name: 'Shipping', icon: <MapPin className="h-5 w-5" /> },
    { id: 2, name: 'Payment', icon: <CreditCard className="h-5 w-5" /> },
    { id: 3, name: 'Review', icon: <Check className="h-5 w-5" /> }
  ];

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    
    // Validate shipping address
    if (!shippingAddress.fullName || !shippingAddress.phone || !shippingAddress.address || 
        !shippingAddress.city || !shippingAddress.state || !shippingAddress.pincode) {
      showError('Please fill in all required shipping address fields');
      return;
    }
    
    // Validate phone number
    if (!/^\d{10}$/.test(shippingAddress.phone.replace(/\D/g, ''))) {
      showError('Please enter a valid 10-digit phone number');
      return;
    }
    
    // Validate pincode
    if (!/^\d{6}$/.test(shippingAddress.pincode)) {
      showError('Please enter a valid 6-digit pincode');
      return;
    }
    
    // If billing is same as shipping, copy the data
    if (billingAddress.sameAsShipping) {
      setBillingAddress({
        ...shippingAddress,
        sameAsShipping: true
      });
    } else {
      // Validate billing address if different
      if (!billingAddress.fullName || !billingAddress.phone || !billingAddress.address || 
          !billingAddress.city || !billingAddress.state || !billingAddress.pincode) {
        showError('Please fill in all required billing address fields');
        return;
      }
    }
    
    setCurrentStep(2);
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    
    if (paymentMethod === 'card') {
      if (!cardDetails.cardNumber || !cardDetails.expiryDate || !cardDetails.cvv || !cardDetails.nameOnCard) {
        showError('Please fill in all card details');
        return;
      }
      
      // Validate card number (basic)
      if (!/^\d{16}$/.test(cardDetails.cardNumber.replace(/\s/g, ''))) {
        showError('Please enter a valid 16-digit card number');
        return;
      }
      
      // Validate CVV
      if (!/^\d{3}$/.test(cardDetails.cvv)) {
        showError('Please enter a valid 3-digit CVV');
        return;
      }
    } else if (paymentMethod === 'upi') {
      if (!upiDetails.upiId) {
        showError('Please enter your UPI ID');
        return;
      }
      
      // Basic UPI validation
      if (!/^[a-zA-Z0-9._-]+@[a-zA-Z]{3,}$/.test(upiDetails.upiId)) {
        showError('Please enter a valid UPI ID');
        return;
      }
    }
    
    setCurrentStep(3);
  };

  const handlePlaceOrder = () => {
    // Generate order ID
    const newOrderId = 'MM' + Date.now();
    setOrderId(newOrderId);
    
    // Create order object
    const order = {
      id: newOrderId,
      items: selectedItems,
      shippingAddress,
      billingAddress: billingAddress.sameAsShipping ? shippingAddress : billingAddress,
      paymentMethod,
      subtotal,
      tax,
      shipping,
      total,
      status: 'confirmed',
      date: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString() // 5 days from now
    };
    
    // Add order to user context
    addOrder(order);
    
    // Clear cart
    clearCart();
    
    // Show success and move to confirmation
    showSuccess('Order placed successfully!');
    setOrderPlaced(true);
  };

  const renderShippingStep = () => (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Shipping Address</h2>
      
      <form onSubmit={handleAddressSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              value={shippingAddress.fullName}
              onChange={(e) => setShippingAddress({...shippingAddress, fullName: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number *
            </label>
            <input
              type="tel"
              value={shippingAddress.phone}
              onChange={(e) => setShippingAddress({...shippingAddress, phone: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="10-digit mobile number"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              value={shippingAddress.email}
              onChange={(e) => setShippingAddress({...shippingAddress, email: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Pincode *
            </label>
            <input
              type="text"
              value={shippingAddress.pincode}
              onChange={(e) => setShippingAddress({...shippingAddress, pincode: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="6-digit pincode"
              maxLength={6}
              required
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Street Address *
          </label>
          <input
            type="text"
            value={shippingAddress.address}
            onChange={(e) => setShippingAddress({...shippingAddress, address: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="House number, street name"
            required
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              City *
            </label>
            <input
              type="text"
              value={shippingAddress.city}
              onChange={(e) => setShippingAddress({...shippingAddress, city: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              State *
            </label>
            <input
              type="text"
              value={shippingAddress.state}
              onChange={(e) => setShippingAddress({...shippingAddress, state: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Landmark (Optional)
          </label>
          <input
            type="text"
            value={shippingAddress.landmark}
            onChange={(e) => setShippingAddress({...shippingAddress, landmark: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Nearby landmark, building name, etc."
          />
        </div>
        
        <div className="border-t pt-6">
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="sameAsShipping"
              checked={billingAddress.sameAsShipping}
              onChange={(e) => setBillingAddress({...billingAddress, sameAsShipping: e.target.checked})}
              className="rounded text-blue-600"
            />
            <label htmlFor="sameAsShipping" className="ml-2 text-sm text-gray-700">
              Billing address is same as shipping address
            </label>
          </div>
          
          {!billingAddress.sameAsShipping && (
            <div className="space-y-6 bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-900">Billing Address</h3>
              {/* Similar address fields for billing */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={billingAddress.fullName}
                    onChange={(e) => setBillingAddress({...billingAddress, fullName: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={billingAddress.phone}
                    onChange={(e) => setBillingAddress({...billingAddress, phone: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <span>Continue to Payment</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </form>
    </div>
  );

  const renderPaymentStep = () => (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Payment Method</h2>
      
      <form onSubmit={handlePaymentSubmit} className="space-y-6">
        {/* Payment Method Selection */}
        <div className="space-y-4">
          <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
            <input
              type="radio"
              name="paymentMethod"
              value="cod"
              checked={paymentMethod === 'cod'}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="mr-3"
            />
            <Truck className="h-6 w-6 text-gray-600 mr-3" />
            <div>
              <div className="font-medium">Cash on Delivery</div>
              <div className="text-sm text-gray-500">Pay when you receive your order</div>
            </div>
          </label>
          
          <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
            <input
              type="radio"
              name="paymentMethod"
              value="card"
              checked={paymentMethod === 'card'}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="mr-3"
            />
            <CreditCard className="h-6 w-6 text-gray-600 mr-3" />
            <div>
              <div className="font-medium">Credit/Debit Card</div>
              <div className="text-sm text-gray-500">Visa, Mastercard, Rupay</div>
            </div>
          </label>
          
          <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
            <input
              type="radio"
              name="paymentMethod"
              value="upi"
              checked={paymentMethod === 'upi'}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="mr-3"
            />
            <Smartphone className="h-6 w-6 text-gray-600 mr-3" />
            <div>
              <div className="font-medium">UPI Payment</div>
              <div className="text-sm text-gray-500">Google Pay, PhonePe, Paytm</div>
            </div>
          </label>
        </div>
        
        {/* Card Payment Form */}
        {paymentMethod === 'card' && (
          <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium text-gray-900">Card Details</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Card Number *
              </label>
              <input
                type="text"
                value={cardDetails.cardNumber}
                onChange={(e) => setCardDetails({...cardDetails, cardNumber: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="1234 5678 9012 3456"
                maxLength={19}
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expiry Date *
                </label>
                <input
                  type="text"
                  value={cardDetails.expiryDate}
                  onChange={(e) => setCardDetails({...cardDetails, expiryDate: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="MM/YY"
                  maxLength={5}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  CVV *
                </label>
                <input
                  type="text"
                  value={cardDetails.cvv}
                  onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="123"
                  maxLength={3}
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name on Card *
              </label>
              <input
                type="text"
                value={cardDetails.nameOnCard}
                onChange={(e) => setCardDetails({...cardDetails, nameOnCard: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="John Doe"
                required
              />
            </div>
          </div>
        )}
        
        {/* UPI Payment Form */}
        {paymentMethod === 'upi' && (
          <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium text-gray-900">UPI Details</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                UPI ID *
              </label>
              <input
                type="text"
                value={upiDetails.upiId}
                onChange={(e) => setUpiDetails({...upiDetails, upiId: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="yourname@upi"
                required
              />
            </div>
          </div>
        )}
        
        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => setCurrentStep(1)}
            className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors flex items-center space-x-2"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back</span>
          </button>
          
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <span>Review Order</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </form>
    </div>
  );

  const renderReviewStep = () => (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Order Review</h2>
      
      <div className="space-y-6">
        {/* Order Items */}
        <div>
          <h3 className="font-medium text-gray-900 mb-4">Order Items ({selectedItems.length})</h3>
          <div className="space-y-3">
            {selectedItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between py-3 border-b">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                    <span className="text-gray-500 text-xs">Image</span>
                  </div>
                  <div>
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">₹{item.price * item.quantity}</div>
                  <div className="text-sm text-gray-500 line-through">₹{item.originalPrice * item.quantity}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Shipping Address */}
        <div>
          <h3 className="font-medium text-gray-900 mb-4">Shipping Address</h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="font-medium">{shippingAddress.fullName}</p>
            <p className="text-gray-600">{shippingAddress.address}</p>
            <p className="text-gray-600">{shippingAddress.city}, {shippingAddress.state} - {shippingAddress.pincode}</p>
            <p className="text-gray-600">Phone: {shippingAddress.phone}</p>
            {shippingAddress.landmark && <p className="text-gray-600">Landmark: {shippingAddress.landmark}</p>}
          </div>
        </div>
        
        {/* Payment Method */}
        <div>
          <h3 className="font-medium text-gray-900 mb-4">Payment Method</h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center space-x-3">
              {paymentMethod === 'cod' && <Truck className="h-5 w-5 text-gray-600" />}
              {paymentMethod === 'card' && <CreditCard className="h-5 w-5 text-gray-600" />}
              {paymentMethod === 'upi' && <Smartphone className="h-5 w-5 text-gray-600" />}
              <span className="capitalize">
                {paymentMethod === 'cod' ? 'Cash on Delivery' : 
                 paymentMethod === 'card' ? 'Credit/Debit Card' : 'UPI Payment'}
              </span>
            </div>
          </div>
        </div>
        
        {/* Price Summary */}
        <div className="border-t pt-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>₹{subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Tax (18%)</span>
              <span>₹{tax.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Shipping</span>
              <span>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
            </div>
            <div className="flex justify-between font-bold text-lg pt-2 border-t">
              <span>Total</span>
              <span>₹{total.toLocaleString()}</span>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => setCurrentStep(2)}
            className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors flex items-center space-x-2"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back</span>
          </button>
          
          <button
            onClick={handlePlaceOrder}
            className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center space-x-2"
          >
            <Check className="h-5 w-5" />
            <span>Place Order</span>
          </button>
        </div>
      </div>
    </div>
  );

  const renderOrderConfirmation = () => (
    <div className="bg-white rounded-lg shadow-sm p-8 text-center">
      <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
        <Check className="h-10 w-10 text-green-600" />
      </div>
      
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Order Confirmed!</h1>
      <p className="text-gray-600 mb-6">
        Your order has been successfully placed. Order ID: <span className="font-mono font-bold">{orderId}</span>
      </p>
      
      <div className="bg-gray-50 p-6 rounded-lg mb-6 text-left max-w-md mx-auto">
        <h3 className="font-medium text-gray-900 mb-4">Order Details</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Order ID:</span>
            <span className="font-mono">{orderId}</span>
          </div>
          <div className="flex justify-between">
            <span>Total Amount:</span>
            <span>₹{total.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Payment Method:</span>
            <span className="capitalize">
              {paymentMethod === 'cod' ? 'Cash on Delivery' : 
               paymentMethod === 'card' ? 'Card Payment' : 'UPI Payment'}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Estimated Delivery:</span>
            <span>5-7 business days</span>
          </div>
        </div>
      </div>
      
      <div className="space-y-3">
        <Link
          to="/account/orders"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Track Order
        </Link>
        
        <Link
          to="/shop"
          className="inline-block bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors ml-3"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          {renderOrderConfirmation()}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Checkout</h1>
          
          {/* Progress Steps */}
          <div className="flex items-center justify-between max-w-2xl">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  currentStep >= step.id 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {step.icon}
                </div>
                <div className="ml-3">
                  <div className={`text-sm font-medium ${
                    currentStep >= step.id ? 'text-blue-600' : 'text-gray-600'
                  }`}>
                    {step.name}
                  </div>
                </div>
                
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-4 ${
                    currentStep > step.id ? 'bg-blue-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {currentStep === 1 && renderShippingStep()}
            {currentStep === 2 && renderPaymentStep()}
            {currentStep === 3 && renderReviewStep()}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span>Subtotal ({selectedItems.length} items)</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tax (18%)</span>
                  <span>₹{tax.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>₹{total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <Truck className="h-4 w-4" />
                  <span>Free shipping on orders above ₹999</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Lock className="h-4 w-4" />
                  <span>Secure payment processing</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
