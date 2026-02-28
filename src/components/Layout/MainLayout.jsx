import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import BackToTop from '../BackToTop';
import ToastContainer from '../ToastContainer';

const MainLayout = () => {
  const location = useLocation();

  // Scroll to top whenever location changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Main Container - 1170px centered */}
      <div className="max-w-[1170px] mx-auto px-4 sm:px-6 lg:px-8">
        <Header />
        
        {/* Main Content */}
        <main className="py-6 sm:py-8">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <Outlet />
          </div>
        </main>
        
        <Footer />
        <BackToTop />
        <ToastContainer />
      </div>
    </div>
  );
};

export default MainLayout;
