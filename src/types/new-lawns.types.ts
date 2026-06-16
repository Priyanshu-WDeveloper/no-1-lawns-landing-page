export interface NewLawnService {
  _id: string;
  title: string;
  description: string;
  image?: string;
  price?: number;
  isActive: boolean;
  isDeleted: boolean;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface NewLawnGalleryItem {
  _id: string;
  image: string;
  beforeImage?: string;
  afterImage?: string;
  category: string;
  isBeforeAfter: boolean;
  isActive: boolean;
  reviewIds?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface NewLawnReview {
  _id: string;
  reviewerName: string;
  location: string;
  rating: number;
  comment: string;
  images?: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface WebsiteConfigBanner {
  image: string;
  title: string;
  description: string;
}

export interface WebsiteConfigFeature {
  title: string;
  description: string;
}

export interface WebsiteConfigStat {
  value: string;
  label: string;
}

export interface WebsiteContactDetails {
  email: string;
  phone: string;
  businessHours: string;
  city: string;
  address: string;
  provinces: string;
  country: string;
  countryCode: string;
}

export interface WebsiteAboutUs {
  title: string;
  description: string;
  image: string;
  features: WebsiteConfigFeature[];
  stats: WebsiteConfigStat[];
}

export interface WebsiteConfig {
  _id: string;
  websiteName: string;
  websiteLogo: string;
  websiteBannerList: WebsiteConfigBanner[];
  websiteContactDetails: WebsiteContactDetails;
  websiteAboutUs: WebsiteAboutUs;
  footerElement: any[];
  createdAt: string;
  updatedAt: string;
}

export interface QuoteRequestPayload {
  name: string;
  phone: string;
  email: string;
  serviceRequired: string;
  propertyAddress: string;
  propertySize: string;
  preferredDate: string;
  additionalDetails: string;
  // documents: File[]; // File upload handling will be done separately
}

export interface ContactInquiryPayload {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export type NewLawnListResponse<T> = {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};
