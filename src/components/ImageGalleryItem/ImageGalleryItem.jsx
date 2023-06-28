import PropTypes from 'prop-types';
import { Modal } from 'components/Modal/Modal';
import { useState } from 'react';
import { GalleryImage, GalleryItem } from './imageGalleryItem.styled';

export const ImageGalleryItem = ({ webformatURL, tags, largeImageURL }) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(prev => !prev);
  };

  return (
    <GalleryItem>
      <GalleryImage src={webformatURL} alt={tags} onClick={toggleModal} />
      {showModal ? <Modal onClose={toggleModal} src={largeImageURL} /> : null}
    </GalleryItem>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
