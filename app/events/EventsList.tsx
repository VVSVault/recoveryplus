'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { EventPost } from '@/lib/events';

interface EventsListProps {
  events: EventPost[];
}

export default function EventsList({ events }: EventsListProps) {
  return (
    <>
      <section className="section-padding bg-gradient-to-b from-dark-900 to-black">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Upcoming Events
            </h1>
            <p className="text-xl text-gray-400">
              Join our community for exclusive wellness events and workshops
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          {events.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">No upcoming events at this time. Check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {events.map((event, index) => (
                <motion.article
                  key={event.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="card group"
                >
                  {event.image && (
                    <div className="aspect-[16/9] relative mb-6 rounded-lg overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                      <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                  
                  <h2 className="text-2xl font-bold mb-3 group-hover:text-primary-500 transition-colors">
                    <Link href={`/events/${event.slug}`}>
                      {event.title}
                    </Link>
                  </h2>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-4">
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {new Date(event.date).toLocaleDateString('en-US', { 
                        month: 'long', 
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </div>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {event.time}
                    </div>
                    {event.price && (
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        ${event.price}
                      </div>
                    )}
                  </div>
                  
                  <p className="text-gray-300 mb-6">
                    {event.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <Link 
                      href={`/events/${event.slug}`}
                      className="text-primary-500 hover:text-primary-400 transition-colors inline-flex items-center group"
                    >
                      Learn More
                      <svg
                        className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </Link>
                    {event.capacity && (
                      <span className="text-sm text-gray-500">
                        {event.capacity} spots available
                      </span>
                    )}
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="section-padding bg-dark-900">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold mb-6">Want to Host an Event?</h2>
            <p className="text-lg text-gray-400 mb-8">
              Partner with RecoveryPlus+ to create unique wellness experiences for your community. 
              We offer venue rental, equipment, and expert facilitation.
            </p>
            <Link href="/contact" className="btn-primary">
              Get in Touch
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}