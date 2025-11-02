export interface Service {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  image: string;
  features: string[];
  category: 'active' | 'contrast' | 'bodywork';
  slug: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  image?: string;
  slug: string;
  capacity?: number;
  price?: number;
}

export interface NavItem {
  label: string;
  href: string;
  isButton?: boolean;
  isReserve?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  text: string;
  role?: string;
  image?: string;
}