import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { XCircle } from 'lucide-react';

export default function Modal({ isOpen, onClose, children, isSearchOpen, setIsSearchOpen }) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if ((e.metaKey || e.ctrlKey) && e.key === 'f' && isOpen) {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, setIsSearchOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100]">
      <div 
        className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="absolute inset-4 sm:inset-6 md:inset-8 bg-[#0F1117] dark:bg-codeblock rounded-xl shadow-2xl ring-1 ring-gray-200/5 dark:ring-gray-800/50 overflow-hidden text-gray-50 codeblock-dark">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-1.5 text-gray-400 hover:text-gray-300 rounded-md bg-gray-800/50 hover:bg-gray-800"
        >
          <XCircle className="w-5 h-5" />
        </button>
        {children}
      </div>
    </div>,
    document.getElementById('modal-root')
  );
}