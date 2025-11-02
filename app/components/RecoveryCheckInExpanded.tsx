'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, ChevronDown, Activity, Battery, Moon, Smile, Brain, Check } from 'lucide-react'

const METRICS = [
  {
    id: 'soreness',
    label: 'Muscle Soreness/Stiffness',
    icon: Activity,
    min: 1,
    max: 10,
    color: 'sage',
    descriptions: {
      low: 'Feeling fresh',
      mid: 'Moderate tightness',
      high: 'Very sore/stiff'
    }
  },
  {
    id: 'energy',
    label: 'Energy Level',
    icon: Battery,
    min: 1,
    max: 10,
    color: 'olive',
    descriptions: {
      low: 'Exhausted',
      mid: 'Normal energy',
      high: 'High energy'
    }
  },
  {
    id: 'sleep',
    label: 'Sleep Quality',
    icon: Moon,
    min: 1,
    max: 5,
    color: 'bark',
    descriptions: {
      low: 'Poor sleep',
      mid: 'Decent rest',
      high: 'Great sleep'
    }
  },
  {
    id: 'mood',
    label: 'Mood/Mental Reset',
    icon: Smile,
    min: 1,
    max: 5,
    color: 'sage',
    descriptions: {
      low: 'Feeling low',
      mid: 'Neutral',
      high: 'Feeling great'
    }
  },
  {
    id: 'stress',
    label: 'Stress Level',
    icon: Brain,
    min: 1,
    max: 10,
    color: 'bark',
    descriptions: {
      low: 'Very relaxed',
      mid: 'Manageable stress',
      high: 'High stress'
    }
  }
]

export default function RecoveryCheckInExpanded() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [values, setValues] = useState<Record<string, number>>({
    soreness: 5,
    energy: 5,
    sleep: 3,
    mood: 3,
    stress: 5
  })
  const [notes, setNotes] = useState('')
  const [hasPain, setHasPain] = useState<boolean | null>(null)
  const [painLocation, setPainLocation] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSliderChange = (id: string, value: number) => {
    setValues(prev => ({ ...prev, [id]: value }))
  }

  const getDescription = (metric: typeof METRICS[0], value: number) => {
    const percentage = (value - metric.min) / (metric.max - metric.min)
    if (metric.id === 'stress' || metric.id === 'soreness') {
      // Inverted - lower is better
      if (percentage <= 0.3) return metric.descriptions.low
      if (percentage <= 0.7) return metric.descriptions.mid
      return metric.descriptions.high
    } else {
      // Higher is better
      if (percentage <= 0.3) return metric.descriptions.low
      if (percentage <= 0.7) return metric.descriptions.mid
      return metric.descriptions.high
    }
  }

  const getSliderColor = (metric: typeof METRICS[0], value: number) => {
    const percentage = (value - metric.min) / (metric.max - metric.min)
    if (metric.id === 'stress' || metric.id === 'soreness') {
      // Inverted - lower is better
      if (percentage <= 0.3) return 'bg-sage'
      if (percentage <= 0.7) return 'bg-olive'
      return 'bg-bark'
    } else {
      // Higher is better
      if (percentage <= 0.3) return 'bg-bark'
      if (percentage <= 0.7) return 'bg-olive'
      return 'bg-sage'
    }
  }

  const handleSubmit = () => {
    const checkInData = {
      ...values,
      notes,
      hasPain,
      painLocation: hasPain ? painLocation : null,
      timestamp: new Date().toISOString()
    }

    // In production, this would send to your API
    console.log('Recovery Check-In:', checkInData)

    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setIsExpanded(false)
      // Reset for next time
      setHasPain(null)
      setPainLocation('')
      setNotes('')
    }, 2500)
  }

  const calculateReadinessScore = () => {
    // Simple weighted calculation
    const normalizedSoreness = (11 - values.soreness) / 10 // Invert and normalize
    const normalizedEnergy = values.energy / 10
    const normalizedSleep = values.sleep / 5
    const normalizedMood = values.mood / 5
    const normalizedStress = (11 - values.stress) / 10 // Invert and normalize

    const score = (
      normalizedSoreness * 0.25 +
      normalizedEnergy * 0.25 +
      normalizedSleep * 0.2 +
      normalizedMood * 0.15 +
      normalizedStress * 0.15
    ) * 100

    return Math.round(score)
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mb-8 bg-gradient-to-r from-sage/20 to-olive/10 rounded-2xl p-6 border border-sage/30"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-sage/20 rounded-full flex items-center justify-center">
            <Check className="w-6 h-6 text-sage" />
          </div>
          <div>
            <h3 className="text-xl font-medium text-olivewood mb-1">Check-In Complete!</h3>
            <p className="text-bark/60">Your readiness score: {calculateReadinessScore()}</p>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="mb-8">
      <motion.div
        initial={false}
        animate={{
          borderRadius: isExpanded ? '1rem' : '1rem',
        }}
        className="bg-gradient-to-r from-sage to-olive overflow-hidden shadow-lg"
      >
        {/* Header - Always Visible */}
        <div
          onClick={() => !isExpanded && setIsExpanded(true)}
          className={`text-white p-6 ${!isExpanded ? 'cursor-pointer hover:shadow-xl transform hover:scale-[1.01] transition-all' : ''}`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Activity className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-medium mb-1">Time for your recovery check-in!</h3>
                <p className="text-white/80">Share how you're feeling after today's session</p>
              </div>
            </div>
            <motion.div
              animate={{ rotate: isExpanded ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {isExpanded ? (
                <ChevronDown className="w-6 h-6" />
              ) : (
                <ChevronRight className="w-6 h-6" />
              )}
            </motion.div>
          </div>
        </div>

        {/* Expanded Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="bg-white border-t border-white/20"
            >
              <div className="p-8 space-y-6">
                {/* Core Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {METRICS.map((metric) => {
                    const IconComponent = metric.icon
                    const value = values[metric.id]

                    return (
                      <div key={metric.id} className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <IconComponent className="w-5 h-5 text-sage" />
                            <span className="text-sm font-medium text-olivewood">{metric.label}</span>
                          </div>
                          <div className="text-right">
                            <span className="text-2xl font-light text-olivewood">{value}</span>
                            <span className="text-xs text-bark/60 ml-1">/ {metric.max}</span>
                          </div>
                        </div>

                        {/* Slider */}
                        <div className="relative">
                          <div className="relative">
                            {/* Track background */}
                            <div className="absolute inset-0 h-2 bg-gray-200 rounded-full" />
                            {/* Filled track */}
                            <div
                              className={`absolute h-2 rounded-full ${getSliderColor(metric, value)}`}
                              style={{ width: `${((value - metric.min) / (metric.max - metric.min)) * 100}%` }}
                            />
                            {/* Input range */}
                            <input
                              type="range"
                              min={metric.min}
                              max={metric.max}
                              value={value}
                              onChange={(e) => handleSliderChange(metric.id, parseInt(e.target.value))}
                              className="relative w-full h-2 bg-transparent rounded-full appearance-none cursor-pointer slider z-10"
                            />
                          </div>
                          <style jsx>{`
                            .slider::-webkit-slider-thumb {
                              appearance: none;
                              width: 24px;
                              height: 24px;
                              border-radius: 50%;
                              background: white;
                              cursor: pointer;
                              border: 2px solid rgb(156, 175, 136);
                              box-shadow: 0 2px 6px rgba(0,0,0,0.2);
                              position: relative;
                              z-index: 2;
                            }
                            .slider::-moz-range-thumb {
                              width: 24px;
                              height: 24px;
                              border-radius: 50%;
                              background: white;
                              cursor: pointer;
                              border: 2px solid rgb(156, 175, 136);
                              box-shadow: 0 2px 6px rgba(0,0,0,0.2);
                              position: relative;
                              z-index: 2;
                            }
                            .slider::-webkit-slider-runnable-track {
                              background: transparent;
                            }
                            .slider::-moz-range-track {
                              background: transparent;
                            }
                          `}</style>
                        </div>

                        <p className="text-xs text-bark/60 italic">{getDescription(metric, value)}</p>
                      </div>
                    )
                  })}
                </div>

                {/* Pain Check */}
                <div className="pt-4 border-t border-sand/30">
                  <p className="text-sm font-medium text-olivewood mb-3">Any pain or discomfort?</p>
                  <div className="flex gap-3 mb-3">
                    <button
                      onClick={() => setHasPain(false)}
                      className={`flex-1 py-2 px-4 rounded-lg border transition-all ${
                        hasPain === false
                          ? 'bg-sage/10 border-sage text-sage'
                          : 'border-sand/30 text-bark/60 hover:bg-sand/10'
                      }`}
                    >
                      No Pain
                    </button>
                    <button
                      onClick={() => setHasPain(true)}
                      className={`flex-1 py-2 px-4 rounded-lg border transition-all ${
                        hasPain === true
                          ? 'bg-bark/10 border-bark text-bark'
                          : 'border-sand/30 text-bark/60 hover:bg-sand/10'
                      }`}
                    >
                      Some Pain
                    </button>
                  </div>

                  <AnimatePresence>
                    {hasPain && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        <input
                          type="text"
                          placeholder="Where do you feel pain? (e.g., lower back, knee)"
                          value={painLocation}
                          onChange={(e) => setPainLocation(e.target.value)}
                          className="w-full px-4 py-2 border border-sand/30 rounded-lg text-bark placeholder:text-bark/40 focus:outline-none focus:border-sage"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Optional Notes */}
                <div>
                  <label className="text-sm font-medium text-olivewood block mb-2">
                    Additional Notes (Optional)
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Any other details about how you're feeling..."
                    className="w-full px-4 py-3 border border-sand/30 rounded-lg text-bark placeholder:text-bark/40 focus:outline-none focus:border-sage resize-none"
                    rows={2}
                  />
                </div>

                {/* Calculated Score Preview & Submit */}
                <div className="flex items-center justify-between gap-4 pt-4 border-t border-sand/30">
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-bark">Estimated Readiness:</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-light text-olivewood">{calculateReadinessScore()}</span>
                      <span className="text-sm text-bark/60">/ 100</span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setIsExpanded(false)}
                      className="px-6 py-2 text-bark hover:bg-sand/10 rounded-full transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSubmit}
                      className="px-6 py-2 bg-sage text-white rounded-full font-medium hover:bg-bark transition-all flex items-center gap-2"
                    >
                      Submit Check-In
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}