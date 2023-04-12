import { useContext, useEffect, useState } from 'react';
import CardOffer from './common/CardOffer';
import { Offer } from './common/offer-model';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { AppContext } from './common/AppContext';
import CircularProgress from '@mui/joy/CircularProgress/CircularProgress';
import AlleBody from './common/alle-ui/AlleBody';
import { database } from './main';
import AlleHeader from './common/alle-ui/AlleHeader';

function App() {
  const { offers, setOffers } = useContext(AppContext);

  const [loading, setLoading] = useState(false);

  const fetchOffers = async () => {
    const firebaseOffers: Offer[] = [];
    const ref = collection(database, 'offers');
    const q = query(ref, where('city', '==', 'Berlim'));
    const docs = await getDocs(q);
    docs.forEach((doc) =>
      firebaseOffers.push({ ...doc.data(), offerId: doc.id } as Offer)
    );
    setOffers(firebaseOffers);
    setLoading(false);
  };

  useEffect(() => {
    if (offers.length === 0) {
      setLoading(true);
      fetchOffers();
    }
  }, []);

  return (
    <>
      <AlleHeader />
      <AlleBody className='flex flex-wrap'>
        {loading && <CircularProgress color='neutral' />}
        {!loading &&
          offers.map((offer: Offer) => (
            <CardOffer key={offer._id} offer={offer} />
          ))}
      </AlleBody>
    </>
  );
}

export default App;
