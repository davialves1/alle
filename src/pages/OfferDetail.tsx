import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Offer } from '../common/offer-model';
import { AppContext } from '../common/store/AppContext';
import AlleBody from '../common/alle-ui/AlleBody';
import AlleHeader from '../common/alle-ui/AlleHeader';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../FirebaseConfig';

const OfferDetail = () => {
  const app = initializeApp(firebaseConfig);
  const database = getFirestore();
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
      <AlleBody className='flex-col'>
        <div className='bg-white rounded-xl shadow-lg p-10 w-11/12 my-10 mx-auto'>
          <h1 className='text-emerald-400 text-4xl mt-5'>{offer?.company}</h1>
          <p className='mt-5 text-slate-500 text-2xl'>
            {offer?.shortdescription}
          </p>
          <p className='mt-5 text-slate-600 xs:w-10/12 lg:w-1/2'>
            {offer?.description}
          </p>
          <p className='mt-5 text-slate-600 xs:w-10/12 lg:w-1/2'>
            {offer?.longdescription}
          </p>
        </div>
      </AlleBody>
    </>
  );
};

export default OfferDetail;
