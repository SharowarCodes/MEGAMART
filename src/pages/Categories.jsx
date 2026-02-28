import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, TrendingUp } from 'lucide-react';

const Categories = () => {

  // All 7 requested categories plus existing ones
  const mainCategories = [
    {
      id: 'beauty',
      name: 'Beauty',
      icon: '💄',
      productCount: 234,
      subcategories: [
        { name: 'Makeup', count: 67, link: '/shop/beauty/makeup' },
        { name: 'Skincare', count: 89, link: '/shop/beauty/skincare' },
        { name: 'Haircare', count: 45, link: '/shop/beauty/haircare' },
        { name: 'Fragrances', count: 34, link: '/shop/beauty/fragrances' },
        { name: 'Beauty Tools', count: 23, link: '/shop/beauty/tools' }
      ],
      color: 'from-pink-400 to-rose-600'
    },
    {
      id: 'home-appliances',
      name: 'Home Appliances',
      icon: '🏠',
      productCount: 156,
      subcategories: [
        { name: 'Kitchen Appliances', count: 78, link: '/shop/home/kitchen' },
        { name: 'Cleaning', count: 45, link: '/shop/home/cleaning' },
        { name: 'Air Treatment', count: 23, link: '/shop/home/air' },
        { name: 'Heating/Cooling', count: 34, link: '/shop/home/temperature' },
        { name: 'Small Appliances', count: 56, link: '/shop/home/small' }
      ],
      color: 'from-green-400 to-teal-600'
    },
    {
      id: 'personal-care',
      name: 'Personal Care',
      icon: '🧴',
      productCount: 123,
      subcategories: [
        { name: 'Grooming', count: 45, link: '/shop/personal/grooming' },
        { name: 'Oral Care', count: 23, link: '/shop/personal/oral' },
        { name: 'Shaving', count: 34, link: '/shop/personal/shaving' },
        { name: 'Bath & Body', count: 56, link: '/shop/personal/bath' },
        { name: 'Wellness', count: 23, link: '/shop/personal/wellness' }
      ],
      color: 'from-blue-400 to-indigo-600'
    },
    {
      id: 'food-beverages',
      name: 'Food & Beverages',
      icon: '🍔',
      productCount: 189,
      subcategories: [
        { name: 'Groceries', count: 89, link: '/shop/food/groceries' },
        { name: 'Snacks', count: 67, link: '/shop/food/snacks' },
        { name: 'Beverages', count: 45, link: '/shop/food/beverages' },
        { name: 'Health Foods', count: 34, link: '/shop/food/health' },
        { name: 'Gourmet', count: 23, link: '/shop/food/gourmet' }
      ],
      color: 'from-orange-400 to-amber-600'
    },
    {
      id: 'baby-care',
      name: 'Baby Care',
      icon: '👶',
      productCount: 98,
      subcategories: [
        { name: 'Diapers', count: 34, link: '/shop/baby/diapers' },
        { name: 'Feeding', count: 45, link: '/shop/baby/feeding' },
        { name: 'Nursery', count: 23, link: '/shop/baby/nursery' },
        { name: 'Safety', count: 12, link: '/shop/baby/safety' },
        { name: 'Baby Gear', count: 18, link: '/shop/baby/gear' }
      ],
      color: 'from-purple-400 to-pink-600'
    },
    {
      id: 'sports-fitness',
      name: 'Sports & Fitness',
      icon: '⚽',
      productCount: 145,
      subcategories: [
        { name: 'Gym Equipment', count: 45, link: '/shop/sports/gym' },
        { name: 'Sports Gear', count: 67, link: '/shop/sports/gear' },
        { name: 'Activewear', count: 34, link: '/shop/sports/activewear' },
        { name: 'Nutrition', count: 56, link: '/shop/sports/nutrition' },
        { name: 'Outdoor', count: 23, link: '/shop/sports/outdoor' }
      ],
      color: 'from-red-400 to-orange-600'
    },
    {
      id: 'gifts-accessories',
      name: 'Gifts & Accessories',
      icon: '🎁',
      productCount: 167,
      subcategories: [
        { name: 'Personalized Gifts', count: 45, link: '/shop/gifts/personalized' },
        { name: 'Luxury Gifts', count: 23, link: '/shop/gifts/luxury' },
        { name: 'Tech Gifts', count: 34, link: '/shop/gifts/tech' },
        { name: 'Gift Cards', count: 12, link: '/shop/gifts/cards' },
        { name: 'Wrapping', count: 18, link: '/shop/gifts/wrapping' }
      ],
      color: 'from-yellow-400 to-amber-600'
    }
  ];

  const CategoryCard = ({ category, isLarge = false }) => (
    <Link
      to={`/shop/${category.id}`}
      className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300 bg-white border border-gray-100 hover:-translate-y-1"
    >
      <div className={`relative ${isLarge ? 'aspect-[16/9]' : 'aspect-square'}`}>
        {/* Background Gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-10`}></div>
        
        {/* Content */}
        <div className="relative z-10 p-6 h-full flex flex-col justify-between">
          <div>
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
              {category.icon}
            </div>
            <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
              {category.name}
            </h3>
            <p className="text-sm text-gray-600 mb-3">
              {category.productCount} products
            </p>
          </div>
          
          {/* Top Subcategories */}
          <div className="space-y-1">
            {category.subcategories.slice(0, 3).map((sub) => (
              <div key={sub.name} className="flex items-center justify-between text-xs text-gray-500">
                <span>{sub.name}</span>
                <span>({sub.count})</span>
              </div>
            ))}
            {category.subcategories.length > 3 && (
              <div className="text-xs text-blue-600 font-medium">
                +{category.subcategories.length - 3} more
              </div>
            )}
          </div>
        </div>
        
        {/* Hover Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
      </div>
    </Link>
  );

  const CategoryGrid = ({ title, categories, isLarge = false }) => (
    <section className="mb-16">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{title}</h2>
          <div className="w-16 h-1 bg-blue-600"></div>
        </div>
        <Link
          to="/shop"
          className="text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-1"
        >
          <span>View All</span>
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>

      <div className={`grid gap-6 ${
        isLarge 
          ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
          : 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6'
      }`}>
        {categories.map((category) => (
          <CategoryCard 
            key={category.id} 
            category={category} 
            isLarge={isLarge}
          />
        ))}
      </div>
    </section>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Shop by Category
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our wide range of products across different categories. Find everything you need in one place.
          </p>
        </div>

        {/* Main Categories Grid */}
        <CategoryGrid 
          title="All Categories" 
          categories={mainCategories}
        />

        {/* Featured Categories */}
        <CategoryGrid 
          title="Featured Categories" 
          categories={mainCategories.slice(0, 6)}
          isLarge={true}
        />

        {/* Category Banner */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-4">Special Offers</h2>
              <p className="text-xl mb-6 opacity-90">
                Get up to 50% off on selected categories. Limited time offer!
              </p>
              <Link
                to="/deals"
                className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Shop Deals
              </Link>
            </div>
            
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-10 rounded-full -ml-24 -mb-24"></div>
          </div>
        </section>

        {/* Trending Categories */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Trending Now</h2>
              <div className="w-16 h-1 bg-blue-600"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mainCategories.slice(0, 3).map((category, index) => (
              <Link
                key={category.id}
                to={`/shop/${category.id}`}
                className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100"
              >
                <div className="flex items-center space-x-4">
                  <div className="text-3xl group-hover:scale-110 transition-transform duration-300">
                    {category.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-gray-900 group-hover:text-blue-600 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-600">{category.productCount} products</p>
                  </div>
                  <div className="flex items-center space-x-1 text-yellow-400">
                    <TrendingUp className="h-4 w-4" />
                    <span className="text-sm text-gray-600">Trending</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Categories;
