import { doc, getDoc } from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Offer } from '../common/offer-model';
import { AppContext } from '../common/AppContext';
import AlleBody from '../common/alle-ui/AlleBody';
import AlleHeader from '../common/alle-ui/AlleHeader';
import { database } from '../common/alle-ui/AlleLogin';

const OfferDetail = () => {
  const { offers } = useContext(AppContext) as { offers: Offer[] };

  const { offerId } = useParams();

  const [offer, setOffer] = useState<Offer>();

  const fetchOffer = async () => {
    const ref = doc(database, 'offers', offerId as string);
    const offerDoc = await getDoc(ref);
    const data = offerDoc.data();
    setOffer(data as Offer);
  };

  useEffect(() => {
    if (offers.length === 0) {
      fetchOffer();
    } else {
      const selected = offers.find((offer) => offer.offerId === offerId);
      setOffer(selected);
    }
  }, []);

  return (
    <>
      <AlleHeader />
      <AlleBody>
        <h1 className='text-emerald-400 text-5xl mt-5'>{offer?.company}</h1>
        <p className='mt-5 text-slate-500 text-3xl'>
          {offer?.shortdescription}
        </p>
        <p className='mt-5 text-slate-600 w-1/2'>{offer?.description}</p>
        <p className='mt-5 text-slate-600 w-1/2'>{offer?.longdescription}</p>
      </AlleBody>
    </>
  );
};

export default OfferDetail;
