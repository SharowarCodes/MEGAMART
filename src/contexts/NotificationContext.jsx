import React, { createContext, useContext, useReducer, useEffect } from 'react';

const NotificationContext = createContext();

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_NOTIFICATION':
      return {
        ...state,
        notifications: [...state.notifications, { ...action.payload, id: Date.now() }]
      };

    case 'REMOVE_NOTIFICATION':
      return {
        ...state,
        notifications: state.notifications.filter(notification => notification.id !== action.payload)
      };

    case 'CLEAR_NOTIFICATIONS':
      return {
        ...state,
        notifications: []
      };

    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload
      };

    default:
      return state;
  }
};

const initialState = {
  notifications: [],
  isLoading: false
};

export const NotificationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notificationReducer, initialState);

  // Auto-remove notifications after 5 seconds
  useEffect(() => {
    const timers = state.notifications.map(notification => {
      return setTimeout(() => {
        dispatch({ type: 'REMOVE_NOTIFICATION', payload: notification.id });
      }, 5000);
    });

    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [state.notifications]);

  const addNotification = (message, type = 'info', duration = 5000) => {
    const notification = {
      message,
      type, // 'success', 'error', 'warning', 'info'
      duration
    };
    
    dispatch({ type: 'ADD_NOTIFICATION', payload: notification });

    // Auto-remove after duration
    setTimeout(() => {
      dispatch({ type: 'REMOVE_NOTIFICATION', payload: notification.id });
    }, duration);
  };

  const removeNotification = (id) => {
    dispatch({ type: 'REMOVE_NOTIFICATION', payload: id });
  };

  const clearNotifications = () => {
    dispatch({ type: 'CLEAR_NOTIFICATIONS' });
  };

  const showSuccess = (message) => {
    addNotification(message, 'success');
  };

  const showError = (message) => {
    addNotification(message, 'error');
  };

  const showWarning = (message) => {
    addNotification(message, 'warning');
  };

  const showInfo = (message) => {
    addNotification(message, 'info');
  };

  const setLoading = (isLoading) => {
    dispatch({ type: 'SET_LOADING', payload: isLoading });
  };

  const value = {
    notifications: state.notifications,
    isLoading: state.isLoading,
    addNotification,
    removeNotification,
    clearNotifications,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    setLoading
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};
