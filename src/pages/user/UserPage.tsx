import { useContext } from 'react';
import { AppContext } from '../../common/AppContext';
import AlleBody from '../../common/alle-ui/AlleBody';
import AlleHeader from '../../common/alle-ui/AlleHeader';
import CreateOffer from './CreateOffer';
import { useNavigate } from 'react-router-dom';
import { AlleUser } from '../../common/models/AlleUser';

const UserPage = () => {
  const { user }: { user: AlleUser } = useContext(AppContext);

  const navigate = useNavigate();

  if (!user || !user.email) {
    navigate('/');
    return <></>;
  }

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
        </AlleBody>
      )}
    </>
  );
};

export default UserPage;
