import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../common/store/AppContext';
import AlleBody from '../../common/alle-ui/AlleBody';
import AlleHeader from '../../common/alle-ui/AlleHeader';
import CreateOffer from './CreateOffer';
import { AlleUser } from '../../common/models/AlleUser';
import { Link, useNavigate } from 'react-router-dom';
import CreateOfferCard from '../../common/CreateOfferCard';
import { getAuth, signOut } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../FirebaseConfig';

const UserPage = () => {
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const { user, setUser } = useContext(AppContext);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, []);

  if (!user) {
    return <></>;
  }

  const onLogout = () => {
    signOut(auth)
      .then(() => setUser(null))
      .catch((e) => console.warn('Error: ' + e.message));
    navigate('/');
  };

  return (
    <>
      <AlleHeader />
      <AlleBody loading={loading} className='flex-col px-5 min-h-screen'>
        <div className='flex items-center justify-between mt-5 w-full'>
          <h2 className='text-2xl text-slate-600 '>Olá {user.displayName}</h2>
          <span
            className='text-xs underline text-emerald-600 bg-slate-200 py-2 px-4 rounded'
            onClick={onLogout}
          >
            Logout
          </span>
        </div>

        <p className='text-slate-500 text-sm mt-5'>
          Você reside em {user.city},{' '}
          <Link to='/' className='text-emerald-500 underline'>
            veja as ofertas disponíveis na sua cidade.
          </Link>
        </p>
        <div className='divider' />
        <CreateOfferCard />
      </AlleBody>
    </>
  );
};

export default UserPage;
