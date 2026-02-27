import { useCallback, useMemo, useState } from 'react';
import { ToastContext } from './ToastContextBase';

let toastCounter = 0;

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const dismissToast = useCallback((id) => {
    setToasts((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const pushToast = useCallback((payload) => {
    const id = `toast-${++toastCounter}`;
    const nextToast = {
      id,
      type: payload.type || 'info',
      title: payload.title || 'Notice',
      message: payload.message || '',
    };

    setToasts((prev) => [nextToast, ...prev].slice(0, 4));
    setTimeout(() => dismissToast(id), 2600);
  }, [dismissToast]);

  const value = useMemo(() => ({
    toasts,
    pushToast,
    dismissToast,
  }), [toasts, pushToast, dismissToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
    </ToastContext.Provider>
  );
};

