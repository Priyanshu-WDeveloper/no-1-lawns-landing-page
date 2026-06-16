import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { NewLawnGalleryItem, NewLawnReview, ContactInquiryPayload, QuoteRequestPayload } from '@/types/new-lawns.types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.no1lawns.com/api/v1/websites';

export const api = createApi({
  reducerPath: 'newLawnsApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  tagTypes: ['Gallery', 'Reviews'],
  endpoints: (builder) => ({
    getGalleryItems: builder.query<NewLawnGalleryItem[], void>({
      query: () => '/gallery',
      transformResponse: (res: { galleries: NewLawnGalleryItem[] }) => res.galleries,
      providesTags: ['Gallery'],
    }),
    getReviews: builder.query<NewLawnReview[], void>({
      query: () => '/reviews',
      transformResponse: (res: { reviews: NewLawnReview[] }) => res.reviews,
      providesTags: ['Reviews'],
    }),
    submitContact: builder.mutation<{ message: string }, ContactInquiryPayload>({
      query: (body) => ({ url: '/contact-us', method: 'POST', body }),
    }),
    submitQuote: builder.mutation<{ message: string }, QuoteRequestPayload | FormData>({
      query: (body) => ({ url: '/quotes', method: 'POST', body }),
    }),
  }),
});

export const { useGetGalleryItemsQuery, useGetReviewsQuery, useSubmitContactMutation, useSubmitQuoteMutation } = api;
