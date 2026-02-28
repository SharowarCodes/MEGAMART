import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const CustomerReviews = () => {
  const [currentReview, setCurrentReview] = useState(0);

  const reviews = [
    {
      id: 1,
      name: 'Priya Sharma',
      rating: 5,
      review: 'Excellent service and amazing products! The delivery was super fast and the quality exceeded my expectations. Will definitely shop again!',
      avatar: '👩',
      date: '2 days ago',
      verified: true
    },
    {
      id: 2,
      name: 'Rahul Verma',
      rating: 5,
      review: 'Best online shopping experience! Great prices, authentic products, and amazing customer support. MegaMart has become my go-to shopping destination.',
      avatar: '👨',
      date: '1 week ago',
      verified: true
    },
    {
      id: 3,
      name: 'Anjali Patel',
      rating: 4,
      review: 'Very satisfied with my purchase. The product quality is excellent and the packaging was secure. Only minor issue was delivery delay by 1 day.',
      avatar: '👩',
      date: '2 weeks ago',
      verified: true
    },
    {
      id: 4,
      name: 'Amit Kumar',
      rating: 5,
      review: 'Outstanding service! The return policy is very customer-friendly and the refund process is quick. Highly recommend MegaMart to everyone.',
      avatar: '👨',
      date: '3 weeks ago',
      verified: true
    }
  ];

  const nextReview = () => {
    setCurrentReview((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-5 w-5 ${
          i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Customer Reviews
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Review Card */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 shadow-lg">
              <div className="flex items-start space-x-4">
                {/* Avatar */}
                <div className="text-5xl">{reviews[currentReview].avatar}</div>
                
                {/* Review Content */}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">
                        {reviews[currentReview].name}
                      </h3>
                      <div className="flex items-center space-x-2">
                        <div className="flex">
                          {renderStars(reviews[currentReview].rating)}
                        </div>
                        {reviews[currentReview].verified && (
                          <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded-full">
                            ✓ Verified Purchase
                          </span>
                        )}
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">
                      {reviews[currentReview].date}
                    </span>
                  </div>
                  
                  <p className="text-gray-700 text-lg leading-relaxed">
                    "{reviews[currentReview].review}"
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-6">
              <button
                onClick={prevReview}
                className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow"
                aria-label="Previous review"
              >
                <ChevronLeft className="h-6 w-6 text-gray-600" />
              </button>
              
              {/* Dots */}
              <div className="flex space-x-2">
                {reviews.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentReview(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentReview
                        ? 'bg-blue-600 w-8'
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`Go to review ${index + 1}`}
                  />
                ))}
              </div>
              
              <button
                onClick={nextReview}
                className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow"
                aria-label="Next review"
              >
                <ChevronRight className="h-6 w-6 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Overall Rating */}
          <div className="mt-12 text-center">
            <div className="inline-block bg-gray-50 rounded-xl p-6">
              <div className="text-4xl font-bold text-gray-900 mb-2">4.8</div>
              <div className="flex justify-center mb-2">
                {renderStars(5)}
              </div>
              <p className="text-gray-600">Based on {Math.floor(Math.random() * 10000 + 5000)}+ reviews</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;
