'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    question: 'Can I pause my membership?',
    answer: 'Yes, you can pause your membership for up to 3 months per year. Simply notify us 7 days before your next billing cycle.'
  },
  {
    question: 'How do I book sessions?',
    answer: 'Book through our member app or website. Elite and Founder members get 48-hour priority booking windows.'
  },
  {
    question: "What's included in a session?",
    answer: 'Each session includes guided recovery protocols, access to all amenities, and coaching support tailored to your needs.'
  },
  {
    question: 'Do you offer day passes?',
    answer: 'Yes, day passes are available for $49. They include amenity access but not guided sessions or coaching.'
  },
  {
    question: 'Can I bring a guest?',
    answer: 'Elite members get 1 guest pass per month, Founder members get 2. Additional guest passes are $35 each.'
  },
  {
    question: 'How do upgrades and downgrades work?',
    answer: 'You can change your plan anytime. Upgrades take effect immediately with prorated billing. Downgrades apply at your next billing cycle.'
  },
  {
    question: 'What if I need to cancel?',
    answer: 'No contracts or cancellation fees. Cancel anytime with 7 days notice before your next billing date.'
  },
  {
    question: 'Is parking available?',
    answer: 'Yes, we offer free parking for all members at all locations. Valet service is available for Founder members.'
  }
]

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl overflow-hidden"
        >
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-sage/5 transition-colors"
            aria-expanded={openIndex === index}
            aria-controls={`faq-answer-${index}`}
          >
            <span className="text-olivewood font-medium pr-4">{faq.question}</span>
            <ChevronDown
              className={`w-5 h-5 text-bark/60 flex-shrink-0 transition-transform ${
                openIndex === index ? 'rotate-180' : ''
              }`}
            />
          </button>
          <AnimatePresence>
            {openIndex === index && (
              <motion.div
                id={`faq-answer-${index}`}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="px-6 pb-4"
              >
                <p className="text-bark/70">{faq.answer}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  )
}