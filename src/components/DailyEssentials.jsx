import React from 'react';
import { dailyEssentials } from '../constants/products';

const DailyEssentials = () => {
  const handleProductClick = (productName) => {
    console.log(`Clicked on product: ${productName}`);
  };

  return (
    <section id="essentials" className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Daily Essentials
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </div>

        {/* 50% OFF Row */}
        <div className="mb-12">
          <div className="text-center mb-6">
            <span className="inline-block bg-green-100 text-green-800 px-4 py-2 rounded-full font-bold text-lg">
              UP to 50% OFF
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {dailyEssentials.fiftyOff.map((product) => (
              <button
                key={product.id}
                onClick={() => handleProductClick(product.name)}
                className="card p-6 text-center group hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-200">
                  {product.icon}
                </div>
                <div className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors duration-200">
                  {product.name}
                </div>
                <div className="mt-2">
                  <span className="inline-block bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    50% OFF
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 80% OFF Row */}
        <div>
          <div className="text-center mb-6">
            <span className="inline-block bg-orange-100 text-orange-800 px-4 py-2 rounded-full font-bold text-lg">
              UP to 80% OFF
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
            {dailyEssentials.eightyOff.map((product) => (
              <button
                key={product.id}
                onClick={() => handleProductClick(product.name)}
                className="card p-6 text-center group hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-200">
                  {product.icon}
                </div>
                <div className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors duration-200">
                  {product.name}
                </div>
                <div className="mt-2">
                  <span className="inline-block bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    80% OFF
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Shop All Essentials Button */}
        <div className="text-center mt-12">
          <button className="btn-primary">
            Shop All Essentials
          </button>
        </div>
      </div>
    </section>
  );
};

export default DailyEssentials;
