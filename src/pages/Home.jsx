import React from 'react';
import { useCountdown } from '../hooks/useCountdown';
import { useNotification } from '../contexts/NotificationContext';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import { categories, allProducts, beautyProducts, homeAppliances, babyCare, sportsFitness, giftsAccessories, foodBeverages } from '../constants/products';

// Import sections
import AnnouncementBar from '../components/home/AnnouncementBar';
import HeroCarousel from '../components/home/HeroCarousel';
import FeaturedCategories from '../components/home/FeaturedCategories';
import DealOfTheDay from '../components/home/DealOfTheDay';
import BestSellingProducts from '../components/home/BestSellingProducts';
import BeautyEssentials from '../components/home/BeautyEssentials';
import HomeAppliancesDeals from '../components/home/HomeAppliancesDeals';
import BabyCareCorner from '../components/home/BabyCareCorner';
import SportsFitnessSection from '../components/home/SportsFitnessSection';
import GiftsAccessoriesSection from '../components/home/GiftsAccessoriesSection';
import FoodBeveragesSection from '../components/home/FoodBeveragesSection';
import TopBrands from '../components/home/TopBrands';
import CustomerReviews from '../components/home/CustomerReviews';
import NewsletterSection from '../components/home/NewsletterSection';
import FeaturesBanner from '../components/home/FeaturesBanner';

const Home = () => {
  const { showSuccess, showError } = useNotification();
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist } = useWishlist();
  
  // Deal of the day countdown
  const targetDate = new Date();
  targetDate.setHours(23, 59, 59, 999);
  const { timeLeft, getTimeString } = useCountdown(targetDate);

  const handleAddToCart = (product) => {
    addToCart(product);
    showSuccess(`${product.name} added to cart!`);
  };

  const handleAddToWishlist = (product) => {
    if (isInWishlist(product.id)) {
      showError('Product already in wishlist!');
    } else {
      addToWishlist(product);
      showSuccess(`${product.name} added to wishlist!`);
    }
  };

  const handleBuyNow = (product) => {
    addToCart(product);
    window.location.href = '/checkout';
  };

  return (
    <div className="min-h-screen">
      {/* Section 1: Announcement Bar */}
      <AnnouncementBar />

      {/* Section 3: Hero Carousel */}
      <HeroCarousel />

      {/* Section 4: Featured Categories Grid */}
      <FeaturedCategories categories={categories} />

      {/* Section 5: Deal of the Day */}
      <DealOfTheDay 
        product={allProducts[0]}
        timeLeft={timeLeft}
        getTimeString={getTimeString}
        onAddToCart={handleAddToCart}
        onAddToWishlist={handleAddToWishlist}
        onBuyNow={handleBuyNow}
      />

      {/* Section 6: Best Selling Products */}
      <BestSellingProducts 
        products={allProducts.slice(0, 8)}
        onAddToCart={handleAddToCart}
        onAddToWishlist={handleAddToWishlist}
        onBuyNow={handleBuyNow}
        isInWishlist={isInWishlist}
      />

      {/* Section 7: Beauty Essentials */}
      <BeautyEssentials 
        products={beautyProducts}
        onAddToCart={handleAddToCart}
        onAddToWishlist={handleAddToWishlist}
        onBuyNow={handleBuyNow}
        isInWishlist={isInWishlist}
      />

      {/* Section 8: Home Appliances Deals */}
      <HomeAppliancesDeals 
        products={homeAppliances}
        onAddToCart={handleAddToCart}
        onAddToWishlist={handleAddToWishlist}
        onBuyNow={handleBuyNow}
        isInWishlist={isInWishlist}
      />

      {/* Section 9: Baby Care Corner */}
      <BabyCareCorner 
        products={babyCare}
        onAddToCart={handleAddToCart}
        onAddToWishlist={handleAddToWishlist}
        onBuyNow={handleBuyNow}
        isInWishlist={isInWishlist}
      />

      {/* Section 10: Sports & Fitness */}
      <SportsFitnessSection 
        products={sportsFitness}
        onAddToCart={handleAddToCart}
        onAddToWishlist={handleAddToWishlist}
        onBuyNow={handleBuyNow}
        isInWishlist={isInWishlist}
      />

      {/* Section 11: Gifts & Accessories */}
      <GiftsAccessoriesSection 
        products={giftsAccessories}
        onAddToCart={handleAddToCart}
        onAddToWishlist={handleAddToWishlist}
        onBuyNow={handleBuyNow}
        isInWishlist={isInWishlist}
      />

      {/* Section 12: Food & Beverages */}
      <FoodBeveragesSection 
        products={foodBeverages}
        onAddToCart={handleAddToCart}
        onAddToWishlist={handleAddToWishlist}
        onBuyNow={handleBuyNow}
        isInWishlist={isInWishlist}
      />

      {/* Section 13: Top Electronics Brands */}
      <TopBrands />

      {/* Section 14: Customer Reviews */}
      <CustomerReviews />

      {/* Section 15: Newsletter Section */}
      <NewsletterSection />

      {/* Section 16: Features Banner */}
      <FeaturesBanner />
    </div>
  );
};

export default Home;
