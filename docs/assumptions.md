# Recovery Plus - Assumptions & Constraints

## Current Assumptions (MVP)

### Data Ingestion
- **Apple Health data arrives normalized**: We assume a future iOS app sends standardized JSON payloads to our webhook endpoint
- **Metrics are daily aggregates**: HRV, RHR are morning values; Sleep is previous night; Load is cumulative daily
- **Time zones handled client-side**: All timestamps arrive in UTC with timezone metadata
- **Sync frequency**: Expecting 1-4 syncs per day, not real-time streaming

### User Model
- **Single athlete initially**: No team/coach features active, but data model supports it
- **One account per athlete**: No family/shared device scenarios
- **Email-based auth**: No social login, phone auth, or passwordless in MVP

### Scoring Algorithm
- **7-day baseline minimum**: Need 7 days of data for meaningful z-scores
- **Linear weighted model**: No ML, no non-linear interactions between factors
- **Population norms not used**: All scoring relative to individual baseline, not cohort
- **Single daily score**: Not intraday variability or multiple readiness scores

### Prescriptions
- **Rule-based only**: No AI/LLM generation, no personalization beyond rules
- **Protocol library static**: Admin-editable but not user-customizable
- **No equipment tracking**: Assume athlete has access to prescribed equipment
- **No progression logic**: Each day evaluated independently, no periodization

### Surveys
- **Self-reported honesty**: No validation against objective metrics
- **Post-session timing**: Assume submitted within 6 hours of session
- **Single session per day**: Not handling multiple workouts/day initially

### Integration Points
- **No wearable direct integration**: All data flows through Apple Health or manual entry
- **No calendar integration**: Don't know planned workouts or travel
- **No weather/environment data**: Not adjusting for heat, altitude, air quality
- **No injury tracking**: Soreness ≠ injury, no injury-specific protocols

### Privacy & Security
- **Not HIPAA compliant yet**: Structure supports it but not certified
- **EU users excluded**: No GDPR compliance in MVP
- **No data sharing**: Each user's data siloed, no aggregate insights
- **Soft delete only**: Data marked deleted but retained for recovery

### Performance & Scale
- **<1000 users**: Optimizing for correctness over scale initially
- **Single region**: No geo-distribution, assume US-based users
- **Batch processing OK**: Not optimizing for real-time, 1-5 min delay acceptable
- **No offline mode**: Requires internet connection for all operations

### Business Model
- **No payment processing**: Assuming free tier or external billing
- **No usage limits**: Not tracking API calls or storage quotas
- **No white-labeling**: Single branded experience
- **No freemium features**: All features available to all users

## Constraints to Revisit

### Phase 2 (3 months)
- Add coach dashboard and multi-athlete views
- Integrate Garmin, Whoop, Oura directly
- Implement ML readiness model with interpretability
- Add progression logic to prescriptions
- Enable real-time notifications

### Phase 3 (6 months)
- HIPAA compliance and BAA support
- Multi-region deployment with data residency
- Offline-first mobile experience
- Integration with training planning software
- Advanced analytics and cohort insights

### Phase 4 (12 months)
- White-label platform capabilities
- Marketplace for protocol contributors
- Research portal with anonymized data
- AI-assisted prescription customization
- Predictive injury risk modeling

## Critical Dependencies

1. **iOS app for Apple Health**: Without this, need alternative ingestion
2. **Redis for job queue**: If unavailable, need in-memory fallback
3. **Postgres for persistence**: No fallback, required for operation
4. **Email service for auth**: Need provider selection before launch
5. **Monitoring service**: Console logging only until vendor selected

## Decisions Requiring Product Input

1. How to handle multiple workouts per day?
2. Should coaches be able to override prescriptions?
3. What's the minimum data staleness acceptable?
4. How long to retain deleted user data?
5. Should we support manual metric entry?
6. What's the target prescription completion rate?
7. How to handle conflicting protocols (e.g., rest vs. prescribed)?
8. Should historical scores be recomputed with new algorithms?

## Technical Debt Acknowledged

- No database migrations strategy (using Prisma push initially)
- No API versioning strategy beyond version field
- No cache layer (Redis for jobs only, not caching)
- No rate limiting or DDoS protection
- No automated backups configured
- No CI/CD pipeline defined
- Limited test coverage initially (~60% target)
- No load testing performed
- No security audit conducted
- No dependency vulnerability scanning

Last Updated: 2025-09-20