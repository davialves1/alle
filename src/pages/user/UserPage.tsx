import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../common/store/AppContext';
import AlleBody from '../../common/alle-ui/AlleBody';
import AlleHeader from '../../common/alle-ui/AlleHeader';
import { Link, useNavigate } from 'react-router-dom';
import CreateOfferCard from '../../common/CreateOfferCard';

const UserPage = () => {
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
  return (
    <>
      <AlleHeader />
      <AlleBody loading={loading} className='flex-col min-h-screen '>
        <span className='p-5'>
          <h2 className='text-2xl text-slate-600 mt-5'>
            Olá {user.displayName}
          </h2>
          <p className='text-slate-500 text-sm mt-2'>
            Você reside em <strong>{user.city}</strong>,{' '}
            <Link to='/' className='text-emerald-500 underline'>
              veja as ofertas disponíveis na sua cidade.
            </Link>
          </p>
        </span>
        <CreateOfferCard />
      </AlleBody>
    </>
  );
};

export default UserPage;
