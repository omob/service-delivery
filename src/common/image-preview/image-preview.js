import React from "react";
import "./imagePreview.scss";

const ImagePreview = ({ imageSrc, alt }) => {
  return (
    <div className="image-preview mx-auto my-5" id="image-preview">
      <img src={imageSrc} alt={alt} />
      {!imageSrc && <span className="image-preview-text">Image Preview</span>}
    </div>
  );
};

export default ImagePreview;
