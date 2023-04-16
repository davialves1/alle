import AlleLogin from './AlleLogin';
import logo from '../../assets/alle-icon.jpg';
import { Link } from 'react-router-dom';

const AlleHeader = () => {
  return (
    <div className='h-20 bg-emerald-400 flex justify-between items-center p-6 sticky top-0 w-screen z-10'>
      <Link to='/'>
        <img className='h-16 rounded-lg' src={logo} />
      </Link>
      <AlleLogin />
    </div>
  );
};

export default AlleHeader;
