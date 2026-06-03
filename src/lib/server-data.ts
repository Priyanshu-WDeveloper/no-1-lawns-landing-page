import type {
  NewLawnService,
  NewLawnGalleryItem,
  NewLawnReview,
  WebsiteConfig,
} from '@/types/new-lawns.types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.no1lawns.com/api/v1/websites';

async function fetchApi<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${API_URL}${endpoint}`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error(`API ${res.status}: ${res.statusText}`);
  return res.json();
}

export async function getServices(): Promise<NewLawnService[]> {
  const data = await fetchApi<{ services: NewLawnService[] }>('/services');
  return data.services;
}

export async function getGallery(): Promise<NewLawnGalleryItem[]> {
  const data = await fetchApi<{ galleries: NewLawnGalleryItem[] }>('/gallery');
  return data.galleries;
}

export async function getReviews(): Promise<NewLawnReview[]> {
  const data = await fetchApi<{ reviews: NewLawnReview[] }>('/reviews');
  return data.reviews;
}

export async function getWebsiteConfig(): Promise<WebsiteConfig> {
  const data = await fetchApi<{ config: WebsiteConfig }>('/config');
  return data.config;
}
