'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function SectionSeparator() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="relative py-12">
      <div className="relative">
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={isInView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute left-0 right-0 h-[1px] bg-olive/30"
        />
        <div className="relative flex items-center justify-center">
          <div className="bg-sand/10 px-8">
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={isInView ? { width: '60px', opacity: 1 } : { width: 0, opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="h-[1px] bg-sand/10"
            />
          </div>
        </div>
      </div>
    </div>
  );
}