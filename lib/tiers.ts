export type RecoveryTier = {
  id: string;
  name: string;
  tagline: string;
  price: number;
  period: string; // e.g., 'per day' or 'month'
  sessions?: string;
  description: string;
  image: string;
  features: string[];
  cta: string;
  color: string;
  popular?: boolean;
};

export const tiers: RecoveryTier[] = [
  {
    id: 'day-pass',
    name: 'Day Pass',
    tagline: 'Try us out',
    price: 49.99,
    period: 'per day',
    description: 'One 30-minute session with full access to all amenities for the day',
    image: '/images/tier-daypass.jpg',
    features: [
      'One 30-minute recovery session',
      'Full access to all amenities for the day',
      'No commitment required',
      'Perfect for first-time visitors'
    ],
    cta: 'Book Day Pass',
    color: 'from-sand/20 to-sand/10'
  },
  {
    id: 'core',
    name: 'Core Recovery',
    tagline: 'Build your routine',
    price: 114.99,
    period: 'month',
    sessions: '4 recovery sessions',
    description: 'Ideal for casual movers, weekend warriors, and those looking to maintain general recovery',
    image: '/images/tier-core.jpg',
    features: [
      '4 recovery sessions per month (up to 45 minutes each)',
      'Unlimited access to recovery equipment during business hours',
      'Mix and match services',
      'Book up to 48 hours in advance',
      'Access to member events'
    ],
    cta: 'Start Core',
    color: 'from-olive/20 to-olive/10'
  },
  {
    id: 'pro',
    name: 'Pro Recovery',
    tagline: 'Commit to wellness',
    price: 224.99,
    period: 'month',
    sessions: '8 recovery sessions',
    description: 'For athletes, runners, or fitness enthusiasts with regular training routines',
    image: '/images/tier-pro.jpg',
    features: [
      '8 recovery sessions per month (up to 45 minutes each)',
      'Unlimited access to recovery equipment during business hours',
      'Personalized recovery plan',
      'Monthly one-on-one progress check-ins',
      'Priority booking (72 hours)',
      '15% off additional sessions',
      'Exclusive workshops'
    ],
    popular: true,
    cta: 'Go Pro',
    color: 'from-sage/20 to-sage/10'
  },
  {
    id: 'elite',
    name: 'Elite Recovery',
    tagline: 'Maximum performance',
    price: 350.99,
    period: 'month',
    sessions: '12 recovery sessions',
    description: 'For competitive athletes, professionals, and high-performers needing advanced support',
    image: '/images/tier-elite.jpg',
    features: [
      '12 recovery sessions per month (up to 45 minutes each)',
      'Unlimited access to recovery equipment during business hours',
      'Personalized recovery plan',
      'Monthly one-on-one progress check-ins',
      '3 free guest passes per month',
      '3 mobile 30-minute sessions',
      'Unlimited access to RecoveryPlus classes (Yoga, breathwork)',
      'Advanced booking (1 week)',
      '20% off retail products',
      'VIP event access'
    ],
    cta: 'Go Elite',
    color: 'from-bark/20 to-bark/10'
  }
];

