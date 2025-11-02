# Socratic Log - Recovery Plus Backend

## Initial Architecture Decisions (2025-09-20)

### Q: What are the UI data needs for the first dashboard?
**A:** The dashboard needs:
- Real-time readiness score with trend indicator
- Key metrics at a glance (HRV, Sleep, RHR, Load)
- Today's prescriptions with clear actions
- Visual flags for concerning patterns
- Survey prompt status to drive engagement

**Decision:** Contract-first approach with typed DTOs ensures UI receives predictable shapes. All responses include `apiVersion` for forward compatibility.

### Q: Where can noise overwhelm signal in the data?
**A:** Key noise sources:
1. Single-day HRV spikes (illness, alcohol)
2. Incomplete sleep data (naps not tracked)
3. Load calculation without context (different sports)
4. Survey timing variance (morning vs evening)

**Decision:** Use 7-day rolling baselines, z-score normalization, and configurable sport-specific weights. Store raw + normalized values for future ML training.

### Q: How to handle missing metrics gracefully?
**A:** Three-tier degradation:
1. If <3 days of baseline: Show "Building baseline" message
2. If partial metrics today: Compute with available, note gaps
3. If critical metric missing (HRV/Sleep): Use last known + decay confidence

**Decision:** Always return a response, never fail silently. Include `confidence` field when score is estimated.

### Q: What's the smallest valuable slice for MVP?
**A:** Core loop: Ingest → Score → Prescribe
- Can run with synthetic data
- Single user (athlete) focus
- Rule-based prescriptions (no ML)
- Manual survey input
- No real-time notifications

**Decision:** Build for multi-tenant from day 1, but activate single-user mode. Use feature flags for progressive rollout.

### Q: How to ensure prescription rationale is explainable?
**A:** Every prescription stores:
- Rule IDs that triggered
- Input values at decision time
- Weight version used
- Timestamp of computation

**Decision:** Immutable audit trail via append-only prescription records. Never update, only create new.

## Data Model Choices

### Q: Why separate MetricSample from ReadinessScore?
**A:** Separation of concerns:
- MetricSample: Raw, immutable, source-attributed
- ReadinessScore: Derived, versioned, recomputable

This allows reprocessing historical data with new algorithms without losing original inputs.

### Q: How to handle coach access patterns later?
**A:** Built-in from start:
- userId on all entities
- TeamId optional on User
- CoachLink junction table (inactive initially)
- Row-level security ready in Prisma

**Decision:** RBAC with explicit permissions. Coaches can't write athlete data, only read + prescribe.

## Technical Stack Rationale

### Q: Why Fastify over Express?
**A:** Performance + schema validation:
- 2x faster than Express in benchmarks
- Built-in schema validation (pairs with Zod)
- Native TypeScript support
- Smaller memory footprint for job workers

### Q: Why BullMQ over native Node?
**A:** Robustness requirements:
- Retry logic with exponential backoff
- Job persistence across restarts
- Distributed locking for idempotency
- Observable job states for debugging

### Q: Why structured logs from day 1?
**A:** Observability is not optional:
- Every decision must be traceable
- Performance bottlenecks need identification
- User issues need rapid diagnosis
- Compliance may require audit trails

**Decision:** OpenTelemetry standard with console exporter initially, vendor-agnostic.

## Deferred Decisions

1. **ML Readiness v2:** Current weighted model is deterministic and explainable. ML can come after gathering training data.

2. **Real-time sync:** Currently pull-based via webhooks. WebSocket/SSE can be added for live updates.

3. **Notification delivery:** Logging "would-send" payloads. Actual delivery (email/SMS/push) deferred to avoid vendor lock-in early.

4. **Payment/subscriptions:** No billing logic in MVP. Clean separation allows adding later without refactor.

5. **HIPAA compliance:** Structure supports it (encryption, audit logs) but not certified. Can add BAA-compliant storage later.

## Risk Mitigations

### R: Apple Health data delays
**M:** Store lastSyncAt, show staleness indicator, allow manual trigger

### R: Prescription not followed
**M:** Track "acknowledged" vs "completed", adjust future prescriptions based on adherence

### R: Survey fatigue
**M:** Start with post-session only, add daily as opt-in, use smart prompting based on activity detection

### R: Weight tuning complexity
**M:** Start with sport-based presets, expose advanced tuning only for coaches/researchers