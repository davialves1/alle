import {
  setPersistence,
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithRedirect,
  signOut,
  GoogleAuthProvider,
} from 'firebase/auth';
import { useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../common/AppContext';
import AlleHeader from '../common/alle-ui/AlleHeader';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../FirebaseConfig';
import AlleBody from '../common/alle-ui/AlleBody';
import { AiOutlineGoogle } from 'react-icons/ai';
import AlleButton from '../common/alle-ui/AlleButton';
import { ColorVariants } from '../common/models/ColorVariants';
const CreateAccountPage = () => {
  const app = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();
  const auth = getAuth(app);

  const { setUser } = useContext(AppContext);

  const navigate = useNavigate();

  const emailRef = useRef<any>();
  const passwordRef = useRef<any>();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    setPersistence(auth, browserSessionPersistence).then(async (res) => {
      return createUserWithEmailAndPassword(auth, email, password)
        .then((res) => {
          setUser(res.user);
          navigate('/');
        })
        .catch((err) => console.warn(err));
    });
  };

  const onLogout = () => {
    signOut(auth)
      .then(() => setUser(null))
      .catch((e) => console.warn(e.message));
  };

  const createGoogleAccount = () => {
    onLogout();
    setPersistence(auth, browserSessionPersistence)
      .then(async () => {
        return signInWithRedirect(auth, provider).catch((e) =>
          console.warn(e.message)
        );
      })
      .catch((er) => console.warn(er));
  };

  return (
    <>
      <AlleHeader />
      <AlleBody>
        <div className='bg-white rounded-xl shadow-lg p-10 sm:w-10/12 md:w-1/2 xl:w-1/4 pb-16'>
          <h2 className='text-xl mb-8 text-center text-slate-600'>
            Criar uma conta
          </h2>
          <form onSubmit={handleSubmit}>
            <div className='mb-4'>
              <label htmlFor='email' className='block text-gray-400 mb-2'>
                Email
              </label>
              <input
                type='email'
                id='email'
                name='email'
                ref={emailRef}
                className='appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
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
                ref={passwordRef}
                className='appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
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
            className='mt-5 w-full'
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
