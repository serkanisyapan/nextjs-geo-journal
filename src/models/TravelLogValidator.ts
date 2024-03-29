import { WithId } from 'mongodb';
import { z } from 'zod';

const zodErrors = {
  title: 'Title must contain at least 1 character',
  description: 'Description must contain at least 1 character',
  image: 'Must be a valid URL',
};

export const TravelLogValidator = z.object({
  _id: z.string(),
  userId: z.string(),
  title: z.string().trim().min(1, zodErrors.title),
  description: z.string().trim().min(1, zodErrors.description),
  image: z.string().trim().url(zodErrors.image),
  rating: z.coerce.number().min(0).max(10).default(5),
  latitude: z.coerce.number().min(-90).max(90),
  longitude: z.coerce.number().min(-180).max(180),
  visitDate: z.coerce.date(),
  visited: z.string(),
  favorited: z.boolean(),
});

export type TravelLogType = z.infer<typeof TravelLogValidator>;
export type TravelLogTypeWithId = WithId<TravelLogType>;
