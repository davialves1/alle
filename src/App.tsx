import { useContext, useEffect, useState } from 'react';
import CardOffer from './common/CardOffer';
import { Offer } from './common/models/OfferModel';
import {
  collection,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';
import { AppContext } from './common/store/AppContext';
import AlleBody from './common/alle-ui/AlleBody';
import AlleHeader from './common/alle-ui/AlleHeader';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './FirebaseConfig';

function App() {
  const app = initializeApp(firebaseConfig);

  const database = getFirestore();

  const storage = getStorage(app);

  const { offers, setOffers } = useContext(AppContext);

  const [loading, setLoading] = useState(false);

  const fetchOffers = async () => {
    const firebaseOffers: Offer[] = [];
    const docRef = collection(database, 'offers');
    const q = query(docRef, where('city', '==', 'Berlim'));
    const docs = await getDocs(q);
    docs.forEach((doc) => {
      const offer = { ...doc.data(), offerId: doc.id } as Offer;
      if (offer.firebaseImage) {
        const imageRef = ref(storage, offer.firebaseImage);
        getDownloadURL(imageRef)
          .then((url) => (offer.firebaseImage = url))
          .catch((error) => console.log(error));
      }
      firebaseOffers.push(offer);
    });
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
      <AlleBody loading={loading} className='flex flex-wrap justify-center'>
        {offers.map((offer: Offer) => (
          <CardOffer key={offer._id} offer={offer} />
        ))}
      </AlleBody>
    </>
  );
}

export default App;
