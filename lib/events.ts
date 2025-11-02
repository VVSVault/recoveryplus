import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const eventsDirectory = path.join(process.cwd(), 'content/events');

export interface EventPost {
  slug: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  content: string;
  image?: string;
  capacity?: number;
  price?: number;
}

export function getEventSlugs() {
  if (!fs.existsSync(eventsDirectory)) {
    return [];
  }
  return fs.readdirSync(eventsDirectory).filter(file => file.endsWith('.mdx'));
}

export function getEventBySlug(slug: string): EventPost | null {
  const realSlug = slug.replace(/\.mdx$/, '');
  const fullPath = path.join(eventsDirectory, `${realSlug}.mdx`);
  
  if (!fs.existsSync(fullPath)) {
    return null;
  }
  
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug: realSlug,
    content,
    title: data.title,
    date: data.date,
    time: data.time,
    location: data.location,
    description: data.description,
    image: data.image,
    capacity: data.capacity,
    price: data.price,
  };
}

export function getAllEvents(): EventPost[] {
  const slugs = getEventSlugs();
  const events = slugs
    .map((slug) => getEventBySlug(slug))
    .filter((event): event is EventPost => event !== null)
    .sort((a, b) => (a.date > b.date ? -1 : 1));
  return events;
}