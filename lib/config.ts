export const siteConfig = {
  name: 'RecoveryPlus+',
  description: 'A Wellness Collective – crafted to adapt, refined for your wellness',
  url: 'https://recoveryplus.life',
  tagline: 'A Wellness Collective – crafted to adapt, refined for your wellness',
  contact: {
    email: 'hello@recoveryplus.life',
    phone: '+1 (555) 123-4567',
    address: 'Lexington, KY'
  },
  social: {
    instagram: 'https://instagram.com/recoverypluslife',
    facebook: 'https://facebook.com/recoverypluslife',
    twitter: 'https://twitter.com/recoverypluslife'
  }
};

export const services = [
  {
    id: 'active-recovery',
    title: 'Active Recovery',
    shortDescription: 'A full spectrum of personal active recovery experiences',
    description: 'Experience personalized recovery sessions in a collective environment. Our Active Recovery program combines cutting-edge techniques to help your body recover faster and perform better.',
    image: '/images/active-recovery.jpg',
    features: [
      'Breath-work sessions',
      'Guided Recovery programs',
      'Percussive Stimulation therapy',
      'Dynamic Movement patterns',
      'Foam Rolling techniques',
      'Compression Therapy'
    ],
    category: 'active' as const,
    slug: 'active-recovery'
  },
  {
    id: 'contrast-recovery',
    title: 'Contrast Recovery',
    shortDescription: 'Temperature therapy for optimal recovery',
    description: 'Harness the power of temperature contrast with our state-of-the-art sauna and ice bath facilities. This ancient practice, modernized for today\'s wellness enthusiast.',
    image: '/images/contrast-recovery.jpg',
    features: [
      'Infrared Sauna sessions',
      'Ice Bath immersion',
      'Guided contrast protocols',
      'Temperature cycling programs',
      'Recovery monitoring',
      'Hydration support'
    ],
    category: 'contrast' as const,
    slug: 'contrast-recovery'
  },
  {
    id: 'bodywork-mobility',
    title: 'Bodywork & Mobility',
    shortDescription: 'Professional bodywork for enhanced mobility',
    description: 'Our expert practitioners provide targeted bodywork and mobility sessions designed to improve your range of motion, reduce pain, and enhance overall performance.',
    image: '/images/bodywork-mobility.jpg',
    features: [
      'Deep tissue massage',
      'Myofascial release',
      'Assisted stretching',
      'Mobility assessments',
      'Corrective exercises',
      'Recovery planning'
    ],
    category: 'bodywork' as const,
    slug: 'bodywork-mobility'
  }
];

export const navigation = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Pricing', href: '/tiers' },
  { label: 'Events', href: '/events' },
  { label: 'Contact', href: '/contact' },
  { label: 'Dashboard', href: '/dashboard', isNew: true },
  { label: 'Reserve', href: '#booking', isButton: true, isReserve: true, homeOnly: true }
];