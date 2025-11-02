'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface PillCardProps {
  children: ReactNode
  dotColor?: 'sage' | 'olive' | 'bark'
  delay?: number
  className?: string
}

export default function PillCard({
  children,
  dotColor = 'sage',
  delay = 0,
  className = ''
}: PillCardProps) {
  const dotColors = {
    sage: 'bg-sage',
    olive: 'bg-olive',
    bark: 'bg-bark'
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02, x: 10 }}
      transition={{ type: "spring", stiffness: 300 }}
      className={`bg-white rounded-2xl px-8 py-6 shadow-sm hover:shadow-md transition-shadow ${className}`}
    >
      <div className="flex items-start gap-4">
        <div className={`w-2 h-2 ${dotColors[dotColor]} rounded-full mt-2 flex-shrink-0`} />
        <div>{children}</div>
      </div>
    </motion.div>
  )
}