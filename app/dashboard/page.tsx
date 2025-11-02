'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, RefreshCw, TrendingUp, TrendingDown, Activity, Moon, Heart, Zap, Calendar, ChevronRight, Watch, ChevronDown } from 'lucide-react'
import RecoveryCheckInExpanded from '../components/RecoveryCheckInExpanded'

// Popular wearables with API support
const WEARABLES = {
  'apple_health': {
    name: 'Apple Health',
    icon: 'apple',
    metrics: ['HRV', 'Sleep', 'RHR', 'Steps', 'VO2 Max']
  },
  'whoop': {
    name: 'WHOOP',
    icon: '⚡',
    metrics: ['Strain', 'Recovery', 'Sleep Performance', 'HRV']
  },
  'oura': {
    name: 'Oura Ring',
    icon: '💍',
    metrics: ['Readiness', 'Sleep Score', 'Activity', 'Temperature']
  },
  'garmin': {
    name: 'Garmin',
    icon: '⌚',
    metrics: ['Training Status', 'Body Battery', 'Stress', 'Sleep']
  },
  'fitbit': {
    name: 'Fitbit',
    icon: '📱',
    metrics: ['Active Zone Minutes', 'Sleep Score', 'SpO2', 'Stress']
  },
  'polar': {
    name: 'Polar',
    icon: '❄️',
    metrics: ['Recovery Pro', 'Nightly Recharge', 'FitSpark', 'Sleep Plus']
  }
}

// Mock data for different wearables
const WEARABLE_DATA = {
  'apple_health': {
    readiness: { score: 72, delta7d: 6 },
    keyMetrics: { hrvMs: 66, sleepH: 7.2, rhrBpm: 54, load: 420 },
    flags: ['HRV below baseline', 'Consider lighter intensity']
  },
  'whoop': {
    readiness: { score: 68, delta7d: -3 },
    keyMetrics: { strain: 14.2, recovery: 68, sleepPerf: 82, hrvMs: 61 },
    flags: ['Recovery moderate', 'Sleep performance good']
  },
  'oura': {
    readiness: { score: 85, delta7d: 12 },
    keyMetrics: { readiness: 85, sleepScore: 88, activity: 92, temp: -0.2 },
    flags: ['Optimal recovery', 'Temperature normal']
  },
  'garmin': {
    readiness: { score: 76, delta7d: 4 },
    keyMetrics: { trainingStatus: 'Productive', bodyBattery: 76, stress: 28, sleepScore: 81 },
    flags: ['Training productive', 'Low stress levels']
  },
  'fitbit': {
    readiness: { score: 70, delta7d: 2 },
    keyMetrics: { activeMinutes: 45, sleepScore: 78, spo2: 96, stressScore: 35 },
    flags: ['Good activity level', 'Moderate stress']
  },
  'polar': {
    readiness: { score: 79, delta7d: 8 },
    keyMetrics: { recoveryPro: 79, nightlyRecharge: 82, fitSpark: 85, sleepPlus: 7.5 },
    flags: ['Well recovered', 'Good sleep quality']
  }
}

interface DashboardData {
  readiness: {
    score: number
    delta7d: number
    version?: string
    confidence?: number
  }
  keyMetrics: any
  flags: string[]
  todayPrescription: Array<{
    protocolId: string
    title: string
    durationMin?: number
    duration?: string
    time?: string
    completed?: boolean
    description?: string
    targetMetrics?: any
  }>
  surveyPromptPending: boolean
}

export default function DashboardPage() {
  const [selectedWearable, setSelectedWearable] = useState('apple_health')
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      // Simulate fetching data from the selected wearable
      // In production, this would call different APIs based on the wearable
      const mockData = WEARABLE_DATA[selectedWearable as keyof typeof WEARABLE_DATA]

      // Mock backend data for demo purposes (replace with actual API call in production)
      const mockBackendData = {
        todayPrescription: [
          {
            protocolId: "swim-recovery",
            title: "Active Recovery Swim",
            time: "Morning",
            duration: "30 minutes",
            completed: false,
            description: "Low-intensity swimming focusing on form and breathing",
            targetMetrics: {
              heartRate: "< 120 bpm",
              intensity: "Zone 2"
            }
          },
          {
            protocolId: "mobility-work",
            title: "Mobility & Flexibility",
            time: "Afternoon",
            duration: "15 minutes",
            completed: false,
            description: "Dynamic stretching and joint mobility exercises",
            targetMetrics: {
              heartRate: "< 100 bpm",
              intensity: "Recovery"
            }
          },
          {
            protocolId: "breathing",
            title: "Breathing Exercises",
            time: "Evening",
            duration: "10 minutes",
            completed: false,
            description: "Parasympathetic activation through controlled breathing",
            targetMetrics: {
              heartRate: "Resting",
              intensity: "Relaxation"
            }
          }
        ],
        surveyPromptPending: false
      }

      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500))

      // Merge wearable data with backend prescription data
      const dashboardData: DashboardData = {
        ...mockData,
        version: 'v1.0',
        todayPrescription: mockBackendData.todayPrescription,
        surveyPromptPending: mockBackendData.surveyPromptPending
      }

      setData(dashboardData)
      setError(null)
    } catch (err) {
      setError('Unable to load recovery data. Please ensure the backend is running.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDashboardData()
  }, [selectedWearable])

  useEffect(() => {
    const interval = setInterval(fetchDashboardData, 30000)
    return () => clearInterval(interval)
  }, [selectedWearable])

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-olive'
    if (score >= 60) return 'text-sand'
    return 'text-bark'
  }

  const getScoreBackground = (score: number) => {
    if (score >= 80) return 'bg-olive/20'
    if (score >= 60) return 'bg-sand/20'
    return 'bg-bark/20'
  }

  const renderMetrics = () => {
    if (!data) return null
    const wearable = selectedWearable as keyof typeof WEARABLE_DATA

    switch(wearable) {
      case 'whoop':
        return (
          <>
            <div className="p-4 bg-white/50 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-4 h-4 text-sage" />
                <span className="text-xs text-bark">Strain</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-light text-olivewood">{data.keyMetrics.strain}</span>
                <span className="text-xs text-bark">/21</span>
              </div>
            </div>
            <div className="p-4 bg-white/50 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="w-4 h-4 text-sage" />
                <span className="text-xs text-bark">Recovery</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-light text-olivewood">{data.keyMetrics.recovery}</span>
                <span className="text-xs text-bark">%</span>
              </div>
            </div>
            <div className="p-4 bg-white/50 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <Moon className="w-4 h-4 text-sage" />
                <span className="text-xs text-bark">Sleep Perf</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-light text-olivewood">{data.keyMetrics.sleepPerf}</span>
                <span className="text-xs text-bark">%</span>
              </div>
            </div>
            <div className="p-4 bg-white/50 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <Heart className="w-4 h-4 text-sage" />
                <span className="text-xs text-bark">HRV</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-light text-olivewood">{data.keyMetrics.hrvMs}</span>
                <span className="text-xs text-bark">ms</span>
              </div>
            </div>
          </>
        )
      case 'oura':
        return (
          <>
            <div className="p-4 bg-white/50 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="w-4 h-4 text-sage" />
                <span className="text-xs text-bark">Readiness</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-light text-olivewood">{data.keyMetrics.readiness}</span>
                <span className="text-xs text-bark">/100</span>
              </div>
            </div>
            <div className="p-4 bg-white/50 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <Moon className="w-4 h-4 text-sage" />
                <span className="text-xs text-bark">Sleep</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-light text-olivewood">{data.keyMetrics.sleepScore}</span>
                <span className="text-xs text-bark">/100</span>
              </div>
            </div>
            <div className="p-4 bg-white/50 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-4 h-4 text-sage" />
                <span className="text-xs text-bark">Activity</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-light text-olivewood">{data.keyMetrics.activity}</span>
                <span className="text-xs text-bark">/100</span>
              </div>
            </div>
            <div className="p-4 bg-white/50 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <Heart className="w-4 h-4 text-sage" />
                <span className="text-xs text-bark">Temp Δ</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-light text-olivewood">{data.keyMetrics.temp}</span>
                <span className="text-xs text-bark">°C</span>
              </div>
            </div>
          </>
        )
      default: // apple_health and others
        return (
          <>
            <div className="p-4 bg-white/50 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="w-4 h-4 text-sage" />
                <span className="text-xs text-bark">HRV</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-light text-olivewood">{data.keyMetrics.hrvMs || '--'}</span>
                <span className="text-xs text-bark">ms</span>
              </div>
            </div>
            <div className="p-4 bg-white/50 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <Moon className="w-4 h-4 text-sage" />
                <span className="text-xs text-bark">Sleep</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-light text-olivewood">{data.keyMetrics.sleepH || '--'}</span>
                <span className="text-xs text-bark">hrs</span>
              </div>
            </div>
            <div className="p-4 bg-white/50 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <Heart className="w-4 h-4 text-sage" />
                <span className="text-xs text-bark">RHR</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-light text-olivewood">{data.keyMetrics.rhrBpm || '--'}</span>
                <span className="text-xs text-bark">bpm</span>
              </div>
            </div>
            <div className="p-4 bg-white/50 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-4 h-4 text-sage" />
                <span className="text-xs text-bark">Load</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-light text-olivewood">{data.keyMetrics.load || '--'}</span>
                <span className="text-xs text-bark">au</span>
              </div>
            </div>
          </>
        )
    }
  }

  return (
    <main className="min-h-screen bg-parchment pt-8">
      {/* Header */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="flex items-center gap-2 text-bark hover:text-sage transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline text-bark">Back to Home</span>
            </Link>
            <div className="border-l border-sand/30 pl-6">
              <h1 className="text-2xl font-light text-olivewood">Recovery Dashboard</h1>
            </div>
          </div>
          <button
            onClick={fetchDashboardData}
            className="flex items-center gap-2 px-4 py-2 bg-sage text-white rounded-full hover:bg-bark transition-all duration-300 transform hover:scale-105"
            disabled={loading}
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Refresh</span>
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Wearable Selector */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-3 px-6 py-3 bg-white/80 rounded-full shadow-sm hover:shadow-md transition-shadow border border-sand/30"
            >
              <Watch className="w-5 h-5 text-sage" />
              <div className="flex items-center gap-2">
                {selectedWearable === 'apple_health' ? (
                  <Image src="/images/apple-logo.png" alt="Apple" width={18} height={18} className="object-contain" />
                ) : (
                  <span>{WEARABLES[selectedWearable as keyof typeof WEARABLES].icon}</span>
                )}
                <span className="text-olivewood font-medium">{WEARABLES[selectedWearable as keyof typeof WEARABLES].name}</span>
              </div>
              <ChevronDown className={`w-4 h-4 text-bark transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {dropdownOpen && (
              <div className="absolute top-full mt-2 w-64 bg-white rounded-xl shadow-lg border border-sand/30 overflow-hidden z-20">
                {Object.entries(WEARABLES).map(([key, wearable]) => (
                  <button
                    key={key}
                    onClick={() => {
                      setSelectedWearable(key)
                      setDropdownOpen(false)
                    }}
                    className={`w-full px-4 py-3 text-left hover:bg-parchment/50 transition-colors flex items-center gap-3 ${
                      selectedWearable === key ? 'bg-sage/10' : ''
                    }`}
                  >
                    {key === 'apple_health' ? (
                      <Image src="/images/apple-logo.png" alt="Apple" width={20} height={20} className="object-contain" />
                    ) : (
                      <span className="text-xl">{wearable.icon}</span>
                    )}
                    <div>
                      <div className="text-olivewood font-medium">{wearable.name}</div>
                      <div className="text-xs text-bark/60">{wearable.metrics.slice(0, 3).join(', ')}</div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {loading && !data ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-sage/30 border-t-sage rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-bark">Loading your recovery data...</p>
            </div>
          </div>
        ) : error ? (
          <div className="bg-white/80 rounded-2xl p-8 text-center">
            <p className="text-bark mb-4">{error}</p>
            <button
              onClick={fetchDashboardData}
              className="px-6 py-2 bg-sage text-white rounded-full hover:bg-bark transition-all"
            >
              Try Again
            </button>
          </div>
        ) : data ? (
          <>
            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {/* Readiness Score Card */}
              <div className="bg-white/80 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <h2 className="text-sm uppercase tracking-wider text-bark mb-6">Readiness Score</h2>
                <div className="flex flex-col items-center">
                  <div className="relative w-40 h-40">
                    <svg className="w-40 h-40 transform -rotate-90">
                      <circle
                        cx="80"
                        cy="80"
                        r="70"
                        stroke="#F3EFE0"
                        strokeWidth="12"
                        fill="none"
                      />
                      <circle
                        cx="80"
                        cy="80"
                        r="70"
                        stroke={data.readiness.score >= 80 ? '#9CAF88' : data.readiness.score >= 60 ? '#C8B88B' : '#6B5D54'}
                        strokeWidth="12"
                        fill="none"
                        strokeDasharray={`${(data.readiness.score / 100) * 440} 440`}
                        className="transition-all duration-1000"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className={`text-5xl font-light ${getScoreColor(data.readiness.score)}`}>
                        {data.readiness.score}
                      </span>
                      <span className="text-xs text-bark uppercase tracking-wider">Ready</span>
                    </div>
                  </div>
                  <div className={`mt-6 px-4 py-2 rounded-full ${getScoreBackground(data.readiness.delta7d)} flex items-center gap-2`}>
                    {data.readiness.delta7d >= 0 ? (
                      <TrendingUp className="w-4 h-4 text-olive" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-bark" />
                    )}
                    <span className={`text-sm font-medium ${data.readiness.delta7d >= 0 ? 'text-olive' : 'text-bark'}`}>
                      {data.readiness.delta7d >= 0 ? '+' : ''}{data.readiness.delta7d} vs 7 days
                    </span>
                  </div>
                </div>
              </div>

              {/* Key Metrics Card */}
              <div className="bg-white/80 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <h2 className="text-sm uppercase tracking-wider text-bark mb-6">Key Metrics</h2>
                <div className="grid grid-cols-2 gap-4">
                  {renderMetrics()}
                </div>
              </div>

              {/* Attention Areas */}
              <div className="bg-white/80 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <h2 className="text-sm uppercase tracking-wider text-bark mb-6">Attention Areas</h2>
                <div className="space-y-3">
                  {data.flags.length > 0 ? (
                    data.flags.map((flag, index) => (
                      <div
                        key={index}
                        className="px-4 py-3 bg-sand/20 border border-sand/40 rounded-lg text-sm text-bark"
                      >
                        {flag}
                      </div>
                    ))
                  ) : (
                    <p className="text-sage">All systems optimal</p>
                  )}
                </div>
              </div>
            </div>

            {/* Survey Prompt */}
            {data.surveyPromptPending && (
              <RecoveryCheckInExpanded />
            )}

            {/* Recovery Protocols */}
            <div className="bg-white/80 rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-light text-olivewood mb-6">Today's Recovery Protocols</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.todayPrescription.map((protocol) => (
                  <div
                    key={protocol.protocolId}
                    className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-sage/10 to-olive/10 p-6 border border-sage/20 hover:border-sage/40 transition-all hover:shadow-md cursor-pointer"
                  >
                    <div className="relative z-10">
                      <h3 className="text-lg font-medium text-olivewood mb-2">{protocol.title}</h3>
                      <div className="flex items-center gap-2 text-sm text-bark">
                        <span className="px-2 py-1 bg-white/60 rounded-full">
                          {protocol.duration || `${protocol.durationMin} minutes`}
                        </span>
                      </div>
                    </div>
                    <div className="absolute top-0 right-0 w-24 h-24 bg-sage/10 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-500"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Connected Wearables Info */}
            <div className="mt-8 bg-white/60 rounded-xl p-4 text-center">
              <p className="text-sm text-bark/70">
                Currently viewing data from <span className="font-medium text-olivewood">{WEARABLES[selectedWearable as keyof typeof WEARABLES].name}</span>
              </p>
              <p className="text-xs text-bark/50 mt-1">
                Connect multiple wearables to get a comprehensive view of your recovery
              </p>
            </div>
          </>
        ) : null}
      </div>
    </main>
  )
}