import { useContext, useEffect } from 'react';
import { ColorVariants } from '../models/ColorVariants';
import {
  getAuth,
  User,
  getRedirectResult,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import Avatar from '@mui/joy/Avatar/Avatar';
import { AlleUser } from '../models/AlleUser';
import { AppContext } from '../store/AppContext';
import { Link, useNavigate } from 'react-router-dom';
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
import AlleButton from './AlleButton';
import { FiLogOut } from 'react-icons/fi';
import { AiOutlineUser } from 'react-icons/ai';
import { MdAutoGraph } from 'react-icons/md';

const AlleLogin = () => {
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);
  const { user, setUser } = useContext(AppContext);

  const navigate = useNavigate();

  auth.languageCode = 'br';

  const setAlleUser = (loggedUser: User): void => {
    const { displayName, email, photoURL } = loggedUser;
    setUser({ displayName, email, photoURL } as AlleUser);
  };

  const onLogout = () => {
    signOut(auth)
      .then(() => setUser(null))
      .catch((e) => console.warn('Error: ' + e.message));
    navigate('/');
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
        <div className='dropdown dropdown-bottom dropdown-end'>
          <label tabIndex={0} className='btn btn-circle btn-primary m-1'>
            <Avatar src={user.photoURL} />
          </label>
          <ul
            tabIndex={0}
            className='dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52'
          >
            <li>
              <Link to='/my-account'>Meu perfil</Link>
            </li>
            <li>
              <Link to='/new-offer'>Criar um anúncio</Link>
            </li>
            <li>
              <a onClick={onLogout}>Logout</a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default AlleLogin;
