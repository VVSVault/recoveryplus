'use client'

import PlanCard from './PlanCard'

interface Plan {
  id: string
  name: string
  tagline: string
  price: { monthly: number; annual: number }
  features: string[]
  description: string
  popular?: boolean
  promo?: boolean
}

interface PlanSelectorProps {
  plans: Plan[]
  billingCycle: 'monthly' | 'annual'
  selectedPlan: string | null
  onSelectPlan: (planId: string) => void
  currentUserPlan?: string
}

export default function PlanSelector({
  plans,
  billingCycle,
  selectedPlan,
  onSelectPlan,
  currentUserPlan
}: PlanSelectorProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {plans.map((plan) => (
        <PlanCard
          key={plan.id}
          plan={plan}
          billingCycle={billingCycle}
          isSelected={selectedPlan === plan.id}
          isCurrentPlan={currentUserPlan === plan.id}
          onSelect={() => onSelectPlan(plan.id)}
        />
      ))}
    </div>
  )
}