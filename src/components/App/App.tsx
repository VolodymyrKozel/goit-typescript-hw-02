import { useEffect, useState } from 'react';
import getImagesAPI from '../../services/api';
import SearchBar from '../searchBar/SearchBar';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Loader from '../loader/Loader';
import ImageGallery from '../imageGallery/ImageGallery';
import ImageModal from '../imageModal/ImageModal';
import LoadMoreBtn from '../loadMoreBtn/LoadMoreBtn';
import useToggle from '../hooks/useToggle';
import ToTop from '../ToTop/ToTop';
import { Image, ParamsRequest, Data, ErrorAxios } from './App.types';

import './App.css';

function App() {
  const [images, setImages] = useState<Image[]>([]);
  const [toTop, setToTop] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ErrorAxios | null>(null);
  const [currentImage, setCurrentImage] = useState<Image>({} as Image);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [paramsRequest, setParamRequest] = useState<ParamsRequest>({
    query: '',
    page: 1,
    perPage: 10,
    client_id: '5oq-O0l79UtWEfgesuk7FNxEhMjgmglWAfYeOAPGJFs',
  });
  const { isOpen, open, close } = useToggle();

  const handleSearch = (query: string): void => {
    setParamRequest(prevParams => ({
      ...prevParams,
      query: query,
      page: 1,
    }));
  };
  function handleScrollUp(): void {
    window.scrollY > 80 ? setToTop(true) : setToTop(false);
  }
  useEffect(() => {
    window.addEventListener('scroll', handleScrollUp);
    return () => {
      window.removeEventListener('scroll', handleScrollUp);
    };
  }, []);

  useEffect(() => {
    if (paramsRequest.query === '') return; // prevent fetch on mount
    fetchImages();
  }, [paramsRequest.page, paramsRequest.query]);

 async function fetchImages() {
    try {
      setError(null);
      setLoading(true);
      const data = await getImagesAPI<Data>(paramsRequest);
      const imagesArray: Image[] = data.results;
      setTotalPages(data.total_pages);
      paramsRequest.page === 1
        ? setImages(imagesArray)
        : setImages(pImg => [...pImg, ...imagesArray]);
    } catch (error: ErrorAxios | any) {
      setError(error as ErrorAxios);
    } finally {
      setLoading(false);
    }
  };
  function handleOpenModal(image: Image): void {
    setCurrentImage(image);
    open();
  }
  function handleLoadMore(): void {
    setParamRequest((prevParams: ParamsRequest) => ({
      ...prevParams,
      page: prevParams.page + 1,
    }));
  }
  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      {error && <ErrorMessage error={error} />}
      {images && images.length > 0 && (
        <ImageGallery handleOpenModal={handleOpenModal} images={images} />
      )}
      {loading && paramsRequest.page === 1 && <Loader />}
      {totalPages > 1 && paramsRequest.page < totalPages ? (
        <LoadMoreBtn handleLoadMore={handleLoadMore} loading={loading} />
      ) : null}
      <ImageModal
        closeModal={close}
        modalIsOpen={isOpen}
        currentImage={currentImage}
      />
      {toTop && <ToTop />}
    </div>
  );
}

export default App;
