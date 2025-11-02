# RecoveryPlus+ Platform

A cutting-edge wellness and recovery platform built with Next.js, TypeScript, and Tailwind CSS, featuring AI-powered recovery planning and seamless health tech integrations.

## 🚀 Key Features

### Core Wellness Experience
- 🎥 **Immersive Video Experience** - Engaging hero sections with video backgrounds
- 🏃 **Comprehensive Service Catalog** - Active Recovery, Contrast Recovery, Bodywork & Mobility
- 📅 **Smart Event Management** - MDX-powered events system with dynamic routing
- 💳 **Flexible Membership Tiers** - Multiple membership plans with detailed feature matrices

### AI & Technology Integration
- 🤖 **AI Recovery Chatbot** - Integrated OpenAI-powered assistant for personalized recovery plans
- 📊 **Recovery Check-In System** - Smart questionnaire with weighted scoring algorithm
- 📱 **Apple Health Integration** - Direct API connection to sync health metrics
- 🔌 **RESTful API** - Tech-friendly endpoints for third-party integrations
- 📈 **Real-time Analytics** - Track recovery progress and wellness metrics

### User Experience
- 📱 **Fully Responsive Design** - Mobile-first approach optimized for all devices
- 🎨 **Modern Dark Theme** - Elegant dark design with smooth Framer Motion animations
- 📝 **Smart Booking System** - Integrated booking flow with calendar integration
- 🎯 **Personalized Dashboards** - Member-specific recovery tracking and insights
- ✨ **Smooth Animations** - Professional micro-interactions throughout

## 🛠 Tech Stack

### Frontend
- **Framework:** Next.js 15 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Content:** MDX for dynamic content
- **Icons:** Heroicons (optimized inline SVGs)

### Backend & Integrations
- **AI Integration:** OpenAI API (GPT-4)
- **Health Data:** Apple HealthKit API
- **API:** Next.js API Routes
- **Authentication:** Ready for OAuth/JWT implementation
- **Database:** Ready for PostgreSQL/MongoDB integration

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- OpenAI API key (for chatbot functionality)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/VVSVault/recoveryplus.git
   cd recoveryplus
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   ```
   Add your API keys:
   ```
   OPENAI_API_KEY=your_openai_api_key
   NEXT_PUBLIC_API_URL=http://localhost:3000
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000) in your browser**

## 📁 Project Architecture

```
recoveryplus/
├── app/
│   ├── api/
│   │   ├── chatbot/          # AI chatbot endpoint
│   │   └── healthkit/        # Apple Health integration
│   ├── components/
│   │   ├── RecoveryPlanChatbot.tsx   # AI assistant UI
│   │   ├── RecoveryCheckIn*.tsx      # Check-in system
│   │   ├── HealthKitConnect.tsx      # Health data sync
│   │   └── tiers/            # Membership components
│   ├── services/             # Service pages
│   ├── events/               # Events/blog pages
│   ├── dashboard/            # Member dashboard
│   └── page.tsx              # Homepage
├── api/
│   └── openapi.yaml          # API documentation
├── config/
│   └── readiness/
│       └── weights.v1.json   # Recovery scoring algorithm
├── content/
│   └── events/               # MDX event content
├── lib/
│   ├── config.ts             # Site configuration
│   ├── events.ts             # Event utilities
│   └── placeholder.ts        # Development utilities
├── public/
│   ├── images/               # Optimized images
│   └── videos/               # Video assets
├── docs/                     # Documentation
└── types/                    # TypeScript definitions
```

## 🔌 API Endpoints

### Chatbot API
```typescript
POST /api/chatbot
{
  "message": "string",
  "context": "recovery" | "wellness" | "general"
}
```

### HealthKit Integration
```typescript
POST /api/healthkit/connect
{
  "userId": "string",
  "healthData": {...}
}
```

## 🎯 Key Components

### AI Recovery Chatbot
- Personalized recovery recommendations
- Natural language processing
- Context-aware responses
- Integration with member profiles

### Recovery Check-In System
- Weighted scoring algorithm
- Progress tracking
- Customizable questionnaires
- Data visualization

### Apple Health Integration
- Automatic data sync
- Privacy-first approach
- Real-time updates
- Comprehensive metrics tracking

## 🚢 Deployment

### Vercel (Recommended)
```bash
npm run build
vercel deploy
```

### Docker
```bash
docker build -t recoveryplus .
docker run -p 3000:3000 recoveryplus
```

### Environment Variables
Required for production:
- `OPENAI_API_KEY` - OpenAI API access
- `APPLE_HEALTHKIT_KEY` - Apple Health credentials
- `DATABASE_URL` - Database connection string
- `NEXT_PUBLIC_API_URL` - API endpoint URL

## 📈 Performance Optimizations

- **Static Generation** - Pre-rendered pages where possible
- **Image Optimization** - Next.js Image with lazy loading
- **Code Splitting** - Automatic route-based splitting
- **API Caching** - Smart caching strategies
- **Bundle Optimization** - Minimal JavaScript footprint
- **Edge Functions** - Distributed API endpoints

## 🔮 Roadmap

### Phase 1 - Current
- ✅ Core wellness platform
- ✅ AI chatbot integration
- ✅ Apple Health connection
- ✅ Membership system
- ✅ Event management

### Phase 2 - Q2 2025
- [ ] Wearable device integrations (Fitbit, Garmin, Whoop)
- [ ] Advanced analytics dashboard
- [ ] Mobile app (React Native)
- [ ] Payment processing
- [ ] Multi-location support

### Phase 3 - Q3 2025
- [ ] Machine learning recovery predictions
- [ ] Community features
- [ ] Practitioner portal
- [ ] White-label solution
- [ ] Advanced API marketplace

## 🧪 Testing

```bash
# Run unit tests
npm run test

# Run e2e tests
npm run test:e2e

# Run API tests
npm run test:api
```

## 📚 Documentation

- [API Documentation](./docs/api-usage.md)
- [Development Guide](./docs/next-steps.md)
- [Architecture Decisions](./docs/assumptions.md)
- [Contributing Guide](./CONTRIBUTING.md)

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](./CONTRIBUTING.md) for details.

## 📄 License

© 2025 RecoveryPlus+. All rights reserved.

---

**Built with ❤️ for the wellness community**

For support: support@recoveryplus.com | [Documentation](https://docs.recoveryplus.com)