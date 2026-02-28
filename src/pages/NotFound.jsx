import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md">
        <div className="mb-6">
          <div className="text-9xl font-bold text-gray-300">404</div>
          <div className="text-2xl font-semibold text-gray-900 mt-2 mb-2">
            Page Not Found
          </div>
          <p className="text-gray-600">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="space-y-4">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            <Home className="h-5 w-5" />
            <span>Go Home</span>
          </Link>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/shop"
              className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              <Search className="h-4 w-4" />
              <span>Browse Products</span>
            </Link>

            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-700 font-medium transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Go Back</span>
            </button>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Need help? <Link to="/contact" className="text-blue-600 hover:text-blue-700">Contact Support</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
