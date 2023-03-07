import type { NextApiRequest, NextApiResponse } from 'next';
import { TravelLogs, TravelLogValidator } from '@/models/TravelLogs';
import { TravelLogTypeWithId } from '@/models/TravelLogValidator';

if (!process.env.API_KEY) {
  throw new Error('API key is missing in .env file.');
}

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
      case 'POST': {
        if (req.body.apiKey !== process.env.API_KEY) {
          throw new ErrorWithStatusCode('Unauthorized.', 401);
        }
        const validateTravelLog = await TravelLogValidator.parseAsync(req.body);
        // @ts-expect-error
        delete validateTravelLog.apiKey;
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
    if (error instanceof ErrorWithStatusCode) {
      res.status(error.status);
    }
    return res.json({ message: error.message });
  }
}
