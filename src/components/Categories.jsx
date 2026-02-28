import React from 'react';
import { useNavigate } from 'react-router-dom';
import { categories } from '../constants/products';

const Categories = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryName) => {
    const categoryPath = categoryName.toLowerCase().replace(/\s+/g, '-');
    navigate(`/shop/${categoryPath}`);
  };

  const handleBrowseAll = () => {
    navigate('/shop');
  };

  return (
    <section id="categories" className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Shop from Top Categories
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.name)}
              className={`
                ${category.color}
                px-4 py-3 rounded-full font-medium text-sm
                transform transition-all duration-200 hover:scale-105 hover:shadow-md
                flex flex-col items-center justify-center space-y-2
                min-h-[100px] group
              `}
            >
              <span className="text-2xl group-hover:scale-110 transition-transform duration-200">
                {category.icon}
              </span>
              <span className="text-xs sm:text-sm font-semibold">
                {category.name}
              </span>
            </button>
          ))}
        </div>

        {/* Browse All Button */}
        <div className="text-center mt-12">
          <button 
            onClick={handleBrowseAll}
            className="btn-primary"
          >
            Browse All Categories
          </button>
        </div>
      </div>
    </section>
  );
};

export default Categories;
