import React from 'react';

const ServiceImage = ({ imgSrc, alt }) => {
  return (
    <div className="service-image-placeholder">
      <img src={imgSrc} alt={alt} className="service-image" />
    </div>
  );
};

export default ServiceImage;
