import React from 'react';

const TopBrands = () => {
  const brands = [
    { name: 'Samsung', logo: '📱' },
    { name: 'Apple', logo: '🍎' },
    { name: 'Nike', logo: '👟' },
    { name: 'Adidas', logo: '👕' },
    { name: 'Sony', logo: '📺' },
    { name: 'LG', logo: '🏠' },
    { name: 'Philips', logo: '💡' },
    { name: 'HP', logo: '💻' },
    { name: 'Dell', logo: '🖥️' },
    { name: 'Canon', logo: '📷' },
    { name: 'Puma', logo: '🏃' },
    { name: 'Reebok', logo: '🏋️' }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Top Electronics Brands
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {brands.map((brand, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 p-6 text-center cursor-pointer group hover:-translate-y-1 border border-gray-100"
            >
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                {brand.logo}
              </div>
              <h3 className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                {brand.name}
              </h3>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105">
            View All Brands
          </button>
        </div>
      </div>
    </section>
  );
};

export default TopBrands;
