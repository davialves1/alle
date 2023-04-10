import { useContext } from 'react';
import { AppContext } from '../common/AppContext';
import AlleBody from '../common/alle-ui/AlleBody';
import CircularProgress from '@mui/joy/CircularProgress';

const UserPage = () => {
  const { user } = useContext(AppContext);

  if (user == null) {
    return (
      <AlleBody className='flex'>
        <CircularProgress color='neutral' />
      </AlleBody>
    );
  }

  return (
    <>
      <AlleBody>
        <span>
          {user.displayName} | {user.email}
        </span>
      </AlleBody>
    </>
  );
};

export default UserPage;
