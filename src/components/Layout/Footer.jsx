import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, Heart, Shield, Truck, Clock } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const footerSections = [
    {
      title: 'Shop',
      links: [
        { name: 'All Products', to: '/shop' },
        { name: 'New Arrivals', to: '/shop?filter=new' },
        { name: 'Best Sellers', to: '/shop?filter=bestselling' },
        { name: 'Deals & Offers', to: '/deals' },
        { name: 'Gift Cards', to: '/gift-cards' }
      ]
    },
    {
      title: 'Categories',
      links: [
        { name: 'Electronics', to: '/shop/electronics' },
        { name: 'Beauty', to: '/shop/beauty' },
        { name: 'Home Appliances', to: '/shop/home-appliances' },
        { name: 'Baby Care', to: '/shop/baby-care' },
        { name: 'Sports & Fitness', to: '/shop/sports-fitness' },
        { name: 'Food & Beverages', to: '/shop/food-beverages' }
      ]
    },
    {
      title: 'Customer Service',
      links: [
        { name: 'Contact Us', to: '/contact' },
        { name: 'Track Order', to: '/account/orders' },
        { name: 'Returns & Refunds', to: '/returns' },
        { name: 'Shipping Info', to: '/shipping' },
        { name: 'Size Guide', to: '/size-guide' }
      ]
    },
    {
      title: 'About',
      links: [
        { name: 'About MegaMart', to: '/about' },
        { name: 'Careers', to: '/careers' },
        { name: 'Press', to: '/press' },
        { name: 'Sustainability', to: '/sustainability' },
        { name: 'Investor Relations', to: '/investors' }
      ]
    }
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Youtube, href: '#', label: 'YouTube' }
  ];

  const paymentMethods = [
    { name: 'Visa', icon: '💳' },
    { name: 'Mastercard', icon: '💳' },
    { name: 'UPI', icon: '📱' },
    { name: 'Paytm', icon: '💰' },
    { name: 'COD', icon: '💵' }
  ];

  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white">
      <div className="max-w-[1170px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Logo and Description */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                MegaMart
              </h3>
              <p className="text-gray-300 mt-2 text-sm leading-relaxed">
                Your trusted online shopping destination for quality products at unbeatable prices. 
                Shop with confidence, shop with MegaMart.
              </p>
            </div>
            
            {/* Social Links */}
            <div className="flex space-x-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 bg-gray-700 hover:bg-blue-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h4 className="text-lg font-semibold mb-4 text-white">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      to={link.to}
                      className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Features Section */}
        <div className="border-t border-gray-700 pt-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                <Truck className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-semibold">Free Shipping</p>
                <p className="text-gray-400 text-sm">On orders above ₹999</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-semibold">Secure Payment</p>
                <p className="text-gray-400 text-sm">100% secure transactions</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-semibold">24/7 Support</p>
                <p className="text-gray-400 text-sm">Always here to help</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-semibold">Best Quality</p>
                <p className="text-gray-400 text-sm">Premium products only</p>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-gray-700 pt-8 mb-8">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold mb-2">Stay Updated</h3>
              <p className="text-gray-300">
                Subscribe to our newsletter for exclusive deals and new product alerts
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:shadow-lg">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="border-t border-gray-700 pt-8 mb-8">
          <div className="text-center">
            <p className="text-gray-400 mb-4 text-sm">We Accept</p>
            <div className="flex flex-wrap justify-center items-center gap-4">
              {paymentMethods.map((method, index) => (
                <div key={index} className="flex items-center space-x-2 bg-gray-800 px-3 py-2 rounded-lg">
                  <span className="text-xl">{method.icon}</span>
                  <span className="text-sm text-gray-300">{method.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* App Download */}
        <div className="border-t border-gray-700 pt-8 mb-8">
          <div className="text-center">
            <p className="text-gray-400 mb-4 text-sm">Download Our App</p>
            <div className="flex justify-center space-x-4">
              <button className="bg-gray-800 hover:bg-gray-700 px-6 py-3 rounded-lg transition-colors duration-200">
                <span className="text-sm">📱 App Store</span>
              </button>
              <button className="bg-gray-800 hover:bg-gray-700 px-6 py-3 rounded-lg transition-colors duration-200">
                <span className="text-sm">🤖 Google Play</span>
              </button>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="border-t border-gray-700 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex items-center justify-center space-x-3">
              <Phone className="w-5 h-5 text-blue-400" />
              <div>
                <p className="font-semibold">Customer Care</p>
                <p className="text-gray-400 text-sm">+91 123 456 7890</p>
              </div>
            </div>
            
            <div className="flex items-center justify-center space-x-3">
              <Mail className="w-5 h-5 text-blue-400" />
              <div>
                <p className="font-semibold">Email Support</p>
                <p className="text-gray-400 text-sm">support@megamart.com</p>
              </div>
            </div>
            
            <div className="flex items-center justify-center space-x-3">
              <MapPin className="w-5 h-5 text-blue-400" />
              <div>
                <p className="font-semibold">Corporate Office</p>
                <p className="text-gray-400 text-sm">Mumbai, India</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-700">
        <div className="max-w-[1170px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © {currentYear} MegaMart. All rights reserved.
            </div>
            
            <div className="flex flex-wrap justify-center md:justify-end space-x-6 text-sm">
              <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link to="/cookies" className="text-gray-400 hover:text-white transition-colors">
                Cookie Policy
              </Link>
              <Link to="/sitemap" className="text-gray-400 hover:text-white transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
