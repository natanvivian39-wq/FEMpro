/** Shared frontend domain types. Keep in sync with docs/backend-contract.md. */
export type AppointmentStatus = 'confirmed' | 'pending' | 'cancelled';
export type AppointmentFilter = 'all' | AppointmentStatus;

export interface Professional {
  id: string;
  displayName: string;
  profession: string;
  avatarUrl?: string | null;
  slug: string;
  publicPageUrl: string;
}

export interface Appointment {
  id: string;
  customerName: string;
  serviceName: string;
  startsAt: string; // ISO-8601 with timezone
  status: AppointmentStatus;
  customerAvatarUrl?: string | null;
  customerPhone?: string;
  notes?: string;
}

export interface DashboardMetrics {
  linkClicks: number;
  bookings: number;
  profileViews: number;
  averageRating: number | null;
  comparisons: { linkClicks: number; bookings: number; profileViews: number };
}

export interface PublicProfileDraft {
  displayName: string;
  profession: string;
  bio: string;
  slug: string;
  phone: string;
  instagram: string;
  location: string;
}

export interface ServiceItem {
  id: string;
  name: string;
  durationMinutes: number;
  priceCents: number;
  isActive: boolean;
}
