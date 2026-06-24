import { betterAuth } from 'better-auth';
import { MongoClient } from 'mongodb';
import { mongodbAdapter } from 'better-auth/adapters/mongodb';

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
        type: 'string',
        required: true,
        defaultValue: 'client',
      },
      skills: {
        type: 'string[]', // Tells BetterAuth it's an array of strings
        required: false,
        defaultValue: [],
      },
      bio: {
        type: 'string',
        required: false,
        defaultValue: '',
      },
      hourlyRate: {
        type: 'number',
        required: false,
        defaultValue: 0,
      },
    },
  },
});
