'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const sections = [
  { id: 'overview', label: 'Overview' },
  { id: 'compare', label: 'Compare' },
  { id: 'whats-included', label: "What's Included" },
  { id: 'faqs', label: 'FAQs' },
  { id: 'policies', label: 'Policies' }
]

export default function MiniNav() {
  const [activeSection, setActiveSection] = useState('overview')
  const [isSticky, setIsSticky] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100)

      // Update active section based on scroll position
      const sectionElements = sections.map(s => document.getElementById(s.id))
      const scrollPosition = window.scrollY + 100

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const element = sectionElements[i]
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].id)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: isSticky ? 0 : -100 }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-md shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-center gap-2 py-4 overflow-x-auto">
          {sections.map(section => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                activeSection === section.id
                  ? 'bg-sage text-white'
                  : 'bg-sand/20 text-bark hover:bg-sage/10'
              }`}
            >
              {section.label}
            </button>
          ))}
        </div>
      </div>
    </motion.nav>
  )
}