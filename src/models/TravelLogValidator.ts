import { z } from 'zod';

export const TravelLogValidator = z.object({
  title: z.string().trim().min(1, 'Title must contain at least 1 character'),
  description: z
    .string()
    .trim()
    .min(1, 'Description must contain at least 1 character'),
  image: z.string().trim().url('Must be a valid URL'),
  rating: z.coerce.number().min(0).max(10).default(5),
  latitude: z.coerce.number().min(-90).max(90),
  longitude: z.coerce.number().min(-180).max(180),
  visitDate: z.coerce.date(),
});

export type TravelLogType = z.infer<typeof TravelLogValidator>;
