'use client';

import { useState, useEffect } from 'react';
import { services } from '@/lib/config';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import {
  Clock, Users, Star, ArrowRight, Check, Play,
  Calendar, Activity, Heart, Brain, Zap, Shield,
  TrendingUp, Award, ChevronLeft, ChevronRight
} from 'lucide-react';

// Testimonials data
const testimonials = [
  {
    id: 1,
    name: "Sarah Mitchell",
    role: "Marathon Runner",
    content: "RecoveryPlus transformed my training. The contrast therapy sessions cut my recovery time in half.",
    rating: 5
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "CrossFit Athlete",
    content: "The mobility sessions are game-changing. I'm moving better at 35 than I did at 25.",
    rating: 5
  },
  {
    id: 3,
    name: "Jessica Williams",
    role: "Professional Cyclist",
    content: "Best investment in my athletic career. The personalized approach makes all the difference.",
    rating: 5
  }
];

// Benefits data
const benefits = [
  { icon: Clock, title: "Save Time", description: "Efficient recovery protocols" },
  { icon: TrendingUp, title: "Boost Performance", description: "Optimize your training" },
  { icon: Shield, title: "Reduce Injury Risk", description: "Preventive care approach" },
  { icon: Brain, title: "Mental Clarity", description: "Reduce stress & fatigue" },
  { icon: Users, title: "Expert Guidance", description: "Professional coaches" },
  { icon: Award, title: "Proven Results", description: "Evidence-based methods" }
];

// Upcoming events preview
const upcomingEvents = [
  {
    id: 1,
    title: "Breathwork Fundamentals",
    date: "Sept 21, 6:30 AM",
    type: "Virtual",
    spots: 12
  },
  {
    id: 2,
    title: "Mobility Masterclass",
    date: "Sept 22, 9:00 AM",
    type: "In-Person",
    spots: 4
  }
];

export default function ServicesPage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0.3]);
  const heroScale = useTransform(scrollY, [0, 300], [1, 1.05]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-parchment via-white to-parchment">
      {/* Hero Section with Parallax */}
      <motion.section
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-sage/20 via-olive/10 to-sand/20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(156,175,136,0.2),transparent)]" />
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/4 right-1/4 w-96 h-96 bg-sage/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [360, 180, 0]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-olive/10 rounded-full blur-3xl"
          />
        </div>

        <div className="container relative z-10 text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-olivewood mb-6">
              Optimize Your Recovery.
              <span className="block text-sage mt-2">Maximize Your Performance.</span>
            </h1>
            <p className="text-xl text-bark/80 mb-8 max-w-2xl mx-auto">
              Evidence-based recovery solutions for athletes and active individuals.
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                href="#services"
                className="px-8 py-4 bg-sage text-white rounded-full font-medium hover:bg-bark transition-all transform hover:scale-105 shadow-lg"
              >
                Explore Services
              </Link>
              <Link
                href="/dashboard"
                className="px-8 py-4 bg-white text-sage border-2 border-sage rounded-full font-medium hover:bg-sage hover:text-white transition-all transform hover:scale-105 shadow-lg"
              >
                Book First Session
              </Link>
            </div>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mt-16 flex flex-wrap justify-center gap-8 text-bark/60"
          >
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              <span>2,000+ Athletes</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5" />
              <span>4.9/5 Rating</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5" />
              <span>Evidence-Based</span>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-sage/30 rounded-full p-1">
            <div className="w-1 h-3 bg-sage/50 rounded-full mx-auto animate-bounce" />
          </div>
        </motion.div>
      </motion.section>

      {/* Interactive Service Cards Section */}
      <section id="services" className="section-padding">
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-light text-olivewood mb-4">
              Our Recovery Services
            </h2>
            <p className="text-bark/70 max-w-2xl mx-auto">
              Comprehensive modalities designed to accelerate recovery and enhance performance
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onHoverStart={() => setHoveredCard(service.id)}
                onHoverEnd={() => setHoveredCard(null)}
                className="relative group"
              >
                <div className={`relative bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-500 ${
                  hoveredCard === service.id ? 'transform -translate-y-2 shadow-2xl' : ''
                }`}>
                  {/* Category Badge */}
                  <div className="absolute top-4 right-4 z-10">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium text-white ${
                      service.category === 'active' ? 'bg-sage' :
                      service.category === 'contrast' ? 'bg-olive' :
                      'bg-bark'
                    }`}>
                      {service.category.toUpperCase()}
                    </span>
                  </div>

                  {/* Image with Overlay */}
                  <div className="relative h-64 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-medium text-olivewood mb-2">{service.title}</h3>
                    <p className="text-bark/70 text-sm mb-4">{service.shortDescription}</p>

                    {/* Mini Stats */}
                    <div className="flex items-center gap-4 text-xs text-bark/60 mb-4">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>30-45 min</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>1-on-1 or Group</span>
                      </div>
                    </div>

                    {/* Features Preview */}
                    <div className={`overflow-hidden transition-all duration-500 ${
                      hoveredCard === service.id ? 'max-h-40' : 'max-h-0'
                    }`}>
                      <div className="pt-4 border-t border-sand/30">
                        <p className="text-xs font-medium text-sage mb-2">KEY BENEFITS:</p>
                        <ul className="space-y-1">
                          {service.features.slice(0, 3).map((feature, i) => (
                            <li key={i} className="flex items-center gap-2 text-xs text-bark/70">
                              <Check className="w-3 h-3 text-sage" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* CTA */}
                    <Link
                      href={`/services/${service.slug}`}
                      className="mt-4 flex items-center justify-between text-sage hover:text-bark transition-colors group/link"
                    >
                      <span className="font-medium">Learn More</span>
                      <ArrowRight className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="section-padding bg-gradient-to-b from-white to-sand/10">
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-light text-olivewood mb-4">
              How It Works
            </h2>
            <p className="text-bark/70">Simple steps to start your recovery journey</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { step: "1", title: "Choose Your Service", description: "Select from our recovery modalities", icon: Activity },
              { step: "2", title: "Book Online", description: "Schedule in minutes with our easy booking", icon: Calendar },
              { step: "3", title: "Recover & Perform", description: "Experience professional recovery care", icon: TrendingUp }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="text-center"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-20 h-20 bg-sage/20 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <item.icon className="w-10 h-10 text-sage" />
                </motion.div>
                <div className="text-4xl font-light text-sage/30 mb-2">{item.step}</div>
                <h3 className="text-lg font-medium text-olivewood mb-2">{item.title}</h3>
                <p className="text-bark/60 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section className="section-padding bg-white">
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-light text-olivewood text-center mb-12">
              What Athletes Say
            </h2>

            <div className="relative px-16">
              <div className="overflow-hidden">
                <motion.div
                  key={currentTestimonial}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  className="text-center"
                >
                  <div className="mb-6">
                    <div className="flex justify-center mb-6">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                      ))}
                    </div>
                    <p className="text-lg md:text-xl text-bark/80 italic mb-6 max-w-2xl mx-auto leading-relaxed">
                      "{testimonials[currentTestimonial].content}"
                    </p>
                    <div>
                      <p className="font-medium text-olivewood">{testimonials[currentTestimonial].name}</p>
                      <p className="text-sm text-bark/60">{testimonials[currentTestimonial].role}</p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Navigation */}
              <button
                onClick={() => setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                className="absolute left-0 top-1/2 -translate-y-1/2 p-2 bg-white rounded-full shadow-lg hover:bg-sand/10 transition-colors z-10"
              >
                <ChevronLeft className="w-6 h-6 text-bark" />
              </button>
              <button
                onClick={() => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)}
                className="absolute right-0 top-1/2 -translate-y-1/2 p-2 bg-white rounded-full shadow-lg hover:bg-sand/10 transition-colors z-10"
              >
                <ChevronRight className="w-6 h-6 text-bark" />
              </button>

              {/* Dots */}
              <div className="flex justify-center gap-2 mt-6">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      currentTestimonial === index ? 'w-8 bg-sage' : 'bg-bark/30'
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="section-padding bg-gradient-to-b from-sand/10 to-white">
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-light text-olivewood mb-4">
              Why Choose RecoveryPlus
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all"
              >
                <benefit.icon className="w-12 h-12 text-sage mb-4" />
                <h3 className="text-lg font-medium text-olivewood mb-2">{benefit.title}</h3>
                <p className="text-bark/60 text-sm">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Events Preview */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-light text-olivewood mb-2">Upcoming Events</h2>
                <p className="text-bark/60">Join our recovery workshops and sessions</p>
              </div>
              <Link
                href="/events"
                className="text-sage hover:text-bark transition-colors flex items-center gap-2"
              >
                See All Events
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {upcomingEvents.map((event) => (
                <motion.div
                  key={event.id}
                  whileHover={{ scale: 1.02 }}
                  className="bg-gradient-to-r from-sage/10 to-olive/10 p-6 rounded-xl"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-medium text-olivewood mb-1">{event.title}</h3>
                      <p className="text-sm text-bark/60">{event.date}</p>
                    </div>
                    <span className="px-3 py-1 bg-white text-sage rounded-full text-xs font-medium">
                      {event.type}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-bark/60">{event.spots} spots left</span>
                    <Link
                      href="/events"
                      className="text-sage hover:text-bark transition-colors text-sm font-medium"
                    >
                      Reserve Spot →
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="section-padding bg-gradient-to-b from-sage/20 to-olive/10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="container"
        >
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-light text-olivewood mb-6">
              Ready to Recover Smarter?
            </h2>
            <p className="text-xl text-bark/80 mb-8">
              Join thousands of athletes who have transformed their recovery routine
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                href="/dashboard"
                className="px-8 py-4 bg-sage text-white rounded-full font-medium hover:bg-bark transition-all transform hover:scale-105 shadow-lg"
              >
                Book Your First Session
              </Link>
              <Link
                href="/contact"
                className="px-8 py-4 bg-white text-sage border-2 border-sage rounded-full font-medium hover:bg-sage hover:text-white transition-all transform hover:scale-105 shadow-lg"
              >
                Contact Us
              </Link>
            </div>

            {/* Trust badges */}
            <div className="mt-12 flex justify-center gap-8 text-bark/40">
              <div className="text-center">
                <div className="text-3xl font-light text-olivewood">95%</div>
                <div className="text-sm">Client Satisfaction</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-light text-olivewood">2000+</div>
                <div className="text-sm">Athletes Served</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-light text-olivewood">4.9</div>
                <div className="text-sm">Average Rating</div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}