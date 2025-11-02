'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, X, ChevronDown, Info } from 'lucide-react'

interface Plan {
  id: string
  name: string
  [key: string]: any
}

interface FeatureMatrixProps {
  plans: Plan[]
}

const features = {
  'Access': [
    { name: 'Amenity access', 'day-pass': '1 day', core: true, pro: true, elite: true },
    { name: 'Member app', 'day-pass': false, core: true, pro: true, elite: true },
    { name: 'Online booking', 'day-pass': false, core: true, pro: true, elite: true },
    { name: 'Priority booking', 'day-pass': false, core: '48hr', pro: '72hr', elite: '1 week', tooltip: 'Advance booking window' },
  ],
  'Sessions': [
    { name: 'Sessions included', 'day-pass': '1', core: '4/mo', pro: '8/mo', elite: '12/mo' },
    { name: 'Session duration', 'day-pass': '30 min', core: '45 min', pro: '45 min', elite: '45 min' },
    { name: 'Additional sessions', 'day-pass': false, core: 'Standard', pro: '15% off', elite: '20% off' },
    { name: 'Mobile sessions', 'day-pass': false, core: false, pro: false, elite: '3/mo' },
  ],
  'Amenities': [
    { name: 'Sauna access', 'day-pass': true, core: true, pro: true, elite: true },
    { name: 'Cold plunge', 'day-pass': true, core: true, pro: true, elite: true },
    { name: 'Recovery equipment', 'day-pass': true, core: true, pro: true, elite: true },
    { name: 'Recovery lounge', 'day-pass': true, core: true, pro: true, elite: true },
    { name: 'Classes (Yoga, Breathwork)', 'day-pass': false, core: false, pro: false, elite: 'Unlimited' },
  ],
  'Guidance': [
    { name: 'Recovery plan', 'day-pass': false, core: false, pro: true, elite: true },
    { name: 'Progress check-ins', 'day-pass': false, core: false, pro: 'Monthly', elite: 'Monthly' },
    { name: 'Workshops', 'day-pass': false, core: 'Events only', pro: 'Exclusive', elite: 'VIP access' },
  ],
  'Perks': [
    { name: 'Guest passes', 'day-pass': false, core: false, pro: false, elite: '3/mo' },
    { name: 'Retail discount', 'day-pass': false, core: false, pro: '15%', elite: '20%' },
    { name: 'Event access', 'day-pass': false, core: 'Member', pro: 'Exclusive', elite: 'VIP' },
  ]
}

export default function FeatureMatrix({ plans }: FeatureMatrixProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>(['Access', 'Sessions'])
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null)

  const toggleSection = (section: string) => {
    setExpandedSections(prev =>
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    )
  }

  const renderValue = (value: any) => {
    if (value === true) return <Check className="w-5 h-5 text-sage" />
    if (value === false) return <X className="w-5 h-5 text-bark/30" />
    return <span className="text-sm text-olivewood font-medium">{value}</span>
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-sand/30">
            <th className="text-left py-4 px-4 w-1/3">
              <span className="text-sm font-medium text-bark/60">Features</span>
            </th>
            {plans.map(plan => (
              <th key={plan.id} className="text-center py-4 px-4">
                <div className="text-lg font-medium text-olivewood">{plan.name}</div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.entries(features).map(([category, categoryFeatures]) => (
            <React.Fragment key={category}>
              <tr
                className="bg-sand/10 cursor-pointer hover:bg-sand/20 transition-colors"
                onClick={() => toggleSection(category)}
              >
                <td colSpan={plans.length + 1} className="py-3 px-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-olivewood">{category}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-bark/60 transition-transform ${
                        expandedSections.includes(category) ? 'rotate-180' : ''
                      }`}
                    />
                  </div>
                </td>
              </tr>
              <AnimatePresence>
                {expandedSections.includes(category) && (
                  <>
                    {categoryFeatures.map((feature, idx) => (
                      <motion.tr
                        key={feature.name}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className={`border-b border-sand/20 ${
                          idx % 2 === 0 ? 'bg-white/30' : ''
                        } hover:bg-sage/5 transition-colors`}
                        onMouseEnter={() => setHoveredFeature(feature.name)}
                        onMouseLeave={() => setHoveredFeature(null)}
                      >
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-bark/80">{feature.name}</span>
                            {feature.tooltip && (
                              <div className="relative">
                                <Info className="w-3 h-3 text-bark/40" />
                                {hoveredFeature === feature.name && (
                                  <div className="absolute left-0 bottom-full mb-2 px-3 py-1 bg-olivewood text-white text-xs rounded-lg whitespace-nowrap z-10">
                                    {feature.tooltip}
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </td>
                        {plans.map(plan => (
                          <td key={plan.id} className="py-4 px-4 text-center">
                            {renderValue(feature[plan.id as keyof typeof feature] || false)}
                          </td>
                        ))}
                      </motion.tr>
                    ))}
                  </>
                )}
              </AnimatePresence>
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  )
}