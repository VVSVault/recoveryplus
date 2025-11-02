'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const tiers = [
  {
    id: 'day-pass',
    name: 'Day Pass',
    tagline: 'Try us out',
    price: 49.99,
    period: 'per day',
    description: 'One 30-minute session with full access to all amenities for the day',
    image: '/images/tier-daypass.jpg',
    features: [
      'One 30-minute recovery session',
      'Full access to all amenities for the day',
      'No commitment required',
      'Perfect for first-time visitors'
    ],
    cta: 'Book Day Pass',
    color: 'from-sand/20 to-sand/10'
  },
  {
    id: 'core',
    name: 'Core Recovery',
    tagline: 'Build your routine',
    price: 114.99,
    period: 'month',
    sessions: '4 recovery sessions',
    description: 'Ideal for casual movers, weekend warriors, and those looking to maintain general recovery',
    image: '/images/tier-core.jpg',
    features: [
      '4 recovery sessions per month (up to 45 minutes each)',
      'Unlimited access to recovery equipment during business hours',
      'Mix and match services',
      'Book up to 48 hours in advance',
      'Access to member events'
    ],
    cta: 'Start Core',
    color: 'from-olive/20 to-olive/10'
  },
  {
    id: 'pro',
    name: 'Pro Recovery',
    tagline: 'Commit to wellness',
    price: 224.99,
    period: 'month',
    sessions: '8 recovery sessions',
    description: 'For athletes, runners, or fitness enthusiasts with regular training routines',
    image: '/images/tier-pro.jpg',
    features: [
      '8 recovery sessions per month (up to 45 minutes each)',
      'Unlimited access to recovery equipment during business hours',
      'Personalized recovery plan',
      'Monthly one-on-one progress check-ins',
      'Priority booking (72 hours)',
      '15% off additional sessions',
      'Exclusive workshops'
    ],
    popular: true,
    cta: 'Go Pro',
    color: 'from-sage/20 to-sage/10'
  },
  {
    id: 'elite',
    name: 'Elite Recovery',
    tagline: 'Maximum performance',
    price: 350.99,
    period: 'month',
    sessions: '12 recovery sessions',
    description: 'For competitive athletes, professionals, and high-performers needing advanced support',
    image: '/images/tier-elite.jpg',
    features: [
      '12 recovery sessions per month (up to 45 minutes each)',
      'Unlimited access to recovery equipment during business hours',
      'Personalized recovery plan',
      'Monthly one-on-one progress check-ins',
      '3 free guest passes per month',
      '3 mobile 30-minute sessions',
      'Unlimited access to RecoveryPlus classes (Yoga, breathwork)',
      'Advanced booking (1 week)',
      '20% off retail products',
      'VIP event access'
    ],
    cta: 'Go Elite',
    color: 'from-bark/20 to-bark/10'
  }
];

export default function RecoveryTiersPage() {
  return (
    <div className="min-h-screen bg-parchment">
      {/* Hero Section */}
      <section className="relative py-20 pt-32 bg-gradient-to-b from-sand/10 to-parchment">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light uppercase tracking-[0.2em] text-bark mb-6">
              Recovery Tiers
            </h1>
            <p className="text-lg text-bark/70 font-light tracking-wide max-w-3xl mx-auto">
              Choose your path to optimal wellness. Each tier is designed to support your unique recovery journey.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Founding Member Offer Banner */}
      <section className="relative bg-gradient-to-r from-olive to-sage py-16 mb-20 overflow-hidden">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <div className="inline-block mb-4">
                <span className="bg-white text-olive px-4 py-1 text-sm uppercase tracking-wider font-medium rounded-full">
                  Limited Time Offer
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-light text-white uppercase tracking-[0.15em] mb-4">
                Founding Member Special
              </h2>
              <p className="text-2xl text-white mb-2">
                <span className="font-light">Only</span> <span className="text-4xl font-normal">$65.99</span>/month
              </p>
              <p className="text-white/90 text-lg mb-6">
                Lifetime rate • All Elite Recovery perks • $349.99/month value
              </p>
              <Link
                href="/membership"
                className="inline-block bg-white text-olive px-8 py-3 text-sm uppercase tracking-wider font-medium hover:bg-white/90 transition-all"
              >
                Become a Founding Member
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative h-[300px] lg:h-[400px] rounded-sm overflow-hidden"
            >
              <Image
                src="/images/founders-club.jpg"
                alt="Founding Members"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tiers Section */}
      <section className="pb-20">
        {tiers.map((tier, index) => (
          <motion.div
            key={tier.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
            className={`relative ${index % 2 === 0 ? 'bg-parchment' : 'bg-sand/10'}`}
          >
            <div className="container py-20 lg:py-32">
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
                index % 2 === 0 ? '' : 'lg:grid-flow-dense'
              }`}>
                {/* Image */}
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  viewport={{ once: true }}
                  className={`relative h-[400px] lg:h-[600px] rounded-sm overflow-hidden border border-bark/20 ${
                    index % 2 === 0 ? '' : 'lg:col-start-2'
                  }`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${tier.color} z-10`} />
                  <Image
                    src={tier.image}
                    alt={tier.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  {tier.popular && (
                    <div className="absolute top-8 right-8 z-20">
                      <span className="bg-olive text-white px-6 py-2 rounded-full text-sm uppercase tracking-wider">
                        Most Popular
                      </span>
                    </div>
                  )}
                </motion.div>

                {/* Content */}
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  viewport={{ once: true }}
                  className={index % 2 === 0 ? '' : 'lg:col-start-1'}
                >
                  <p className="text-olive uppercase tracking-wider text-sm mb-2">
                    {tier.tagline}
                  </p>
                  <h2 className="text-3xl md:text-4xl font-light mb-6 uppercase tracking-[0.15em] text-bark">
                    {tier.name}
                  </h2>
                  
                  <div className="mb-8">
                    <div className="flex items-baseline mb-2">
                      <span className="text-4xl font-light text-olivewood">${tier.price}</span>
                      <span className="text-bark/60 ml-2">/ {tier.period}</span>
                    </div>
                    {tier.sessions && (
                      <p className="text-sage text-lg">{tier.sessions}</p>
                    )}
                  </div>

                  <p className="text-bark/80 text-lg mb-8 font-light">
                    {tier.description}
                  </p>

                  <ul className="space-y-3 mb-10">
                    {tier.features.map((feature, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-start"
                      >
                        <svg
                          className="w-5 h-5 text-olive mr-3 flex-shrink-0 mt-0.5"
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
                        <span className="text-bark/70 font-light">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>

                  <Link
                    href="/contact"
                    className={`inline-flex items-center justify-center px-8 py-3 text-sm uppercase tracking-wider font-light transition-all ${
                      tier.popular
                        ? 'bg-olive text-white hover:bg-sage'
                        : 'bg-bark text-white hover:bg-bark/90'
                    }`}
                  >
                    {tier.cta}
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-sand/20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-light uppercase tracking-[0.15em] text-bark mb-6">
              Not Sure Which Tier is Right for You?
            </h2>
            <p className="text-lg text-bark/70 font-light tracking-wide mb-8">
              Our wellness consultants can help you choose the perfect recovery plan 
              based on your goals and lifestyle.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="bg-bark text-white px-8 py-3 text-sm uppercase tracking-wider font-light hover:bg-bark/90 transition-all">
                Schedule a Consultation
              </Link>
              <Link href="/services" className="border border-bark text-bark px-8 py-3 text-sm uppercase tracking-wider font-light hover:bg-bark hover:text-white transition-all">
                Explore Our Services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}