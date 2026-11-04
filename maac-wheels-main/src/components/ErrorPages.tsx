import React, { useState, useEffect } from 'react';
import { AlertTriangle, RotateCcw, WifiOff, RefreshCw } from 'lucide-react';

export const NotFoundPage: React.FC<{ onReturnHome: () => void }> = ({ onReturnHome }) => {
  return (
    <div className="min-h-[70svh] flex items-center justify-center px-4 py-12 sm:py-16 text-center bg-[#fffdd0]">
      <div className="w-full max-w-md bg-[#fdfcf3] border border-[#dbd49b] p-6 sm:p-8 rounded-xl sm:rounded-2xl shadow-md space-y-4">
        <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#f5f1c6] border border-[#dbd49b] rounded-full flex items-center justify-center mx-auto text-[#556b2f]">
          <AlertTriangle className="w-7 h-7 sm:w-8 sm:h-8" />
        </div>
        <span className="text-xs font-mono-code text-[#556b2f] uppercase tracking-wider block font-bold">
          404 Status • Page Not Found
        </span>
        <h2 className="font-heading font-bold text-2xl sm:text-3xl text-[#1c2610] uppercase tracking-tight">
          Sector Not Found
        </h2>
        <p className="text-xs sm:text-sm text-[#405126] font-body leading-relaxed">
          The link or part specification you attempted to reach has been repositioned or retired from our workshop index.
        </p>
        <div className="pt-2">
          <button
            onClick={onReturnHome}
            className="w-full py-3.5 bg-[#556b2f] hover:bg-[#3f5023] text-[#fffdd0] font-heading font-bold text-xs sm:text-sm uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs min-h-[44px]"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Return to Workshop Home</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export const OfflineIndicator: React.FC = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnline) return null;

  return (
    <div className="fixed top-0 inset-x-0 z-50 bg-[#556b2f] text-[#fffdd0] px-4 pt-[max(0.5rem,env(safe-area-inset-top,0.5rem))] pb-2 text-xs font-mono-code flex items-center justify-between shadow-md">
      <div className="flex items-center gap-2">
        <WifiOff className="w-4 h-4" />
        <span className="text-xs">CONNECTION INTERRUPTED. BROWSING OFFLINE CACHED MODE.</span>
      </div>
      <button
        onClick={() => window.location.reload()}
        className="px-2.5 py-1 bg-[#3f5023] hover:bg-[#222d13] text-[#fffdd0] rounded text-xs uppercase font-bold flex items-center gap-1 cursor-pointer min-h-[32px]"
      >
        <RefreshCw className="w-3.5 h-3.5" />
        RETRY
      </button>
    </div>
  );
};
