import React from 'react';
import { useNavigate } from 'react-router-dom';
import { brands } from '../constants/products';

const Brands = () => {
  const navigate = useNavigate();

  const handleBrandClick = (brandName) => {
    navigate(`/shop?brand=${encodeURIComponent(brandName)}`);
  };

  return (
    <section id="brands" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Top Electronics Brands
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </div>

        {/* Brands Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {brands.map((brand) => (
            <button
              key={brand.id}
              onClick={() => handleBrandClick(brand.name)}
              className={`
                ${brand.bgColor} ${brand.textColor}
                rounded-2xl p-8 md:p-12
                transform transition-all duration-300 hover:scale-105 hover:shadow-2xl
                relative overflow-hidden group
              `}
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -mr-16 -mt-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full -ml-12 -mb-12"></div>
              </div>

              {/* Content */}
              <div className="relative z-10 text-center">
                {/* Discount Text */}
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
                  {brand.discount}
                </div>

                {/* Brand Logo Placeholder */}
                <div className="w-24 h-24 md:w-32 md:h-32 bg-white bg-opacity-20 rounded-full mx-auto mb-6 flex items-center justify-center backdrop-blur-sm border-2 border-white border-opacity-30">
                  <span className="text-3xl md:text-4xl font-bold">
                    {brand.name.charAt(0).toUpperCase()}
                  </span>
                </div>

                {/* Brand Name */}
                <div className="text-xl md:text-2xl font-bold uppercase tracking-wider">
                  {brand.name}
                </div>

                {/* Shop Now Button */}
                <div className="mt-6">
                  <span className="inline-block bg-white text-gray-800 px-6 py-2 rounded-full font-semibold text-sm group-hover:bg-gray-100 transition-colors duration-200">
                    Shop Now →
                  </span>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-4 left-4 w-4 h-4 bg-white rounded-full opacity-50"></div>
              <div className="absolute bottom-4 right-4 w-4 h-4 bg-white rounded-full opacity-50"></div>
            </button>
          ))}
        </div>

        {/* View All Brands Button */}
        <div className="text-center mt-12">
          <button className="btn-secondary">
            View All Brands
          </button>
        </div>
      </div>
    </section>
  );
};

export default Brands;
