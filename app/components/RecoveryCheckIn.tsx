'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronRight, Activity, Battery, Moon, Smile, Brain } from 'lucide-react'

interface RecoveryCheckInProps {
  isOpen: boolean
  onClose: () => void
}

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

export default function RecoveryCheckIn({ isOpen, onClose }: RecoveryCheckInProps) {
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
      onClose()
      // Reset for next time
      setSubmitted(false)
      setHasPain(null)
      setPainLocation('')
      setNotes('')
    }, 2000)
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

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-x-4 top-[50%] -translate-y-1/2 max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl z-50 max-h-[90vh] overflow-y-auto"
          >
            {!submitted ? (
              <>
                {/* Header */}
                <div className="sticky top-0 bg-white border-b border-sand/30 p-6 rounded-t-2xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-light text-olivewood">Recovery Check-In</h2>
                      <p className="text-sm text-bark/60 mt-1">How are you feeling today?</p>
                    </div>
                    <button
                      onClick={onClose}
                      className="p-2 hover:bg-sand/10 rounded-full transition-colors"
                    >
                      <X className="w-5 h-5 text-bark" />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                  {/* Core Metrics */}
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
                          <input
                            type="range"
                            min={metric.min}
                            max={metric.max}
                            value={value}
                            onChange={(e) => handleSliderChange(metric.id, parseInt(e.target.value))}
                            className="w-full h-2 bg-sand/30 rounded-full appearance-none cursor-pointer slider"
                            style={{
                              background: `linear-gradient(to right, ${getSliderColor(metric, value).replace('bg-', 'rgb(var(--color-')}) 0%, ${getSliderColor(metric, value).replace('bg-', 'rgb(var(--color-')}) ${((value - metric.min) / (metric.max - metric.min)) * 100}%, rgb(var(--color-sand) / 0.3) ${((value - metric.min) / (metric.max - metric.min)) * 100}%, rgb(var(--color-sand) / 0.3) 100%)`
                            }}
                          />
                          <style jsx>{`
                            .slider::-webkit-slider-thumb {
                              appearance: none;
                              width: 24px;
                              height: 24px;
                              border-radius: 50%;
                              background: white;
                              cursor: pointer;
                              border: 2px solid rgb(156, 175, 136);
                              box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                            }
                            .slider::-moz-range-thumb {
                              width: 24px;
                              height: 24px;
                              border-radius: 50%;
                              background: white;
                              cursor: pointer;
                              border: 2px solid rgb(156, 175, 136);
                              box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                            }
                          `}</style>
                        </div>

                        <p className="text-xs text-bark/60 italic">{getDescription(metric, value)}</p>
                      </div>
                    )
                  })}

                  {/* Pain Check */}
                  <div className="pt-4 border-t border-sand/30">
                    <p className="text-sm font-medium text-olivewood mb-3">Any pain or discomfort?</p>
                    <div className="flex gap-3">
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

                    {hasPain && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-3"
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
                      rows={3}
                    />
                  </div>

                  {/* Calculated Score Preview */}
                  <div className="bg-gradient-to-r from-sage/10 to-olive/10 rounded-xl p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-bark">Estimated Readiness Score</span>
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-light text-olivewood">{calculateReadinessScore()}</span>
                        <span className="text-sm text-bark/60">/ 100</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="sticky bottom-0 bg-white border-t border-sand/30 p-6 rounded-b-2xl">
                  <button
                    onClick={handleSubmit}
                    className="w-full py-3 bg-sage text-white rounded-full font-medium hover:bg-bark transition-all flex items-center justify-center gap-2"
                  >
                    Submit Check-In
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </>
            ) : (
              /* Success State */
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-12 text-center"
              >
                <div className="w-20 h-20 bg-sage/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Activity className="w-10 h-10 text-sage" />
                </div>
                <h3 className="text-2xl font-light text-olivewood mb-2">Check-In Complete!</h3>
                <p className="text-bark/60">Your recovery data has been recorded.</p>
                <p className="text-sm text-sage mt-4">Readiness Score: {calculateReadinessScore()}</p>
              </motion.div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}