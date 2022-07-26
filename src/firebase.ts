import admin, { ServiceAccount } from 'firebase-admin';
import adminCredential from './admin-key.json';

const app = admin.initializeApp({
  credential: admin.credential.cert(adminCredential as ServiceAccount),
});

export const auth = app.auth();
