'use client';

import Hero from './components/Hero';
import ServiceCardWithLoader from './components/ServiceCardWithLoader';
import SectionSeparator from './components/SectionSeparator';
import Collaborators from './components/Collaborators';
import FoundingMember from './components/FoundingMember';
import UpcomingEvents from './components/UpcomingEvents';
import { services } from '@/lib/config';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import ExperienceCards from './components/ExperienceCards';

export default function Home() {
  return (
    <>
      <Hero />

      {/* Value Proposition Section */}
      <section className="relative py-24 md:py-32 bg-parchment">
        <div className="max-w-7xl mx-auto px-4">
          {/* Top: Copy */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center max-w-4xl mx-auto mb-16"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-olivewood mb-8">
              Recovery, <span className="italic">Refined.</span>
            </h2>
            <p className="text-lg md:text-xl text-bark/80 leading-relaxed">
              Where elite athletic recovery meets the sophistication of modern wellness.
              We've reimagined what recovery looks like for those who demand excellence
              in every aspect of their performance.
            </p>
          </motion.div>

          {/* Bottom: 3 Pill Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="bg-sage/10 rounded-2xl px-8 py-8 border border-sage/20 hover:shadow-lg transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-sage rounded-full mt-2 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-olivewood mb-2 text-lg">Precision Recovery</h3>
                  <p className="text-sm text-bark/70 leading-relaxed">Personalized protocols backed by data, not guesswork</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="bg-sage/10 rounded-2xl px-8 py-8 border border-sage/20 hover:shadow-lg transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-olive rounded-full mt-2 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-olivewood mb-2 text-lg">Curated Excellence</h3>
                  <p className="text-sm text-bark/70 leading-relaxed">Access to the modalities that actually move the needle</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true, margin: "-100px" }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="bg-sage/10 rounded-2xl px-8 py-8 border border-sage/20 hover:shadow-lg transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-bark rounded-full mt-2 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-olivewood mb-2 text-lg">Elite Community</h3>
                  <p className="text-sm text-bark/70 leading-relaxed">Train alongside those who share your commitment</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Curated Services Snapshot */}
      <section className="relative py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-light text-olivewood mb-4">
              Your Recovery <span className="italic">Arsenal</span>
            </h2>
            <p className="text-bark/70 max-w-2xl mx-auto">
              Six modalities. Infinite combinations. One result: peak performance.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.slice(0, 6).map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{ y: -8 }}
                className="group"
              >
                <div className="bg-parchment rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300">
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-medium text-olivewood mb-2">{service.title}</h3>
                    <p className="text-sm text-bark/70 line-clamp-2">{service.description}</p>
                    <div className="mt-4 flex items-center gap-2 text-sage group-hover:text-olive transition-colors">
                      <span className="text-sm font-medium">Learn more</span>
                      <motion.span
                        animate={{ x: [0, 3, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        →
                      </motion.span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-8 py-4 bg-sage text-white rounded-full hover:bg-olive transition-colors"
            >
              Explore All Services
              <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Experience/Lifestyle Section */}
      <section className="relative py-24 md:py-32 bg-sand/20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-olivewood mb-4">
              More Than Recovery. <span className="italic">A Lifestyle.</span>
            </h2>
            <p className="text-bark/70 max-w-3xl mx-auto text-lg">
              Join a community where peak performance is the baseline and excellence is the expectation.
            </p>
          </motion.div>

          {/* Wide Banner Image with Floating Cards */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="relative rounded-3xl overflow-hidden h-[500px]"
            >
              <img
                src="https://images.unsplash.com/photo-1571019613576-2b22c76fd955?w=1600"
                alt="RecoveryPlus Lifestyle"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

              {/* Title at Bottom of Image */}
              <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-center text-white">
                <h3 className="text-3xl md:text-4xl font-light mb-2">Where Champions Recover</h3>
                <p className="text-white/90 text-lg">State-of-the-art facilities designed for those who refuse to compromise.</p>
              </div>
            </motion.div>

            {/* Cards below image */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-8">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-sage/10 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all border border-sage/20"
              >
                <div className="flex items-start gap-4">
                  <div className="w-3 h-3 bg-sage rounded-full mt-1.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-olivewood mb-2">Tailored Protocols</h4>
                    <p className="text-sm text-bark/70 leading-relaxed">Your recovery plan evolves with your performance data.</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-sage/10 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all border border-sage/20"
              >
                <div className="flex items-start gap-4">
                  <div className="w-3 h-3 bg-olive rounded-full mt-1.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-olivewood mb-2">Elite Network</h4>
                    <p className="text-sm text-bark/70 leading-relaxed">Connect with athletes who share your drive for excellence.</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-sage/10 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all border border-sage/20"
              >
                <div className="flex items-start gap-4">
                  <div className="w-3 h-3 bg-bark rounded-full mt-1.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-olivewood mb-2">Data-Driven</h4>
                    <p className="text-sm text-bark/70 leading-relaxed">Track, measure, and optimize every aspect of recovery.</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Events & Community Preview */}
      <section className="relative py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-between items-end mb-12"
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-light text-olivewood mb-2">
                Upcoming <span className="italic">Experiences</span>
              </h2>
              <p className="text-bark/70">Curated events designed to elevate your recovery practice.</p>
            </div>
            <Link
              href="/events"
              className="mt-4 md:mt-0 text-sage hover:text-olive transition-colors flex items-center gap-2"
            >
              View Full Calendar
              <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <ExperienceCards />
        </div>
      </section>

      {/* Social Proof/Testimonials */}
      <section className="relative py-24 md:py-32 bg-parchment overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-light text-olivewood mb-4">
              Trusted by <span className="italic">Champions</span>
            </h2>
            <p className="text-bark/70">Hear from athletes who've transformed their recovery.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah Mitchell',
                role: 'Marathon Runner',
                content: 'RecoveryPlus completely transformed my training. The personalized approach and cutting-edge facilities have taken my performance to new heights.',
                rating: 5
              },
              {
                name: 'Marcus Chen',
                role: 'Professional Cyclist',
                content: 'The combination of cryotherapy and compression therapy here is unmatched. I recover faster and feel stronger than ever before.',
                rating: 5
              },
              {
                name: 'Emma Rodriguez',
                role: 'CrossFit Athlete',
                content: 'This isn\'t just recovery—it\'s optimization. The data-driven approach helps me understand my body like never before.',
                rating: 5
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-sage">★</span>
                  ))}
                </div>
                <p className="text-bark/80 mb-6 italic">"{testimonial.content}"</p>
                <div>
                  <p className="font-medium text-olivewood">{testimonial.name}</p>
                  <p className="text-sm text-bark/60">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Banner */}
      <section className="relative py-24 md:py-32 bg-gradient-to-br from-sage to-olive text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.1) 35px, rgba(255,255,255,.1) 70px)`
          }} />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-light mb-6">
              Ready to <span className="italic">Elevate</span> Your Recovery?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join RecoveryPlus today and discover what your body is truly capable of.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/dashboard"
                className="px-8 py-4 bg-white text-sage rounded-full font-medium hover:bg-parchment transition-colors"
              >
                Start Your Journey
              </Link>
              <Link
                href="/services"
                className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-medium hover:bg-white/10 transition-colors"
              >
                Explore Services
              </Link>
            </div>
            <p className="mt-8 text-sm text-white/70">
              No commitments. No contracts. Just results.
            </p>
          </motion.div>
        </div>
      </section>

      <Collaborators />
    </>
  );
}
