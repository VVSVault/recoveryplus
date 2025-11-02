'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const events = [
  {
    title: 'Rooftop Reset',
    date: 'August 2',
    time: '10:30 AM',
    description: 'A rooftop wellness experience with yoga, guided recovery, and more.',
    image: '/images/rooftop-event.jpg', // You provided this as the first image
    link: '/events/rooftop-reset'
  },
  {
    title: 'Recovery Workshop',
    date: 'August 16', 
    time: '6:00 PM',
    description: 'Learn optimal recovery techniques from our expert practitioners.',
    image: '/images/fabletics-event.webp',
    link: '/events/recovery-workshop'
  }
];

export default function UpcomingEvents() {
  return (
    <section className="relative bg-sand/10 py-0">
      <div className="flex flex-col lg:flex-row min-h-[600px]">
        
        {/* Left side - Event cards */}
        <div className="lg:w-1/2 p-8 lg:p-12 flex items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="w-full max-w-xl mx-auto"
          >
            <p className="text-lg text-bark mb-8 text-center lg:text-left">
              Join us for exclusive wellness events and community gatherings
            </p>
            
            <div className="space-y-8">
              {events.map((event, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className="flex gap-6">
                    {event.image && (
                      <div className="flex-shrink-0">
                        <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-lg overflow-hidden">
                          <Image
                            src={event.image}
                            alt={event.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      </div>
                    )}
                    
                    <div className="flex-1">
                      <h3 className="text-2xl md:text-3xl font-light mb-2 text-olivewood tracking-wide">
                        {event.title}
                      </h3>
                      <p className="text-sm text-sage mb-3">
                        {event.date} • {event.time}
                      </p>
                      <p className="text-bark leading-relaxed mb-4">
                        {event.description}
                      </p>
                      <Link 
                        href={event.link}
                        className="text-sage hover:text-olive transition-colors text-sm font-medium uppercase tracking-wider"
                      >
                        Learn More →
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right side - Hero image with text overlay */}
        <motion.div 
          className="relative lg:w-1/2 min-h-[400px] lg:min-h-[600px] order-first lg:order-last overflow-hidden"
          initial={{ opacity: 0, x: 100 }}
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
              src="/images/events-hero.jpg"
              alt="Upcoming Events"
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
              UPCOMING<br />
              EVENTS
            </h2>
            <Link 
              href="/events"
              className="inline-block bg-white text-olivewood px-8 py-3 text-sm uppercase tracking-wider font-medium hover:bg-white/90 transition-all"
            >
              View All Events
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}