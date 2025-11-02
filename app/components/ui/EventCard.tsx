'use client'

import { motion } from 'framer-motion'

interface EventCardProps {
  date: string
  time: string
  title: string
  type: string
  spots: string
  delay?: number
  className?: string
}

export default function EventCard({
  date,
  time,
  title,
  type,
  spots,
  delay = 0,
  className = ''
}: EventCardProps) {
  const isFullyBooked = spots === 'Fully Booked'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className={`bg-parchment rounded-2xl p-6 hover:shadow-lg transition-all ${className}`}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-sm font-medium text-sage">{date}</p>
          <p className="text-xs text-bark/60">{time}</p>
        </div>
        <span className={`text-xs px-3 py-1 rounded-full ${
          isFullyBooked
            ? 'bg-bark/10 text-bark'
            : 'bg-sage/10 text-sage'
        }`}>
          {spots}
        </span>
      </div>
      <h4 className="font-medium text-olivewood mb-1">{title}</h4>
      <p className="text-sm text-bark/60">{type}</p>
    </motion.div>
  )
}