import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Phone, Globe, Download, MessageCircle, HeadphonesIcon, MailIcon, Ticket, HelpCircle } from 'lucide-react';

const Footer = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  const popularCategories = [
    'Beauty', 'Home Appliances', 'Personal Care', 
    'Food & Beverages', 'Baby Care', 'Sports & Fitness', 
    'Gifts & Accessories'
  ];

  const categoryMap = {
    'Beauty': '/shop?category=beauty',
    'Home Appliances': '/shop?category=home-appliances',
    'Personal Care': '/shop?category=personal-care',
    'Food & Beverages': '/shop?category=food-beverages',
    'Baby Care': '/shop?category=baby-care',
    'Sports & Fitness': '/shop?category=sports-fitness',
    'Gifts & Accessories': '/shop?category=gifts-accessories'
  };

  const customerServices = [
    { name: 'Live Chat', icon: MessageCircle },
    { name: 'Toll-Free Number', icon: Phone },
    { name: 'Phone Support', icon: HeadphonesIcon },
    { name: 'Email Support', icon: MailIcon },
    { name: 'Support Ticket', icon: Ticket },
    { name: 'Customer Feedback Hotline', icon: HelpCircle }
  ];

  const handleCategoryClick = (category) => {
    const path = categoryMap[category] || '/shop';
    navigate(path);
  };

  const handleServiceClick = (serviceName) => {
    if (serviceName === 'Email Support') {
      window.location.href = 'mailto:support@megamart.com';
    } else if (serviceName === 'Toll-Free Number') {
      window.location.href = 'tel:+911234567890';
    } else if (serviceName === 'Phone Support') {
      window.location.href = 'tel:+911234567890';
    } else {
      navigate('/contact');
    }
  };

  const handleDownloadApp = () => {
    window.open('https://play.google.com/store/apps/details?id=com.megamart', '_blank');
  };

  return (
    <footer className="bg-gray-100 text-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Column 1 - Contact Us */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-gray-900">Contact Us</h3>
            <div className="space-y-3">
              <a 
                href="mailto:info@megamart.com" 
                className="flex items-center space-x-3 text-gray-600 hover:text-blue-600 transition-colors duration-200"
              >
                <Mail className="h-5 w-5" />
                <span>88888888888</span>
              </a>
              
              <a 
                href="tel:+911234567890" 
                className="flex items-center space-x-3 text-gray-600 hover:text-blue-600 transition-colors duration-200"
              >
                <Phone className="h-5 w-5" />
                <span>+91 ******</span>
              </a>
              
              <button 
                className="flex items-center space-x-3 text-gray-600 hover:text-blue-600 transition-colors duration-200"
              >
                <Globe className="h-5 w-5" />
                <span>created my robin</span>
              </button>
            </div>

            {/* Download App Section */}
            <div className="mt-8">
              <h4 className="font-semibold mb-3 text-gray-900">Download App</h4>
              <button 
                onClick={handleDownloadApp}
                className="flex items-center space-x-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-200"
              >
                <Download className="h-5 w-5" />
                <div className="text-left">
                  <div className="text-xs">GET IT ON</div>
                  <div className="text-sm font-semibold">Google Play</div>
                </div>
              </button>
            </div>
          </div>

          {/* Column 2 - Most Popular Categories */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-gray-900">Most Popular Categories</h3>
            <ul className="space-y-2">
              {popularCategories.map((category, index) => (
                <li key={index}>
                  <button 
                    className="text-gray-600 hover:text-blue-600 transition-colors duration-200 text-left"
                    onClick={() => handleCategoryClick(category)}
                  >
                    {category}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Customer Service */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-gray-900">Customer Service</h3>
            <ul className="space-y-2">
              {customerServices.map((service, index) => (
                <li key={index}>
                  <button 
                    className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors duration-200 text-left w-full"
                    onClick={() => handleServiceClick(service.name)}
                  >
                    <service.icon className="h-4 w-4 flex-shrink-0" />
                    <span>{service.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Horizontal Line */}
        <div className="border-t border-gray-300 mt-12 pt-8">
          <div className="text-center text-gray-600">
            <p>&copy; {currentYear} All rights reserved. Madeon Tech Ltd</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
