import React, { useState, useEffect } from 'react';
import { X, Tag, Gift, Truck } from 'lucide-react';
import { useNotification } from '../../contexts/NotificationContext';

const AnnouncementBar = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const { showSuccess } = useNotification();

  const announcements = [
    {
      id: 1,
      text: '🎉 MEGA SALE: Up to 80% OFF on Electronics!',
      coupon: 'MEGA80',
      icon: <Tag className="h-4 w-4" />
    },
    {
      id: 2,
      text: '🚚 FREE Delivery on orders above ₹999',
      coupon: 'FREESHIP',
      icon: <Truck className="h-4 w-4" />
    },
    {
      id: 3,
      text: '🎁 Exclusive: Get 10% OFF on your first order',
      coupon: 'FIRST10',
      icon: <Gift className="h-4 w-4" />
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [announcements.length]);

  const handleApplyCoupon = (coupon) => {
    // Copy coupon to clipboard
    navigator.clipboard.writeText(coupon);
    showSuccess(`Coupon ${coupon} copied and applied!`);
  };

  const handleClose = () => {
    setIsVisible(false);
    // Save to localStorage that user closed it
    localStorage.setItem('megamart_announcement_closed', 'true');
  };

  useEffect(() => {
    // Check if user previously closed the announcement
    const wasClosed = localStorage.getItem('megamart_announcement_closed');
    if (wasClosed === 'true') {
      setIsVisible(false);
    }
  }, []);

  if (!isVisible) {
    return null;
  }

  const currentAnnouncement = announcements[currentIndex];

  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 relative overflow-hidden">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3 flex-1">
          {currentAnnouncement.icon}
          <span className="text-sm font-medium">
            {currentAnnouncement.text}
          </span>
          <button
            onClick={() => handleApplyCoupon(currentAnnouncement.coupon)}
            className="ml-4 bg-white text-blue-600 px-3 py-1 rounded-full text-xs font-bold hover:bg-gray-100 transition-colors"
          >
            Apply {currentAnnouncement.coupon}
          </button>
        </div>
        
        {/* Navigation dots */}
        <div className="flex items-center space-x-2 mx-4">
          {announcements.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>

        <button
          onClick={handleClose}
          className="p-1 hover:bg-white/20 rounded-full transition-colors"
          aria-label="Close announcement"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default AnnouncementBar;
