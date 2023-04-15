import {
  setPersistence,
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithRedirect,
  signOut,
  GoogleAuthProvider,
} from 'firebase/auth';
import { useContext, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../common/store/AppContext';
import AlleHeader from '../../common/alle-ui/AlleHeader';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../FirebaseConfig';
import AlleBody from '../../common/alle-ui/AlleBody';
import { AiOutlineGoogle } from 'react-icons/ai';
import AlleButton from '../../common/alle-ui/AlleButton';
import { ColorVariants } from '../../common/models/ColorVariants';
import { Input } from '@mui/joy';
import { getAlleUser } from '../../common/store/Reducers';
import {
  addDoc,
  collection,
  doc,
  getFirestore,
  setDoc,
} from 'firebase/firestore';
const CreateAccountPage = () => {
  const [loading, setLoading] = useState(false);

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);
  const provider = new GoogleAuthProvider();

  const { setUser } = useContext(AppContext);

  const navigate = useNavigate();

  const emailRef = useRef<any>();

  const nameRef = useRef<any>();

  const passwordRef = useRef<any>();

  const createAccountEmailPassword = (e: any) => {
    e.preventDefault();
    setLoading(true);
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    setPersistence(auth, browserSessionPersistence).then(async () => {
      return createUserWithEmailAndPassword(auth, email, password)
        .then(async (res) => {
          const alleUser = getAlleUser(res.user);
          alleUser.displayName = name;
          await addDoc(collection(db, 'users'), {
            uid: res.user.uid,
            ...alleUser,
          });
          setUser(alleUser);
          setLoading(false);
          navigate('/');
        })
        .catch((err) => {
          setLoading(false);
          console.warn('Error: ' + err.message);
        });
    });
  };

  const onLogout = () => {
    signOut(auth)
      .then(() => setUser(null))
      .catch((e) => console.warn('Error: ' + e.message));
  };

  const createGoogleAccount = () => {
    setLoading(true);
    onLogout();
    setPersistence(auth, browserSessionPersistence).then(async () => {
      return signInWithRedirect(auth, provider).catch((e) =>
        console.warn('Error: ' + e.message)
      );
    });
  };

  return (
    <>
      <AlleHeader />
      <AlleBody loading={loading}>
        <div className='bg-white rounded-xl shadow-lg p-10 sm:w-10/12 md:w-1/2 xl:w-1/4 pb-16'>
          <h2 className='text-xl mb-8 text-center text-slate-600'>
            Criar uma conta
          </h2>
          <form onSubmit={createAccountEmailPassword}>
            <div className='mb-4'>
              <label htmlFor='email' className='block text-gray-400 mb-2'>
                Name
              </label>
              <input
                type='name'
                id='name'
                name='name'
                className='appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                ref={nameRef}
                required
              />
            </div>
            <div className='mb-4'>
              <label htmlFor='email' className='block text-gray-400 mb-2'>
                Email
              </label>
              <input
                type='email'
                id='email'
                name='email'
                className='appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                ref={emailRef}
                required
              />
            </div>
            <div className='mb-6'>
              <label htmlFor='password' className='block text-gray-400 mb-2'>
                Password
              </label>
              <input
                type='password'
                id='password'
                name='password'
                className='appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                ref={passwordRef}
                required
              />
            </div>
            <div className='flex flex-col items-center justify-between'>
              <AlleButton className='py-4 w-full' type='submit'>
                Criar uma nova conta
              </AlleButton>
            </div>
          </form>
          <AlleButton
            className='mt-5 w-full hidden'
            onClick={createGoogleAccount}
            icon={<AiOutlineGoogle size={24} className='mr-4' />}
            variant={ColorVariants.secondary}
          >
            Criar conta com Google
          </AlleButton>
        </div>
      </AlleBody>
    </>
  );
};

export default CreateAccountPage;
