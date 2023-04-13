import { useContext, useEffect } from 'react';
import AlleButton from './AlleButton';
import { ColorVariants } from '../models/ColorVariants';
import {
  getAuth,
  signOut,
  User,
  getRedirectResult,
  onAuthStateChanged,
} from 'firebase/auth';
import Avatar from '@mui/joy/Avatar/Avatar';
import { AlleUser } from '../models/AlleUser';
import { AppContext } from '../AppContext';
import { Link, useNavigate } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../FirebaseConfig';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const AlleLogin = () => {
  const navigate = useNavigate();

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
          navigate('/');
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
    navigate('/');
  };

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
