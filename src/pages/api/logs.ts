import type { NextApiRequest, NextApiResponse } from 'next';
import { TravelLog, TravelLogs } from '@/models/TravelLogs';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    switch (req.method) {
      case 'POST': {
        const validateTravelLog = await TravelLog.parseAsync(req.body);
        const postTravelLog = await TravelLogs.insertOne(validateTravelLog);
        return res.status(200).json({
          ...req.body,
          _id: postTravelLog.insertedId,
        });
      }
      case 'GET': {
        const logs = TravelLogs.find().toArray();
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
