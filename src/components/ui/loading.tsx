
import React from 'react';
import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ className, size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  return (
    <div className={cn('relative', className)}>
      <div className={cn(
        'animate-spin rounded-full border-2 border-gray-300 border-t-blue-600',
        sizeClasses[size]
      )} />
    </div>
  );
};

interface LoadingOverlayProps {
  isVisible: boolean;
  message?: string;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ isVisible, message = 'Submitting...' }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl p-8 shadow-2xl max-w-sm w-full mx-4 animate-scale-in">
        <div className="text-center">
          <div className="mb-4 flex justify-center">
            <div className="relative">
              <div className="w-12 h-12 border-4 border-gray-200 rounded-full animate-spin"></div>
              <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
            </div>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{message}</h3>
          <p className="text-sm text-gray-600">Please wait while we process your information...</p>
          <div className="mt-4 w-full bg-gray-200 rounded-full h-1">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-1 rounded-full animate-pulse" style={{ width: '70%' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { LoadingSpinner, LoadingOverlay };
