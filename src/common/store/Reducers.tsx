import { User, UserCredential } from 'firebase/auth';
import { AlleUser } from '../models/AlleUser';

export const getAlleUser = (user: User): AlleUser => {
  const { displayName, email, photoURL, uid } = user;
  return { uid, displayName, email, photoURL };
};
