import { initializeApp } from 'firebase/app';
import {
  collection,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import {
  listAll,
  ref,
  getDownloadURL,
  getStorage,
  deleteObject,
  uploadBytes,
} from 'firebase/storage';
import { useContext, useEffect, useState } from 'react';
import { firebaseConfig } from '../FirebaseConfig';
import { AlleUser } from './models/AlleUser';
import { AppContext } from './store/AppContext';
import { BsCamera } from 'react-icons/bs';
import { FiTrash } from 'react-icons/fi';

const Carousel = () => {
  const [loading, setLoading] = useState(false);

  const [imageForm, setImageForm] = useState<any>(null);

  const { user }: { user: AlleUser } = useContext(AppContext);

  const app = initializeApp(firebaseConfig);

  const storage = getStorage(app);

  const db = getFirestore(app);

  const [imageList, setImageList] = useState<{ path: string; url: string }[]>(
    []
  );

  const handleSubmit = async () => {
    setLoading(true);
    const { file, name, type } = getImageData();
    const imageRef = ref(storage, `users/${user.uid}/${name}`);
    uploadBytes(imageRef, file, { contentType: type }).then(
      async (snapshot) => {
        const q = query(collection(db, 'users'), where('uid', '==', user.uid));
        const docReference = (await getDocs(q)).docs[0].ref;
        updateDoc(docReference, { image: snapshot.ref.name })
          .then(() => loadImage())
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

  const deleteImage = (image: { path: string; url: string }) => {
    setLoading(true);
    const imageRef = ref(storage, image.path);
    deleteObject(imageRef)
      .then(() => {
        setLoading(false);
        setImageList((prevState) => {
          const index = prevState?.findIndex((img) => img.path === image.path);
          const next = [...prevState];
          next.splice(index, 1);
          return next;
        });
      })
      .catch((error) => console.warn(error));
  };

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
      const paths = bucket.items.map(async (item) => ({
        path: item.fullPath,
        url: await getDownloadURL(ref(storage, item.fullPath)),
      }));
      Promise.all(paths).then((images) => {
        setLoading(false);
        setImageList(images);
      });
    });
  };

  const nextImage = (i: number) => {
    return i < imageList.length - 1 ? i + 1 : 0;
  };

  const previousImage = (i: number) => {
    return i === 0 ? imageList.length - 1 : i - 1;
  };

  return (
    <>
      {imageList.length === 0 && (
        <div className='bg-white rounded-xl m-10 p-20 flex flex-col justify-center items-center text-center text-slate-400'>
          <BsCamera size={48} />
          <span className='p-4 mt-2'>
            No momento você não possui nenhuma foto.
          </span>
        </div>
      )}
      {imageList && (
        <div className='carousel w-full'>
          {imageList.map((image, i) => (
            <div
              key={i + image.url}
              id={'slide' + i}
              className='carousel-item relative w-5/6 md:w-full h-fit mt-10'
            >
              <img key={image.url} src={image.url} className='w-full p-0.5' />
              <div className='absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-10'>
                <a
                  onClick={() => deleteImage(image)}
                  className='btn btn-circle btn-accent'
                >
                  <FiTrash />
                </a>
              </div>
              <div className='absolute justify-between transform -translate-y-1/2 left-5 right-5 top-1/2 hidden md:flex'>
                <a
                  href={'#slide' + previousImage(i)}
                  className='btn btn-circle'
                >
                  ❮
                </a>
                <a href={'#slide' + nextImage(i)} className='btn btn-circle'>
                  ❯
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
      <input
        accept='image/png, image/gif, image/jpeg'
        onChange={(file) => setImageForm(file)}
        className='my-5 file-input file-input-bordered file-input-success w-full max-w-xs'
        type='file'
      />
      <button className='btn btn-success' onClick={handleSubmit}>
        Send image
      </button>
    </>
  );
};

export default Carousel;
