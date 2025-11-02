'use client'

import { motion } from 'framer-motion'
import { Shield, Ban, Lock, RefreshCw } from 'lucide-react'

const policies = [
  { icon: Ban, text: 'Cancel anytime', subtext: 'No contracts' },
  { icon: Shield, text: 'No hidden fees', subtext: 'Transparent pricing' },
  { icon: Lock, text: 'Founders lock-rate', subtext: 'Lifetime pricing' },
  { icon: RefreshCw, text: '30-day guarantee', subtext: 'Full refund' }
]

export default function PolicyPills() {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {policies.map((policy, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 px-5 py-3 bg-white rounded-full shadow-sm"
        >
          <policy.icon className="w-5 h-5 text-sage" />
          <div className="text-left">
            <p className="text-sm font-medium text-olivewood">{policy.text}</p>
            <p className="text-xs text-bark/60">{policy.subtext}</p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}