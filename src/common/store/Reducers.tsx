import { User, UserCredential } from 'firebase/auth';
import { AlleUser } from '../models/AlleUser';

export const getAlleUser = (userCredential: UserCredential): AlleUser => {
  const { displayName, email, photoURL } = userCredential.user;
  return { displayName, email, photoURL };
};
