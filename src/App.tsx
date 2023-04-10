import { useContext, useEffect, useState } from 'react';
import CardOffer from './common/CardOffer';
import { Offer } from './common/offer-model';
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { AppContext } from './common/AppContext';
import CircularProgress from '@mui/joy/CircularProgress/CircularProgress';
import AlleBody from './common/alle-ui/AlleBody';

const firebaseConfig = {
  apiKey: 'AIzaSyDfY1ouoI4kirtJwJGwlGUkNY056THxPnU',
  authDomain: 'alemanha-para-brasileiros.firebaseapp.com',
  databaseURL: 'https://alemanha-para-brasileiros-default-rtdb.firebaseio.com',
  projectId: 'alemanha-para-brasileiros',
  storageBucket: 'alemanha-para-brasileiros.appspot.com',
  messagingSenderId: '558296876390',
  appId: '1:558296876390:web:1edbd572c7defedaea34a7',
};

export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);

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
