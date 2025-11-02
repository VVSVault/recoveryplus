'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import PlanSelector from '../components/tiers/PlanSelector'
import FeatureMatrix from '../components/tiers/FeatureMatrix'
import TestimonialCarousel from '../components/tiers/TestimonialCarousel'
import FAQAccordion from '../components/tiers/FAQAccordion'
import AddOnPills from '../components/tiers/AddOnPills'
import CTABanner from '../components/tiers/CTABanner'
import MiniNav from '../components/tiers/MiniNav'
import PolicyPills from '../components/tiers/PolicyPills'
import { Trophy, Sparkles, Users } from 'lucide-react'

// Import from existing tiers configuration
import { tiers } from '@/lib/tiers'

// Transform tiers data for pricing display
const pricingData = {
  plans: tiers.map(tier => ({
    id: tier.id,
    name: tier.name,
    tagline: tier.tagline,
    price: tier.period === 'per day'
      ? { daily: tier.price, monthly: 0, annual: 0 }
      : { monthly: tier.price, annual: Math.round(tier.price * 12 * 0.85) }, // 15% discount for annual
    features: tier.features.slice(0, 3), // Show first 3 features
    fullFeatures: tier.features, // Keep all features for comparison
    description: tier.description,
    popular: tier.popular || false,
    isDayPass: tier.period === 'per day',
    sessions: tier.sessions,
    cta: tier.cta
  }))
}

export default function TiersPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly')
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([])
  const [user, setUser] = useState<any>(null)
  const [dashboardHints, setDashboardHints] = useState<string[]>([])

  // Mock user data - replace with actual auth check
  useEffect(() => {
    // Simulate auth check
    const mockUser = null // Set to { id: '123', currentPlan: 'core' } to test signed-in state
    setUser(mockUser)

    // Simulate dashboard hints fetch
    if (mockUser) {
      setDashboardHints(['mobility', 'contrast'])
    }
  }, [])

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId)
    // Track analytics
    console.log('Track: tiers_plan_select', { planId, billingCycle })
  }

  const handleCheckout = () => {
    if (!selectedPlan) return

    // Track analytics and initiate checkout
    console.log('Track: tiers_checkout_start', {
      planId: selectedPlan,
      billingCycle,
      addOns: selectedAddOns
    })

    // Navigate to checkout - replace with actual navigation
    console.log('Navigate to checkout with:', { selectedPlan, billingCycle, selectedAddOns })
  }

  return (
    <main className="min-h-screen bg-parchment">
      {/* Sticky Mini Nav */}
      <MiniNav />

      {/* Hero Section */}
      <section id="overview" className="pt-32 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sage font-medium text-sm uppercase tracking-wider mb-4">
              Choose your path
            </p>
            <h1 className="text-4xl md:text-5xl font-light text-olivewood mb-6">
              Recovery tiers designed for how you live.
            </h1>
            <p className="text-lg text-bark/70 max-w-2xl mx-auto mb-8">
              From casual recovery to elite performance support, find the perfect plan for your training rhythm.
            </p>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center gap-4 mb-12">
              <span className={`text-sm ${billingCycle === 'monthly' ? 'text-olivewood font-medium' : 'text-bark/60'}`}>
                Monthly
              </span>
              <button
                onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
                className="relative inline-flex h-8 w-14 items-center rounded-full bg-sage/20 transition-colors focus:outline-none focus:ring-2 focus:ring-sage focus:ring-offset-2"
                role="switch"
                aria-checked={billingCycle === 'annual'}
              >
                <span
                  className={`${
                    billingCycle === 'annual' ? 'translate-x-7' : 'translate-x-1'
                  } inline-block h-6 w-6 transform rounded-full bg-sage transition-transform`}
                />
              </button>
              <span className={`text-sm ${billingCycle === 'annual' ? 'text-olivewood font-medium' : 'text-bark/60'}`}>
                Annual
                <span className="ml-1 text-xs text-sage">(Save 15%)</span>
              </span>
            </div>

            {/* Personalization hint for signed-in users */}
            {user && dashboardHints.includes('mobility') && dashboardHints.includes('contrast') && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-sage/10 rounded-full mb-8"
              >
                <Sparkles className="w-4 h-4 text-sage" />
                <span className="text-sm text-olivewood">
                  Good fit for you: Elite — includes mobility + contrast, our most booked combo.
                </span>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Plan Cards */}
      <section id="compare" className="pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <PlanSelector
            plans={pricingData.plans}
            billingCycle={billingCycle}
            selectedPlan={selectedPlan}
            onSelectPlan={handleSelectPlan}
            currentUserPlan={user?.currentPlan}
          />
        </div>
      </section>

      {/* Feature Matrix */}
      <section className="py-20 px-4 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-light text-olivewood text-center mb-12">
            Compare plans in detail
          </h2>
          <FeatureMatrix plans={pricingData.plans} />
        </div>
      </section>

      {/* What You Get - Lifestyle Band */}
      <section id="whats-included" className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/pexels-karolina-grabowska-4498278.jpg"
            alt="Recovery lifestyle"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-xl"
          >
            <h2 className="text-4xl font-light text-white mb-8">
              What you get with every plan
            </h2>
            <ul className="space-y-4 text-white/90">
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-sage mt-2" />
                <span className="text-lg">Guided recovery sessions with certified coaches</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-sage mt-2" />
                <span className="text-lg">Contrast therapy access (sauna + cold plunge)</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-sage mt-2" />
                <span className="text-lg">Bodywork & mobility support stations</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-sage mt-2" />
                <span className="text-lg">Calm spaces for meditation and reset</span>
              </li>
            </ul>
            <button className="mt-8 px-8 py-3 bg-white text-olivewood rounded-full hover:bg-parchment transition-colors">
              See all services
            </button>
          </motion.div>
        </div>
      </section>

      {/* Add-ons */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-light text-olivewood text-center mb-4">
            Enhance your membership
          </h2>
          <p className="text-center text-bark/70 mb-12">
            Add extras to any plan at checkout
          </p>
          <AddOnPills
            selectedAddOns={selectedAddOns}
            onToggleAddOn={(addon) => {
              setSelectedAddOns(prev =>
                prev.includes(addon)
                  ? prev.filter(a => a !== addon)
                  : [...prev, addon]
              )
            }}
          />
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-white/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-light text-olivewood text-center mb-12">
            Member stories
          </h2>
          <TestimonialCarousel />
        </div>
      </section>

      {/* FAQs */}
      <section id="faqs" className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-light text-olivewood text-center mb-12">
            Frequently asked questions
          </h2>
          <FAQAccordion />
        </div>
      </section>

      {/* Policy Strip */}
      <section id="policies" className="py-12 px-4 bg-sage/5">
        <div className="max-w-7xl mx-auto">
          <PolicyPills />
        </div>
      </section>

      {/* Final CTA */}
      <CTABanner
        selectedPlan={selectedPlan}
        onCheckout={handleCheckout}
      />
    </main>
  )
}