import React from 'react';

export const ProductSkeleton = () => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
    <div className="aspect-square bg-gray-200"></div>
    <div className="p-4 space-y-3">
      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      <div className="flex items-center space-x-2">
        <div className="h-4 bg-gray-200 rounded w-20"></div>
        <div className="h-4 bg-gray-200 rounded w-16"></div>
      </div>
      <div className="space-y-2">
        <div className="h-6 bg-gray-200 rounded w-1/2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/3"></div>
      </div>
      <div className="flex space-x-2">
        <div className="h-10 bg-gray-200 rounded flex-1"></div>
        <div className="h-10 bg-gray-200 rounded flex-1"></div>
      </div>
    </div>
  </div>
);

export const CategorySkeleton = () => (
  <div className="bg-white rounded-lg shadow-md p-6 animate-pulse">
    <div className="aspect-square bg-gray-200 rounded-lg mb-4"></div>
    <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
  </div>
);

export const ReviewSkeleton = () => (
  <div className="bg-white rounded-lg p-6 shadow-sm animate-pulse">
    <div className="flex items-start space-x-4">
      <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
      <div className="flex-1 space-y-3">
        <div className="h-4 bg-gray-200 rounded w-1/3"></div>
        <div className="h-3 bg-gray-200 rounded w-full"></div>
        <div className="h-3 bg-gray-200 rounded w-4/5"></div>
      </div>
    </div>
  </div>
);

export const HeroSkeleton = () => (
  <div className="relative h-96 md:h-[500px] lg:h-[600px] overflow-hidden animate-pulse">
    <div className="absolute inset-0 bg-gradient-to-r from-gray-300 to-gray-400"></div>
    <div className="relative z-10 h-full flex items-center">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl space-y-4">
          <div className="h-12 bg-gray-200 rounded w-1/2"></div>
          <div className="h-8 bg-gray-200 rounded w-2/3"></div>
          <div className="h-6 bg-gray-200 rounded w-1/3"></div>
          <div className="h-12 bg-gray-200 rounded w-48"></div>
        </div>
      </div>
    </div>
  </div>
);

export default { ProductSkeleton, CategorySkeleton, ReviewSkeleton, HeroSkeleton };
