import { z } from 'zod';

export const artistSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  address: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  website: z.string().url('Invalid website URL').optional().nullable(),
  portraitUrl: z.string().url('Invalid portrait URL').optional().nullable(),
  birthDate: z.string().optional().nullable(),
  deathDate: z.string().optional().nullable(),
  biography: z.string().optional()
});

export const artworkSchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters'),
  artistId: z.number().int().positive('Artist is required'),
  type: z.string().min(1, 'Type is required'),
  height: z.number().positive().optional(),
  width: z.number().positive().optional(),
  depth: z.number().positive().optional(),
  weight: z.number().positive().optional(),
  productionDate: z.string().optional(),
  isEstimatedDate: z.boolean(),
  isEdition: z.boolean(),
  editionDetails: z.string().optional(),
  isSigned: z.boolean(),
  signatureLocation: z.string().optional(),
  description: z.string().optional(),
  locationId: z.number().int().positive('Location is required'),
  purchaseDate: z.string().optional(),
  purchasePrice: z.number().positive().optional(),
  currentValue: z.number().positive().optional(),
  insuredValue: z.number().positive().optional(),
  photos: z.array(z.object({
    url: z.string().url('Invalid photo URL'),
    isMain: z.boolean()
  })),
  attachments: z.array(z.object({
    url: z.string().url('Invalid attachment URL'),
    filename: z.string(),
    type: z.string()
  }))
});

export const locationSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  address: z.string().min(5, 'Address is required'),
  type: z.string().min(1, 'Type is required'),
  description: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional()
});