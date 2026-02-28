import React from 'react';
import { useNotification } from '../contexts/NotificationContext';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

const ToastContainer = () => {
  const { notifications, removeNotification } = useNotification();

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'info':
      default:
        return <Info className="h-5 w-5 text-blue-500" />;
    }
  };

  const getBackgroundColor = (type) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'error':
        return 'bg-red-50 border-red-200';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
      case 'info':
      default:
        return 'bg-blue-50 border-blue-200';
    }
  };

  const getTextColor = (type) => {
    switch (type) {
      case 'success':
        return 'text-green-800';
      case 'error':
        return 'text-red-800';
      case 'warning':
        return 'text-yellow-800';
      case 'info':
      default:
        return 'text-blue-800';
    }
  };

  return (
    <div className="fixed top-20 right-4 z-50 space-y-2">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`
            flex items-center justify-between p-4 rounded-lg border shadow-lg
            min-w-[300px] max-w-md animate-slide-up
            ${getBackgroundColor(notification.type)}
          `}
        >
          <div className="flex items-center space-x-3 flex-1">
            {getIcon(notification.type)}
            <p className={`text-sm font-medium ${getTextColor(notification.type)}`}>
              {notification.message}
            </p>
          </div>
          <button
            onClick={() => removeNotification(notification.id)}
            className={`ml-4 p-1 rounded-full hover:bg-gray-200 transition-colors ${getTextColor(notification.type)}`}
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;
