import React, { createContext, useContext, useState, useCallback } from "react";

const NotificationContext = createContext();

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotification must be used within a NotificationProvider");
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = useCallback((notification) => {
    const id = Date.now() + Math.random();
    const newNotification = {
      id,
      ...notification,
    };

    setNotifications((prev) => [...prev, newNotification]);
  }, []);

  const removeNotification = useCallback((id) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id));
  }, []);

  const showSuccess = useCallback((title, message) => {
    addNotification({
      type: "success",
      title,
      message,
      duration: 4000,
    });
  }, [addNotification]);

  const showError = useCallback((title, message) => {
    addNotification({
      type: "error",
      title,
      message,
      duration: 6000,
    });
  }, [addNotification]);

  const showInfo = useCallback((title, message) => {
    addNotification({
      type: "info",
      title,
      message,
      duration: 4000,
    });
  }, [addNotification]);

  const value = {
    notifications,
    showSuccess,
    showError,
    showInfo,
    removeNotification,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};
