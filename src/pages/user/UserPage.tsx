import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../common/store/AppContext';
import AlleBody from '../../common/alle-ui/AlleBody';
import AlleHeader from '../../common/alle-ui/AlleHeader';
import CreateOffer from './CreateOffer';
import { AlleUser } from '../../common/models/AlleUser';
import { useNavigate } from 'react-router-dom';
import Carousel from '../../common/ImageCarousel';

const UserPage = () => {
  const { user }: { user: AlleUser } = useContext(AppContext);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, []);

  return (
    <>
      <AlleHeader />
      <AlleBody loading={loading} className='flex-col px-5 min-h-screen'>
        <h2 className='text-2xl text-slate-600 my-3'>Olá {user.displayName}</h2>
        <Carousel />
        <p className='mt-5 text-slate-500 text-sm'>
          Estamos felizes em tê-lo(a) aqui e esperamos que encontre tudo o que
          precisa. Obrigado por se juntar a nós!
        </p>
        <CreateOffer />
      </AlleBody>
    </>
  );
};

export default UserPage;
