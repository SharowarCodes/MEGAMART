import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NotificationProvider } from './contexts/NotificationContext';
import { UserProvider } from './contexts/UserContext';
import { FilterProvider } from './contexts/FilterContext';
import { CartProvider } from './contexts/CartContext';
import { WishlistProvider } from './contexts/WishlistContext';

// Layout Components
import MainLayout from './components/Layout/MainLayout';

// Page Components
import Home from './pages/Home';
import Shop from './pages/Shop';
import Categories from './pages/Categories';
import Deals from './pages/Deals';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import Checkout from './pages/Checkout';
import Account from './pages/Account';
import Login from './pages/Login';
import Signup from './pages/Signup';

// Utility Components
import ToastContainer from './components/ToastContainer';

function App() {
  return (
    <NotificationProvider>
      <UserProvider>
        <FilterProvider>
          <CartProvider>
            <WishlistProvider>
              <Router>
                <Routes>
                  {/* Authentication Routes */}
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />

                  {/* Main Routes with Layout */}
                  <Route path="/" element={<MainLayout />}>
                    <Route index element={<Home />} />
                    <Route path="shop" element={<Shop />} />
                    <Route path="shop/:category" element={<Shop />} />
                    <Route path="categories" element={<Categories />} />
                    <Route path="deals" element={<Deals />} />
                    <Route path="contact" element={<Contact />} />
                    <Route path="cart" element={<Cart />} />
                    <Route path="wishlist" element={<Wishlist />} />
                    <Route path="checkout" element={<Checkout />} />
                    <Route path="account" element={<Account />} />
                    <Route path="account/:tab" element={<Account />} />
                    <Route path="product/:id" element={<div className="p-8 text-center">Product Details Coming Soon</div>} />
                  </Route>
                </Routes>
                <ToastContainer />
              </Router>
            </WishlistProvider>
          </CartProvider>
        </FilterProvider>
      </UserProvider>
    </NotificationProvider>
  );
}

export default App;
