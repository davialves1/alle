import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../common/store/AppContext';
import AlleBody from '../../common/alle-ui/AlleBody';
import AlleHeader from '../../common/alle-ui/AlleHeader';
import CreateOffer from './CreateOffer';
import { AlleUser } from '../../common/models/AlleUser';
import { Link, useNavigate } from 'react-router-dom';
import CreateOfferCard from '../../common/CreateOfferCard';

const UserPage = () => {
  const { user }: { user: AlleUser } = useContext(AppContext);

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
      <AlleBody loading={loading} className='flex-col px-5 min-h-screen'>
        <h2 className='text-2xl text-slate-600 mt-5'>Olá {user.displayName}</h2>
        <p className='mt-2 text-slate-500 text-sm'>
          Estamos felizes em tê-lo(a) aqui e esperamos que encontre tudo o que
          precisa. Obrigado por se juntar a nós!
        </p>

        <p className='text-slate-500 text-sm'>
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
