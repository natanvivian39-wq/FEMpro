/** API boundary: replace mock implementations with HTTP calls without changing UI components. */
import type { Appointment, DashboardMetrics, Professional, PublicProfileDraft, ServiceItem } from '../types/domain';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '';
export const apiConfig = { baseUrl: API_BASE_URL, mode: API_BASE_URL ? 'http' : 'mock' } as const;

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: { 'Content-Type': 'application/json', ...init?.headers },
    credentials: 'include',
  });
  if (!response.ok) throw new Error(`API error ${response.status}`);
  if (response.status === 204) return undefined as T;
  return response.json() as Promise<T>;
}

const mockProfessional: Professional = {
  id: 'prof_demo_01', displayName: 'Ana Beatriz', profession: 'Manicure & Designer',
  slug: 'ana-beatriz', publicPageUrl: 'https://fempro.com.br/ana-beatriz',
};
const mockMetrics: DashboardMetrics = {
  linkClicks: 12, bookings: 8, profileViews: 246, averageRating: 4.9,
  comparisons: { linkClicks: 12, bookings: 33, profileViews: 18 },
};
const mockAppointments: Appointment[] = [
  { id: 'apt_001', customerName: 'Juliana Martins', serviceName: 'Manicure', startsAt: '2026-11-23T14:00:00-03:00', status: 'confirmed' },
  { id: 'apt_002', customerName: 'Beatriz Souza', serviceName: 'Design de Sobrancelhas', startsAt: '2026-11-23T16:30:00-03:00', status: 'confirmed' },
  { id: 'apt_003', customerName: 'Camila Ferreira', serviceName: 'Manicure', startsAt: '2026-11-23T19:00:00-03:00', status: 'pending' },
];
const mockProfile: PublicProfileDraft = {
  displayName: 'Ana Beatriz', profession: 'Manicure & Designer', bio: 'Cuidado, beleza e autoestima em cada detalhe.',
  slug: 'ana-beatriz', phone: '', instagram: '@anabeatriz', location: 'Novo Hamburgo, RS',
};
const mockServices: ServiceItem[] = [
  { id: 'srv_01', name: 'Manicure', durationMinutes: 45, priceCents: 4500, isActive: true },
  { id: 'srv_02', name: 'Design de Sobrancelhas', durationMinutes: 30, priceCents: 3500, isActive: true },
  { id: 'srv_03', name: 'Alongamento', durationMinutes: 120, priceCents: 12000, isActive: true },
];

export const api = {
  professional: {
    getCurrent: () => API_BASE_URL ? request<Professional>('/v1/me') : Promise.resolve(mockProfessional),
  },
  dashboard: {
    getMetrics: () => API_BASE_URL ? request<DashboardMetrics>('/v1/dashboard/metrics') : Promise.resolve(mockMetrics),
  },
  appointments: {
    list: () => API_BASE_URL ? request<Appointment[]>('/v1/appointments') : Promise.resolve(mockAppointments),
    updateStatus: (id: string, status: Appointment['status']) => API_BASE_URL
      ? request<Appointment>(`/v1/appointments/${id}`, { method: 'PATCH', body: JSON.stringify({ status }) })
      : Promise.resolve({ ...mockAppointments.find((item) => item.id === id)!, status }),
  },
  profile: {
    get: () => API_BASE_URL ? request<PublicProfileDraft>('/v1/profile') : Promise.resolve(mockProfile),
    update: (draft: PublicProfileDraft) => API_BASE_URL ? request<PublicProfileDraft>('/v1/profile', { method: 'PUT', body: JSON.stringify(draft) }) : Promise.resolve(draft),
    services: () => API_BASE_URL ? request<ServiceItem[]>('/v1/profile/services') : Promise.resolve(mockServices),
  },
};
