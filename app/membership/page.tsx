'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const membershipPlans = [
  {
    name: 'Essential',
    price: 149,
    period: 'month',
    features: [
      '4 recovery sessions per month',
      'Access to all service categories',
      '10% discount on additional sessions',
      'Priority booking',
      'Member-only events',
    ],
    recommended: false,
  },
  {
    name: 'Unlimited',
    price: 299,
    period: 'month',
    features: [
      'Unlimited recovery sessions',
      'Access to all service categories',
      'Guest passes (2 per month)',
      'Priority booking',
      'Member-only events',
      'Personalized recovery plan',
      'Monthly progress assessments',
    ],
    recommended: true,
  },
  {
    name: 'Founding Member',
    price: 249,
    period: 'month',
    originalPrice: 299,
    features: [
      'Unlimited recovery sessions',
      'Access to all service categories',
      'Guest passes (4 per month)',
      'Priority booking',
      'Member-only events',
      'Personalized recovery plan',
      'Monthly progress assessments',
      'Locked-in rate forever',
      'Exclusive founding member perks',
    ],
    recommended: false,
    limited: true,
  },
];

export default function MembershipPage() {
  return (
    <div className="min-h-screen pt-20">
      <section className="section-padding bg-gradient-to-b from-dark-900 to-black">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Membership Plans
            </h1>
            <p className="text-xl text-gray-400 mb-8">
              Join the RecoveryPlus+ community and unlock unlimited wellness potential
            </p>
            <Link href="/recovery-tiers" className="inline-flex items-center text-primary-500 hover:text-primary-400 transition-colors">
              View All Recovery Tiers
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {membershipPlans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative ${
                  plan.recommended
                    ? 'ring-2 ring-primary-500 scale-105'
                    : ''
                }`}
              >
                {plan.recommended && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                {plan.limited && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Limited Time
                    </span>
                  </div>
                )}
                
                <div className="card h-full flex flex-col">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <div className="flex items-baseline justify-center">
                      {plan.originalPrice && (
                        <span className="text-gray-500 line-through mr-2">
                          ${plan.originalPrice}
                        </span>
                      )}
                      <span className="text-4xl font-bold">${plan.price}</span>
                      <span className="text-gray-400 ml-2">/{plan.period}</span>
                    </div>
                  </div>
                  
                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <svg
                          className="w-5 h-5 text-primary-500 mr-3 flex-shrink-0 mt-0.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Link
                    href="#booking"
                    className={`w-full text-center ${
                      plan.recommended ? 'btn-primary' : 'btn-secondary'
                    }`}
                  >
                    Get Started
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-dark-900">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-center mb-12">
              Membership Benefits
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="card">
                <h3 className="text-xl font-semibold mb-3">Priority Access</h3>
                <p className="text-gray-400">
                  Book your preferred time slots before they open to the public. 
                  Members get 48-hour advance booking privileges.
                </p>
              </div>
              
              <div className="card">
                <h3 className="text-xl font-semibold mb-3">Exclusive Events</h3>
                <p className="text-gray-400">
                  Access member-only workshops, wellness talks, and social events 
                  designed to enhance your recovery journey.
                </p>
              </div>
              
              <div className="card">
                <h3 className="text-xl font-semibold mb-3">Personalized Support</h3>
                <p className="text-gray-400">
                  Work with our recovery specialists to create a customized plan 
                  that targets your specific goals and needs.
                </p>
              </div>
              
              <div className="card">
                <h3 className="text-xl font-semibold mb-3">Community Connection</h3>
                <p className="text-gray-400">
                  Join a supportive community of like-minded individuals committed 
                  to optimizing their health and performance.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold mb-6">
              Ready to Transform Your Recovery?
            </h2>
            <p className="text-lg text-gray-400 mb-8">
              Join RecoveryPlus+ today and experience the difference that 
              consistent, professional recovery can make in your life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="#booking" className="btn-primary">
                Start Your Membership
              </Link>
              <Link href="/contact" className="btn-secondary">
                Have Questions?
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}