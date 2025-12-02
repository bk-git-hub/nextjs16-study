'use client';

import { useEffect, useState } from 'react';

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    // 1. Logic to determine when to stop showing the splash
    // You can check for session loading here if you want to wait for Auth
    const timeout = setTimeout(() => {
      setIsVisible(false);
    }, 2000); // Show for at least 2 seconds (optional, but good for branding)

    return () => clearTimeout(timeout);
  }, []);

  // 2. Handle the animation cleanup
  useEffect(() => {
    if (!isVisible) {
      // Wait for the CSS transition to finish before unmounting
      const timeout = setTimeout(() => {
        setShouldRender(false);
      }, 500); // Match this with your CSS transition duration

      return () => clearTimeout(timeout);
    }
  }, [isVisible]);

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-white transition-opacity duration-500 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Replace this with your Logo / Animation */}
      <div className='flex flex-col items-center gap-4'>
        <div className='h-16 w-16 animate-bounce rounded-full bg-blue-600' />
        <h1 className='text-xl font-bold text-gray-800'>My App</h1>
      </div>
    </div>
  );
}
