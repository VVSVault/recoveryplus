# Recovery Plus Backend API Usage Guide

## Quick Start

### 1. Prerequisites
- Node.js 18+
- Docker & Docker Compose
- npm or yarn

### 2. Environment Setup

```bash
# Copy environment template
cp .env.example .env

# Edit .env with your values
# Key variables to set:
# - JWT_SECRET (generate a secure random string)
# - WEBHOOK_TOKEN (for Apple Health ingestion)
```

### 3. Start Infrastructure

```bash
# Start Postgres and Redis
docker-compose up -d

# Verify services are running
docker-compose ps
```

### 4. Install Dependencies

```bash
npm install
```

### 5. Database Setup

```bash
# Generate Prisma client
npm run db:generate

# Run migrations
npm run db:migrate

# Seed database with test data
npm run seed
```

### 6. Start Server

```bash
# Development mode with hot reload
npm run dev

# Production mode
npm run build && npm start
```

Server will be available at `http://localhost:3000`

## Authentication

All API endpoints (except auth and health) require JWT authentication.

### Register New User

```bash
curl -X POST http://localhost:3000/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "securepassword",
    "name": "Test User",
    "sport": "RUNNING",
    "timezone": "America/Los_Angeles"
  }'
```

### Login

```bash
curl -X POST http://localhost:3000/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "athlete123"
  }'
```

Response:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "clxxx",
    "email": "john@example.com",
    "name": "John Runner",
    "role": "ATHLETE",
    "sport": "RUNNING",
    "timezone": "America/Los_Angeles"
  }
}
```

Use the token in subsequent requests:
```bash
-H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Core API Endpoints

### Dashboard Snapshot

Get current readiness and key metrics:

```bash
curl http://localhost:3000/v1/dashboard/snapshot \
  -H "Authorization: Bearer YOUR_TOKEN"
```

Response:
```json
{
  "apiVersion": "1.0",
  "date": "2025-09-20",
  "readiness": {
    "score": 72,
    "delta7d": 6,
    "version": "v1.0"
  },
  "keyMetrics": {
    "hrvMs": 66,
    "sleepH": 7.2,
    "rhrBpm": 54,
    "load": 420
  },
  "flags": ["HRV below baseline", "Soreness elevated"],
  "todayPrescription": [
    {
      "protocolId": "mob_lower_10",
      "title": "Lower Body Mobility",
      "durationMin": 10
    }
  ],
  "surveyPromptPending": true
}
```

### Submit Session Survey

Record post-workout subjective metrics:

```bash
curl -X POST http://localhost:3000/v1/surveys/session \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "sessionAt": "2025-09-20T17:30:00Z",
    "stiffness": 7,
    "soreness": 6,
    "mentalReset": 4,
    "notes": "Hamstrings tight after intervals"
  }'
```

### Get Today's Prescriptions

```bash
curl http://localhost:3000/v1/prescriptions/today \
  -H "Authorization: Bearer YOUR_TOKEN"
```

Response:
```json
{
  "date": "2025-09-20",
  "protocols": [
    {
      "id": "mob_lower_10",
      "title": "Lower Body Mobility",
      "durationMin": 10,
      "steps": [
        "90/90 hip switches - 2 minutes",
        "Couch stretch - 2 minutes per side",
        "Ankle dorsiflexion - 2 minutes"
      ],
      "tags": ["mobility", "recovery"]
    }
  ],
  "rationale": {
    "ruleIds": ["Low_HRV_High_Stiffness"],
    "keyInputs": {
      "hrvDeltaPct": -12,
      "stiffness": 7,
      "sleepH": 6.3
    }
  }
}
```

### Get Trends Data

```bash
curl "http://localhost:3000/v1/dashboard/trends?from=2025-09-01&to=2025-09-20" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## Data Ingestion

### Apple Health Webhook

Ingest normalized health data (requires webhook token):

```bash
curl -X POST http://localhost:3000/v1/ingest/apple-health \
  -H "X-Webhook-Token: YOUR_WEBHOOK_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "USER_ID",
    "timestamp": "2025-09-20T08:00:00Z",
    "metrics": [
      {
        "kind": "HRV",
        "value": 65,
        "unit": "ms",
        "date": "2025-09-20"
      },
      {
        "kind": "SLEEP_DURATION",
        "value": 7.5,
        "unit": "hours",
        "date": "2025-09-20"
      },
      {
        "kind": "RHR",
        "value": 52,
        "unit": "bpm",
        "date": "2025-09-20"
      }
    ]
  }'
```

## Admin Endpoints

Admin role required for these endpoints.

### Manage Protocols

```bash
# List protocols
curl http://localhost:3000/v1/admin/protocols \
  -H "Authorization: Bearer ADMIN_TOKEN"

# Create protocol
curl -X POST http://localhost:3000/v1/admin/protocols \
  -H "Authorization: Bearer ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "New Recovery Protocol",
    "steps": ["Step 1", "Step 2"],
    "durationMin": 15,
    "tags": ["recovery"]
  }'
```

### Manage Rules

```bash
# List rules
curl http://localhost:3000/v1/admin/rules \
  -H "Authorization: Bearer ADMIN_TOKEN"

# Update rule
curl -X PUT http://localhost:3000/v1/admin/rules/RULE_ID \
  -H "Authorization: Bearer ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "enabled": false
  }'
```

### Feature Flags

```bash
# Get flags
curl http://localhost:3000/v1/admin/flags \
  -H "Authorization: Bearer ADMIN_TOKEN"

# Update flags
curl -X PUT http://localhost:3000/v1/admin/flags \
  -H "Authorization: Bearer ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "ENABLE_PRESCRIPTIONS": true,
    "ENABLE_NOTIFICATIONS": false
  }'
```

## Test Accounts

After running `npm run seed`, these accounts are available:

| Email | Password | Role | Notes |
|-------|----------|------|-------|
| admin@recoveryplus.io | admin123 | ADMIN | Full system access |
| john@example.com | athlete123 | ATHLETE | 14 days of sample data |
| sarah@example.com | athlete123 | ATHLETE | No sample data |

## Monitoring

### Health Check

```bash
curl http://localhost:3000/health
```

### Redis Commander

View job queues and cache:
```
http://localhost:8081
```

### Logs

Structured JSON logs are output to stdout. In development, they're prettified.

```bash
# View logs
docker-compose logs -f

# Filter by module
npm run dev | grep "module\":\"readiness"
```

## Troubleshooting

### Database Connection Issues

```bash
# Check if Postgres is running
docker-compose ps

# Test connection
docker exec -it recoveryplus-postgres psql -U postgres -d recoveryplus -c "SELECT 1"

# Reset database
npm run db:push --force
```

### Redis Connection Issues

```bash
# Check if Redis is running
docker exec -it recoveryplus-redis redis-cli ping
```

### Clear All Data

```bash
# Stop services
docker-compose down

# Remove volumes (WARNING: Deletes all data)
docker-compose down -v

# Restart and reseed
docker-compose up -d
npm run db:push
npm run seed
```

## API Documentation

Full OpenAPI specification available at `/api/openapi.yaml`

To view in Swagger UI, you can use:
```bash
npx @redocly/openapi-cli preview-docs api/openapi.yaml
```