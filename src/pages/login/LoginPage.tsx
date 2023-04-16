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
import { Input } from '@mui/joy';

function LoginPage() {
  const app = initializeApp(firebaseConfig);

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(false);

  const provider = new GoogleAuthProvider();

  const auth = getAuth(app);

  const { user, setUser } = useContext(AppContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setLoading(false);
      navigate('/my-account');
    }
  }, [user]);

  const onEmailPasswordLogin = (e: any) => {
    e.preventDefault();
    setLoading(true);
    setPersistence(auth, browserSessionPersistence)
      .then(async () => {
        return signInWithEmailAndPassword(auth, email, password)
          .then((res) => {
            const user = getAlleUser(res.user);
            setUser(user);
            setLoading(false);
            navigate('/');
          })
          .catch((error) => {
            setError(true);
            setLoading(false);
            console.warn(error);
          });
      })
      .catch((error) => {
        setError(true);
        setLoading(false);
        console.warn(error);
      });
  };

  const onGoogleLogin = () => {
    setLoading(true);
    setUser(null);
    setPersistence(auth, browserSessionPersistence)
      .then(async () => {
        return signInWithRedirect(auth, provider).catch((error) => {
          setError(true);
          setLoading(false);
          console.warn(error);
        });
      })
      .catch((error) => {
        setError(true);
        setLoading(false);
        console.warn(error);
      });
  };

  return (
    <>
      <AlleHeader />
      <AlleBody loading={loading} style={{ height: `calc(100vh - 60px)` }}>
        <div className='bg-white rounded-xl p-10 w-screen md:w-1/2 xl:w-1/4'>
          <h2 className='text-xl mb-8 text-center text-slate-600'>
            Faça seu login
          </h2>
          <form onSubmit={onEmailPasswordLogin}>
            {error && (
              <div className='bg-red-100 p-4 my-5 text-red-900 rounded-lg'>
                Email ou senha inválidos.
              </div>
            )}
            <div className='mb-4'>
              <label htmlFor='email' className='block text-gray-400 mb-2'>
                Email
              </label>
              <Input
                onChange={(e) => setEmail(e.target.value)}
                size='lg'
                type='email'
                id='email'
                name='email'
                error={error}
                onFocus={() => setError(false)}
                required
              />
            </div>
            <div className='mb-6'>
              <label htmlFor='password' className='block text-gray-400 mb-2'>
                Password
              </label>
              <Input
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setError(false)}
                size='lg'
                type='password'
                id='password'
                name='password'
                error={error}
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
