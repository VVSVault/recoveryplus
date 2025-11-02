'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface FeatureTileProps {
  icon: ReactNode
  title: string
  description: string
  iconBg?: 'sage' | 'olive' | 'bark'
  delay?: number
  className?: string
}

export default function FeatureTile({
  icon,
  title,
  description,
  iconBg = 'sage',
  delay = 0,
  className = ''
}: FeatureTileProps) {
  const bgColors = {
    sage: 'bg-sage/10',
    olive: 'bg-olive/10',
    bark: 'bg-bark/10'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      className={`bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow ${className}`}
    >
      <div className={`w-12 h-12 ${bgColors[iconBg]} rounded-xl flex items-center justify-center mb-4`}>
        {icon}
      </div>
      <h4 className="font-medium text-olivewood mb-2">{title}</h4>
      <p className="text-sm text-bark/70">{description}</p>
    </motion.div>
  )
}