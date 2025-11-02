import { notFound } from 'next/navigation';
import { getEventBySlug, getAllEvents } from '@/lib/events';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import type { Metadata } from 'next';

type EventPageParams = Promise<{ slug: string }>

export async function generateStaticParams() {
  const events = getAllEvents();
  return events.map((event) => ({
    slug: event.slug,
  }));
}

export async function generateMetadata({ params }: { params: EventPageParams }): Promise<Metadata> {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  
  if (!event) {
    return {
      title: 'Event Not Found',
    };
  }

  return {
    title: event.title,
    description: event.description,
  };
}

export default async function EventPage({ params }: { params: EventPageParams }) {
  const { slug } = await params;
  const event = getEventBySlug(slug);

  if (!event) {
    notFound();
  }

  return (
    <div className="min-h-screen pt-20">
      <section className="section-padding bg-gradient-to-b from-dark-900 to-black">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <Link 
              href="/events"
              className="inline-flex items-center text-gray-400 hover:text-white transition-colors mb-6"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Events
            </Link>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {event.title}
            </h1>
            
            <div className="flex flex-wrap gap-6 text-lg text-gray-300">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {new Date(event.date).toLocaleDateString('en-US', { 
                  weekday: 'long',
                  month: 'long', 
                  day: 'numeric',
                  year: 'numeric'
                })}
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {event.time}
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {event.location}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-invert prose-lg max-w-none mb-12">
              <MDXRemote source={event.content} />
            </div>

            <div className="bg-card border border-border rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-6">Event Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {event.price && (
                  <div>
                    <h3 className="font-semibold text-gray-400 mb-2">Price</h3>
                    <p className="text-xl">${event.price}</p>
                  </div>
                )}
                {event.capacity && (
                  <div>
                    <h3 className="font-semibold text-gray-400 mb-2">Available Spots</h3>
                    <p className="text-xl">{event.capacity} spots remaining</p>
                  </div>
                )}
                <div className="md:col-span-2">
                  <Link href="#booking" className="btn-primary w-full md:w-auto">
                    Reserve Your Spot
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-dark-900">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">More Upcoming Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {getAllEvents()
              .filter((e) => e.slug !== event.slug)
              .slice(0, 3)
              .map((otherEvent) => (
                <Link
                  key={otherEvent.slug}
                  href={`/events/${otherEvent.slug}`}
                  className="card group"
                >
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary-500 transition-colors">
                    {otherEvent.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-2">
                    {new Date(otherEvent.date).toLocaleDateString('en-US', { 
                      month: 'long', 
                      day: 'numeric'
                    })} at {otherEvent.time}
                  </p>
                  <p className="text-gray-300 line-clamp-2">
                    {otherEvent.description}
                  </p>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}