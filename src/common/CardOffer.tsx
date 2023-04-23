import { Offer } from './models/OfferModel';
import { Link } from 'react-router-dom';

const CardOffer = ({ offer }: { offer: Offer }) => {
  return (
    <Link to={`offer-detail/${offer.offerId}`}>
      <div className='card w-auto md:w-96 mx-auto md:mx-2 bg-base-100 border border-slate-300 my-2'>
        <figure>
          <img
            src='https://images.unsplash.com/photo-1527549993586-dff825b37782'
            alt='Shoes'
          />
        </figure>
        <div className='card-body'>
          <h2 className='card-title text-emerald-400 text-2xl md:truncate'>
            {offer.company}
          </h2>
          <p>{offer.shortdescription}</p>
          <div className='card-actions mt-3'>
            <button className='btn btn-primary text-emerald-50'>
              Saiba mais
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CardOffer;
