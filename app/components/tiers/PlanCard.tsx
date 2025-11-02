'use client'

import { motion } from 'framer-motion'
import { Check, Crown, Zap } from 'lucide-react'

interface PlanCardProps {
  plan: {
    id: string
    name: string
    tagline: string
    price: { monthly?: number; annual?: number; daily?: number }
    features: string[]
    description: string
    popular?: boolean
    promo?: boolean
    isDayPass?: boolean
    sessions?: string
    cta?: string
  }
  billingCycle: 'monthly' | 'annual'
  isSelected: boolean
  isCurrentPlan: boolean
  onSelect: () => void
}

export default function PlanCard({
  plan,
  billingCycle,
  isSelected,
  isCurrentPlan,
  onSelect
}: PlanCardProps) {
  const price = plan.isDayPass
    ? plan.price.daily
    : plan.price[billingCycle] || plan.price.monthly
  const displayPrice = plan.isDayPass
    ? price
    : billingCycle === 'annual'
      ? Math.round((price || 0) / 12)
      : price

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ duration: 0.3 }}
      className={`relative rounded-2xl p-8 bg-white shadow-sm hover:shadow-xl transition-all ${
        isSelected ? 'ring-2 ring-sage ring-offset-2' : ''
      } ${isCurrentPlan ? 'ring-2 ring-olive ring-offset-2' : ''}`}
    >
      {/* Badge */}
      {plan.popular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1 bg-sage text-white text-xs font-medium rounded-full flex items-center gap-1">
          <Crown className="w-3 h-3" />
          Most Popular
        </div>
      )}
      {plan.promo && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-sage to-olive text-white text-xs font-medium rounded-full flex items-center gap-1">
          <Zap className="w-3 h-3" />
          Limited Offer
        </div>
      )}
      {isCurrentPlan && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1 bg-olive text-white text-xs font-medium rounded-full">
          Current Plan
        </div>
      )}

      {/* Header */}
      <div className="text-center mb-6">
        <h3 className="text-2xl font-medium text-olivewood mb-2">{plan.name}</h3>
        <p className="text-sm text-bark/60 italic">{plan.tagline}</p>
      </div>

      {/* Price */}
      <div className="text-center mb-6">
        <div className="flex items-baseline justify-center gap-1">
          <span className="text-4xl font-light text-olivewood">${displayPrice}</span>
          <span className="text-bark/60">
            {plan.isDayPass ? '/day' : '/mo'}
          </span>
        </div>
        {plan.sessions && (
          <p className="text-sm text-sage mt-1">{plan.sessions}</p>
        )}
        {!plan.isDayPass && billingCycle === 'annual' && (
          <p className="text-xs text-sage mt-1">Billed ${price} annually</p>
        )}
      </div>

      {/* Features */}
      <ul className="space-y-3 mb-6">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <Check className="w-5 h-5 text-sage flex-shrink-0 mt-0.5" />
            <span className="text-sm text-bark/80">{feature}</span>
          </li>
        ))}
      </ul>

      {/* Description */}
      <p className="text-sm text-bark/60 mb-6">{plan.description}</p>

      {/* CTA */}
      <button
        onClick={onSelect}
        disabled={isCurrentPlan}
        className={`w-full py-3 px-6 rounded-full font-medium transition-all ${
          isCurrentPlan
            ? 'bg-sand/30 text-bark/40 cursor-not-allowed'
            : isSelected
            ? 'bg-sage text-white hover:bg-olive'
            : 'bg-sage/10 text-sage hover:bg-sage hover:text-white'
        }`}
      >
        {isCurrentPlan ? 'Current Plan' : plan.cta || 'Select Plan'}
      </button>
    </motion.div>
  )
}