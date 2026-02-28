import React from 'react';
import { Truck, Shield, RefreshCw, Headphones } from 'lucide-react';

const FeaturesBanner = () => {
  const features = [
    {
      icon: <Truck className="h-8 w-8" />,
      title: 'Free Delivery',
      description: 'On orders above ₹999',
      color: 'text-blue-600'
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: 'Secure Payment',
      description: '100% secure transactions',
      color: 'text-green-600'
    },
    {
      icon: <RefreshCw className="h-8 w-8" />,
      title: 'Easy Returns',
      description: '30-day return policy',
      color: 'text-orange-600'
    },
    {
      icon: <Headphones className="h-8 w-8" />,
      title: '24/7 Support',
      description: 'Dedicated customer service',
      color: 'text-purple-600'
    }
  ];

  return (
    <section className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-center group cursor-pointer"
              title={feature.description}
            >
              <div className={`${feature.color} mb-4 flex justify-center group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>
              <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesBanner;
