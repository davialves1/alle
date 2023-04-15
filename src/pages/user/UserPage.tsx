import { useContext, useEffect } from 'react';
import { AppContext } from '../../common/store/AppContext';
import AlleBody from '../../common/alle-ui/AlleBody';
import AlleHeader from '../../common/alle-ui/AlleHeader';
import CreateOffer from './CreateOffer';
import { AlleUser } from '../../common/models/AlleUser';
import { useNavigate } from 'react-router-dom';
import { Input } from '@mui/joy';

const UserPage = () => {
  const { user }: { user: AlleUser } = useContext(AppContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user]);

  console.log('');

  return (
    <>
      <AlleHeader />
      {user && (
        <AlleBody className='flex-col'>
          <h2 className='text-2xl text-slate-600 mt-3'>
            Olá {user.displayName}
          </h2>
          <p className='mt-5 text-slate-500 text-sm'>
            Estamos felizes em tê-lo(a) aqui e esperamos que encontre tudo o que
            precisa. Obrigado por se juntar a nós!
          </p>
          <CreateOffer />
          <Input className='my-10' type='file' />
        </AlleBody>
      )}
    </>
  );
};

export default UserPage;
