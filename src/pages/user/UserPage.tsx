import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../common/store/AppContext';
import AlleBody from '../../common/alle-ui/AlleBody';
import AlleHeader from '../../common/alle-ui/AlleHeader';
import CreateOffer from './CreateOffer';
import { AlleUser } from '../../common/models/AlleUser';
import { useNavigate } from 'react-router-dom';
import { Button, Input } from '@mui/joy';
import {
  getDownloadURL,
  getStorage,
  listAll,
  ref,
  uploadBytes,
} from 'firebase/storage';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../FirebaseConfig';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';

const UserPage = () => {
  const { user }: { user: AlleUser } = useContext(AppContext);

  const app = initializeApp(firebaseConfig);

  const storage = getStorage(app);

  const db = getFirestore(app);

  const [image, setImage] = useState<string>();

  const [imageList, setImageList] = useState<string[]>();

  const [loading, setLoading] = useState(false);

  const [imageForm, setImageForm] = useState<any>(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, []);

  useEffect(() => {
    if (user && user.uid) {
      loadImage();
    }
  }, [imageForm]);

  const loadImage = async () => {
    // const q = query(collection(db, 'users'), where('uid', '==', user.uid));
    // const imageName = (await getDocs(q)).docs[0].data().image;
    // const path = `users/${user.uid}/${imageName}`;
    // const imageRef = ref(storage, path);
    // const url = await getDownloadURL(imageRef);

    listAll(ref(storage, `users/${user.uid}/`)).then((bucket) => {
      const paths = bucket.items.map((item) =>
        getDownloadURL(ref(storage, item.fullPath))
      );
      Promise.all(paths).then((images) => setImageList(images));
    });

    // setImage(url);
  };

  const handleSubmit = async () => {
    setLoading(true);
    const { file, name, type } = getImageData();
    const imageRef = ref(storage, `users/${user.uid}/${name}`);
    uploadBytes(imageRef, file, { contentType: type }).then(
      async (snapshot) => {
        const q = query(collection(db, 'users'), where('uid', '==', user.uid));
        const docReference = (await getDocs(q)).docs[0].ref;
        updateDoc(docReference, { image: snapshot.ref.name })
          .then(() => setLoading(false))
          .catch((error) => {
            setLoading(false);
            console.warn(error);
          });

        setLoading(false);
      }
    );
  };

  const getImageData = (): { file: any; name: string; type: string } => {
    const file = imageForm.target.files[0];
    const { name, type } = file;
    return { file, name, type };
  };

  const previous = (i: number) => {
    if (imageList) {
      return i === 0 ? imageList.length - 1 : i - 1;
    }
  };

  const next = (i: number) => {
    if (imageList) {
      return i === imageList.length - 1 ? 0 : i + 1;
    }
  };

  return (
    <>
      <AlleHeader />
      {user && (
        <AlleBody loading={loading} className='flex-col px-5 min-h-screen'>
          <h2 className='text-2xl text-slate-600 my-3'>
            Olá {user.displayName}
          </h2>
          {imageList && (
            <div className='carousel w-full'>
              {imageList.map((image, i) => (
                <div
                  key={i + image}
                  id={'slide' + i}
                  className='carousel-item relative w-5/6'
                >
                  <img key={image} src={image} className='w-full p-0.5' />
                  <div className='absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2'>
                    {/* <a
                      href={'#slide' + previous(i)}
                      className='btn btn-circle opacity-30 hover:opacity-95'
                    >
                      ❮
                    </a>
                    <a href={'#slide' + next(i)} className='btn btn-circle'>
                      ❯
                    </a> */}
                  </div>
                </div>
              ))}
            </div>
          )}
          <p className='mt-5 text-slate-500 text-sm'>
            Estamos felizes em tê-lo(a) aqui e esperamos que encontre tudo o que
            precisa. Obrigado por se juntar a nós!
          </p>
          <CreateOffer />
          <input
            accept='image/png, image/gif, image/jpeg'
            onChange={(file) => setImageForm(file)}
            className='my-5 file-input file-input-bordered file-input-success w-full max-w-xs'
            type='file'
          />
          <button className='btn btn-success' onClick={handleSubmit}>
            Send image
          </button>
        </AlleBody>
      )}
    </>
  );
};

export default UserPage;
