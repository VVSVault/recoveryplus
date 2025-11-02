'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="announcement-bar relative sticky top-0 z-[110]">
      <div className="absolute inset-0 bg-gradient-to-r from-olive/90 to-black/90 backdrop-blur-md" />
      <div className="relative text-white">
        <div className="container py-3 px-4 text-center">
          <p className="text-sm md:text-base font-light tracking-wide">
            Save $285/mo — Elite Recovery for $65.99. Lifetime rate. Cancel anytime.
          </p>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white"
          aria-label="Close announcement"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}