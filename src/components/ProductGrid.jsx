import React from 'react';
import { smartphones } from '../constants/products';
import ProductCard from './ProductCard';

const ProductGrid = () => {
  return (
    <section id="smartphones" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Grab the best deal on Smartphones
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-6">
          {smartphones.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-12">
          <button className="btn-secondary">
            View All Products
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
