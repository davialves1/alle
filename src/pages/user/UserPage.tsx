import { useContext } from 'react';
import { AppContext } from '../../common/AppContext';
import AlleBody from '../../common/alle-ui/AlleBody';
import AlleHeader from '../../common/alle-ui/AlleHeader';
import CreateOffer from './CreateOffer';
import { useNavigate } from 'react-router-dom';

const UserPage = () => {
  const { user } = useContext(AppContext);

  const navigate = useNavigate();

  if (!user) {
    navigate('/');
    return <></>;
  }

  return (
    <>
      <AlleHeader />
      {user && (
        <AlleBody>
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
