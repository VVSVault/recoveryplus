'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Service } from '@/types';

interface ServiceCardProps {
  service: Service;
  index: number;
}

export default function ServiceCard({ service, index }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative h-[470px] border border-bark/30 p-2 bg-parchment/5"
    >
      <div className="relative h-full overflow-hidden rounded-sm">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />
        <Image
          src={service.image}
          alt={service.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={index < 3}
          loading={index < 3 ? "eager" : "lazy"}
        />
      </div>
      
      <div className="absolute inset-0 z-20 flex flex-col justify-end p-8">
        <p className="text-sm uppercase tracking-wider mb-2 text-white/80">SUMMER</p>
        <h3 className="text-3xl font-light mb-8 uppercase tracking-wide text-white">{service.title}</h3>
        
        <Link
          href={`/services/${service.slug}`}
          className="inline-flex items-center justify-center border border-white text-white hover:bg-olive hover:border-olive hover:text-white transition-all duration-300 px-8 py-3 text-sm uppercase tracking-wider font-light relative overflow-hidden group/btn"
        >
          <span className="absolute inset-0 bg-olive transform -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-300"></span>
          <span className="relative z-10">Learn More</span>
        </Link>
      </div>
    </motion.div>
  );
}