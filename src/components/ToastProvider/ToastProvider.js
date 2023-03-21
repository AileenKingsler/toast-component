import React from 'react';

export const ToastContext = React.createContext();

function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);

  React.useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === 'Escape') {
        setToasts([]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const addToast = (variant, message) => {
    const newToasts = [
      ...toasts,
      { id: crypto.randomUUID(), variant, message },
    ];

    setToasts(newToasts);
  };

  const removeToast = (id) => {
    const newToasts = toasts.filter((toast) => toast.id !== id);

    setToasts(newToasts);
  };

  const value = {
    toasts,
    addToast,
    removeToast,
  };

  return (
    <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
  );
}

export default ToastProvider;
