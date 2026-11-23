# FEMpro Frontend ↔ Backend Handoff

This frontend intentionally separates presentation, domain types, and API calls. Backend integration should preserve the typed contracts in `src/types/domain.ts` and the API boundary in `src/services/api.ts`.

## Environment
- `VITE_API_BASE_URL`: API origin (e.g. `https://api.example.com`)
- Browser requests use `credentials: 'include'` in the shared request helper; choose cookie/session or token auth and adjust centrally.
- All appointment timestamps are ISO-8601 including timezone. UI localizes display.
- Prices are integer cents (`priceCents`) in the frontend contract.

## Suggested endpoints

| Method | Endpoint | Contract / purpose |
|---|---|---|
| GET | `/v1/me` | Current authenticated professional profile summary |
| GET | `/v1/dashboard/metrics` | `DashboardMetrics` for current professional and selected period |
| GET | `/v1/appointments` | Current professional appointments; allow date range/status query params |
| PATCH | `/v1/appointments/{id}` | Update status; body `{ status }` |
| GET | `/v1/profile` | Profile draft/public profile fields |
| PUT | `/v1/profile` | Update profile draft |
| GET | `/v1/profile/services` | Services and prices |
| POST | `/v1/profile/services` | Create service |
| PATCH | `/v1/profile/services/{id}` | Update service / active state |
| DELETE | `/v1/profile/services/{id}` | Remove service (prefer soft-delete if bookings reference it) |

## Type expectations

- `Professional`: `id`, `displayName`, `profession`, optional `avatarUrl`, `slug`, `publicPageUrl`
- `Appointment`: `id`, `customerName`, `serviceName`, `startsAt`, `status`, optional customer contact/avatar/notes
- Status enum: `confirmed | pending | cancelled`
- `DashboardMetrics`: link clicks, bookings, profile views, optional average rating, percentage comparisons
- `PublicProfileDraft`: display name, profession, bio, slug, phone, Instagram, location
- `ServiceItem`: id, name, duration in minutes, price in cents, active state

## Recommended backend responsibilities
1. Authentication, session/token lifecycle, and authorization by professional ID.
2. Enforce ownership on all profile, service, appointment, and metrics requests. Frontend must not be trusted for permissions.
3. Validate slug uniqueness and reserved slugs; return a field-level validation error for conflicts.
4. Booking flow should validate availability server-side and prevent double booking with transaction/locking.
5. Keep appointment status transitions server-defined and audit status changes.
6. Send notifications (email/WhatsApp/push) from server-side jobs, not the browser.
7. Use pagination for appointment lists and date/status filters; provide stable sorting.
8. Return consistent errors, ideally `{ code, message, details? }`.
9. Store timestamps in UTC; return timezone-aware ISO strings and retain the professional's timezone setting.
10. Upload images through a signed-upload flow or dedicated endpoint; avoid embedding image blobs in profile JSON.

## Integration checklist
- [ ] Agree API base URL and auth strategy
- [ ] Implement session/auth endpoints and protected routes
- [ ] Replace mock service functions with API calls
- [ ] Add loading, error, and empty states to each page
- [ ] Define booking cancellation/reschedule rules
- [ ] Define profile/service validation and public booking slug behavior
- [ ] Add pagination and date filters to appointments
- [ ] Wire live updates (polling, SSE, or WebSocket) for appointment status and new bookings
- [ ] Add tests for API client and booking edge cases
