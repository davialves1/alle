import { useContext, useEffect } from 'react';
import AlleButton from './AlleButton';
import { ColorVariants } from '../models/ColorVariants';
import {
  getAuth,
  User,
  getRedirectResult,
  onAuthStateChanged,
} from 'firebase/auth';
import Avatar from '@mui/joy/Avatar/Avatar';
import { AlleUser } from '../models/AlleUser';
import { AppContext } from '../store/AppContext';
import { Link } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../FirebaseConfig';
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from 'firebase/firestore';
import { getAlleUser } from '../store/Reducers';

const AlleLogin = () => {
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);
  const { user, setUser } = useContext(AppContext);

  auth.languageCode = 'br';

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
      .catch((err) => console.warn('Error: ' + err.message));

    onAuthStateChanged(auth, async (loggedUser) => {
      if (loggedUser) {
        const q = query(
          collection(db, 'users'),
          where('uid', '==', loggedUser.uid)
        );
        const docs = await getDocs(q);
        const document = docs.docs[0].data();
        const myUser = getAlleUser(loggedUser);
        myUser.displayName = document.displayName;
        myUser.city = document.city;
        setUser(myUser);
      }
    });
  }, []);

  return (
    <div className='justify-end'>
      {!user && (
        <>
          <Link to='/login'>
            <AlleButton variant={ColorVariants.secondary}>Login</AlleButton>
          </Link>
          <Link to='/new-account'>
            <AlleButton className='ms-4' variant={ColorVariants.outline}>
              Criar conta
            </AlleButton>
          </Link>
        </>
      )}
      {user && (
        <Link to='/my-account'>
          <div className='flex items-center'>
            <div className='avatar'>
              <div className='rounded-full w-3.5 h-3.5 absolute right-1 z-10 border-2 border-white bg-orange-600' />
              <div className='w-12 rounded-full'>
                <Avatar src={user.photoURL} />
              </div>
            </div>
          </div>
        </Link>
      )}
    </div>
  );
};

export default AlleLogin;
