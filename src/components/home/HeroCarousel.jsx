import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const slides = [
    {
      id: 1,
      title: 'MegaMart',
      subtitle: 'Best Deal Online on Smart Devices',
      highlight: 'SMART WEARABLE. UP to 80% OFF',
      image: '/images/hero-1.jpg',
      bgColor: 'bg-gradient-to-r from-blue-600 to-purple-600',
      ctaLink: '/shop/mobile-tablets',
      ctaText: 'Shop Smartphones'
    },
    {
      id: 2,
      title: 'Beauty Sale',
      subtitle: 'Premium Beauty Products',
      highlight: 'UP to 60% OFF on Makeup',
      image: '/images/hero-2.jpg',
      bgColor: 'bg-gradient-to-r from-pink-500 to-rose-600',
      ctaLink: '/shop/beauty',
      ctaText: 'Shop Beauty'
    },
    {
      id: 3,
      title: 'Home Appliances',
      subtitle: 'Make Your Home Smart',
      highlight: 'Kitchen Appliances UP to 50% OFF',
      image: '/images/hero-3.jpg',
      bgColor: 'bg-gradient-to-r from-green-600 to-teal-600',
      ctaLink: '/shop/home-appliances',
      ctaText: 'Shop Appliances'
    }
  ];

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPlaying, slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="relative h-96 md:h-[500px] lg:h-[600px] overflow-hidden">
      {/* Slides */}
      <div className="relative h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className={`h-full ${slide.bgColor} relative animate-fade-in`}>
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full"></div>
                <div className="absolute bottom-10 right-10 w-48 h-48 bg-white rounded-full"></div>
                <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-white rounded-full"></div>
              </div>

              {/* Content */}
              <div className="relative z-10 h-full flex items-center">
                <div className="container mx-auto px-4">
                  <div className="max-w-2xl text-white">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 animate-fade-in-up">
                      {slide.title}
                    </h1>
                    <p className="text-xl md:text-2xl mb-6 animate-slide-up">
                      {slide.subtitle}
                    </p>
                    <div className="mb-8">
                      <span className="inline-block bg-yellow-400 text-gray-900 px-6 py-3 rounded-full text-xl md:text-2xl font-bold transform -rotate-2 shadow-lg animate-bounce">
                        {slide.highlight}
                      </span>
                    </div>
                    <Link
                      to={slide.ctaLink}
                      className="inline-block bg-white text-gray-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-xl btn-animate"
                    >
                      {slide.ctaText}
                    </Link>
                  </div>
                </div>
              </div>

              {/* Placeholder for image */}
              <div className="absolute right-10 top-1/2 transform -translate-y-1/2 hidden lg:block">
                <div className="w-80 h-80 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <span className="text-white/60 text-lg">Product Image</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-colors z-20"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-colors z-20"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Play/Pause Button */}
      <button
        onClick={togglePlayPause}
        className="absolute bottom-4 right-4 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors z-20"
        aria-label={isPlaying ? 'Pause' : 'Play'}
      >
        {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
      </button>

      {/* Dots Navigation */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-white w-8'
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
