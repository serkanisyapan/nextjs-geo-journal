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
        const validateTravelLog = await TravelLogValidator.parseAsync(req.body);
        await TravelLogs.insertOne(validateTravelLog);
        // @ts-ignore
        return res.status(200).json(validateTravelLog);
      }
      case 'DELETE': {
        const { logID } = req.body;
        if (!logID) {
          throw new ErrorWithStatusCode('No logs found.', 400);
        }
        await TravelLogs.deleteOne({ _id: logID });
        return res.status(200).json({ message: 'Log is deleted.' });
      }
      case 'PATCH': {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        const { _id } = req.body;
        if (!_id) {
          throw new ErrorWithStatusCode('No logs found.', 400);
        }
        const validateUpdateLog = await TravelLogValidator.parseAsync(req.body);
        // @ts-expect-error
        delete validateUpdateLog.logID;
        await TravelLogs.updateOne({ _id }, { $set: { ...validateUpdateLog } });
        return res.status(200).json({ message: 'Log got updated.' });
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
