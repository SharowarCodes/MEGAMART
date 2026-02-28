import React, { useState } from 'react';
import { Mail, Gift, Bell } from 'lucide-react';
import { useNotification } from '../../contexts/NotificationContext';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { showSuccess, showError } = useNotification();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!email) {
      showError('Please enter your email address');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showError('Please enter a valid email address');
      return;
    }

    // Simulate subscription
    setIsSubscribed(true);
    showSuccess('Successfully subscribed to our newsletter!');
    setEmail('');
  };

  const benefits = [
    {
      icon: <Gift className="h-6 w-6" />,
      title: 'Exclusive Offers',
      description: 'Get access to member-only deals and discounts'
    },
    {
      icon: <Bell className="h-6 w-6" />,
      title: 'New Arrivals',
      description: 'Be the first to know about new products and launches'
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: 'Weekly Updates',
      description: 'Receive curated recommendations and shopping tips'
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Stay in the Loop
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Subscribe to our newsletter and never miss amazing deals!
            </p>
          </div>

          {/* Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-3">
                  <div className="bg-white/20 p-3 rounded-full">
                    {benefit.icon}
                  </div>
                </div>
                <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
                <p className="text-blue-100 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>

          {/* Subscription Form */}
          <div className="bg-white rounded-2xl p-8 shadow-xl">
            {!isSubscribed ? (
              <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 whitespace-nowrap"
                  >
                    Subscribe Now
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-3 text-center">
                  By subscribing, you agree to our Privacy Policy and Terms of Service.
                </p>
              </form>
            ) : (
              <div className="text-center py-8">
                <div className="text-green-600 text-6xl mb-4">🎉</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Thank You for Subscribing!
                </h3>
                <p className="text-gray-600">
                  Check your email for a special welcome offer.
                </p>
              </div>
            )}
          </div>

          {/* Social Proof */}
          <div className="mt-12 text-center">
            <div className="flex items-center justify-center space-x-8 text-blue-100">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">50K+</div>
                <div className="text-sm">Happy Subscribers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">98%</div>
                <div className="text-sm">Satisfaction Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">4.9★</div>
                <div className="text-sm">Email Rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
