import { useContext, useEffect } from 'react';
import AlleButton from './AlleButton';
import { ColorVariants } from '../models/ColorVariants';
import {
  GoogleAuthProvider,
  getAuth,
  setPersistence,
  browserSessionPersistence,
  signOut,
  User,
  signInWithRedirect,
  getRedirectResult,
  onAuthStateChanged,
} from 'firebase/auth';
import Avatar from '@mui/joy/Avatar/Avatar';
import { AlleUser } from '../models/AlleUser';
import { AppContext } from '../AppContext';
import { Link } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { firebaseConfig } from '../../FirebaseConfig';

const app = initializeApp(firebaseConfig);

export const database = getFirestore(app);

const AlleLogin = () => {
  const { user, setUser } = useContext(AppContext);

  const provider = new GoogleAuthProvider();

  const auth = getAuth(app);

  auth.languageCode = 'br';

  const onLogin = () => {
    setPersistence(auth, browserSessionPersistence)
      .then(async () => {
        return signInWithRedirect(auth, provider).catch((e) =>
          console.warn(e.message)
        );
      })
      .catch((er) => console.warn(er));
  };

  const setAlleUser = (loggedUser: User): void => {
    const { displayName, email, photoURL } = loggedUser;
    setUser({ displayName, email, photoURL } as AlleUser);
  };

  useEffect(() => {
    getRedirectResult(auth)
      .then((userCredential) => {
        if (userCredential) {
          setAlleUser(userCredential.user);
        }
      })
      .catch((err) => console.warn(err));

    onAuthStateChanged(auth, (loggedUser) => {
      if (loggedUser) {
        setAlleUser(loggedUser);
      }
    });
  }, []);

  const onLogout = () => {
    signOut(auth)
      .then(() => setUser(null))
      .catch((e) => console.warn(e.message));
  };

  return (
    <div className='justify-end'>
      {!user && (
        <>
          <AlleButton variant={ColorVariants.secondary} onClick={onLogin}>
            Login
          </AlleButton>
          <AlleButton className='ms-4' variant={ColorVariants.outline}>
            Criar conta
          </AlleButton>
        </>
      )}
      {user && (
        <Link to='/my-account'>
          <div className='flex items-center'>
            <p className='text-white me-5'>{user.displayName}</p>
            <Avatar
              alt={user.displayName ? user.displayName : ''}
              src={user.photoURL ? user.photoURL : ''}
              color='neutral'
              variant='soft'
            />
            <AlleButton
              className='ms-5'
              variant={ColorVariants.outline}
              onClick={onLogout}
            >
              Logout
            </AlleButton>
          </div>
        </Link>
      )}
    </div>
  );
};

export default AlleLogin;
