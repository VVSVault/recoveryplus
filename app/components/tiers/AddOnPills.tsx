'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Check, Info } from 'lucide-react'

const addOns = [
  {
    id: 'extra-sessions',
    name: 'Extra Sessions',
    price: '+$35/session',
    info: 'Add individual recovery sessions beyond your monthly allocation at a discounted member rate.'
  },
  {
    id: 'guest-passes',
    name: 'Guest Pass Bundle',
    price: '+$89/mo',
    info: 'Bring 4 guests per month to experience Recovery Plus. Perfect for training partners.'
  },
  {
    id: 'bodywork-credits',
    name: 'Bodywork Credits',
    price: '+$149/mo',
    info: '3 monthly credits for massage therapy, myofascial release, or assisted stretching sessions.'
  },
  {
    id: 'sauna-cold',
    name: 'Unlimited Contrast',
    price: '+$79/mo',
    info: 'Unlimited access to sauna and cold plunge outside of scheduled sessions.'
  },
  {
    id: 'nutrition',
    name: 'Nutrition Coaching',
    price: '+$129/mo',
    info: 'Monthly 1-on-1 nutrition consultations with personalized meal planning and tracking.'
  },
  {
    id: 'private-room',
    name: 'Private Recovery Room',
    price: '+$199/mo',
    info: '8 hours monthly access to private recovery suites with dedicated amenities.'
  },
  {
    id: 'performance-testing',
    name: 'Performance Testing',
    price: '+$99/mo',
    info: 'Quarterly fitness assessments including VO2 max, body composition, and mobility testing.'
  },
  {
    id: 'sleep-optimization',
    name: 'Sleep Optimization',
    price: '+$79/mo',
    info: 'Sleep tracking device rental plus monthly sleep coaching consultations.'
  },
  {
    id: 'corporate-wellness',
    name: 'Team Package',
    price: '+$299/mo',
    info: 'Add up to 5 team members to your account with shared session allocation.'
  }
]

interface AddOnPillsProps {
  selectedAddOns: string[]
  onToggleAddOn: (addonId: string) => void
}

export default function AddOnPills({ selectedAddOns, onToggleAddOn }: AddOnPillsProps) {
  const [hoveredAddon, setHoveredAddon] = useState<string | null>(null)

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
      {addOns.map((addon, index) => {
        const isSelected = selectedAddOns.includes(addon.id)
        const isHovered = hoveredAddon === addon.id

        return (
          <motion.div
            key={addon.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            className="relative"
          >
            <button
              onClick={() => onToggleAddOn(addon.id)}
              onMouseEnter={() => setHoveredAddon(addon.id)}
              onMouseLeave={() => setHoveredAddon(null)}
              className={`w-full px-6 py-4 rounded-2xl flex items-center gap-3 transition-all ${
                isSelected
                  ? 'bg-sage text-white shadow-md'
                  : 'bg-white border border-sage/30 text-olivewood hover:bg-sage/5 hover:border-sage/50'
              }`}
            >
              {/* Selection Icon */}
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                isSelected ? 'bg-white/20' : 'bg-sage/10'
              }`}>
                {isSelected ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Plus className="w-4 h-4" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 text-left">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{addon.name}</span>
                  <Info className={`w-3 h-3 ${isSelected ? 'text-white/60' : 'text-bark/40'}`} />
                </div>
                <span className={`text-sm ${isSelected ? 'text-white/80' : 'text-bark/60'}`}>
                  {addon.price}
                </span>
              </div>
            </button>

            {/* Info Tooltip */}
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute z-10 bottom-full mb-2 left-0 right-0 mx-4"
              >
                <div className="bg-olivewood text-white text-xs rounded-lg p-3 shadow-lg">
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-olivewood"></div>
                  {addon.info}
                </div>
              </motion.div>
            )}
          </motion.div>
        )
      })}
    </div>
  )
}