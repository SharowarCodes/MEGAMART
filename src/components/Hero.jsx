import React from 'react';

const Hero = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-black"></div>
        <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-300 rounded-full filter blur-3xl"></div>
      </div>

      {/* Watch Silhouette */}
      <div className="absolute right-10 top-1/2 transform -translate-y-1/2 opacity-20 hidden xl:block">
        <div className="w-80 h-80 border-8 border-white rounded-full"></div>
        <div className="w-64 h-64 border-4 border-white rounded-full absolute top-8 left-8"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="animate-slide-up">
          {/* Main Heading */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight">
            MegaMart
          </h1>

          {/* Subheading */}
          <p className="text-xl sm:text-2xl md:text-3xl mb-8 font-light">
            Best Deal Online on smart watches
          </p>

          {/* Highlight Text */}
          <div className="mb-12">
            <span className="inline-block bg-yellow-400 text-gray-900 px-6 py-3 rounded-full text-2xl md:text-3xl font-bold transform -rotate-2 shadow-lg">
              SMART WEARABLE. UP to 80% OFF
            </span>
          </div>

          {/* CTA Button */}
          <button 
            onClick={() => document.getElementById('smartphones')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-primary bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-4 rounded-full font-bold shadow-2xl transform hover:scale-110 transition-all duration-300"
          >
            Shop Now
          </button>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 border-4 border-white opacity-20 rounded-lg transform rotate-45"></div>
      <div className="absolute bottom-20 left-20 w-16 h-16 border-4 border-white opacity-20 rounded-full"></div>
      <div className="absolute top-32 right-32 w-12 h-12 border-4 border-white opacity-20 rounded-lg transform rotate-12"></div>
    </section>
  );
};

export default Hero;
