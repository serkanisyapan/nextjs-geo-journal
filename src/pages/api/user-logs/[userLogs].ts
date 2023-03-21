import type { NextApiRequest, NextApiResponse } from 'next';
import { TravelLogs } from '@/models/TravelLogs';
import { TravelLogTypeWithId } from '@/models/TravelLogValidator';

class ErrorWithStatusCode extends Error {
  status = 500;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<
    TravelLogTypeWithId | TravelLogTypeWithId[] | { message: string }
  >
) {
  try {
    switch (req.method) {
      case 'GET': {
        const getUserId = req.query.userLogs;
        const logs = await TravelLogs.find({ userId: getUserId }).toArray();
        return res.status(200).json(logs);
      }
      default: {
        return res.status(405).json({ message: 'Method is not allowed.' });
      }
    }
  } catch (e) {
    const error = e as Error;
    if (error instanceof ErrorWithStatusCode) {
      res.status(error.status);
    }
    return res.json({ message: error.message });
  }
}
