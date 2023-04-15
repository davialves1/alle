import { User, UserCredential } from 'firebase/auth';
import { AlleUser } from '../models/AlleUser';

export const getAlleUser = (user: User): AlleUser => {
  const { displayName, email, photoURL } = user;
  return { displayName, email, photoURL };
};
