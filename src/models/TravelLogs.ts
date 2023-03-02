import db from '@/db';
import { TravelLogValidator } from './TravelLogValidator';

export { TravelLogValidator };

export const TravelLogs = db.collection('logs');
