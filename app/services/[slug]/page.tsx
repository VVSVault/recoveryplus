import { notFound } from 'next/navigation';
import { services } from '@/lib/config';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';

type ServicePageParams = Promise<{ slug: string }>

export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: { params: ServicePageParams }): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  
  if (!service) {
    return {
      title: 'Service Not Found',
    };
  }

  return {
    title: service.title,
    description: service.description,
  };
}

export default async function ServicePage({ params }: { params: ServicePageParams }) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  return (
    <div className="min-h-screen pt-20">
      <section className="relative py-20 bg-gradient-to-b from-dark-900 to-black">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {service.title}
            </h1>
            <p className="text-xl text-gray-400">
              {service.shortDescription}
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">About This Service</h2>
              <p className="text-lg text-gray-300 mb-8">
                {service.description}
              </p>
              
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold mb-4">What's Included:</h3>
                <ul className="space-y-3">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <svg
                        className="w-6 h-6 text-primary-500 mr-3 flex-shrink-0 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link href="#booking" className="btn-primary">
                  Book {service.title}
                </Link>
                <Link href="/contact" className="btn-secondary">
                  Have Questions?
                </Link>
              </div>
            </div>

            <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-dark-900">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Start Your Recovery Journey?</h2>
            <p className="text-lg text-gray-400 mb-8">
              Experience the benefits of {service.title} and take your wellness to the next level.
            </p>
            <Link href="#booking" className="btn-primary">
              Book Your Session Now
            </Link>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Explore Other Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services
              .filter((s) => s.id !== service.id)
              .map((otherService) => (
                <Link
                  key={otherService.id}
                  href={`/services/${otherService.slug}`}
                  className="card group"
                >
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary-500 transition-colors">
                    {otherService.title}
                  </h3>
                  <p className="text-gray-400">
                    {otherService.shortDescription}
                  </p>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}