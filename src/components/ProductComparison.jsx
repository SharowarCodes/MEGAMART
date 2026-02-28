import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, Plus, Star, Check, AlertCircle } from 'lucide-react';

const ProductComparison = ({ products = [], onClose, onAddProduct }) => {
  const [selectedProducts, setSelectedProducts] = useState(products.slice(0, 3));

  const handleRemoveProduct = (productId) => {
    setSelectedProducts(prev => prev.filter(p => p.id !== productId));
  };

  const handleAddProduct = () => {
    // This would open a product selection modal
    onAddProduct && onAddProduct();
  };

  const getComparisonFeatures = () => {
    const allFeatures = new Set();
    selectedProducts.forEach(product => {
      if (product.features) {
        product.features.forEach(feature => allFeatures.add(feature));
      }
    });
    return Array.from(allFeatures);
  };

  const hasFeature = (product, feature) => {
    return product.features && product.features.includes(feature);
  };

  if (selectedProducts.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Product Comparison</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
            <AlertCircle className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Products to Compare</h3>
          <p className="text-gray-600 mb-6">Add products to compare their features side by side</p>
          <button
            onClick={handleAddProduct}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 mx-auto"
          >
            <Plus className="h-4 w-4" />
            <span>Add Products</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b">
        <h2 className="text-2xl font-bold text-gray-900">Compare Products ({selectedProducts.length})</h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600"
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      {/* Add Product Button */}
      {selectedProducts.length < 4 && (
        <div className="p-6 border-b">
          <button
            onClick={handleAddProduct}
            className="w-full border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 hover:bg-blue-50 transition-colors"
          >
            <Plus className="h-6 w-6 text-gray-400 mx-auto mb-2" />
            <span className="text-gray-600">Add Product to Compare</span>
          </button>
        </div>
      )}

      {/* Comparison Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left p-6 bg-gray-50 font-medium text-gray-900 w-48">
                Feature
              </th>
              {selectedProducts.map((product) => (
                <th key={product.id} className="p-6 bg-gray-50">
                  <div className="relative">
                    <button
                      onClick={() => handleRemoveProduct(product.id)}
                      className="absolute top-0 right-0 text-gray-400 hover:text-red-600"
                    >
                      <X className="h-4 w-4" />
                    </button>
                    <div className="text-center">
                      <div className="w-20 h-20 bg-gray-200 rounded-lg mx-auto mb-3 flex items-center justify-center">
                        <span className="text-gray-500 text-xs">Image</span>
                      </div>
                      <Link
                        to={`/shop/${product.id}`}
                        className="font-medium text-blue-600 hover:text-blue-700 text-sm block mb-1"
                      >
                        {product.name}
                      </Link>
                      <p className="text-xs text-gray-500">{product.brand}</p>
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          
          <tbody>
            {/* Price */}
            <tr className="border-b">
              <td className="p-6 font-medium text-gray-900">Price</td>
              {selectedProducts.map((product) => (
                <td key={product.id} className="p-6 text-center">
                  <div className="space-y-1">
                    <div className="text-lg font-bold text-gray-900">₹{product.price}</div>
                    {product.originalPrice > product.price && (
                      <div className="text-sm text-gray-500 line-through">₹{product.originalPrice}</div>
                    )}
                    {product.discount > 0 && (
                      <div className="text-sm text-red-600 font-medium">{product.discount}% OFF</div>
                    )}
                  </div>
                </td>
              ))}
            </tr>

            {/* Rating */}
            <tr className="border-b">
              <td className="p-6 font-medium text-gray-900">Rating</td>
              {selectedProducts.map((product) => (
                <td key={product.id} className="p-6 text-center">
                  <div className="flex items-center justify-center space-x-1">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < product.rating ? 'fill-current text-yellow-400' : 'fill-gray-300 text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">({product.reviews || 0})</span>
                  </div>
                </td>
              ))}
            </tr>

            {/* Availability */}
            <tr className="border-b">
              <td className="p-6 font-medium text-gray-900">Availability</td>
              {selectedProducts.map((product) => (
                <td key={product.id} className="p-6 text-center">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    product.inStock
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </td>
              ))}
            </tr>

            {/* Category */}
            <tr className="border-b">
              <td className="p-6 font-medium text-gray-900">Category</td>
              {selectedProducts.map((product) => (
                <td key={product.id} className="p-6 text-center text-sm text-gray-600">
                  {product.category}
                </td>
              ))}
            </tr>

            {/* Brand */}
            <tr className="border-b">
              <td className="p-6 font-medium text-gray-900">Brand</td>
              {selectedProducts.map((product) => (
                <td key={product.id} className="p-6 text-center text-sm text-gray-600">
                  {product.brand}
                </td>
              ))}
            </tr>

            {/* Features */}
            {getComparisonFeatures().map((feature) => (
              <tr key={feature} className="border-b">
                <td className="p-6 font-medium text-gray-900">{feature}</td>
                {selectedProducts.map((product) => (
                  <td key={product.id} className="p-6 text-center">
                    {hasFeature(product, feature) ? (
                      <div className="flex items-center justify-center text-green-600">
                        <Check className="h-5 w-5" />
                      </div>
                    ) : (
                      <div className="flex items-center justify-center text-red-600">
                        <X className="h-5 w-5" />
                      </div>
                    )}
                  </td>
                ))}
              </tr>
            ))}

            {/* Description */}
            <tr className="border-b">
              <td className="p-6 font-medium text-gray-900">Description</td>
              {selectedProducts.map((product) => (
                <td key={product.id} className="p-6">
                  <p className="text-sm text-gray-600 line-clamp-3">
                    {product.description || 'No description available'}
                  </p>
                </td>
              ))}
            </tr>

            {/* Actions */}
            <tr>
              <td className="p-6 font-medium text-gray-900">Actions</td>
              {selectedProducts.map((product) => (
                <td key={product.id} className="p-6">
                  <div className="space-y-2">
                    <Link
                      to={`/shop/${product.id}`}
                      className="block w-full bg-blue-600 text-white py-2 px-4 rounded-lg text-center hover:bg-blue-700 transition-colors text-sm"
                    >
                      View Details
                    </Link>
                    <button
                      className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                    >
                      Add to Cart
                    </button>
                  </div>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="p-6 border-t bg-gray-50">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Comparing {selectedProducts.length} products
          </div>
          <div className="space-x-3">
            <button
              onClick={() => setSelectedProducts([])}
              className="text-gray-600 hover:text-gray-800 text-sm"
            >
              Clear All
            </button>
            <button
              onClick={onClose}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Close Comparison
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductComparison;
