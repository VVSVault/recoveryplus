# RecoveryPlus+ Website

A modern wellness and recovery center website built with Next.js, TypeScript, and Tailwind CSS, inspired by Remedy Place's design aesthetic.

## Features

- 🎥 **Video Hero Section** - Engaging hero with video background (placeholder for development)
- 🏃 **Service Pages** - Detailed pages for Active Recovery, Contrast Recovery, and Bodywork & Mobility
- 📅 **Events System** - MDX-powered blog/events with dynamic routing
- 📱 **Fully Responsive** - Mobile-first design that looks great on all devices
- 🎨 **Modern Dark Theme** - Elegant dark design with smooth animations
- 📝 **Booking System** - Integrated booking form (ready for third-party integration)
- 💳 **Membership Plans** - Tiered membership options with pricing
- ✨ **Smooth Animations** - Framer Motion animations throughout

## Tech Stack

- **Framework:** Next.js 15 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Content:** MDX for blog/events
- **Icons:** Heroicons (inline SVGs)

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Open [http://localhost:3000](http://localhost:3000) in your browser**

## Project Structure

```
recoveryplus/
├── app/
│   ├── components/        # Reusable components
│   ├── services/         # Service pages
│   ├── events/           # Events/blog pages
│   ├── membership/       # Membership page
│   ├── contact/          # Contact page
│   └── page.tsx          # Homepage
├── content/
│   └── events/           # MDX event files
├── lib/
│   ├── config.ts         # Site configuration
│   ├── events.ts         # Event utilities
│   └── placeholder.ts    # Placeholder utilities
├── public/
│   ├── images/           # Image assets
│   └── videos/           # Video assets
└── types/                # TypeScript types
```

## Content Management

### Adding Events

Create a new MDX file in `content/events/`:

```mdx
---
title: "Event Title"
date: "2025-08-15"
time: "6:00 PM"
location: "RecoveryPlus Studio"
description: "Brief description"
capacity: 20
price: 50
---

Event content in markdown...
```

### Updating Services

Edit the services array in `lib/config.ts` to modify service offerings.

## Customization

### Colors

Update the color palette in `tailwind.config.ts`:
- Primary colors: Orange/coral theme
- Dark colors: Background shades

### Content

- Site info: `lib/config.ts`
- Navigation: `lib/config.ts`
- Services: `lib/config.ts`

## Deployment

The site is optimized for deployment on Vercel:

```bash
npm run build
```

For other platforms, ensure Node.js 18+ is available.

## Future Enhancements

- [ ] Real video assets for hero section
- [ ] Integrate with booking system (Calendly, Acuity, etc.)
- [ ] Add image gallery for services
- [ ] Implement newsletter signup
- [ ] Add testimonials section
- [ ] Create admin panel for content management
- [ ] Add SEO optimizations
- [ ] Implement analytics

## Performance

The site is optimized for performance with:
- Static generation where possible
- Image optimization with Next.js Image
- Code splitting
- Minimal JavaScript bundle
- Efficient animations

## License

© 2025 RecoveryPlus+. All rights reserved.