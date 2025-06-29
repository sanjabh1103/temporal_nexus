import React, { useState, useEffect } from 'react';
import { Bell, X, Check, AlertTriangle, Info, Zap, Users, Clock } from 'lucide-react';

interface Notification {
  id: string;
  type: 'success' | 'warning' | 'info' | 'error' | 'insight';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
  actionText?: string;
}

export const NotificationSystem: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    // Initialize with mock notifications
    const mockNotifications: Notification[] = [
      {
        id: '1',
        type: 'insight',
        title: 'New AI Insight Available',
        message: 'Your career change decision analysis is complete with 87% confidence.',
        timestamp: new Date(Date.now() - 300000).toISOString(),
        read: false,
        actionUrl: '/dashboard',
        actionText: 'View Analysis'
      },
      {
        id: '2',
        type: 'warning',
        title: 'Market Conditions Alert',
        message: 'Economic indicators suggest delaying investment decisions by 2-3 months.',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        read: false
      },
      {
        id: '3',
        type: 'success',
        title: 'Simulation Complete',
        message: 'Your relocation simulation shows 92% positive outcomes for Seattle.',
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        read: true,
        actionUrl: '/quantum',
        actionText: 'View Results'
      },
      {
        id: '4',
        type: 'info',
        title: 'Collaborative Update',
        message: 'Sarah Kim shared insights on your startup launch decision.',
        timestamp: new Date(Date.now() - 86400000).toISOString(),
        read: false
      }
    ];

    setNotifications(mockNotifications);
    setUnreadCount(mockNotifications.filter(n => !n.read).length);

    // Simulate real-time notifications
    const interval = setInterval(() => {
      if (Math.random() > 0.7) { // 30% chance every 10 seconds
        addNotification({
          type: Math.random() > 0.5 ? 'insight' : 'info',
          title: 'Real-time Update',
          message: 'New collective intelligence data available for your decisions.',
          actionUrl: '/dashboard'
        });
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      read: false
    };

    setNotifications(prev => [newNotification, ...prev.slice(0, 19)]); // Keep max 20
    setUnreadCount(prev => prev + 1);
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    setUnreadCount(0);
  };

  const removeNotification = (id: string) => {
    const notification = notifications.find(n => n.id === id);
    setNotifications(prev => prev.filter(n => n.id !== id));
    if (notification && !notification.read) {
      setUnreadCount(prev => Math.max(0, prev - 1));
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <Check className="w-5 h-5 text-collective-400" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
      case 'error':
        return <X className="w-5 h-5 text-red-400" />;
      case 'insight':
        return <Zap className="w-5 h-5 text-temporal-400" />;
      case 'info':
        return <Info className="w-5 h-5 text-quantum-400" />;
      default:
        return <Bell className="w-5 h-5 text-gray-400" />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'border-l-collective-400 bg-collective-400/5';
      case 'warning':
        return 'border-l-yellow-400 bg-yellow-400/5';
      case 'error':
        return 'border-l-red-400 bg-red-400/5';
      case 'insight':
        return 'border-l-temporal-400 bg-temporal-400/5';
      case 'info':
        return 'border-l-quantum-400 bg-quantum-400/5';
      default:
        return 'border-l-gray-400 bg-gray-400/5';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    
    if (diff < 60000) return 'Just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    return `${Math.floor(diff / 86400000)}d ago`;
  };

  return (
    <div className="relative">
      {/* Notification Bell */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-lg bg-white/10 text-gray-300 hover:text-white hover:bg-white/20 transition-colors"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-temporal-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Notification Panel */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-gray-900/95 backdrop-blur-sm border border-white/10 rounded-xl shadow-2xl z-50 max-h-96 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <h3 className="text-lg font-semibold text-white">Notifications</h3>
            <div className="flex items-center space-x-2">
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-sm text-temporal-400 hover:text-temporal-300"
                >
                  Mark all read
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded text-gray-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Notifications List */}
          <div className="max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-6 text-center">
                <Bell className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-400">No notifications yet</p>
              </div>
            ) : (
              <div className="space-y-1">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 border-l-4 hover:bg-white/5 transition-colors cursor-pointer ${
                      getNotificationColor(notification.type)
                    } ${!notification.read ? 'bg-white/5' : ''}`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 mt-0.5">
                        {getNotificationIcon(notification.type)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className={`text-sm font-medium ${
                            notification.read ? 'text-gray-300' : 'text-white'
                          }`}>
                            {notification.title}
                          </h4>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-gray-500">
                              {formatTimestamp(notification.timestamp)}
                            </span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                removeNotification(notification.id);
                              }}
                              className="text-gray-400 hover:text-white"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                        
                        <p className={`text-sm ${
                          notification.read ? 'text-gray-400' : 'text-gray-300'
                        }`}>
                          {notification.message}
                        </p>
                        
                        {notification.actionUrl && notification.actionText && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              // Handle navigation
                              console.log('Navigate to:', notification.actionUrl);
                            }}
                            className="mt-2 text-sm text-temporal-400 hover:text-temporal-300 font-medium"
                          >
                            {notification.actionText} →
                          </button>
                        )}
                        
                        {!notification.read && (
                          <div className="absolute right-2 top-2 w-2 h-2 bg-temporal-500 rounded-full"></div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="p-3 border-t border-white/10 text-center">
              <button className="text-sm text-temporal-400 hover:text-temporal-300">
                View all notifications
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};