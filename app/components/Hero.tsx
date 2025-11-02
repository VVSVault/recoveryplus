'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import VideoPlaceholder from './VideoPlaceholder';

export default function Hero() {
  const [videoError, setVideoError] = useState(false);

  return (
    <section className="relative h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        {!videoError ? (
          <>
            {/* Video Background */}
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
              poster="https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=1920&h=1080&fit=crop"
              onError={() => setVideoError(true)}
            >
              <source src="/videos/hero-video-final.mp4" type="video/mp4" />
            </video>
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/70" />
          </>
        ) : (
          <VideoPlaceholder />
        )}
        
        {/* Additional dark overlay for better text contrast */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <div className="relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="pl-12 md:pl-20 lg:pl-32"
        >
          <div className="space-y-0">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-extralight tracking-tighter leading-none font-[family-name:var(--font-poppins)] text-white">
              YOUR RECOVERY
            </h1>
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-extralight tracking-tighter leading-none font-[family-name:var(--font-poppins)]">
              <span className="text-white">— </span>
              <span className="bg-gradient-to-r from-white to-olive bg-clip-text text-transparent">
                OPTIMIZED
              </span>
            </h1>
          </div>
          
          <p className="text-xl md:text-2xl font-extralight tracking-wider text-white/90 font-[family-name:var(--font-poppins)] mt-12 mb-8">
            Discover your personalized path to renewal.
          </p>
          
          <p className="text-sm md:text-base font-light leading-relaxed text-white/80 max-w-lg mb-16">
            Experience curated recovery treatments designed to rejuvenate your mind and body. 
            Members enjoy exclusive access to premium therapies, personalized care plans, 
            and a space where wellness becomes a lifestyle.
          </p>
          
          <Link 
            href="#booking" 
            className="inline-block relative border-2 border-white text-white px-10 py-4 text-xs uppercase tracking-[0.2em] font-medium overflow-hidden group transition-all duration-500"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-olive to-sage transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
            <span className="relative z-10 group-hover:text-white transition-colors duration-500">
              Curate Your Experience
            </span>
          </Link>
        </motion.div>
      </div>

    </section>
  );
}