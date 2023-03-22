import db from '@/db';
import { UserValidator, UserTypeWithId } from './UserValidator';

export { UserValidator };

export const Users = db.collection<UserTypeWithId>('users');
