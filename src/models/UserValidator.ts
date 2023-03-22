import { WithId } from 'mongodb';
import { z } from 'zod';

const zodErrors = {
  name: 'Namemus contain at least 1 character',
  email: 'Email must contain at least 1 character',
  image: 'Must be a valid URL',
};

export const UserValidator = z.object({
  name: z.string().trim().min(1, zodErrors.name),
  email: z.string().trim().email(zodErrors.email),
  image: z.string().trim().url(zodErrors.image),
});

export type UserType = z.infer<typeof UserValidator>;
export type UserTypeWithId = WithId<UserType>;
