import { z } from 'zod';

export const TravelLogValidator = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  image: z.string().url(),
  rating: z.number().min(0).max(10).default(5),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(179),
  visitDate: z.date(),
});

export type TravelLogType = z.infer<typeof TravelLogValidator>;
