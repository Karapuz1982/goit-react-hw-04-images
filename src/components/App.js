
import React, { useState, useEffect } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Modal from './Modal';
import Loader from './Loader';
import fetchImages from './Api';
import './styles/styles.css';

const IMAGES_PER_PAGE = 12;

 const App = () => {
 
   const [images, setImages] = useState([]);
   const [query, setQuery] = useState('');
   const [isLoading, setIsLoading] = useState(false);
   const [page, setPage] = useState(1);
   const [largeImageURL, setLargeImageURL] = useState('');
   const [totalPages, setTotalPages] = useState(null);
  

  useEffect(() => {
   if (query && (page === 1 || page <= totalPages)) {
      setIsLoading(true);

      fetchImages(query, page)
        .then((data) => {
          setImages((prevImages) => [...prevImages, ...data.hits]);
          setTotalPages(Math.ceil(data.totalHits / IMAGES_PER_PAGE));
          setIsLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching images:', error);
          setIsLoading(false);
        });
    }
  }, [query, page, totalPages]);

  const handleSubmit = (searchQuery) => {
    setQuery(searchQuery);
    setImages([]);
    setPage(1);
    setTotalPages(null);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleImageClick = (largeImageURL) => {
    setLargeImageURL(largeImageURL);
  };

  const handleCloseModal = () => {
    setLargeImageURL('');
  };

  return (
    <div className="App">
      <Searchbar onSubmit={handleSubmit} />
      {isLoading && <Loader />}
      <ImageGallery images={images} onImageClick={handleImageClick} />
      {page < totalPages && images.length > 0 && !isLoading && (
        <Button onClick={handleLoadMore} />
      )}
      {largeImageURL && <Modal src={largeImageURL} alt="Large" onClose={handleCloseModal} />}
    </div>
  );
};

export default App;