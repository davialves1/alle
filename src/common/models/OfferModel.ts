export interface Offer {
  _id: string;
  offerId: any;
  company: string;
  shortdescription: string;
  description: string;
  longdescription: string;
  img: string;
  imgS3: string;
  sale: boolean;
  category: string;
  subcategory: string;
  city: string;
  delivery: boolean;
  online: boolean;
  phone: string;
  website: string;
  firebaseImage?: string;
  email: string;
  address: string;
  isActive: boolean;
  createdDate: Date;
  social: {
    facebook: { type: string; required: false };
    instagram: { type: string; required: false };
  };
}
