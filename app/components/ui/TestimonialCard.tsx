'use client'

import { motion } from 'framer-motion'

interface TestimonialCardProps {
  name: string
  role: string
  content: string
  rating?: number
  delay?: number
  className?: string
}

export default function TestimonialCard({
  name,
  role,
  content,
  rating = 5,
  delay = 0,
  className = ''
}: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className={`bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-all ${className}`}
    >
      <div className="flex gap-1 mb-4">
        {[...Array(rating)].map((_, i) => (
          <span key={i} className="text-sage">★</span>
        ))}
      </div>
      <p className="text-bark/80 mb-6 italic">"{content}"</p>
      <div>
        <p className="font-medium text-olivewood">{name}</p>
        <p className="text-sm text-bark/60">{role}</p>
      </div>
    </motion.div>
  )
}