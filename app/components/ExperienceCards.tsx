'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, MapPin, Users, Clock, Star } from 'lucide-react'

const experiences = [
  {
    date: 'Dec 28',
    time: '6:00 AM',
    duration: '60 min',
    title: 'Morning Breathwork Reset',
    type: 'Breathwork',
    spots: '4 spots left',
    location: 'The Summit at Fritz Farm',
    address: '160 Lexington Green Cir, Suite 142',
    instructor: 'Sarah Chen',
    level: 'All Levels',
    description: 'Start your day with guided breathwork techniques designed to optimize oxygen flow and mental clarity.',
    rating: 4.9,
    reviews: 47
  },
  {
    date: 'Dec 29',
    time: '11:00 AM',
    duration: '90 min',
    title: 'Deep Tissue Recovery',
    type: 'Massage Therapy',
    spots: '2 spots left',
    location: 'Chevy Chase Plaza',
    address: '800 Euclid Ave, Suite 200',
    instructor: 'Marcus Williams',
    level: 'Intermediate',
    description: 'Targeted deep tissue work focusing on common areas of tension for athletes.',
    rating: 5.0,
    reviews: 112
  },
  {
    date: 'Dec 30',
    time: '5:30 PM',
    duration: '45 min',
    title: 'Ice Bath Challenge',
    type: 'Cold Therapy',
    spots: 'Fully Booked',
    location: 'Hamburg Pavilion',
    address: '2333 Sir Barton Way, Rooftop',
    instructor: 'Emma Rodriguez',
    level: 'Advanced',
    description: 'Progressive cold exposure training to enhance recovery and build mental resilience.',
    rating: 4.8,
    reviews: 89
  }
]

export default function ExperienceCards() {
  const [expandedCard, setExpandedCard] = useState<number | null>(null)

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {experiences.map((event, index) => {
        const isExpanded = expandedCard === index
        const isFullyBooked = event.spots === 'Fully Booked'

        return (
          <motion.div
            key={`experience-card-${index}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="bg-parchment rounded-2xl hover:shadow-lg transition-all overflow-hidden"
            onMouseEnter={() => setExpandedCard(index)}
            onMouseLeave={() => setExpandedCard(null)}
          >
            <div
              className="p-6"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm font-medium text-sage">{event.date}</p>
                  <p className="text-xs text-bark/60">{event.time}</p>
                </div>
                <span className={`text-xs px-3 py-1 rounded-full ${
                  isFullyBooked
                    ? 'bg-bark/10 text-bark'
                    : 'bg-sage/10 text-sage'
                }`}>
                  {event.spots}
                </span>
              </div>
              <h4 className="font-medium text-olivewood mb-1">{event.title}</h4>
              <p className="text-sm text-bark/60">{event.type}</p>
            </div>

            <AnimatePresence mode="wait">
              {isExpanded && (
                <motion.div
                  key={`expanded-content-${index}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="border-t border-sand/30"
                >
                  <div className="p-6 space-y-4">
                    {/* Location */}
                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-sage mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-olivewood">{event.location}</p>
                        <p className="text-xs text-bark/60">{event.address}</p>
                      </div>
                    </div>

                    {/* Duration & Level */}
                    <div className="flex gap-6">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-sage" />
                        <span className="text-sm text-bark/70">{event.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-sage" />
                        <span className="text-sm text-bark/70">{event.level}</span>
                      </div>
                    </div>

                    {/* Instructor & Rating */}
                    <div className="bg-white/50 rounded-lg p-3">
                      <div className="flex justify-between items-center mb-2">
                        <p className="text-xs text-bark/60">Led by</p>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-sage text-sage" />
                          <span className="text-xs text-sage">{event.rating}</span>
                          <span className="text-xs text-bark/40">({event.reviews})</span>
                        </div>
                      </div>
                      <p className="text-sm font-medium text-olivewood">{event.instructor}</p>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-bark/70 leading-relaxed">
                      {event.description}
                    </p>

                    {/* Join Button */}
                    <button
                      disabled={isFullyBooked}
                      className={`w-full py-3 rounded-full font-light italic transition-all ${
                        isFullyBooked
                          ? 'bg-sand/30 text-bark/40 cursor-not-allowed'
                          : 'bg-sage text-white hover:bg-olive'
                      }`}
                    >
                      {isFullyBooked ? 'Experience Fully Booked' : 'Join this experience'}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )
      })}
    </div>
  )
}