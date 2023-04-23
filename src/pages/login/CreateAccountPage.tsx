import {
  setPersistence,
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithRedirect,
  signOut,
  GoogleAuthProvider,
} from 'firebase/auth';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../common/store/AppContext';
import AlleHeader from '../../common/alle-ui/AlleHeader';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../FirebaseConfig';
import AlleBody from '../../common/alle-ui/AlleBody';
import { AiOutlineGoogle } from 'react-icons/ai';
import AlleButton from '../../common/alle-ui/AlleButton';
import { ColorVariants } from '../../common/models/ColorVariants';
import { Autocomplete, Input } from '@mui/joy';
import { getAlleUser } from '../../common/store/Reducers';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import { germanCities } from '../../common/models/GermanCities';
const CreateAccountPage = () => {
  const [loading, setLoading] = useState(false);

  const initialState = {
    name: '',
    city: '',
    email: '',
    password: '',
  };

  const [form, setForm] = useState(initialState);

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);
  const provider = new GoogleAuthProvider();

  const { setUser } = useContext(AppContext);

  const navigate = useNavigate();

  const createAccountEmailPassword = (e: any) => {
    e.preventDefault();
    setLoading(true);
    const { name, city, email, password } = form;
    setPersistence(auth, browserSessionPersistence).then(async () => {
      return createUserWithEmailAndPassword(auth, email, password)
        .then(async (res) => {
          const alleUser = getAlleUser(res.user);
          alleUser.displayName = name;
          alleUser.city = city;
          await addDoc(collection(db, 'users'), {
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

  const updateForm = (e: any, key: string) => {
    const value = key === 'city' ? e.target.innerText : e.target.value;
    setForm((prevState) => ({ ...prevState, [key]: value }));
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
      <AlleBody loading={loading} className='justify-center'>
        <div className='bg-white rounded-xl p-10 w-screen md:w-1/2 xl:w-2/4 h-fit'>
          <h2 className='text-xl mb-8 text-center text-slate-600'>
            Criar uma conta
          </h2>
          <form autoComplete='on' onSubmit={createAccountEmailPassword}>
            <div className='mb-4'>
              <label htmlFor='email' className='block text-gray-400 mb-2'>
                Name
              </label>
              <Input
                type='name'
                size='lg'
                id='name'
                name='name'
                autoComplete='given-name'
                onChange={(e) => updateForm(e, 'name')}
                className='appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                required
              />
            </div>
            <div className='mb-4'>
              <label htmlFor='city' className='block text-gray-400 mb-2'>
                Cidade onde mora
              </label>
              <Autocomplete
                type='city'
                size='lg'
                id='city'
                name='city'
                onChange={(e) => updateForm(e, 'city')}
                required
                options={germanCities}
              />
            </div>
            <div className='mb-4'>
              <label htmlFor='email' className='block text-gray-400 mb-2'>
                Email
              </label>
              <Input
                type='email'
                autoComplete='email'
                id='email'
                size='lg'
                name='email'
                onChange={(e) => updateForm(e, 'email')}
                className='appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                required
              />
            </div>
            <div className='mb-6'>
              <label htmlFor='password' className='block text-gray-400 mb-2'>
                Senha
              </label>
              <Input
                type='password'
                id='password'
                size='lg'
                autoComplete='new-password'
                name='password'
                onChange={(e) => updateForm(e, 'password')}
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
