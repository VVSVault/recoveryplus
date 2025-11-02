'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const benefits = [
  {
    title: 'Legacy Recognition',
    description: "With permission, your name will join the Recovery Plus Founders wall, honoring those who've built this movement.",
    image: '/images/legacy-recognition.jpg'
  },
  {
    title: 'Early Access to New Offerings and Private Experiences',
    description: 'Be the first to explore new services, exclusive events, and unlimited access experiences as we grow.',
    image: '/images/early-access.jpg'
  }
];

export default function FoundingMember() {
  return (
    <section className="relative bg-sand/10 py-0">
      <div className="flex flex-col lg:flex-row min-h-[600px]">
        {/* Left side - Hero image with text overlay */}
        <motion.div 
          className="relative lg:w-1/2 min-h-[400px] lg:min-h-[600px] overflow-hidden"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <motion.div
            className="absolute inset-0 w-full h-full"
            initial={{ y: 0 }}
            whileInView={{ y: -50 }}
            transition={{ duration: 10, ease: "linear" }}
            viewport={{ once: false }}
          >
            <Image
              src="/images/founding-hero.jpg"
              alt="Founding Members"
              fill
              className="object-cover scale-110"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="absolute inset-0 flex flex-col justify-center items-center text-center px-8"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-8 tracking-wide">
              FOUNDER<br />
              MEMBERS<br />
              CLUB
            </h2>
            <Link 
              href="/membership"
              className="inline-block bg-white text-olivewood px-8 py-3 text-sm uppercase tracking-wider font-medium hover:bg-white/90 transition-all"
            >
              Become a Founder
            </Link>
          </motion.div>
        </motion.div>

        {/* Right side - Benefits */}
        <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl md:text-3xl font-light text-olivewood mb-8 uppercase tracking-wider">
              Exclusive Benefits
            </h3>
            
            <div className="space-y-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="flex gap-6"
                >
                  <div className="flex-shrink-0">
                    <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-lg overflow-hidden">
                      <Image
                        src={benefit.image}
                        alt={benefit.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="text-lg md:text-xl font-medium text-olivewood mb-2">
                      {benefit.title}
                    </h4>
                    <p className="text-bark text-sm md:text-base leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
              className="mt-12"
            >
              <Link 
                href="/recovery-tiers"
                className="inline-block text-sage hover:text-olive transition-colors text-sm uppercase tracking-wider font-medium"
              >
                View All Recovery Tiers →
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}