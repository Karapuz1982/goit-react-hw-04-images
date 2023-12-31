import React from 'react';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ src, alt, onClick }) => {
  return (
    <li className="ImageGalleryItem">
      <img src={src} alt={alt} className="ImageGalleryItem-image" onClick={onClick} />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
