import React, { useState } from 'react';
import { useNotification } from '../contexts/NotificationContext';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, User, HelpCircle, FileText } from 'lucide-react';

const Contact = () => {
  const { showSuccess, showError, showInfo } = useNotification();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    orderNumber: '',
    priority: 'normal',
    category: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { id: 1, type: 'bot', text: 'Hello! Welcome to MegaMart Support. How can I help you today?' }
  ]);
  const [expandedFaq, setExpandedFaq] = useState(null);

  const contactInfo = [
    {
      icon: <Phone className="h-6 w-6" />,
      title: 'Call Us',
      details: ['+91 123 456 7890', '+91 098 765 4321'],
      description: 'Mon-Sat: 9AM-9PM, Sun: 10AM-6PM'
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: 'Email Us',
      details: ['support@megamart.com', 'orders@megamart.com'],
      description: 'We respond within 24 hours'
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: 'Visit Us',
      details: ['MegaMart Headquarters', '123 Tech Park, Bangalore'],
      description: 'Mon-Fri: 10AM-6PM'
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: 'Business Hours',
      details: ['Customer Service: 24/7', 'Office Hours: 9AM-6PM'],
      description: 'We\'re always here to help'
    }
  ];

  const stores = [
    {
      id: 1,
      name: 'MegaMart Bangalore',
      address: '123 Tech Park, Electronic City, Bangalore',
      pincode: '560100',
      phone: '+91 123 456 7890',
      email: 'bangalore@megamart.com',
      timings: '9AM-9PM',
      services: ['Pickup', 'Returns', 'Exchange'],
      coordinates: { lat: 12.9716, lng: 77.5946 }
    },
    {
      id: 2,
      name: 'MegaMart Mumbai',
      address: '456 Commercial St, Bandra, Mumbai',
      pincode: '400050',
      phone: '+91 987 654 3210',
      email: 'mumbai@megamart.com',
      timings: '10AM-8PM',
      services: ['Pickup', 'Returns', 'Exchange', 'Installation'],
      coordinates: { lat: 19.0760, lng: 72.8777 }
    },
    {
      id: 3,
      name: 'MegaMart Delhi',
      address: '789 Market Complex, Connaught Place, Delhi',
      pincode: '110001',
      phone: '+91 456 789 0123',
      email: 'delhi@megamart.com',
      timings: '9AM-9PM',
      services: ['Pickup', 'Returns', 'Exchange'],
      coordinates: { lat: 28.6139, lng: 77.2090 }
    }
  ];

  const faqs = [
    {
      question: 'How do I track my order?',
      answer: 'You can track your order by clicking on "Track Order" in the header or by logging into your account and viewing your order history.'
    },
    {
      question: 'What is your return policy?',
      answer: 'We offer 30-day return policy for most items. Products must be unused and in original packaging with all tags attached.'
    },
    {
      question: 'How do I cancel my order?',
      answer: 'You can cancel your order within 1 hour of placement. After that, please contact our customer support team.'
    },
    {
      question: 'Do you offer international shipping?',
      answer: 'Currently, we ship within India only. We plan to expand to international shipping soon.'
    },
    {
      question: 'How can I get a refund?',
      answer: 'Refunds are processed within 5-7 business days after we receive the returned item. The amount will be credited to your original payment method.'
    }
  ];

  const quickActions = [
    {
      icon: <FileText className="h-8 w-8" />,
      title: 'Track Order',
      description: 'Check your order status',
      action: 'track'
    },
    {
      icon: <HelpCircle className="h-8 w-8" />,
      title: 'Help Center',
      description: 'Browse our FAQs',
      action: 'help'
    },
    {
      icon: <MessageCircle className="h-8 w-8" />,
      title: 'Live Chat',
      description: 'Chat with our team',
      action: 'chat'
    },
    {
      icon: <User className="h-8 w-8" />,
      title: 'My Account',
      description: 'Manage your profile',
      action: 'account'
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate form
    if (!formData.name || !formData.email || !formData.message) {
      showError('Please fill in all required fields');
      setIsSubmitting(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      showError('Please enter a valid email address');
      setIsSubmitting(false);
      return;
    }

    // Phone validation (if provided)
    if (formData.phone && !/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      showError('Please enter a valid 10-digit phone number');
      setIsSubmitting(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      showSuccess('Your message has been sent successfully! We\'ll get back to you soon.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        orderNumber: '',
        priority: 'normal',
        category: 'general'
      });
      setIsSubmitting(false);
    }, 2000);
  };

  const handleChatSend = () => {
    if (!chatMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      text: chatMessage
    };

    setChatMessages(prev => [...prev, userMessage]);
    setChatMessage('');

    // Simulate bot response
    setTimeout(() => {
      const botResponses = [
        'Thank you for your message. Let me help you with that.',
        'I understand your concern. Let me connect you with the right department.',
        'That\'s a great question! Here\'s what I can tell you...',
        'I\'m here to help. Could you provide more details?',
        'Let me check that information for you.'
      ];

      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        text: botResponses[Math.floor(Math.random() * botResponses.length)]
      };

      setChatMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  const handleQuickAction = (action) => {
    switch (action) {
      case 'track':
        showInfo('Redirecting to order tracking...');
        break;
      case 'help':
        showInfo('Opening help center...');
        break;
      case 'chat':
        setIsChatOpen(true);
        break;
      case 'account':
        showInfo('Redirecting to account...');
        break;
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Contact Us
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We're here to help! Reach out to us through any of the following channels.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={() => handleQuickAction(action.action)}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-6 text-center group hover:-translate-y-1 border border-gray-100"
            >
              <div className="text-blue-600 mb-4 group-hover:scale-110 transition-transform">
                {action.icon}
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{action.title}</h3>
              <p className="text-sm text-gray-600">{action.description}</p>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="text-blue-600">
                      {info.icon}
                    </div>
                    <h3 className="font-semibold text-gray-900">{info.title}</h3>
                  </div>
                  <div className="space-y-1">
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-gray-700">{detail}</p>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 mt-2">{info.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-8 border border-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Order Number (if applicable)
                  </label>
                  <input
                    type="text"
                    name="orderNumber"
                    value={formData.orderNumber}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject *
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select a subject</option>
                  <option value="order">Order Related</option>
                  <option value="return">Return & Refund</option>
                  <option value="payment">Payment Issue</option>
                  <option value="product">Product Information</option>
                  <option value="technical">Technical Support</option>
                  <option value="feedback">Feedback</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* FAQs */}
        <div className="bg-white rounded-lg shadow-md p-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-200 pb-4 last:border-0">
                <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-600 text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Live Chat Widget */}
      <div className={`fixed bottom-4 right-4 z-50 ${isChatOpen ? 'w-96 h-[500px]' : ''}`}>
        {!isChatOpen && (
          <button
            onClick={() => setIsChatOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            <MessageCircle className="h-6 w-6 group-hover:scale-110 transition-transform" />
          </button>
        )}

        {isChatOpen && (
          <div className="bg-white rounded-lg shadow-2xl border border-gray-200 h-full flex flex-col">
            {/* Chat Header */}
            <div className="bg-blue-600 text-white p-4 rounded-t-lg flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <MessageCircle className="h-5 w-5" />
                <span className="font-semibold">Live Chat Support</span>
              </div>
              <button
                onClick={() => setIsChatOpen(false)}
                className="text-white hover:bg-white/20 p-1 rounded"
              >
                ×
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3">
              {chatMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-2 rounded-lg ${
                      message.type === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleChatSend()}
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  onClick={handleChatSend}
                  className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Contact;
