'use client'

import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    name: 'Marcus Chen',
    role: 'Triathlete',
    quote: 'Elite membership transformed my recovery game. The contrast therapy and mobility work cut my recovery time in half.',
    avatar: '👤'
  },
  {
    id: 2,
    name: 'Sarah Williams',
    role: 'CrossFit Athlete',
    quote: 'The personalized protocols and 1-on-1 coaching helped me identify exactly what my body needs after heavy training days.',
    avatar: '👤'
  },
  {
    id: 3,
    name: 'David Rodriguez',
    role: 'Weekend Warrior',
    quote: 'Core plan is perfect for my schedule. I come in twice a week and feel 10 years younger.',
    avatar: '👤'
  }
]

export default function TestimonialCarousel() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {testimonials.map((testimonial, index) => (
        <motion.div
          key={testimonial.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
        >
          <Quote className="w-8 h-8 text-sage/20 mb-4" />
          <p className="text-bark/80 mb-6 italic">"{testimonial.quote}"</p>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-sage/10 rounded-full flex items-center justify-center text-xl">
              {testimonial.avatar}
            </div>
            <div>
              <p className="font-medium text-olivewood">{testimonial.name}</p>
              <p className="text-sm text-bark/60">{testimonial.role}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}