import Button from 'components/Button';
import ImageGallery from 'components/ImageGallery';
import Modal from 'components/Modal';
// import Modal from 'components/Modal';
import Searchbar from 'components/Searchbar';
import { useState, useEffect } from 'react';
import s from '../App/App.module.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import fetchAPI from 'service/FetchApiPhoto/fetchAPI';
import Loader from 'components/Loader';


Notify.init({
  width: '300px',
  position: 'right-bottom',
  closeButton: false,
  clickToClose: true,
  timeout: 2000,
});

const PER_PAGE = 12;
const App = () => {
  const [images, setImages] = useState(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('idle');
  const [showModal, setShowModal] = useState(false);
  const [modalImageId, setModalImageId] = useState(null);
  const [showLoadMore, setShowLoadMore] = useState(false);

  useEffect(() => {
    if (!search) {
      return;
    } else if (page === 1) {
      setStatus('pending');
      
      fetchAPI(search, page, PER_PAGE)
        .then(images => {
          if (images.hits.length === 0) {
            Notify.failure('Oops, not found, try again');
            return setStatus('rejected');
          }
          setImages(images.hits);
          setShowLoadMore(true);
          setStatus('resolved');
        })
        .catch(error => {
          console.error(error);
          setStatus('rejected');
        });
    } else if (page > 1) {
      fetchAPI(search, page, PER_PAGE).then(arr => {
        const check = arr.totalHits > page * PER_PAGE;
        if (!check) {
          setShowLoadMore(false);
        }
        setImages(prevState => [...prevState, ...arr.hits]);
      });
    }
  }, [search, page]);

  
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  
  const onSubmitSearchBar = name => {
    setSearch(name.toLowerCase());
    setPage(1);
  };

  const modalSetId = id => {
    if (images) {
      return images.find(image => image.id === id);
    }
    return;
  };

  const gallerySetId = id => {
    setModalImageId(id);
    toggleModal();
  };


  const nextPage = () => {
    setPage(prevState => prevState + 1);
  };
  return (
    <div className={s.App}>
      <Searchbar onSubmit={onSubmitSearchBar} />
      {status === 'pending' && <Loader />}
      {status === 'pending' ||
        (showModal && (
          <Modal onClose={() => toggleModal()}>
            <img
              src={modalSetId(modalImageId).largeImageURL}
              alt={modalSetId(modalImageId).tags}
            />
          </Modal>
        ))}
      {status === 'resolved' && (
        <ImageGallery imagesObj={images} onGalleryId={gallerySetId} />
      )}
      <div className={s.ButtonDiv}>
        {status === 'resolved' && showLoadMore && (
          <Button nextPage={nextPage} />
        )}
      </div>
    </div>
  );
};

export default App;