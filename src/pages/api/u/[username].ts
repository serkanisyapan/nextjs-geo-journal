import type { NextApiRequest, NextApiResponse } from 'next';
import { TravelLogs } from '@/models/TravelLogs';
import { TravelLogTypeWithId } from '@/models/TravelLogValidator';
import { Users } from '@/models/Users';

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
        const getUserName = `${req.query.username}@gmail.com`;
        const getUser = await Users.find({ email: getUserName }).toArray();
        if (getUser.length === 0) {
          throw new ErrorWithStatusCode('User does not exists', 400);
        }
        const getUserId = getUser[0]._id;
        const getUserLogs = await TravelLogs.find({
          userId: getUserId.toString(),
        }).toArray();
        return res.status(200).json(getUserLogs);
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
