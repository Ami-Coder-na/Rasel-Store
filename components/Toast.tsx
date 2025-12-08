import React, { useEffect } from 'react';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info';

export interface ToastMessage {
  id: string;
  type: ToastType;
  message: string;
}

interface ToastContainerProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onDismiss }) => {
  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 pointer-events-none">
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>
  );
};

const Toast: React.FC<{ toast: ToastMessage; onDismiss: (id: string) => void }> = ({ toast, onDismiss }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(toast.id);
    }, 4000);
    return () => clearTimeout(timer);
  }, [toast.id, onDismiss]);

  const styles = {
    success: 'bg-white dark:bg-gray-800 border-l-4 border-green-500 text-gray-800 dark:text-white',
    error: 'bg-white dark:bg-gray-800 border-l-4 border-red-500 text-gray-800 dark:text-white',
    info: 'bg-white dark:bg-gray-800 border-l-4 border-cyan-500 text-gray-800 dark:text-white',
  };

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-green-500" />,
    error: <AlertCircle className="w-5 h-5 text-red-500" />,
    info: <Info className="w-5 h-5 text-cyan-500" />,
  };

  return (
    <div className={`pointer-events-auto min-w-[300px] max-w-sm rounded-lg shadow-xl p-4 flex items-start gap-3 transform transition-all animate-fade-in-up ${styles[toast.type]}`}>
      <div className="mt-0.5">{icons[toast.type]}</div>
      <div className="flex-1">
         <p className="font-bold text-sm">{toast.type === 'success' ? 'Success' : toast.type === 'error' ? 'Error' : 'Note'}</p>
         <p className="text-sm opacity-90">{toast.message}</p>
      </div>
      <button onClick={() => onDismiss(toast.id)} className="text-gray-400 hover:text-gray-600 dark:hover:text-white">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};