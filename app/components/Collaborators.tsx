'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

type Collaborator = {
  name: string;
  logoUrl?: string;
  fallbackText: string;
  className?: string;
  size?: string;
  subtitle?: string;
}

const collaborators: Collaborator[] = [
  { 
    name: 'SolidCore',
    logoUrl: '/images/logos/solidcore.png',
    fallbackText: '[solidcore]',
    className: 'font-bold text-xl md:text-2xl tracking-tight lowercase',
    size: 'w-40 h-16 md:w-48 md:h-20'
  },
  { 
    name: 'Fabletics',
    logoUrl: '/images/logos/fabletics.png',
    fallbackText: 'FABLETICS',
    className: 'font-bold tracking-wider text-2xl md:text-3xl',
    size: 'w-65 h-26 md:w-70 md:h-24'
  },
  { 
    name: 'Fleet Feet',
    logoUrl: '/images/logos/fleet-feet.png',
    fallbackText: 'FLEET FEET',
    className: 'font-semibold tracking-wide text-xl md:text-2xl',
    size: 'w-60 h-20 md:w-72 md:h-24'
  }
];

export default function Collaborators() {
  return (
    <section className="py-20 bg-sand/10 relative">
      {/* Top separator */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-olive/30" />
      {/* Bottom separator */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-olive/30" />
      <div className="container">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="text-2xl md:text-3xl uppercase tracking-[0.3em] text-bark/80 mb-12 font-light">
            COLLABORATORS
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center max-w-4xl mx-auto">
            {collaborators.map((collab, index) => (
              <motion.div
                key={collab.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center justify-center h-24"
              >
                {collab.logoUrl ? (
                  <div className={`relative ${collab.size || 'w-48 h-24 md:w-56 md:h-28'} grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100`}>
                    <Image
                      src={collab.logoUrl}
                      alt={collab.name}
                      fill
                      className="object-contain"
                      onError={(e) => {
                        // If image fails to load, hide it and show text instead
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                ) : (
                  <div className={`text-bark/70 hover:text-bark transition-colors ${collab.className}`}>
                    {collab.fallbackText}
                    {collab.subtitle && (
                      <div className="text-xs tracking-[0.3em] mt-1">{collab.subtitle}</div>
                    )}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}