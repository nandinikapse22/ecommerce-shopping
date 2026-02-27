import { useState } from 'react';
import './ImageGallery.css';

const ImageGallery = ({ images, name }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="pdp-gallery">
      <div className="pdp-thumbs">
        {images.map((image, index) => (
          <button
            key={`${name}-thumb-${index}`}
            type="button"
            className={`pdp-thumb ${activeIndex === index ? 'active' : ''}`}
            onClick={() => setActiveIndex(index)}
            aria-label={`View image ${index + 1}`}
          >
            <img src={image} alt={`${name} thumbnail ${index + 1}`} loading="lazy" />
          </button>
        ))}
      </div>

      <div className="pdp-main-image-wrap">
        <img src={images[activeIndex]} alt={name} className="pdp-main-image" />
      </div>
    </div>
  );
};

export default ImageGallery;

