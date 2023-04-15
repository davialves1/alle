import { useContext, useEffect, useRef, useState } from 'react';
import {
  GoogleAuthProvider,
  browserSessionPersistence,
  getAuth,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithRedirect,
} from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { AiOutlineGoogle } from 'react-icons/ai';
import { useNavigate, Link } from 'react-router-dom';
import { firebaseConfig } from '../../FirebaseConfig';
import AlleBody from '../../common/alle-ui/AlleBody';
import AlleButton from '../../common/alle-ui/AlleButton';
import AlleHeader from '../../common/alle-ui/AlleHeader';
import { ColorVariants } from '../../common/models/ColorVariants';
import { AppContext } from '../../common/store/AppContext';
import { getAlleUser } from '../../common/store/Reducers';

function LoginPage() {
  const app = initializeApp(firebaseConfig);

  const [loading, setLoading] = useState(false);

  const provider = new GoogleAuthProvider();

  const auth = getAuth(app);

  const { user, setUser } = useContext(AppContext);

  const navigate = useNavigate();

  const emailRef = useRef<any>();

  const passwordRef = useRef<any>();

  useEffect(() => {
    if (user) {
      setLoading(false);
      navigate('/my-account');
    }
  }, [user]);

  const onEmailPasswordLogin = (e: any) => {
    e.preventDefault();
    setLoading(true);
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    setPersistence(auth, browserSessionPersistence)
      .then(async () => {
        return signInWithEmailAndPassword(auth, email, password)
          .then((res) => {
            const user = getAlleUser(res);
            setUser(user);
            setLoading(false);
            navigate('/');
          })
          .catch((err) => {
            setLoading(false);
            console.warn(err.message);
          });
      })
      .catch((err) => {
        setLoading(false);
        console.warn(err.message);
      });
  };

  const onGoogleLogin = () => {
    setLoading(true);
    setUser(null);
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
      <AlleBody loading={loading}>
        <div className='bg-white rounded-xl shadow-lg p-10 sm:w-10/12 md:w-1/2 xl:w-1/4'>
          <h2 className='text-xl mb-8 text-center text-slate-600'>
            Faça seu login
          </h2>
          <form onSubmit={onEmailPasswordLogin}>
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
            <AlleButton className='py-4 w-full' type='submit'>
              Login
            </AlleButton>
          </form>
          <div className='flex flex-col items-center justify-between'>
            <AlleButton
              type='button'
              className='mt-5 w-full hidden'
              onClick={onGoogleLogin}
              icon={<AiOutlineGoogle size={24} className='mr-4' />}
              variant={ColorVariants.secondary}
            >
              Google Login
            </AlleButton>
            <Link className='mt-8 text-blue-500 text-sm' to='/new-account'>
              Ainda não tem uma conta? Crie a sua.
            </Link>
          </div>
        </div>
      </AlleBody>
    </>
  );
}

export default LoginPage;