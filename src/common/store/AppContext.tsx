import { createContext, useState } from 'react';
import { Offer } from '../models/OfferModel';
import { AlleUser } from '../models/AlleUser';

export const AppContext = createContext<any>(null);

const ContextProvider = ({ children }: any) => {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [user, setUser] = useState<AlleUser>();

  return (
    <AppContext.Provider value={{ offers, setOffers, user, setUser }}>
      {children}
    </AppContext.Provider>
  );
};

export default ContextProvider;
