import { MongoClient } from 'mongodb';

if (!process.env.DB_URL) {
  throw new Error('DB_URL does not exist.');
}

if (!process.env.DB_NAME) {
  throw new Error('DB_NAME does not exist.');
}

const client = new MongoClient(process.env.DB_URL);
client.connect();
export default client.db(process.env.DB_NAME);
