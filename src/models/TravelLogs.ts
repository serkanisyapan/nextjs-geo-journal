import db from '@/db';
import { TravelLogValidator, TravelLogType } from './TravelLogValidator';

export { TravelLogValidator };

export const TravelLogs = db.collection<TravelLogType>('logs');
