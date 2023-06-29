import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Loader } from './Loader/Loader';
import { getImages } from './services/pixabayApi';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { AppWrapper } from './app.styled';

export const App = () => {
  const [page, setPage] = useState(1);
  const [q, setQ] = useState('');
  const [images, setImages] = useState([]);
  const [showBtn, setShowBtn] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!q) return;
    const fetchData = () => {
      try {
        getImages(q, page).then(({ hits, totalHits }) => {
          setImages(prev => [...prev, ...hits]);
          setShowBtn(page < Math.ceil(totalHits / 12));

          if (hits.length === 0) {
            return toast.info(
              'Sorry, there are no images matching your search query. Please try again'
            );
          }
        });
      } catch (error) {
        toast.error('Something went wrong. Please, try later.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [q, page]);

  const onSubmit = q => {
    if (q.trim() === '') {
      return toast.info(
        'Sorry, but the search field cannot be empty, please enter your query'
      );
    }
    setQ(q);
    setPage(1);
    setImages([]);
    setShowBtn(false);
    setLoading(true);
  };

  const onBtnMoreClick = () => {
    setPage(prev => prev + 1);
  };

  return (
    <AppWrapper>
      <Searchbar onSubmit={onSubmit} />
      {loading ? <Loader /> : <ImageGallery images={images} />}

      {showBtn && <Button onBtnMoreClick={onBtnMoreClick} />}
    </AppWrapper>
  );
};
