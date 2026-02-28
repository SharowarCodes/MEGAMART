import React from 'react';
import { Link } from 'react-router-dom';

const FeaturedCategories = ({ categories }) => {
  const featuredCategories = categories.slice(0, 12);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Shop by Category
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {featuredCategories.map((category) => (
            <Link
              key={category.id}
              to={`/shop/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
              className="group cursor-pointer"
            >
              <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 text-center border border-gray-100 group-hover:border-blue-300 group-hover:-translate-y-1">
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  {category.icon}
                </div>
                <h3 className="font-semibold text-gray-800 mb-1 group-hover:text-blue-600 transition-colors">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {category.productCount} products
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/categories"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105"
          >
            View All Categories
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
