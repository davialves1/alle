import AlleButton from './alle-ui/AlleButton';
import { Offer } from './models/OfferModel';
import { Link } from 'react-router-dom';

const CardOffer = ({ offer }: { offer: Offer }) => {
  const unsplash =
    'https://images.unsplash.com/photo-1527549993586-dff825b37782';

  return (
    <Link to={`offer-detail/${offer.offerId}`}>
      <div className='card w-auto md:w-96 mx-auto md:mx-2 bg-base-100 border border-slate-300 my-2'>
        <figure>
          <img
            src={offer.firebaseImage ? offer.firebaseImage : unsplash}
            alt={offer.company}
          />
        </figure>
        <div className='card-body'>
          <h2 className='card-title text-emerald-400 text-2xl md:truncate'>
            {offer.company}
          </h2>
          <p>{offer.shortdescription}</p>
          <div className='card-actions mt-3'>
            <AlleButton>Saiba mais</AlleButton>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CardOffer;
