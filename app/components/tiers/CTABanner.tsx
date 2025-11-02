'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

interface CTABannerProps {
  selectedPlan: string | null
  onCheckout: () => void
}

export default function CTABanner({ selectedPlan, onCheckout }: CTABannerProps) {
  const getPlanName = () => {
    switch (selectedPlan) {
      case 'core': return 'Core'
      case 'elite': return 'Elite'
      case 'founder': return 'Founder'
      default: return ''
    }
  }

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-sage via-sage/90 to-olive">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-light text-white mb-4">
            Ready to recover smarter?
          </h2>
          <p className="text-white/90 text-lg mb-8">
            Join hundreds of athletes who've transformed their recovery routine.
          </p>

          {selectedPlan ? (
            <button
              onClick={onCheckout}
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-sage rounded-full font-medium hover:bg-parchment transition-all transform hover:scale-105"
            >
              Continue with {getPlanName()} Plan
              <ArrowRight className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={() => {
                document.getElementById('compare')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-sage rounded-full font-medium hover:bg-parchment transition-all transform hover:scale-105"
            >
              Choose Your Plan
              <ArrowRight className="w-5 h-5" />
            </button>
          )}
        </motion.div>
      </div>
    </section>
  )
}