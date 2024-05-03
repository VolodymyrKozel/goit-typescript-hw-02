import { Image } from '../App/App.types';
import css from './ImageCard.module.css';

type ImageCardProps = {
  image: Image;
};

export default function ImageCard({ image }: ImageCardProps) {
  return (
    <div className={css.container}>

      <img
        className={css.img}
        src={image.urls.thumb}
        alt={image.alt_description}
      />
    </div>
  );
}
