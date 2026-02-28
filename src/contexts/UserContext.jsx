import React, { createContext, useContext, useReducer, useEffect } from 'react';

const UserContext = createContext();

const userReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        isLoading: false
      };

    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        isLoading: false
      };

    case 'UPDATE_PROFILE':
      return {
        ...state,
        user: { ...state.user, ...action.payload }
      };

    case 'ADD_ADDRESS':
      return {
        ...state,
        user: {
          ...state.user,
          addresses: [...(state.user?.addresses || []), action.payload]
        }
      };

    case 'UPDATE_ADDRESS':
      return {
        ...state,
        user: {
          ...state.user,
          addresses: state.user.addresses.map(addr =>
            addr.id === action.payload.id ? action.payload : addr
          )
        }
      };

    case 'DELETE_ADDRESS':
      return {
        ...state,
        user: {
          ...state.user,
          addresses: state.user.addresses.filter(addr => addr.id !== action.payload)
        }
      };

    case 'ADD_PAYMENT_METHOD':
      return {
        ...state,
        user: {
          ...state.user,
          paymentMethods: [...(state.user?.paymentMethods || []), action.payload]
        }
      };

    case 'ADD_ORDER':
      return {
        ...state,
        user: {
          ...state.user,
          orders: [...(state.user?.orders || []), action.payload]
        }
      };

    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload
      };

    case 'LOAD_USER':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: !!action.payload
      };

    default:
      return state;
  }
};

const initialState = {
  isAuthenticated: false,
  user: null,
  isLoading: false
};

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('megamart_user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        dispatch({ type: 'LOAD_USER', payload: parsedUser });
      } catch (error) {
        console.error('Error loading user:', error);
      }
    }
  }, []);

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (state.user) {
      localStorage.setItem('megamart_user', JSON.stringify(state.user));
    } else {
      localStorage.removeItem('megamart_user');
    }
  }, [state.user]);

  const login = (userData) => {
    dispatch({ type: 'LOGIN', payload: userData });
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  const updateProfile = (profileData) => {
    dispatch({ type: 'UPDATE_PROFILE', payload: profileData });
  };

  const addAddress = (address) => {
    const newAddress = {
      ...address,
      id: Date.now().toString()
    };
    dispatch({ type: 'ADD_ADDRESS', payload: newAddress });
  };

  const updateAddress = (address) => {
    dispatch({ type: 'UPDATE_ADDRESS', payload: address });
  };

  const deleteAddress = (addressId) => {
    dispatch({ type: 'DELETE_ADDRESS', payload: addressId });
  };

  const addPaymentMethod = (paymentMethod) => {
    const newPaymentMethod = {
      ...paymentMethod,
      id: Date.now().toString()
    };
    dispatch({ type: 'ADD_PAYMENT_METHOD', payload: newPaymentMethod });
  };

  const addOrder = (order) => {
    const newOrder = {
      ...order,
      id: Date.now().toString(),
      orderDate: new Date().toISOString(),
      status: 'Processing'
    };
    dispatch({ type: 'ADD_ORDER', payload: newOrder });
  };

  const setLoading = (isLoading) => {
    dispatch({ type: 'SET_LOADING', payload: isLoading });
  };

  const value = {
    ...state,
    login,
    logout,
    updateProfile,
    addAddress,
    updateAddress,
    deleteAddress,
    addPaymentMethod,
    addOrder,
    setLoading
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
