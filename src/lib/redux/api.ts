import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { NewLawnGalleryItem } from '@/types/new-lawns.types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.no1lawns.com/api/v1/websites';

export const api = createApi({
  reducerPath: 'newLawnsApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  tagTypes: ['Gallery'],
  endpoints: (builder) => ({
    getGalleryItems: builder.query<NewLawnGalleryItem[], void>({
      query: () => '/gallery',
      transformResponse: (res: { galleries: NewLawnGalleryItem[] }) => res.galleries,
      providesTags: ['Gallery'],
    }),
  }),
});

export const { useGetGalleryItemsQuery } = api;
