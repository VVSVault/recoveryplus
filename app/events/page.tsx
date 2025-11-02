'use client'

import { useState } from 'react'
import {
  Calendar, Clock, Users, Activity, Heart, Wind, Droplets, Brain,
  ChevronLeft, ChevronRight, Filter, X, Play, UserCheck, TrendingUp,
  AlertCircle, CheckCircle, MapPin, Video, Plus, Star
} from 'lucide-react'

// Event types and modalities
const EVENT_TYPES = {
  mobility: { label: 'Mobility', icon: Activity, color: 'sage' },
  breathwork: { label: 'Breathwork', icon: Wind, color: 'olive' },
  contrast: { label: 'Contrast', icon: Droplets, color: 'bark' },
  nutrition: { label: 'Nutrition', icon: Heart, color: 'sand' },
  workshop: { label: 'Workshop', icon: Brain, color: 'olivewood' }
}

// Seeded events data
const SEEDED_EVENTS = [
  {
    id: 'evt_001',
    title: 'Morning Breathwork Reset',
    type: 'breathwork',
    modalityTags: ['breathwork', 'meditation'],
    protocolTags: ['box_breathing', 'downshift'],
    intensity: 'low',
    durationMin: 15,
    startAt: new Date('2025-09-21T06:30:00'),
    endAt: new Date('2025-09-21T06:45:00'),
    host: { id: 'coach_maya', name: 'Coach Maya', avatar: '👩‍🏫' },
    location: { virtualUrl: 'https://live.recoveryplus.life/evt_001' },
    capacity: { max: 200, filled: 132 },
    visibility: 'public',
    readinessFit: 'high',
    rationale: 'HRV -12% & high stress → breathwork recommended',
    description: 'Start your day with guided breathing exercises to reset your nervous system.',
    equipment: 'None required',
    hasReplay: true
  },
  {
    id: 'evt_002',
    title: 'Lower Body Mobility Flow',
    type: 'mobility',
    modalityTags: ['mobility', 'stretching'],
    protocolTags: ['hip_mobility', 'ankle_work'],
    intensity: 'moderate',
    durationMin: 30,
    startAt: new Date('2025-09-21T09:00:00'),
    endAt: new Date('2025-09-21T09:30:00'),
    host: { id: 'coach_alex', name: 'Alex Thompson', avatar: '🏃‍♂️' },
    location: { address: 'Studio A, RecoveryPlus Center' },
    capacity: { max: 20, filled: 18 },
    visibility: 'public',
    readinessFit: 'medium',
    rationale: 'Stiffness 6/10 → mobility work beneficial',
    description: 'Comprehensive lower body mobility session focusing on hips, knees, and ankles.',
    equipment: 'Foam roller, resistance band',
    hasReplay: true
  },
  {
    id: 'evt_003',
    title: 'Contrast Recovery Basics',
    type: 'contrast',
    modalityTags: ['sauna', 'ice_bath'],
    protocolTags: ['contrast_therapy'],
    intensity: 'high',
    durationMin: 45,
    startAt: new Date('2025-09-21T14:00:00'),
    endAt: new Date('2025-09-21T14:45:00'),
    host: { id: 'coach_sarah', name: 'Dr. Sarah Chen', avatar: '👩‍⚕️' },
    location: { address: 'Contrast Suite, RecoveryPlus' },
    capacity: { max: 8, filled: 8 },
    visibility: 'public',
    readinessFit: 'low',
    rationale: 'High readiness (85) → contrast therapy optimal',
    description: 'Learn proper contrast therapy protocols with guided sauna and cold plunge sessions.',
    equipment: 'Towel, water bottle, swimwear',
    hasReplay: false
  },
  {
    id: 'evt_004',
    title: 'Nutrition for Recovery Q&A',
    type: 'nutrition',
    modalityTags: ['nutrition', 'education'],
    protocolTags: ['recovery_nutrition'],
    intensity: 'low',
    durationMin: 60,
    startAt: new Date('2025-09-22T18:00:00'),
    endAt: new Date('2025-09-22T19:00:00'),
    host: { id: 'coach_mike', name: 'Mike Johnson, RD', avatar: '🥗' },
    location: { virtualUrl: 'https://live.recoveryplus.life/evt_004' },
    capacity: { max: 100, filled: 67 },
    visibility: 'public',
    readinessFit: 'high',
    rationale: 'Recovery phase → nutrition optimization key',
    description: 'Interactive session on optimizing nutrition for recovery and performance.',
    equipment: 'None',
    hasReplay: true
  },
  {
    id: 'evt_005',
    title: 'Evening Wind Down',
    type: 'breathwork',
    modalityTags: ['breathwork', 'meditation', 'sleep'],
    protocolTags: ['4-7-8_breathing', 'body_scan'],
    intensity: 'low',
    durationMin: 20,
    startAt: new Date('2025-09-22T20:00:00'),
    endAt: new Date('2025-09-22T20:20:00'),
    host: { id: 'coach_maya', name: 'Coach Maya', avatar: '👩‍🏫' },
    location: { virtualUrl: 'https://live.recoveryplus.life/evt_005' },
    capacity: { max: 200, filled: 89 },
    visibility: 'public',
    readinessFit: 'high',
    rationale: 'Sleep debt 2h → evening wind-down beneficial',
    description: 'Prepare for restorative sleep with calming breathwork and body scan meditation.',
    equipment: 'None',
    hasReplay: true
  },
  {
    id: 'evt_006',
    title: 'Team Recovery Session',
    type: 'mobility',
    modalityTags: ['mobility', 'team'],
    protocolTags: ['full_body_mobility'],
    intensity: 'low',
    durationMin: 40,
    startAt: new Date('2025-09-23T16:00:00'),
    endAt: new Date('2025-09-23T16:40:00'),
    host: { id: 'coach_alex', name: 'Alex Thompson', avatar: '🏃‍♂️' },
    location: { address: 'Main Studio, RecoveryPlus' },
    capacity: { max: 30, filled: 24 },
    visibility: 'team',
    readinessFit: 'high',
    rationale: 'Team recovery day → group mobility session',
    description: 'Full body mobility work designed for team recovery.',
    equipment: 'Yoga mat',
    hasReplay: true
  }
]

// Replay library
const REPLAYS = [
  { id: 'rep_001', title: 'Back Care Essentials', duration: 25, type: 'mobility', views: 1420, impact: '+8 readiness' },
  { id: 'rep_002', title: 'Sleep Hygiene Workshop', duration: 45, type: 'workshop', views: 892, impact: '+1.2h sleep' },
  { id: 'rep_003', title: 'Hips & Ankles Focus', duration: 30, type: 'mobility', views: 1156, impact: '-2 stiffness' },
  { id: 'rep_004', title: 'Recovery 101', duration: 60, type: 'workshop', views: 2103, impact: '+12% adherence' },
  { id: 'rep_005', title: 'Contrast Protocols', duration: 35, type: 'contrast', views: 743, impact: '+6 readiness' },
  { id: 'rep_006', title: 'Competition Day -1', duration: 20, type: 'breathwork', views: 1678, impact: '-15% stress' }
]

// Coach analytics data
const COACH_STATS = {
  attendance: 78,
  readinessDelta: +6,
  adherence: 82,
  weeklyTrend: [65, 68, 72, 75, 78, 80, 78],
  topEvents: [
    { name: 'Morning Breathwork', attendance: 89, impact: '+8' },
    { name: 'Lower Body Mobility', attendance: 92, impact: '+5' },
    { name: 'Team Recovery', attendance: 76, impact: '+4' }
  ]
}

export default function EventsPage() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)
  const [viewMode, setViewMode] = useState<'athlete' | 'coach'>('athlete')
  const [rsvpStatus, setRsvpStatus] = useState<Record<string, string>>({})

  // Generate week dates
  const getWeekDates = () => {
    const dates = []
    const today = new Date()
    for (let i = 0; i < 7; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      dates.push(date)
    }
    return dates
  }

  const weekDates = getWeekDates()

  const handleRSVP = (eventId: string) => {
    setRsvpStatus(prev => ({
      ...prev,
      [eventId]: prev[eventId] === 'going' ? 'none' : 'going'
    }))
  }

  const toggleFilter = (filter: string) => {
    setActiveFilters(prev =>
      prev.includes(filter)
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    )
  }

  const filteredEvents = SEEDED_EVENTS.filter(event => {
    if (activeFilters.length === 0) return true
    return activeFilters.includes(event.type)
  })

  // Get icon component
  const getIconComponent = (type: string) => {
    const IconComponent = EVENT_TYPES[type as keyof typeof EVENT_TYPES].icon
    return <IconComponent className="w-4 h-4 text-sage" />
  }

  const getLargeIconComponent = (type: string) => {
    const IconComponent = EVENT_TYPES[type as keyof typeof EVENT_TYPES].icon
    return <IconComponent className="w-8 h-8 text-sage" />
  }

  return (
    <div className="min-h-screen bg-parchment pt-20">
      {/* Hero Section with Readiness */}
      <div className="bg-gradient-to-b from-sage/20 to-transparent border-b border-sand/30">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-light text-olivewood mb-2">Recovery Events</h1>
              <p className="text-bark/80">Guided sessions tailored to your readiness</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="px-4 py-2 bg-white/80 rounded-full border border-sage/30">
                <span className="text-sm text-bark">Your Readiness: </span>
                <span className="font-medium text-olivewood">72</span>
                <span className="text-xs text-sage ml-1">↑6 vs 7d</span>
              </div>
              <button
                onClick={() => setViewMode(viewMode === 'athlete' ? 'coach' : 'athlete')}
                className="px-4 py-2 bg-sage text-white rounded-full text-sm hover:bg-bark transition-colors"
              >
                {viewMode === 'athlete' ? 'Coach View' : 'Athlete View'}
              </button>
            </div>
          </div>

          {/* Recommended Today */}
          <div className="mb-8">
            <h2 className="text-sm uppercase tracking-wider text-bark mb-4">Recommended Today</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {filteredEvents.slice(0, 3).map(event => (
                <div key={event.id} className="bg-white/90 rounded-xl p-4 border border-sand/30 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-sage/20 flex items-center justify-center">
                        {getIconComponent(event.type)}
                      </div>
                      <span className="text-xs font-medium text-sage uppercase">{EVENT_TYPES[event.type as keyof typeof EVENT_TYPES].label}</span>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      event.readinessFit === 'high' ? 'bg-sage/20 text-sage' :
                      event.readinessFit === 'medium' ? 'bg-sand/30 text-bark' :
                      'bg-bark/10 text-bark'
                    }`}>
                      {event.readinessFit.toUpperCase()} FIT
                    </div>
                  </div>
                  <h3 className="font-medium text-olivewood mb-2">{event.title}</h3>
                  <p className="text-xs text-bark/70 mb-3 italic">{event.rationale}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-xs text-bark">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {event.durationMin}m
                      </span>
                      <span>{event.host.avatar} {event.host.name.split(' ')[0]}</span>
                    </div>
                    <button
                      onClick={() => handleRSVP(event.id)}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                        rsvpStatus[event.id] === 'going'
                          ? 'bg-sage text-white'
                          : 'bg-white border border-sage/30 text-sage hover:bg-sage/10'
                      }`}
                    >
                      {rsvpStatus[event.id] === 'going' ? 'Going ✓' : 'RSVP'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Calendar Strip */}
      <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-sm border-b border-sand/30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4 overflow-x-auto">
            {weekDates.map((date, index) => {
              const isSelected = date.toDateString() === selectedDate.toDateString()
              const isToday = date.toDateString() === new Date().toDateString()
              return (
                <button
                  key={index}
                  onClick={() => setSelectedDate(date)}
                  className={`flex-shrink-0 px-4 py-2 rounded-lg transition-all ${
                    isSelected
                      ? 'bg-sage text-white'
                      : isToday
                      ? 'bg-olive/20 text-olivewood'
                      : 'hover:bg-sand/20 text-bark'
                  }`}
                >
                  <div className="text-xs uppercase">{date.toLocaleDateString('en', { weekday: 'short' })}</div>
                  <div className="text-lg font-medium">{date.getDate()}</div>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {viewMode === 'athlete' ? (
              <>
                {/* Filters */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2 flex-wrap">
                    <button
                      onClick={() => setShowFilters(!showFilters)}
                      className="flex items-center gap-2 px-3 py-1 bg-white rounded-full border border-sand/30 text-sm text-bark hover:bg-sand/10"
                    >
                      <Filter className="w-4 h-4" />
                      Filters {activeFilters.length > 0 && `(${activeFilters.length})`}
                    </button>
                    {activeFilters.map(filter => (
                      <span key={filter} className="px-3 py-1 bg-sage/10 rounded-full text-sm text-sage flex items-center gap-1">
                        {EVENT_TYPES[filter as keyof typeof EVENT_TYPES].label}
                        <button onClick={() => toggleFilter(filter)}>
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                  <span className="text-sm text-bark">{filteredEvents.length} events</span>
                </div>

                {showFilters && (
                  <div className="mb-6 p-4 bg-white/80 rounded-xl border border-sand/30">
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                      {Object.entries(EVENT_TYPES).map(([key, type]) => (
                        <button
                          key={key}
                          onClick={() => toggleFilter(key)}
                          className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                            activeFilters.includes(key)
                              ? 'bg-sage text-white'
                              : 'bg-sand/10 text-bark hover:bg-sand/20'
                          }`}
                        >
                          {type.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Event Feed */}
                <div className="space-y-4">
                  {filteredEvents.map(event => (
                    <div key={event.id} className="bg-white/90 rounded-xl overflow-hidden border border-sand/30 hover:shadow-lg transition-shadow">
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-start gap-4">
                            <div className="w-16 h-16 bg-sand/20 rounded-lg flex items-center justify-center">
                              {getLargeIconComponent(event.type)}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="text-xl font-medium text-olivewood">{event.title}</h3>
                                {event.hasReplay && (
                                  <span className="px-2 py-0.5 bg-olive/10 text-olive text-xs rounded-full">
                                    <Play className="w-3 h-3 inline mr-1" />
                                    Replay Available
                                  </span>
                                )}
                              </div>
                              <p className="text-bark/70 mb-3">{event.description}</p>
                              <div className="flex items-center gap-4 text-sm text-bark">
                                <span className="flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  {event.startAt.toLocaleTimeString('en', { hour: 'numeric', minute: '2-digit' })} • {event.durationMin}min
                                </span>
                                <span className="flex items-center gap-1">
                                  {event.location.virtualUrl ? (
                                    <>
                                      <Video className="w-4 h-4" />
                                      Virtual
                                    </>
                                  ) : (
                                    <>
                                      <MapPin className="w-4 h-4" />
                                      {event.location.address?.split(',')[0]}
                                    </>
                                  )}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Users className="w-4 h-4" />
                                  {event.capacity.filled}/{event.capacity.max}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className={`px-3 py-1 rounded-full text-sm font-medium mb-2 ${
                              event.readinessFit === 'high' ? 'bg-sage/20 text-sage' :
                              event.readinessFit === 'medium' ? 'bg-sand/30 text-bark' :
                              'bg-bark/10 text-bark'
                            }`}>
                              {event.readinessFit.toUpperCase()} FIT
                            </div>
                            <div className="text-xs text-bark/60">{event.rationale}</div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between pt-4 border-t border-sand/30">
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-bark">{event.host.avatar}</span>
                            <div>
                              <div className="text-sm font-medium text-olivewood">{event.host.name}</div>
                              <div className="text-xs text-bark/60">Host</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button className="p-2 rounded-lg hover:bg-sand/10 transition-colors">
                              <Calendar className="w-5 h-5 text-bark" />
                            </button>
                            <button
                              onClick={() => handleRSVP(event.id)}
                              className={`px-6 py-2 rounded-full font-medium transition-all ${
                                rsvpStatus[event.id] === 'going'
                                  ? 'bg-sage text-white'
                                  : event.capacity.filled >= event.capacity.max
                                  ? 'bg-sand/30 text-bark cursor-not-allowed'
                                  : 'bg-olive text-white hover:bg-bark'
                              }`}
                              disabled={event.capacity.filled >= event.capacity.max && rsvpStatus[event.id] !== 'going'}
                            >
                              {rsvpStatus[event.id] === 'going' ? 'Going ✓' :
                               event.capacity.filled >= event.capacity.max ? 'Full' : 'RSVP'}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Replays Section */}
                <div className="mt-12">
                  <h2 className="text-xl font-light text-olivewood mb-6">Replay Library</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {REPLAYS.map(replay => (
                      <div key={replay.id} className="bg-white/90 rounded-xl p-4 border border-sand/30 hover:shadow-md transition-shadow cursor-pointer">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-sand/20 rounded-lg flex items-center justify-center">
                              <Play className="w-6 h-6 text-sage" />
                            </div>
                            <div>
                              <h4 className="font-medium text-olivewood">{replay.title}</h4>
                              <div className="flex items-center gap-3 text-xs text-bark/60">
                                <span>{replay.duration}min</span>
                                <span>{replay.views} views</span>
                              </div>
                            </div>
                          </div>
                          <span className="px-2 py-1 bg-sage/10 text-sage text-xs rounded-full">
                            {replay.impact}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              /* Coach View */
              <div className="space-y-6">
                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white/90 rounded-xl p-6 border border-sand/30">
                    <div className="flex items-center justify-between mb-4">
                      <UserCheck className="w-8 h-8 text-sage" />
                      <span className="text-2xl font-light text-olivewood">{COACH_STATS.attendance}%</span>
                    </div>
                    <h3 className="text-sm font-medium text-bark mb-1">Attendance Rate</h3>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-4 h-4 text-sage" />
                      <span className="text-xs text-sage">+5% this week</span>
                    </div>
                  </div>
                  <div className="bg-white/90 rounded-xl p-6 border border-sand/30">
                    <div className="flex items-center justify-between mb-4">
                      <Activity className="w-8 h-8 text-olive" />
                      <span className="text-2xl font-light text-olivewood">+{COACH_STATS.readinessDelta}</span>
                    </div>
                    <h3 className="text-sm font-medium text-bark mb-1">Avg Readiness Δ</h3>
                    <span className="text-xs text-bark/60">24h post-event</span>
                  </div>
                  <div className="bg-white/90 rounded-xl p-6 border border-sand/30">
                    <div className="flex items-center justify-between mb-4">
                      <CheckCircle className="w-8 h-8 text-bark" />
                      <span className="text-2xl font-light text-olivewood">{COACH_STATS.adherence}%</span>
                    </div>
                    <h3 className="text-sm font-medium text-bark mb-1">Adherence</h3>
                    <span className="text-xs text-bark/60">Protocol completion</span>
                  </div>
                </div>

                {/* Top Events Table */}
                <div className="bg-white/90 rounded-xl border border-sand/30">
                  <div className="p-6 border-b border-sand/30">
                    <h3 className="text-lg font-medium text-olivewood">Top Performing Events</h3>
                  </div>
                  <div className="p-6">
                    <table className="w-full">
                      <thead>
                        <tr className="text-left text-sm text-bark/60 border-b border-sand/20">
                          <th className="pb-3">Event</th>
                          <th className="pb-3">Attendance</th>
                          <th className="pb-3">Readiness Impact</th>
                          <th className="pb-3">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {COACH_STATS.topEvents.map((event, index) => (
                          <tr key={index} className="border-b border-sand/10">
                            <td className="py-4 text-olivewood">{event.name}</td>
                            <td className="py-4">
                              <span className="px-2 py-1 bg-sage/10 text-sage rounded text-sm">
                                {event.attendance}%
                              </span>
                            </td>
                            <td className="py-4 text-bark">{event.impact}</td>
                            <td className="py-4">
                              <button className="text-sage hover:text-bark text-sm">View Roster</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Weekly Trend */}
                <div className="bg-white/90 rounded-xl p-6 border border-sand/30">
                  <h3 className="text-lg font-medium text-olivewood mb-4">Weekly Attendance Trend</h3>
                  <div className="flex items-end gap-2 h-32">
                    {COACH_STATS.weeklyTrend.map((value, index) => (
                      <div key={index} className="flex-1">
                        <div
                          className="bg-sage/80 rounded-t"
                          style={{ height: `${(value / 100) * 128}px` }}
                        />
                        <div className="text-xs text-bark/60 text-center mt-2">
                          {['M', 'T', 'W', 'T', 'F', 'S', 'S'][index]}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* My Schedule */}
            <div className="bg-white/90 rounded-xl p-6 border border-sand/30">
              <h3 className="text-sm uppercase tracking-wider text-bark mb-4">My Schedule</h3>
              <div className="space-y-3">
                {filteredEvents
                  .filter(e => rsvpStatus[e.id] === 'going')
                  .slice(0, 3)
                  .map(event => (
                    <div key={event.id} className="p-3 bg-sand/10 rounded-lg">
                      <div className="font-medium text-olivewood text-sm mb-1">{event.title}</div>
                      <div className="text-xs text-bark/60">
                        {event.startAt.toLocaleDateString('en', { weekday: 'short', month: 'short', day: 'numeric' })} •
                        {event.startAt.toLocaleTimeString('en', { hour: 'numeric', minute: '2-digit' })}
                      </div>
                    </div>
                  ))}
                {!filteredEvents.some(e => rsvpStatus[e.id] === 'going') && (
                  <p className="text-sm text-bark/60 text-center py-4">No upcoming events</p>
                )}
              </div>
            </div>

            {/* Team Spotlight */}
            <div className="bg-gradient-to-br from-sage/20 to-olive/10 rounded-xl p-6 border border-sage/30">
              <h3 className="text-sm uppercase tracking-wider text-bark mb-4">Team Spotlight</h3>
              <div className="mb-4">
                <div className="font-medium text-olivewood mb-1">Next Team Session</div>
                <div className="text-sm text-bark/80">Team Recovery Session</div>
                <div className="text-xs text-bark/60 mt-1">Tomorrow • 4:00 PM</div>
              </div>
              <div className="flex items-center justify-between p-3 bg-white/60 rounded-lg">
                <span className="text-sm text-bark">Team Attendance</span>
                <span className="font-medium text-olivewood">76%</span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white/90 rounded-xl p-6 border border-sand/30">
              <h3 className="text-sm uppercase tracking-wider text-bark mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <button className="w-full px-4 py-2 bg-sage/10 text-sage rounded-lg hover:bg-sage/20 transition-colors text-sm">
                  View All Replays
                </button>
                <button className="w-full px-4 py-2 bg-olive/10 text-olive rounded-lg hover:bg-olive/20 transition-colors text-sm">
                  My Impact History
                </button>
                <button className="w-full px-4 py-2 bg-bark/10 text-bark rounded-lg hover:bg-bark/20 transition-colors text-sm">
                  Calendar Sync
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}