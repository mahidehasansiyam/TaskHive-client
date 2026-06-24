import { betterAuth } from 'better-auth';
import { MongoClient } from 'mongodb';
import { mongodbAdapter } from 'better-auth/adapters/mongodb';

// if (!process.env.MONGOBD_URI) {
//   throw new Error('MONGODB_URI missing');
// }

// if (!process.env.USER_DB_NAME) {
//   throw new Error('USER_DB_NAME missing');
// }

const client = new MongoClient(process.env.MONGOBD_URI);
const db = client.db('taskhive');

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },
  database: mongodbAdapter(db, {
    client,
  }),
  user: {
    additionalFields: {
      role: {
        default: 'client',
      }
    },
  },
});
