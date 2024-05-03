import React, { FC } from 'react';
import ImageCard from '../imageCard/ImageCard';
import css from './ImageGallery.module.css';
import { Image } from '../App/App.types';

interface ImageGalleryProps {
  images: Image[];
  handleOpenModal: (image: Image) => void;
}

const ImageGallery: FC<ImageGalleryProps> =({
  images,
  handleOpenModal,
}) => {

  return (
    <div className="container">
      <ul className={css.list}>
        {/* Набір елементів списку із зображеннями */}
        {images.map(image => {
          return (
            <li
              key={image.id}
              className={css.item}
              onClick={() => handleOpenModal(image)}>
              <ImageCard image={image} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ImageGallery;