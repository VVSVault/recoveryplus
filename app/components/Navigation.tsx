'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navigation } from '@/lib/config';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isServicesPage = pathname === '/services';
  const isDashboard = pathname === '/dashboard';
  const isHomePage = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Don't render navigation on dashboard page
  if (isDashboard) {
    return null;
  }

  return (
    <nav
      className={`fixed w-full z-[100] transition-all duration-300 ${
        scrolled ? 'bg-black/90 backdrop-blur-md py-4' : 'bg-transparent py-6'
      }`}
      style={{ top: scrolled ? 0 : 52 }}
    >
      <div className="container flex items-center justify-between">
        <Link href="/" className={`text-2xl font-bold transition-colors ${
          scrolled ? 'text-white' : isHomePage ? 'text-white' : 'text-bark'
        }`}>
          RecoveryPlus<span className={`transition-colors ${
            scrolled ? 'text-white' : 'text-olive'
          }`}>+</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navigation.map((item) => {
            // Only show Reserve button on home page
            if (item.homeOnly && pathname !== '/') {
              return null;
            }
            if (item.isReserve) {
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className="relative flex items-center justify-center group"
                >
                  <div className="absolute inset-0 flex items-center justify-center overflow-visible">
                    {/* Horizontal bar - height matches text height */}
                    <div 
                      className={`absolute w-24 h-5 transition-all`}
                      style={{
                        background: scrolled 
                          ? 'rgba(0, 0, 0, 0.9)' 
                          : 'linear-gradient(to right, #000000, #31332c 45%, #31332c 55%, #000000)'
                      }}
                    />
                    {/* Vertical bar - extends up to connect with banner */}
                    <div 
                      className={`absolute w-5 transition-all duration-500 ease-in-out`} 
                      style={{ 
                        height: scrolled ? '0px' : '90px',
                        top: scrolled ? '0px' : '-38px',
                        opacity: scrolled ? 0 : 1,
                        transform: scrolled ? 'scaleY(0)' : 'scaleY(1)',
                        transformOrigin: 'bottom',
                        background: scrolled ? 'transparent' : 'linear-gradient(to bottom, #31332c, #000000)'
                      }} 
                    />
                  </div>
                  <span className={`relative z-10 text-sm uppercase tracking-wider font-medium px-2 text-white`}>
                    {item.label}
                  </span>
                </Link>
              );
            } else if (item.isButton) {
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className="btn-primary"
                >
                  {item.label}
                </Link>
              );
            } else {
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`hover:text-primary-500 transition-colors ${
                    scrolled ? 'text-white' : isHomePage ? 'text-white' : 'text-bark'
                  }`}
                >
                  {item.label}
                </Link>
              );
            }
          })}
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden relative w-8 h-8 flex flex-col justify-center items-center"
        >
          <span
            className={`block w-6 h-0.5 transition-all duration-300 ${
              scrolled ? 'bg-white' : isHomePage ? 'bg-white' : 'bg-bark'
            } ${isOpen ? 'rotate-45 translate-y-1' : ''}`}
          />
          <span
            className={`block w-6 h-0.5 transition-all duration-300 ${
              scrolled ? 'bg-white' : isHomePage ? 'bg-white' : 'bg-bark'
            } ${isOpen ? 'opacity-0' : 'my-1'}`}
          />
          <span
            className={`block w-6 h-0.5 transition-all duration-300 ${
              scrolled ? 'bg-white' : isHomePage ? 'bg-white' : 'bg-bark'
            } ${isOpen ? '-rotate-45 -translate-y-1' : ''}`}
          />
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-parchment/95 backdrop-blur-md border-t border-sand/30"
          >
            <div className="container py-4">
              {navigation.map((item) => {
                if (item.isReserve) {
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="block mt-6 mb-4"
                      onClick={() => setIsOpen(false)}
                    >
                      <div className="relative flex items-center justify-center mx-auto group">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="absolute w-20 h-4 bg-black/80" />
                          <div className="absolute h-20 w-4 bg-black/80" />
                        </div>
                        <span className="relative z-10 text-xs uppercase tracking-wider font-medium text-white px-2">
                          {item.label}
                        </span>
                      </div>
                    </Link>
                  );
                } else if (item.isButton) {
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="block py-3 btn-primary text-center mt-4"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </Link>
                  );
                } else {
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="block py-3 text-white hover:text-primary-500 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </Link>
                  );
                }
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}