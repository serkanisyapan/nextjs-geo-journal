import type { NextApiRequest, NextApiResponse } from 'next';
import { TravelLogs, TravelLogValidator } from '@/models/TravelLogs';
import { TravelLogTypeWithId } from '@/models/TravelLogValidator';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<
    TravelLogTypeWithId | TravelLogTypeWithId[] | { message: string }
  >
) {
  try {
    switch (req.method) {
      case 'POST': {
        const validateTravelLog = await TravelLogValidator.parseAsync(req.body);
        const postTravelLog = await TravelLogs.insertOne(validateTravelLog);
        return res.status(200).json({
          ...validateTravelLog,
          _id: postTravelLog.insertedId,
        });
      }
      case 'GET': {
        const logs = await TravelLogs.find().toArray();
        return res.status(200).json(logs);
      }
      default: {
        return res.status(405).json({ message: 'Method is not allowed.' });
      }
    }
  } catch (e) {
    const error = e as Error;
    return res.status(500).json({ message: error.message });
  }
}
