import { useContext, useRef } from 'react';
import {
  browserSessionPersistence,
  setPersistence,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '../common/alle-ui/AlleLogin';
import { AppContext } from '../common/AppContext';
import { useNavigate } from 'react-router-dom';
import AlleHeader from '../common/alle-ui/AlleHeader';

function LoginPage() {
  const { setUser } = useContext(AppContext);

  const navigate = useNavigate();

  const emailRef = useRef<any>();
  const passwordRef = useRef<any>();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    setPersistence(auth, browserSessionPersistence).then(async (res) => {
      return signInWithEmailAndPassword(auth, email, password)
        .then((res) => {
          setUser(res.user);
          navigate('/');
        })
        .catch((err) => console.warn(err));
    });
  };

  return (
    <>
      <AlleHeader />
      <div className='bg-slate-200 h-screen flex flex-col items-center justify-center'>
        <div className='bg-white rounded-xl shadow-lg p-10'>
          <h2 className='text-xl mb-8 text-center text-slate-600'>Login</h2>
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
            <div className='flex items-center justify-between'>
              <button
                className='bg-emerald-400 hover:bg-emerald-300 text-white font-bold py-2 px-4 rounded focus:outline-none w-full focus:shadow-outline'
                type='submit'
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
