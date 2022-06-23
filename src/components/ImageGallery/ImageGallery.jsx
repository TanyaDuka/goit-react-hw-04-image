import ImageGalleryItem from 'components/ImageGalleryItem';
import s from '../ImageGallery/ImageGallery.module.css';
import { Events, animateScroll as scroll } from 'react-scroll';
import { useEffect } from 'react';
import { useState } from 'react';
import propTypes from 'prop-types';


const ImageGallery = ({ imagesObj, onGalleryId }) => {
  const [firstRender, setFirstRender] = useState(false);
  useEffect(() => {
    Events.scrollEvent.register('begin', function () {});

    Events.scrollEvent.register('end', function () {});
    return () => {
      Events.scrollEvent.remove('begin');
      Events.scrollEvent.remove('end');
    };
  }, []);

  
  useEffect(() => {
    if (!firstRender) {
      setFirstRender(true);
      return;
    }
    scroll.scrollToBottom();
  }, [imagesObj.length, firstRender]);

  // componentWillUnmount() {
  //   Events.scrollEvent.remove('begin');
  //   Events.scrollEvent.remove('end');
  // }
  const onClickImage = id => {
    onGalleryId(id);
  };

  return (
    <ul className={s.ImageGallery}>
      {imagesObj.map(({ id, webformatURL, largeImageURL, tags }) => (
        <ImageGalleryItem
          key={id}
          id={id}
          webURL={webformatURL}
          largeURL={largeImageURL}
          tags={tags}
          onClickItemImage={() => onClickImage(id)}
        />
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  onGalleryId: propTypes.func.isRequired,
  imagesObj: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.number.isRequired,
      webformatURL: propTypes.string.isRequired,
      tags:propTypes.string.isRequired
    })
  ).isRequired,
};


export default ImageGallery;
