// Products API - Comprehensive product data with realistic details and pricing
import { 
  smartphones, 
  beautyProducts, 
  homeAppliances, 
  babyCare, 
  sportsFitness, 
  giftsAccessories, 
  foodBeverages
} from '../constants/products';

// Enhanced product data with detailed information
const enhancedProducts = [
  // Electronics (Smartphones)
  ...smartphones.map(product => ({
    ...product,
    category: 'Electronics',
    subcategory: product.subcategory || 'Smartphones',
    brand: product.brand || 'Generic',
    originalPrice: product.originalPrice || Math.floor(product.price * (1 + Math.random() * 0.5)),
    discount: product.discount || Math.floor(Math.random() * 40),
    rating: product.rating || (3.5 + Math.random() * 1.5),
    reviews: product.reviews || Math.floor(Math.random() * 500),
    inStock: product.inStock !== undefined ? product.inStock : Math.random() > 0.1,
    stockCount: product.stockCount || Math.floor(Math.random() * 100) + 10,
    features: product.features || [
      'High Quality',
      'Latest Technology',
      'Warranty Available'
    ],
    specifications: product.specifications || {
      'Weight': '150g',
      'Dimensions': '15.5 x 7.5 x 0.8 cm',
      'Warranty': '1 Year'
    },
    images: product.images || [
      `/images/products/${product.id}-1.jpg`,
      `/images/products/${product.id}-2.jpg`,
      `/images/products/${product.id}-3.jpg`
    ],
    badge: product.badge || (product.discount > 30 ? 'Hot Deal' : product.discount > 15 ? 'Best Seller' : null),
    isNew: product.isNew || Math.random() > 0.8,
    tags: product.tags || ['electronics', 'tech', 'gadget']
  })),
  
  // Beauty Products
  ...beautyProducts.map(product => ({
    ...product,
    category: 'Beauty',
    subcategory: product.subcategory || 'Skincare',
    brand: product.brand || 'Luxury Brand',
    originalPrice: product.originalPrice || Math.floor(product.price * (1 + Math.random() * 0.6)),
    discount: product.discount || Math.floor(Math.random() * 35),
    rating: product.rating || (3.8 + Math.random() * 1.2),
    reviews: product.reviews || Math.floor(Math.random() * 300),
    inStock: product.inStock !== undefined ? product.inStock : Math.random() > 0.05,
    stockCount: product.stockCount || Math.floor(Math.random() * 80) + 5,
    features: product.features || [
      'Dermatologically Tested',
      'Natural Ingredients',
      'Cruelty Free'
    ],
    specifications: product.specifications || {
      'Volume': '50ml',
      'Skin Type': 'All Skin Types',
      'Shelf Life': '24 months'
    },
    images: product.images || [
      `/images/products/beauty-${product.id}-1.jpg`,
      `/images/products/beauty-${product.id}-2.jpg`
    ],
    badge: product.badge || (product.discount > 25 ? 'Limited Offer' : null),
    isNew: product.isNew || Math.random() > 0.85,
    tags: product.tags || ['beauty', 'skincare', 'cosmetics']
  })),
  
  // Home Appliances
  ...homeAppliances.map(product => ({
    ...product,
    category: 'Home Appliances',
    subcategory: product.subcategory || 'Kitchen',
    brand: product.brand || 'HomeTech',
    originalPrice: product.originalPrice || Math.floor(product.price * (1 + Math.random() * 0.4)),
    discount: product.discount || Math.floor(Math.random() * 30),
    rating: product.rating || (4.0 + Math.random() * 1.0),
    reviews: product.reviews || Math.floor(Math.random() * 200),
    inStock: product.inStock !== undefined ? product.inStock : Math.random() > 0.15,
    stockCount: product.stockCount || Math.floor(Math.random() * 50) + 5,
    features: product.features || [
      'Energy Efficient',
      'Easy to Use',
      '1 Year Warranty'
    ],
    specifications: product.specifications || {
      'Power': '220V',
      'Frequency': '50Hz',
      'Warranty': '2 Years'
    },
    images: product.images || [
      `/images/products/home-${product.id}-1.jpg`,
      `/images/products/home-${product.id}-2.jpg`
    ],
    badge: product.badge || (product.discount > 20 ? 'Popular' : null),
    isNew: product.isNew || Math.random() > 0.9,
    tags: product.tags || ['home', 'appliance', 'kitchen']
  })),
  
  // Baby Care
  ...babyCare.map(product => ({
    ...product,
    category: 'Baby Care',
    subcategory: product.subcategory || 'Diapers',
    brand: product.brand || 'BabySafe',
    originalPrice: product.originalPrice || Math.floor(product.price * (1 + Math.random() * 0.5)),
    discount: product.discount || Math.floor(Math.random() * 25),
    rating: product.rating || (4.2 + Math.random() * 0.8),
    reviews: product.reviews || Math.floor(Math.random() * 150),
    inStock: product.inStock !== undefined ? product.inStock : Math.random() > 0.08,
    stockCount: product.stockCount || Math.floor(Math.random() * 60) + 10,
    features: product.features || [
      'BPA Free',
      'Pediatrician Approved',
      'Soft & Safe'
    ],
    specifications: product.specifications || {
      'Age Range': '0-24 months',
      'Material': 'Cotton Blend',
      'Safety': 'ISO Certified'
    },
    images: product.images || [
      `/images/products/baby-${product.id}-1.jpg`,
      `/images/products/baby-${product.id}-2.jpg`
    ],
    badge: product.badge || (product.discount > 15 ? 'Mom\'s Choice' : null),
    isNew: product.isNew || Math.random() > 0.88,
    tags: product.tags || ['baby', 'care', 'safety']
  })),
  
  // Sports & Fitness
  ...sportsFitness.map(product => ({
    ...product,
    category: 'Sports & Fitness',
    subcategory: product.subcategory || 'Fitness Equipment',
    brand: product.brand || 'FitPro',
    originalPrice: product.originalPrice || Math.floor(product.price * (1 + Math.random() * 0.45)),
    discount: product.discount || Math.floor(Math.random() * 35),
    rating: product.rating || (4.1 + Math.random() * 0.9),
    reviews: product.reviews || Math.floor(Math.random() * 250),
    inStock: product.inStock !== undefined ? product.inStock : Math.random() > 0.12,
    stockCount: product.stockCount || Math.floor(Math.random() * 40) + 5,
    features: product.features || [
      'Professional Grade',
      'Durable Material',
      'Multi-Purpose'
    ],
    specifications: product.specifications || {
      'Weight': '5kg',
      'Dimensions': '120 x 60 x 120 cm',
      'Capacity': '150kg'
    },
    images: product.images || [
      `/images/products/sports-${product.id}-1.jpg`,
      `/images/products/sports-${product.id}-2.jpg`
    ],
    badge: product.badge || (product.discount > 25 ? 'Fitness Choice' : null),
    isNew: product.isNew || Math.random() > 0.87,
    tags: product.tags || ['sports', 'fitness', 'equipment']
  })),
  
  // Gifts & Accessories
  ...giftsAccessories.map(product => ({
    ...product,
    category: 'Gifts & Accessories',
    subcategory: product.subcategory || 'Personalized Gifts',
    brand: product.brand || 'GiftCraft',
    originalPrice: product.originalPrice || Math.floor(product.price * (1 + Math.random() * 0.55)),
    discount: product.discount || Math.floor(Math.random() * 40),
    rating: product.rating || (4.3 + Math.random() * 0.7),
    reviews: product.reviews || Math.floor(Math.random() * 180),
    inStock: product.inStock !== undefined ? product.inStock : Math.random() > 0.1,
    stockCount: product.stockCount || Math.floor(Math.random() * 30) + 3,
    features: product.features || [
      'Premium Quality',
      'Gift Wrapped',
      'Customizable'
    ],
    specifications: product.specifications || {
      'Material': 'Premium',
      'Size': 'Standard',
      'Packaging': 'Gift Box'
    },
    images: product.images || [
      `/images/products/gift-${product.id}-1.jpg`,
      `/images/products/gift-${product.id}-2.jpg`
    ],
    badge: product.badge || (product.discount > 30 ? 'Perfect Gift' : null),
    isNew: product.isNew || Math.random() > 0.92,
    tags: product.tags || ['gift', 'accessory', 'premium']
  })),
  
  // Food & Beverages
  ...foodBeverages.map(product => ({
    ...product,
    category: 'Food & Beverages',
    subcategory: product.subcategory || 'Snacks',
    brand: product.brand || 'FoodCo',
    originalPrice: product.originalPrice || Math.floor(product.price * (1 + Math.random() * 0.3)),
    discount: product.discount || Math.floor(Math.random() * 20),
    rating: product.rating || (4.0 + Math.random() * 1.0),
    reviews: product.reviews || Math.floor(Math.random() * 400),
    inStock: product.inStock !== undefined ? product.inStock : Math.random() > 0.03,
    stockCount: product.stockCount || Math.floor(Math.random() * 200) + 20,
    features: product.features || [
      'Fresh Quality',
      'Hygienically Packed',
      'Best Taste'
    ],
    specifications: product.specifications || {
      'Weight': '500g',
      'Shelf Life': '6 months',
      'Storage': 'Cool & Dry Place'
    },
    images: product.images || [
      `/images/products/food-${product.id}-1.jpg`,
      `/images/products/food-${product.id}-2.jpg`
    ],
    badge: product.badge || (product.discount > 15 ? 'Foodie Favorite' : null),
    isNew: product.isNew || Math.random() > 0.83,
    tags: product.tags || ['food', 'beverage', 'fresh']
  }))
];

// API Functions
export const productsAPI = {
  // Get all products
  getAll: async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100));
    return {
      success: true,
      data: enhancedProducts,
      total: enhancedProducts.length
    };
  },

  // Get product by ID
  getById: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 200));
    const product = enhancedProducts.find(p => p.id === id);
    if (!product) {
      return {
        success: false,
        error: 'Product not found'
      };
    }
    return {
      success: true,
      data: product
    };
  },

  // Get products by category
  getByCategory: async (category) => {
    await new Promise(resolve => setTimeout(resolve, 150));
    const filtered = enhancedProducts.filter(p => p.category === category);
    return {
      success: true,
      data: filtered,
      total: filtered.length
    };
  },

  // Get products by subcategory
  getBySubcategory: async (subcategory) => {
    await new Promise(resolve => setTimeout(resolve, 150));
    const filtered = enhancedProducts.filter(p => p.subcategory === subcategory);
    return {
      success: true,
      data: filtered,
      total: filtered.length
    };
  },

  // Search products
  search: async (query, filters = {}) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    let results = enhancedProducts;
    
    // Text search
    if (query) {
      const searchTerm = query.toLowerCase();
      results = results.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.description?.toLowerCase().includes(searchTerm) ||
        product.brand.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      );
    }
    
    // Apply filters
    if (filters.category) {
      results = results.filter(p => p.category === filters.category);
    }
    
    if (filters.subcategory) {
      results = results.filter(p => p.subcategory === filters.subcategory);
    }
    
    if (filters.brand) {
      results = results.filter(p => p.brand === filters.brand);
    }
    
    if (filters.minPrice) {
      results = results.filter(p => p.price >= filters.minPrice);
    }
    
    if (filters.maxPrice) {
      results = results.filter(p => p.price <= filters.maxPrice);
    }
    
    if (filters.rating) {
      results = results.filter(p => p.rating >= filters.rating);
    }
    
    if (filters.inStock === true) {
      results = results.filter(p => p.inStock);
    }
    
    if (filters.isNew === true) {
      results = results.filter(p => p.isNew);
    }
    
    // Sort results
    const sortBy = filters.sortBy || 'relevance';
    switch (sortBy) {
      case 'price-low':
        results.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        results.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        results.sort((a, b) => b.rating - a.rating);
        break;
      case 'reviews':
        results.sort((a, b) => b.reviews - a.reviews);
        break;
      case 'newest':
        results.sort((a, b) => b.id.localeCompare(a.id));
        break;
      case 'discount':
        results.sort((a, b) => b.discount - a.discount);
        break;
      default:
        // Keep original order for relevance
        break;
    }
    
    return {
      success: true,
      data: results,
      total: results.length,
      query: query,
      filters: filters
    };
  },

  // Get featured products
  getFeatured: async (limit = 12) => {
    await new Promise(resolve => setTimeout(resolve, 100));
    const featured = enhancedProducts
      .filter(p => p.rating >= 4.0 || p.discount >= 20)
      .slice(0, limit);
    return {
      success: true,
      data: featured,
      total: featured.length
    };
  },

  // Get best selling products
  getBestSelling: async (limit = 12) => {
    await new Promise(resolve => setTimeout(resolve, 100));
    const bestSelling = enhancedProducts
      .filter(p => p.reviews >= 50)
      .sort((a, b) => b.reviews - a.reviews)
      .slice(0, limit);
    return {
      success: true,
      data: bestSelling,
      total: bestSelling.length
    };
  },

  // Get new arrivals
  getNewArrivals: async (limit = 12) => {
    await new Promise(resolve => setTimeout(resolve, 100));
    const newArrivals = enhancedProducts
      .filter(p => p.isNew)
      .slice(0, limit);
    return {
      success: true,
      data: newArrivals,
      total: newArrivals.length
    };
  },

  // Get deal products
  getDeals: async (minDiscount = 15, limit = 20) => {
    await new Promise(resolve => setTimeout(resolve, 100));
    const deals = enhancedProducts
      .filter(p => p.discount >= minDiscount)
      .sort((a, b) => b.discount - a.discount)
      .slice(0, limit);
    return {
      success: true,
      data: deals,
      total: deals.length
    };
  },

  // Get related products
  getRelated: async (productId, limit = 8) => {
    await new Promise(resolve => setTimeout(resolve, 150));
    const product = enhancedProducts.find(p => p.id === productId);
    if (!product) {
      return {
        success: false,
        error: 'Product not found'
      };
    }
    
    const related = enhancedProducts
      .filter(p => 
        p.id !== productId && 
        (p.category === product.category || p.subcategory === product.subcategory)
      )
      .slice(0, limit);
    
    return {
      success: true,
      data: related,
      total: related.length
    };
  },

  // Get categories
  getCategories: async () => {
    await new Promise(resolve => setTimeout(resolve, 50));
    const categories = [...new Set(enhancedProducts.map(p => p.category))];
    return {
      success: true,
      data: categories.map(cat => ({
        name: cat,
        count: enhancedProducts.filter(p => p.category === cat).length,
        subcategories: [...new Set(enhancedProducts
          .filter(p => p.category === cat)
          .map(p => p.subcategory)
        )]
      }))
    };
  },

  // Get brands
  getBrands: async () => {
    await new Promise(resolve => setTimeout(resolve, 50));
    const brands = [...new Set(enhancedProducts.map(p => p.brand))];
    return {
      success: true,
      data: brands.map(brand => ({
        name: brand,
        count: enhancedProducts.filter(p => p.brand === brand).length
      }))
    };
  },

  // Get price ranges
  getPriceRanges: async () => {
    await new Promise(resolve => setTimeout(resolve, 50));
    const ranges = [
      { min: 0, max: 500, label: 'Under ₹500', count: 0 },
      { min: 500, max: 1000, label: '₹500 - ₹1,000', count: 0 },
      { min: 1000, max: 5000, label: '₹1,000 - ₹5,000', count: 0 },
      { min: 5000, max: 10000, label: '₹5,000 - ₹10,000', count: 0 },
      { min: 10000, max: Infinity, label: 'Above ₹10,000', count: 0 }
    ];
    
    enhancedProducts.forEach(product => {
      const range = ranges.find(r => product.price >= r.min && product.price < r.max);
      if (range) range.count++;
    });
    
    return {
      success: true,
      data: ranges
    };
  }
};

export default productsAPI;
